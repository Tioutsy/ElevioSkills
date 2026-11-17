export const WASTE_SORTING_PATHWAY_SLUG = "waste-sorting-and-recycling-in-mauritius";
export const WASTE_SORTING_PATHWAY_TITLE = "Waste Sorting & Recycling in Mauritius";

export interface WasteSortingChallengeDef {
  order: number;
  courseCode: string;
  slug: string;
  title: string;
  scenario: string;
  learningObjective: string;
  workplaceActionTakeaway: string;
  durationMinutes: number;
  isFreeEntry: boolean;
  lessons: Array<{
    orderIndex: number;
    title: string;
    content: string;
    durationMinutes: number;
    contentBlocks: any[];
  }>;
  questions: Array<{
    orderIndex: number;
    question: string;
    options: string[];
    correctOption: number;
    optionFeedback: string[];
    correctExplanation: string;
    incorrectExplanation: string;
    practicalTakeaway: string;
    competencyArea: string;
    questionType: "sorting_decision" | "uncertainty" | "contamination";
  }>;
}

export const WASTE_SORTING_CHALLENGES: WasteSortingChallengeDef[] = [
  // =========================================================================
  // Challenge 1: The Right Bin at Work (Ebène office lunch area) - FREE ENTRY
  // =========================================================================
  {
    order: 1,
    courseCode: "ELH-36",
    slug: "the-right-bin-at-work",
    title: "The Right Bin at Work",
    scenario: "An Ebène cybercity corporate office lunch area with a PET drink bottle, a used greasy napkin, and packaging whose destination depends on the displayed workplace sorting instructions.",
    learningObjective: "Decide where daily office lunch items go by following your workplace's posted sorting guidelines and preventing bin contamination.",
    workplaceActionTakeaway: "Display a clean, visible bin guide above your office kitchenette waste station and rinse beverage containers before recycling.",
    durationMinutes: 6,
    isFreeEntry: true,
    lessons: [
      {
        orderIndex: 0,
        title: "The Ebène Lunch Area: Understanding Your Site Bin System",
        durationMinutes: 2,
        content: "At our office in Ebène, the kitchen lunch area features a 3-stream waste station collected weekly by a local commercial recycler (Recyclean) alongside municipal collection. Bin labels clearly state: [1. Clean Dry Paper & Cardboard], [2. Clean Plastic Bottles & Cans], and [3. General Waste]. Knowing how to use these bins correctly ensures recyclables avoid ending up at Mare Chicose landfill.",
        contentBlocks: [
          {
            type: "text",
            heading: "The Workplace Sorting Context",
            body: "Mauritian workplaces partner with different licensed collection operators. In Ebène, your station is configured into three dedicated streams: Clean Paper & Cardboard, Clean Plastic Bottles & Cans, and General Waste. Bin colours are not universally standardised across Mauritius, so you must always read the posted site label before disposing of an item."
          },
          {
            type: "callout",
            title: "Local Collection Truth",
            body: "In Mauritius, recycling collection contractors (such as Recyclean and Mission Verte) require beverage containers to be completely empty and free of liquids or food grease. Unwashed containers contaminate entire collection bags."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Clean Recyclables vs Food Grease Contamination",
        durationMinutes: 2,
        content: "Every item discarded during lunch falls into one of three operational states: clean and recyclable, food-soiled and non-recyclable, or conditional (requiring a quick rinse or checking a label). Liquid dregs and food oils are the primary cause of rejected recycling batches in Mauritian offices.",
        contentBlocks: [
          {
            type: "text",
            heading: "Three Quick Rules for Lunchtime Waste",
            body: "1. Empty and rinse drink bottles before recycling.\n2. Keep greasy napkins and food wrappers out of paper recycling.\n3. When unsure if a hybrid item is accepted, check the site guide rather than guessing."
          },
          {
            type: "callout",
            title: "Contamination Consequence",
            body: "Just one cup containing leftover tea or coffee dumped into a paper recycling bin will soak through dry cardboard, ruining several kilograms of recoverable paper fibers."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Rinsing and Signage Stewardship",
        durationMinutes: 2,
        content: "Commit to a 5-second habit: give plastic drink bottles and cans a quick splash of water at the kitchenette sink, shake dry, replace the cap, and put them in the designated bin.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Choose your immediate workplace action for waste sorting:",
            commitmentOptions: [
              { value: "rinse_containers", label: "Rinse all beverage bottles and cans before placing them in recycling" },
              { value: "keep_paper_clean", label: "Ensure no greasy food napkins or coffee cups enter the paper bin" },
              { value: "check_site_guide", label: "Check the posted bin guide or ask facilities whenever unsure about packaging" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "You finish drinking a 500ml PET water bottle at your desk in Ebène. The bottle is empty and you have re-screwed the cap. Based on the office's 3-bin system, where does it belong?",
        options: [
          "Clean Plastic Bottles & Cans bin",
          "Clean Dry Paper & Cardboard bin",
          "General Waste bin",
          "Leave it uncapped beside the sink for cleaning staff"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Clean, empty PET plastic bottles with caps replaced belong directly in the Clean Plastic Bottles & Cans stream for local bottle baling.",
          "Incorrect. Plastic bottles are a polymer stream and will contaminate the paper recycling hydropulping process.",
          "Incorrect. An empty, clean PET bottle is highly recyclable in Mauritius; putting it in general waste sends it unnecessarily to Mare Chicose landfill.",
          "Incorrect. Leaving empty containers for housekeeping increases labour and risks pest attraction; always place it into the correct bin yourself."
        ],
        correctExplanation: "Empty, rinsed PET bottles belong in the Clean Plastic Bottles & Cans stream, which is baled and flaked locally by Mauritian recyclers.",
        incorrectExplanation: "Clean plastic bottles should be recycled in the designated plastics stream rather than sent to landfill or mixed with paper.",
        practicalTakeaway: "Empty the bottle completely, squash it to save transport volume, re-screw the cap, and place it in the plastic recycling bin.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "During lunch, you used a paper napkin to wipe vegetable curry oil from your fingers. Where should this greasy paper napkin be placed?",
        options: [
          "General Waste bin",
          "Clean Dry Paper & Cardboard bin",
          "Clean Plastic Bottles & Cans bin",
          "Shred it into the office document paper bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Food oils and grease permanently bond to paper fibers and cannot be separated in paper pulping tanks, making greasy napkins non-recyclable general waste.",
          "Incorrect. Food grease contaminates dry paper batches and can cause whole bales of cardboard to be rejected at local paper mills.",
          "Incorrect. Paper napkins are not plastics or metals and will contaminate the container recycling stream.",
          "Incorrect. Shredding greasy paper spreads food oils and attracts vermin to confidential paper storage."
        ],
        correctExplanation: "Grease and cooking oils permanently ruin paper recycling pulping; food-soiled paper must go into general waste.",
        incorrectExplanation: "Paper fibers soaked in food grease cannot be washed clean during commercial paper recycling.",
        practicalTakeaway: "Place food-greased napkins and paper towels in general waste; keep paper bins exclusively for clean, dry fiber.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "You have an empty clear PET salad clamshell container from lunch that still has sticky dressing and vinaigrette pooled in the bottom corners. You are in a rush and cannot rinse it. Where must it go?",
        options: [
          "General Waste bin (since it cannot be cleaned immediately)",
          "Clean Plastic Bottles & Cans bin (the recycler will wash it)",
          "Clean Dry Paper & Cardboard bin",
          "Stack it on top of the recycling bin lid"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. If food packaging cannot be rinsed clean of oily dressing, it must go to General Waste. Unwashed food residue ferments, attracts insects, and contaminates clean recyclables.",
          "Incorrect. Mauritian sorting lines do not hand-wash oily salad trays; unwashed food trays contaminate clean bales and lead to rejected loads.",
          "Incorrect. Plastic salad containers never belong in paper recycling.",
          "Incorrect. Stacking dirty food containers on bin lids creates mess, attracts pests, and encourages further improper disposal."
        ],
        correctExplanation: "Contaminated plastics that cannot be rinsed clean must be disposed of in general waste to protect the rest of the recycling stream.",
        incorrectExplanation: "Recyclers in Mauritius require clean plastics; food residues cause entire collection bags to be diverted to landfill.",
        practicalTakeaway: "Either give the food tray a quick rinse with water at the sink before recycling, or discard it into general waste if rinsing is unavailable.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "A colleague finishes a can of sparkling water, drains the last drops in the sink, and asks which bin it belongs in under the Ebène office system.",
        options: [
          "Clean Plastic Bottles & Cans bin",
          "General Waste bin",
          "Clean Dry Paper & Cardboard bin",
          "Hazardous e-waste box"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Beverage cans are made of aluminium, a 100% recyclable metal that is collected together with plastic bottles in commingled dry container streams.",
          "Incorrect. Aluminium cans are high-value recyclables in Mauritius; sending them to landfill wastes substantial energy and raw materials.",
          "Incorrect. Metal cans do not belong in paper recycling.",
          "Incorrect. Empty aluminium soft drink cans are non-hazardous beverage containers, not electronic waste."
        ],
        correctExplanation: "Aluminium beverage cans belong in the Clean Plastic Bottles & Cans collection stream where they are separated by eddy-current separators for remelting.",
        incorrectExplanation: "Empty aluminium cans are infinitely recyclable and should never be landfilled when a container bin is available.",
        practicalTakeaway: "Empty cans completely, rinse if sweet soda was inside, and place into the plastics and cans container stream.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "You buy a cold drink in a transparent cup stamped '100% Compostable Plant Plastic (PLA)'. Your office station only has 'Clean Plastic Bottles & Cans', 'Clean Paper', and 'General Waste'. What is the correct action?",
        options: [
          "Check the site guide or facilities contact, and if no industrial composting exists, place it in General Waste",
          "Throw it in Clean Plastic Bottles because it looks identical to PET plastic",
          "Throw it in Clean Dry Paper because it comes from plant material",
          "Bury it in the indoor office potted plant"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. PLA bioplastics cannot be recycled with normal PET/HDPE and melt at different temperatures, ruining conventional plastic recycling. Without an industrial composter, they belong in general waste.",
          "Incorrect. PLA heavily contaminates standard PET recycling streams in Mauritius because local plastic extruders cannot process PLA resins.",
          "Incorrect. PLA is a synthetic biopolymer, not paper fiber, and cannot be recycled in a paper hydropulper.",
          "Incorrect. PLA requires high industrial composting temperatures (58°C+) to break down; it will not degrade in ambient houseplant soil."
        ],
        correctExplanation: "Bioplastics (PLA) must never be mixed with conventional PET/HDPE plastics in Mauritius. When unsure, check site instructions or use general waste.",
        incorrectExplanation: "Bioplastics cannot be recycled with standard plastics. When no specialized organic facility is available, general waste is the safe choice.",
        practicalTakeaway: "Never assume 'compostable plastic' goes into plastic recycling. Verify local facility capabilities or default to general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "You see an open takeaway iced coffee cup containing melting ice and milky liquid thrown directly into the Clean Dry Paper & Cardboard bin. What is the immediate contamination risk and correct corrective step?",
        options: [
          "Liquid will saturate and ruin the clean paper fibers; remove the cup, empty the liquid in the sink, and put the cup in general waste",
          "Leave it because the paper recycler will let the wet paper dry in the sun",
          "Add more paper on top of the wet cup to absorb the spilled milk",
          "Tip the whole paper bin into the plastic bottles bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Spilled liquids and dairy ruin recyclable paper fibers and trigger mould growth; removing the liquid and placing the soiled cup in general waste rescues the paper batch.",
          "Incorrect. Milk-soaked paper rots and contaminates entire bales, leading to immediate rejection at the baling plant.",
          "Incorrect. Adding more clean paper will only cause more clean material to be soaked and ruined.",
          "Incorrect. Tipping paper into the plastic container bin spreads cross-contamination across multiple streams."
        ],
        correctExplanation: "Liquids dumped into dry paper bins contaminate the entire batch. Fast removal and sink disposal rescues recoverable cardboard.",
        incorrectExplanation: "Liquid spills ruin paper pulping; coffee and milk cannot be washed out of dry paper recycling.",
        practicalTakeaway: "Always empty drink liquids into a pantry sink before discarding cups, and act immediately if you see a spill hazard in a dry bin.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 2: Paper and Cardboard (Curepipe shop)
  // =========================================================================
  {
    order: 2,
    courseCode: "ELH-37",
    slug: "paper-and-cardboard",
    title: "Paper and Cardboard",
    scenario: "A retail clothing shop in Curepipe receiving weekly inventory deliveries, dealing with clean corrugated boxes, rain-soaked cartons from the loading bay, and grease-stained takeaway boxes in the staff room.",
    learningObjective: "Distinguish clean, recyclable paper and cardboard from moisture-damaged fibers and grease-stained food packaging to safeguard local carton baling streams.",
    workplaceActionTakeaway: "Flatten all clean cardboard delivery boxes immediately and remove heavy plastic strapping bands before stacking.",
    durationMinutes: 6,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Curepipe Stockroom: The Cardboard & Box Flow",
        durationMinutes: 2,
        content: "Our retail shop in Curepipe unpacks dozens of shipping cartons every Tuesday. Local recyclers (such as Dakri Cartons and Brikole) collect clean cardboard for repulping. Cardboard must be dry, flattened, and free of non-paper contaminants like plastic bubble wrap and strapping bands.",
        contentBlocks: [
          {
            type: "text",
            heading: "Why Flattening Matters in Mauritius",
            body: "Unflattened cardboard boxes take up 80% empty air in collection trucks, making transport economically inefficient and increasing vehicle emissions. Flattening boxes ensures trucks carry maximum weight per trip."
          },
          {
            type: "callout",
            title: "Curepipe Weather Reality",
            body: "Curepipe experiences frequent high rainfall and humidity. Cardboard left outside on open loading ramps quickly absorbs water, which weakens the fibers and causes mold growth in compressed bales."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Moisture, Wax, and Food Oil: Cardboard Enemies",
        durationMinutes: 2,
        content: "Paper recycling uses water-based hydropulpers. Water-soluble adhesives and clean wood fibers break down easily. However, petroleum-based waxes, cooking oils, and thermal till paper do not break down in water and ruin paper batches.",
        contentBlocks: [
          {
            type: "text",
            heading: "What Can and Cannot Be Pulped",
            body: "Clean delivery boxes, brown packing paper, and office documents pulp cleanly. Waxed frozen food cartons, thermal receipts, and oil-soaked pizza boxes cannot be recycled into quality paper."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Stockroom Breakdown Protocol",
        durationMinutes: 2,
        content: "Set up a clean unpacking routine: slice the box tape, pull off plastic strapping, flatten the box flat, and stack it indoors away from rain.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to a cardboard management habit for your workplace:",
            commitmentOptions: [
              { value: "flatten_all_boxes", label: "Flatten 100% of cardboard cartons immediately upon unpacking" },
              { value: "remove_strapping", label: "Remove plastic shipping bands and heavy tape before stacking" },
              { value: "keep_cardboard_dry", label: "Store all salvaged cardboard indoors away from rain and dampness" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "You unpack a shipment of cotton shirts in Curepipe. The corrugated carton is completely dry and clean. How should you prepare it for collection?",
        options: [
          "Remove plastic packing tape, flatten the box flat, and stack it in the paper recycling area",
          "Leave it fully assembled and put general trash inside it",
          "Soak it with water to make it easier to fold",
          "Toss it into the municipal street bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Removing packing tape and flattening the box preserves clean fiber quality and maximizes collection vehicle transport density.",
          "Incorrect. Using delivery boxes as general trash bins contaminates recyclable cardboard and wastes valuable fibers.",
          "Incorrect. Soaking cardboard ruins fiber tensile strength and causes mold in paper bales.",
          "Incorrect. Clean corrugated cartons are commercially valuable recyclables in Mauritius; do not dispose of them in municipal street bins."
        ],
        correctExplanation: "Flattening clean dry boxes and removing tape ensures efficient collection and high-quality paper repulping.",
        incorrectExplanation: "Clean shipping cartons should be stripped of tape and flattened for cardboard recycling.",
        practicalTakeaway: "Slice tape along seams, flatten boxes flat, and store them in a clean, dry indoor collection point.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "A delivery box was left outside on the wet Curepipe loading ramp during heavy rain. It is completely waterlogged, heavy, and falling apart into mush. Where does it go?",
        options: [
          "General Waste (or keep separate to dry, discarding if moldy/rotting)",
          "Clean Paper & Cardboard recycling stack",
          "Plastic recycling bin",
          "Mix it in with dry office paper"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Heavily waterlogged cardboard clogs industrial baling machinery, creates dangerous overweight bales, and breeds mold that ruins adjacent dry stock.",
          "Incorrect. Adding waterlogged mush into dry cardboard bales ruins the batch and causes paper mills to reject the entire delivery.",
          "Incorrect. Cardboard is cellulose fiber, not plastic.",
          "Incorrect. Wet cardboard will transfer moisture to clean office paper, ruining both."
        ],
        correctExplanation: "Waterlogged, decomposed cardboard cannot be baled safely; it must be separated and treated as general waste if moldy.",
        incorrectExplanation: "Soaked cardboard creates fungal rot in paper bales and cannot be accepted by local recycling balers.",
        practicalTakeaway: "Protect cardboard from rain; once cellulose fibers break down into rotten mush, they are lost to recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "Staff ordered a takeaway pizza for lunch in the breakroom. The top lid of the cardboard pizza box is completely clean and dry, but the bottom base is saturated with cooking oil and melted cheese. What is the correct sorting decision?",
        options: [
          "Tear off the clean dry lid for paper recycling; discard the greasy bottom base in General Waste",
          "Put the entire pizza box in the cardboard recycling bin",
          "Wash the greasy base with dish soap and dry it",
          "Throw the entire pizza box in the plastics bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Tearing off the clean lid rescues clean cardboard fibers, while discarding the oil-soaked base protects paper pulping tanks from oil contamination.",
          "Incorrect. The oil-soaked base will contaminate the recycling batch. Grease spots cause pinholes and weaknesses in new recycled paper.",
          "Incorrect. Cardboard cannot be washed with soap; the fibers will disintegrate.",
          "Incorrect. Cardboard is not plastic."
        ],
        correctExplanation: "Separating clean cardboard lids from grease-stained bases is a proven workplace technique that maximizes recovery while stopping oil contamination.",
        incorrectExplanation: "Food grease ruins paper pulping; never put cheese or cooking oil residue into cardboard recycling.",
        practicalTakeaway: "Do the tear-off test: clean, unsoiled cardboard sections can be recycled; grease-stained sections go to general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "At the shop checkout till, the cashier replaces the roll of thermal receipt paper. Where should old or crumpled thermal paper receipts be discarded?",
        options: [
          "General Waste bin",
          "Clean Paper & Cardboard recycling bin",
          "Organic compost bin",
          "Plastic bottle bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Thermal receipts are coated with chemical heat-sensitive dyes (often containing BPA/BPS) and cannot be repulped into clean paper.",
          "Incorrect. Thermal receipt paper introduces chemical contaminants into paper pulping and cannot yield usable recycled paper pulp.",
          "Incorrect. Synthetic thermal coatings should not be introduced into organic compost.",
          "Incorrect. Thermal paper is paper coated with chemical film, not a plastic container."
        ],
        correctExplanation: "Thermal receipt paper contains chemical coatings that disrupt recycling and belongs in general waste.",
        incorrectExplanation: "Thermal till receipts are not recyclable paper; their chemical reactive layer contaminates pulp batches.",
        practicalTakeaway: "Place cash register till receipts in general waste, and opt for digital e-receipts whenever possible.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "A delivery box arrives secured with thick plastic strapping bands and large heavy-duty brass carton staples. You are unsure whether you must remove the metal staples before placing the box in recycling. What should you do?",
        options: [
          "Check the recycler's site specifications (e.g. Brikole / Dakri guidelines); remove plastic strapping manually, while small staples are usually screened out at the mill",
          "Throw the entire box with strapping into general waste without checking",
          "Assume plastic strapping melts away during paper pulping",
          "Burn the strapping off with a lighter"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Checking written collector guidelines is the professional response: industrial paper mills have magnetic screens for standard staples, but plastic strapping bands tangle hydropulper rotors and must always be removed manually.",
          "Incorrect. Throwing an entire large cardboard carton into landfill because of staples is wasteful when a 2-second check resolves the rule.",
          "Incorrect. Plastic strapping does not melt in water-based pulpers; it wraps around drive shafts and shuts down machinery.",
          "Incorrect. Burning plastic is illegal, dangerous, and generates toxic fumes."
        ],
        correctExplanation: "When unsure about fasteners, check collector specs: plastic strapping must always be cut off, while standard staples are screened mechanically.",
        incorrectExplanation: "Always verify collector rules: plastic straps damage pulping machinery, whereas small metal staples are filtered out.",
        practicalTakeaway: "Always cut and remove plastic packing bands and packing tape; leave small staples if the collector's guide permits.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "A colleague throws several glossy, wax-coated frozen snack boxes into the clean office paper bin. Why does wax-coated packaging cause severe problems in paper recycling?",
        options: [
          "Wax and polyethylene coatings do not dissolve in water, forming sticky clumps that clog paper screens and ruin recycled sheets",
          "Wax makes the paper too heavy for collection trucks",
          "Wax is radioactive",
          "The wax will catch fire spontaneously in the recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Wax and plastic barriers do not dissolve in water pulpers, forming 'stickies' that ruin wire meshes and cause defects in newly manufactured paper.",
          "Incorrect. Weight is not the issue; the chemical incompatibility of waterproof coatings in water-based pulping is the barrier.",
          "Incorrect. Wax is a hydrocarbon coating, not radioactive.",
          "Incorrect. Waxed food boxes do not spontaneously combust."
        ],
        correctExplanation: "Wax and plastic waterproof linings do not disintegrate in hydropulpers and must be kept out of dry paper streams.",
        incorrectExplanation: "Waterproof wax coatings cannot be separated from cellulose fibers in standard Mauritian paper mills.",
        practicalTakeaway: "Scratch the box surface: if it feels slick or sheds wax, it has a moisture barrier and cannot go into standard paper recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 3: Plastic Bottles and Packaging (Workplace canteen)
  // =========================================================================
  {
    order: 3,
    courseCode: "ELH-38",
    slug: "plastic-bottles-and-packaging",
    title: "Plastic Bottles and Packaging",
    scenario: "A workplace canteen in Plaine Lauzun with PET soft drink bottles, HDPE milk jugs, flavoured yoghurt pots, and multi-layer snack wrappers.",
    learningObjective: "Separate rigid recyclable plastics (PET #1 and HDPE #2) from flexible films, multi-layer laminates, and unrecyclable food containers.",
    workplaceActionTakeaway: "Squash plastic bottles flat, re-screw the cap to trap air, and keep chip bags and multi-layer wrappers out of bottle bins.",
    durationMinutes: 7,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Canteen Plastics: Resin Codes 1, 2, and 5",
        durationMinutes: 2,
        content: "In Mauritius, post-consumer plastic recycling focuses primarily on two clean polymer streams: Resin Code 1 (PET - clear beverage bottles) and Resin Code 2 (HDPE - opaque milk, detergent, and juice bottles). Local processors (such as Polygreen and Resiglas) flake and wash these polymers for industrial reuse.",
        contentBlocks: [
          {
            type: "text",
            heading: "Identifying Recyclable Plastics",
            body: "Look for the resin identification code inside the chasing arrows symbol:\n• Code 1 (PET): Water and soft drink bottles (widely recycled locally).\n• Code 2 (HDPE): Stiff, opaque milk jugs and cleaning bottles (widely recycled).\n• Code 4 (LDPE): Clean plastic bags and squeeze bottles (conditional).\n• Code 5 (PP): Some durable food containers and bottle caps."
          },
          {
            type: "callout",
            title: "What Cannot Be Recycled Locally",
            body: "Crisp packets, confectionery wrappers, polystyrene takeaway clamshells (Code 6), and multi-layer sachets have no commercial recycling process in Mauritius and must go to General Waste."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Squashing, Capping, and Film Contamination",
        durationMinutes: 2,
        content: "Bottles should be emptied, squashed flat, and re-capped. Leaving the cap on prevents the bottle from re-inflating. Soft plastic films and cling wrap must not be thrown into bottle bins because they wrap around sorting conveyor axles.",
        contentBlocks: [
          {
            type: "text",
            heading: "The Squash and Cap Habit",
            body: "1. Drink or empty all liquid.\n2. Squash the bottle from the base.\n3. Screw the cap back on tightly.\n4. Place into the Plastic Bottles bin."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Canteen Bottle Routine",
        durationMinutes: 3,
        content: "Ensure canteen waste stations clearly separate beverage bottles from food wrappers and sandwich films.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Select a practical action to improve plastic recycling in your canteen:",
            commitmentOptions: [
              { value: "squash_and_cap", label: "Always squash plastic bottles and screw caps back on before recycling" },
              { value: "no_wrappers_in_bottles", label: "Keep crisp wrappers, snack foils, and cling film out of bottle bins" },
              { value: "check_resin_codes", label: "Check the resin code (Codes 1 and 2 preferred) before discarding rigid containers" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "You finish a 500ml clear plastic water bottle stamped with Resin Identification Code 1 (PET). What is the correct way to dispose of it in the canteen?",
        options: [
          "Empty the remaining drops, crush the bottle flat, replace the cap, and put it in the Plastic Bottles bin",
          "Throw it half-full into the Plastic Bottles bin",
          "Remove the cap, throw the cap in General Waste, and leave the bottle uncrushed",
          "Put it into the Paper & Cardboard recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Emptying, squashing flat, and re-capping saves up to 75% volume in collection bins and keeps the bottle compact during transport to local flaking plants.",
          "Incorrect. Liquid inside bottles leaks onto other materials, adds unnecessary weight, and creates mould in storage.",
          "Incorrect. Modern recycling sorting lines can recover plastic caps when screwed onto the bottle; leaving bottles uncrushed wastes bin capacity.",
          "Incorrect. Plastic bottles do not belong in paper recycling."
        ],
        correctExplanation: "Emptying, squashing, and capping PET #1 bottles ensures efficient transport and clean local recycling in Mauritius.",
        incorrectExplanation: "Crushing and capping empty PET bottles is the proven industry standard for local plastic recycling.",
        practicalTakeaway: "Empty, squash flat, screw cap on, and place in the plastics bin.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "The canteen kitchen finishes a 1-litre opaque white plastic fresh milk container marked with Resin Code 2 (HDPE). Where does it belong?",
        options: [
          "Rinse out milk residue, recap, and place in the Clean Plastics recycling bin",
          "General Waste bin without checking",
          "Clean Paper & Cardboard recycling bin",
          "Throw it directly into the compost heap"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. HDPE (#2) is one of the highest-demand recycled plastics in Mauritius, transformed locally into drainage pipes, buckets, and crates once rinsed.",
          "Incorrect. HDPE is readily recyclable; throwing it in general waste wastes high-grade polymer resources.",
          "Incorrect. Plastic bottles must never be mixed with paper fibers.",
          "Incorrect. HDPE is a durable synthetic polymer that will not decompose in compost."
        ],
        correctExplanation: "Rinsed HDPE containers (Code 2) are high-value recyclables in Mauritius and should always be captured in plastics recycling.",
        incorrectExplanation: "Clean HDPE milk jugs are widely recycled locally and belong in the plastics stream after a quick rinse.",
        practicalTakeaway: "Give milk and juice jugs a quick rinse to eliminate dairy residue, then place them in the plastics recycling bin.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "You eat a bag of potato crisps. The wrapper has a shiny, metallic silver interior and colourful printed plastic on the outside. Where does it belong?",
        options: [
          "General Waste bin",
          "Plastic Bottles & Cans recycling bin (because of the aluminium sheen)",
          "Clean Paper recycling bin",
          "E-waste bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Crisp packets are made of metallised plastic laminate (fused layers of plastic film and vaporised aluminium) that cannot be separated locally; they are non-recyclable general waste.",
          "Incorrect. Crisp bags are not aluminium cans or rigid bottles; their flexible film wraps around sorting gears and contaminates container streams.",
          "Incorrect. Metallised film contains no paper fiber and will not pulp.",
          "Incorrect. Food snack wrappers are not electronic waste."
        ],
        correctExplanation: "Multi-layer metallised films cannot be recycled in Mauritius and must be placed in general waste.",
        incorrectExplanation: "Potato crisp packets are composite laminated plastics and cannot be processed by local recyclers.",
        practicalTakeaway: "Shiny snack wrappers and crisp packets belong in general waste; keep them out of recycling bins.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "Canteen sandwich deliveries arrive wrapped in thin, stretchy plastic cling wrap (LDPE/PVC film). The canteen has standard bins for 'Bottles & Cans' and 'General Waste'. Where should the dirty food cling film go?",
        options: [
          "General Waste bin",
          "Bottles & Cans recycling bin",
          "Clean Paper & Cardboard bin",
          "Leave it on the table"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Flexible thin film and cling wrap tangle sorting conveyor belts and cannot be processed in rigid bottle recycling streams; food-soiled film belongs in general waste.",
          "Incorrect. Thin cling films wrap around mechanical sorting screens, shutting down recycling sorting facilities.",
          "Incorrect. Plastic wrap is not paper.",
          "Incorrect. Leaving waste behind creates hygiene risks."
        ],
        correctExplanation: "Thin flexible plastic films are not accepted in rigid container recycling bins and belong in general waste.",
        incorrectExplanation: "Cling film causes severe jamming in mechanical sorting machinery and is not accepted in bottle streams.",
        practicalTakeaway: "Unless your site has a dedicated clean soft plastic baling stream, put sandwich wrap and cling film in general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "A plastic yoghurt tub is stamped with resin code 6 (PS - Polystyrene). The canteen recycling sign specifies 'Rigid Plastic Bottles Only (Codes 1 & 2)'. What should you do?",
        options: [
          "Follow the posted bin sign and put the yoghurt tub in General Waste, or ask the facility coordinator",
          "Ignore the sign and put it in the recycling bin because all plastics with arrow numbers are recyclable",
          "Burn the container to see if it melts",
          "Put it in the paper bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Always obey the workplace sign: having a resin number does not mean a material is recycled locally. Polystyrene (PS #6) has no commercial post-consumer recycling stream in Mauritius.",
          "Incorrect. The chasing arrows symbol indicates the resin type, not local recycling acceptance. Forcing non-accepted plastics into the bin creates contamination.",
          "Incorrect. Burning plastic is illegal and toxic.",
          "Incorrect. Plastic yoghurt pots do not belong in paper."
        ],
        correctExplanation: "Workplace bin instructions reflect local contractor contracts. Do not assume all numbered plastics are accepted locally.",
        incorrectExplanation: "Polystyrene (Code 6) is not accepted in Mauritian bottle recycling streams; always follow the posted bin guide.",
        practicalTakeaway: "The presence of a number symbol does not guarantee recyclability in Mauritius. When the sign says 'Bottles Only', respect the rule.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "An employee discards a 1.5L soft drink bottle that still contains 250ml of sugary cordial syrup into the plastic recycling collection bag. What happens downstream?",
        options: [
          "Sticky syrup leaks over crushed bottles, attracting insects, causing foul odours, and risking rejection of the entire bag by the recycler",
          "The syrup helps lubricate the recycling machines",
          "The collection truck drivers drink the leftover syrup",
          "Nothing, liquids evaporate instantly inside closed bags"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Sugary liquids rot, create severe pest infestations in storage bays, and can cause recyclers to reject the batch due to excessive contamination.",
          "Incorrect. Sugar residue gums up shredders, burns onto extruders, and causes machinery breakdowns.",
          "Incorrect. This is unsanitary and dangerous.",
          "Incorrect. Liquids inside sealed bags do not evaporate; they ferment and leak onto surrounding dry recyclables."
        ],
        correctExplanation: "Leftover sugary drinks ruin recycling operations. Emptying containers completely is a mandatory basic requirement.",
        incorrectExplanation: "Residual liquids ferment, attract pests, and degrade the quality of collected plastics.",
        practicalTakeaway: "Pour all liquid dregs into a sink or drain before putting bottles into recycling bins.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 4: Glass and Metal (West coast hotel after-service)
  // =========================================================================
  {
    order: 4,
    courseCode: "ELH-39",
    slug: "glass-and-metal",
    title: "Glass and Metal",
    scenario: "An after-service hotel beverage station at a resort on the West coast (Flic-en-Flac) handling returnable glass beer bottles, one-way wine bottles, broken drinking tumblers, and aluminium beverage cans.",
    learningObjective: "Safely segregate returnable deposit glass, one-way container glass, and scrap metals while preventing dangerous table glass and ceramic contamination.",
    workplaceActionTakeaway: "Separate deposit returnable beer bottles into their original crates and never mix broken table glassware into container glass recycling.",
    durationMinutes: 6,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "West Coast Beverage Station: Returnable vs One-Way Glass",
        durationMinutes: 2,
        content: "In Mauritius, glass management is divided into two distinct circular models: Returnable deposit bottles (such as 650ml Phoenix beer, Guinness, and Pearona bottles) which are washed and refilled up to 30 times by beverage manufacturers, and one-way glass bottles (wine and liquor) which are crushed into cullet for glass aggregate or remelting.",
        contentBlocks: [
          {
            type: "text",
            heading: "Returnables First: The Highest Circular Priority",
            body: "Reusing an intact glass bottle saves 95% more energy than melting it down into cullet. Returnable bottles must be kept whole, unchipped, and placed into supplier return crates."
          },
          {
            type: "callout",
            title: "Cullet vs Table Glass",
            body: "Container glass (bottles and jars) melts at standard furnace temperatures. Drinking glasses, Pyrex, and window glass contain lead, borosilicate, or chemical strengtheners that do not melt at the same temperature and will ruin glass furnaces."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Metal Recycling & Safety Protocols",
        durationMinutes: 2,
        content: "Aluminium beverage cans and steel food cans are infinitely recyclable without loss of quality. However, broken glassware and pressurized aerosol cans present sharp hazard and explosion risks that require strict handling protocols.",
        contentBlocks: [
          {
            type: "text",
            heading: "Handling Broken Glass Safely",
            body: "Broken drinking tumblers are hazardous waste for cleaning staff. Wrap broken pieces securely in thick paper or cardboard before placing in General Waste to prevent puncture wounds."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Crate Segregation Routine",
        durationMinutes: 2,
        content: "Train hotel service staff to return deposit bottles directly to supplier crates rather than tossing them into bulk skips.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to a glass and metal safety habit at work:",
            commitmentOptions: [
              { value: "return_deposit_crates", label: "Place all deposit returnable bottles into dedicated supplier crates" },
              { value: "wrap_broken_glass", label: "Safely wrap broken drinking glass before placing into general waste" },
              { value: "keep_cans_separate", label: "Collect aluminium beverage cans cleanly for 100% circular recycling" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "After evening dinner service, staff clear several standard brown 650ml Phoenix beer bottles marked with deposit notices. Where should they be placed?",
        options: [
          "In the Phoenix returnable beverage crate for commercial deposit refund and direct industrial wash-and-refill",
          "In the glass cullet crushing skip to be smashed into sand",
          "In the general waste compactor",
          "In the aluminium can bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Returnable beer bottles in Mauritius are part of a closed-loop deposit system; returning them whole in crates allows them to be washed and refilled up to 30 times.",
          "Incorrect. Smashing returnable deposit bottles destroys high-value refillable inventory and wastes energy.",
          "Incorrect. Throwing refillable bottles into general waste loses the company deposit and burdens landfills.",
          "Incorrect. Glass bottles must never be mixed into aluminium can bins."
        ],
        correctExplanation: "Deposit returnable bottles should always be kept intact and returned in crates for industrial refilling.",
        incorrectExplanation: "Refillable glass bottles must be preserved intact for supplier crate collection, not crushed.",
        practicalTakeaway: "Always separate returnable deposit bottles into their dedicated vendor crates.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "A bartender finishes an imported green glass wine bottle with no returnable deposit stamp. Where should this bottle be placed?",
        options: [
          "Empty, remove the cork/screwcap, and place in the container glass recycling bin",
          "General waste bin",
          "Plastic bottle bin",
          "Cardboard baling press"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. One-way non-returnable glass bottles should be emptied and placed in the glass container stream for crushing into cullet or aggregate.",
          "Incorrect. Clean container glass is 100% recyclable in Mauritius (e.g. Plankton / local cullet collection); landfilling it is unnecessary.",
          "Incorrect. Glass is not plastic.",
          "Incorrect. Putting glass into a cardboard baler is extremely dangerous and destroys the baling machine."
        ],
        correctExplanation: "One-way wine and spirit bottles belong in the container glass recycling stream for cullet processing.",
        incorrectExplanation: "Clean glass bottles should be recycled in designated glass bins rather than landfilled.",
        practicalTakeaway: "Empty wine bottles completely, remove synthetic corks, and place them in the container glass bin.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "A guest finishes a cold canned soft drink by the resort pool. The aluminium can is empty. Where should it go?",
        options: [
          "Clean Metals / Aluminium Cans recycling bin",
          "General Waste bin",
          "Glass bottle bin",
          "Organic compost bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Aluminium cans are among the most energy-efficient materials to recycle, saving 95% of the energy needed to produce virgin aluminium.",
          "Incorrect. Aluminium cans are valuable commodities; sending them to Mare Chicose landfill wastes finite resources.",
          "Incorrect. Cans should not be mixed into glass bins.",
          "Incorrect. Metal does not decompose in compost."
        ],
        correctExplanation: "Aluminium beverage cans belong in the metals/cans recycling stream for closed-loop remelting.",
        incorrectExplanation: "Aluminium is infinitely recyclable; always separate clean beverage cans from general trash.",
        practicalTakeaway: "Drain and recycle aluminium cans in the designated metal stream.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "A waiter accidentally drops a tempered glass drinking tumbler on the floor, shattering it into pieces. Where should the broken tumbler be disposed of?",
        options: [
          "Wrap the fragments safely in paper or cardboard and place in General Waste",
          "Toss the broken pieces into the glass bottle recycling bin",
          "Throw it loose into the plastic bag",
          "Flush it down the staff washroom toilet"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Drinking glasses, crystal, and cookware have different melting temperatures and chemical additives that ruin bottle glass kilns. Wrapping them prevents injury to cleaning crews.",
          "Incorrect. Drinking glassware is a major contaminant in container glass recycling and causes structural flaws in newly blown bottles.",
          "Incorrect. Loose broken glass in plastic bags pierces bags and severely injures waste handlers.",
          "Incorrect. Flushing glass damages plumbing and sewer pumps."
        ],
        correctExplanation: "Broken drinking glassware must never be mixed with bottle glass; wrap it securely and dispose of it in general waste.",
        incorrectExplanation: "Tableware glass has a different melting point than container bottles and ruins recycling furnaces.",
        practicalTakeaway: "Never mix broken tumblers, window glass, or Pyrex into bottle recycling. Wrap securely and place in general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "You find an unmarked metal aerosol spray can from housekeeping air freshener that feels slightly heavy and may still contain residual propellant gas. What is the correct procedure?",
        options: [
          "Check the site chemical safety guide or ask facilities; pressurized aerosols must never be put into scrap metal balers or compactors due to explosion risks",
          "Puncture the can with a screwdriver to see if it is empty",
          "Toss it into the scrap metal compactor immediately",
          "Throw it into the staff braai or kitchen grill"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Pressurized aerosol cans can explode violently under compaction or heat; facilities staff must verify depressurisation before scrap metal recycling.",
          "Incorrect. Puncturing pressurized cans manually risks eye injury, fire, and toxic chemical exposure.",
          "Incorrect. Compacting pressurized aerosols can trigger fires or explosions in waste compactors.",
          "Incorrect. Exposing aerosol cans to open flames causes severe explosions."
        ],
        correctExplanation: "Aerosols must be completely depressurized before metal recycling. Check safety guides or consult facilities.",
        incorrectExplanation: "Residual propellant poses an explosion hazard in metal compactors and baling equipment.",
        practicalTakeaway: "Always treat pressurized metal cans with caution; consult your facilities department for disposal of non-empty aerosols.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "A staff member throws a broken ceramic coffee mug into the glass bottle recycling skip. What catastrophic problem does ceramic contamination cause in glass reprocessing?",
        options: [
          "Ceramics do not melt at the furnace temperature of glass, forming solid defects ('stones') that cause newly blown glass bottles to crack or explode",
          "Ceramics make the glass turn into sand immediately",
          "Ceramics attract sharks if the glass is used near the coast",
          "Ceramics cause the recycling truck to lose its brakes"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Ceramics have a much higher melting point than soda-lime container glass. Unmelted ceramic specks ('stones') weaken the structural integrity of new bottles, causing them to shatter under pressure.",
          "Incorrect. Ceramics do not turn glass into sand.",
          "Incorrect. This is entirely unfounded.",
          "Incorrect. This has no relation to vehicle braking systems."
        ],
        correctExplanation: "Ceramics do not melt in glass furnaces and create weak spots that cause new bottles to fail and explode.",
        incorrectExplanation: "Even microscopic ceramic particles contaminate glass melting furnaces and cause rejected glass batches.",
        practicalTakeaway: "Never mix ceramics, porcelain, earthenware, or Pyrex into glass bottle recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 5: Food Scraps and Soiled Packaging (Hotel buffet)
  // =========================================================================
  {
    order: 5,
    courseCode: "ELH-40",
    slug: "food-scraps-and-soiled-packaging",
    title: "Food Scraps and Soiled Packaging",
    scenario: "A hotel buffet kitchen in Grand Baie clearing breakfast platters, separating edible surplus, vegetable preparation trimmings, fruit rinds, and oily paper tray liners using on-site composting / farm pig-swill options.",
    learningObjective: "Divert organic food waste to local composting or registered agricultural partners while strictly excluding plastics, toothpicks, and foil wrappers.",
    workplaceActionTakeaway: "Scrape plates thoroughly into the designated organic bin and inspect platters to remove toothpicks, butter packets, and plastic wrap first.",
    durationMinutes: 7,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Grand Baie Hotel Kitchen: The Organics Challenge",
        durationMinutes: 2,
        content: "Food waste makes up over 50% of municipal waste heading to Mare Chicose landfill, where it rots anaerobically to produce methane (a greenhouse gas 28 times more potent than CO2). Our resort in Grand Baie partners with a registered local farm and on-site composters to divert clean organic trimmings.",
        contentBlocks: [
          {
            type: "text",
            heading: "Two Streams of Food Waste",
            body: "• Clean Plant Trimmings: Fruit peels, vegetable off-cuts, and coffee grounds (ideal for aerobic composting).\n• Cooked Plate Scrapings: Leftovers with meat, sauces, or dairy (directed to licensed animal feed or specialized bio-digesters where approved)."
          },
          {
            type: "callout",
            title: "Zero Tolerance for Packaging",
            body: "A single plastic sauce packet, toothpick, or foil butter lid in an organic bin can poison farm animals or turn organic compost into microplastic-contaminated soil."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Pre-Scrape Inspection and Contamination Traps",
        durationMinutes: 2,
        content: "Kitchen stewards must visually inspect platters before scraping. Non-food items commonly left on hotel buffet platters include cocktail toothpicks, single-use plastic butter tubs, paper napkins, and plastic garnish swords.",
        contentBlocks: [
          {
            type: "text",
            heading: "The 3-Second Visual Sweep",
            body: "1. Pluck out toothpicks and plastic garnishes.\n2. Peel off foil lids and butter wrappers.\n3. Scrape remaining food cleanly into the organic bucket."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Kitchen Clearing Routine",
        durationMinutes: 3,
        content: "Implement a standardized plate-clearing station where stewards remove non-food contaminants before scraping organics.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to an organic waste practice for your workplace kitchen:",
            commitmentOptions: [
              { value: "pre_scrape_inspection", label: "Perform a visual check to remove toothpicks and plastics before scraping" },
              { value: "divert_coffee_grounds", label: "Collect 100% of coffee grounds and raw fruit peels for site composting" },
              { value: "report_organics_contamination", label: "Stop and remove plastic wrap immediately if spotted in food bins" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "During morning buffet prep in Grand Baie, the chef produces 10kg of raw pineapple skins, melon rinds, and vegetable peelings. Where should this clean organic material be placed?",
        options: [
          "In the clean kitchen organic/composting bin",
          "In the general waste compactor heading to Mare Chicose",
          "In the dry cardboard recycling bin",
          "Down the floor drainage trench"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Raw fruit rinds and vegetable trimmings are prime compost feedstock with high moisture and nutrient balance.",
          "Incorrect. Sending clean raw food prep waste to Mare Chicose creates methane gas and wastes valuable soil nutrients.",
          "Incorrect. Wet food peels will ruin dry cardboard recycling.",
          "Incorrect. Dumping solid food trimmings down floor drains causes pipe blockages, grease trap overload, and pest infestations."
        ],
        correctExplanation: "Raw fruit and vegetable prep trimmings belong in clean composting or farm feed streams.",
        incorrectExplanation: "Clean fruit and vegetable waste should be diverted to composting, not landfilled or flushed into drains.",
        practicalTakeaway: "Collect raw kitchen prep trimmings cleanly in dedicated organic buckets.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "Guest buffet plates return with cooked chicken bones, fish carcasses, and creamy curry sauce. The hotel uses a basic open-windrow compost pile on site. What is the correct handling according to standard hotel protocol?",
        options: [
          "Check site organic protocol: basic open compost piles cannot accept meat/bones due to rodent attraction; send to registered animal feed partners or general waste",
          "Dump all meat and bones into the open garden compost pile without restriction",
          "Mix meat with clean office paper",
          "Hide meat bones in the plastic bottle bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Basic open compost piles cannot handle meat, bones, and oils without attracting rats, stray dogs, and flies. Follow site protocol for registered livestock collection or general waste.",
          "Incorrect. Open compost piles contaminated with meat scraps become severe health and rodent hazards.",
          "Incorrect. Meat bones must never be mixed with paper.",
          "Incorrect. Meat scraps in plastic recycling bins cause severe hygiene contamination."
        ],
        correctExplanation: "Meat and dairy scraps attract vermin in open compost heaps. Follow your site guide for specialized animal feed or enclosed digesters.",
        incorrectExplanation: "Standard open composting cannot process meat and bone scraps safely; verify your site's specific organic handling partner.",
        practicalTakeaway: "Know your site's compost system limits: raw plant waste is universally compostable, but meat and dairy require specific handling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "A clearing tray arrives with leftover fruit pieces alongside wooden toothpicks, small plastic jam tubs, and foil butter lids. What must the steward do?",
        options: [
          "Remove the toothpicks, plastic tubs, and foil lids into General Waste, then scrape only the fruit into the organic bin",
          "Dump the entire plate including plastics and toothpicks into the organic bin",
          "Throw the entire plate into the paper bin",
          "Wash the toothpicks and reuse them"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Stewards must pluck out packaging and sharp toothpicks before scraping food waste into organic collection streams.",
          "Incorrect. Plastic tubs and foil lids contaminate compost and poison animals if food waste is sent to local farms.",
          "Incorrect. Food plates must never be dumped into paper recycling.",
          "Incorrect. Reusing single-use toothpicks is a severe hygiene violation."
        ],
        correctExplanation: "Never allow plastic packets, foil lids, or toothpicks to enter organic food waste streams.",
        incorrectExplanation: "Packaging contaminants in food waste ruin compost and pose fatal hazards to livestock.",
        practicalTakeaway: "Pluck out non-food items before scraping plates: 100% pure organics is the golden rule.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "Unbleached brown kraft paper napkins were used to line bread baskets. They contain only bread crumbs and dry crumbs, with no greasy butter. Where can they go?",
        options: [
          "Composting bin (shredded as carbon 'browns') or general waste",
          "Clean Plastic Bottle bin",
          "Glass recycling skip",
          "Hazardous waste container"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Unbleached, unprinted kraft paper napkins with minor food crumbs break down quickly and provide valuable carbon ('browns') for composting.",
          "Incorrect. Paper napkins are not plastics.",
          "Incorrect. Paper napkins do not belong with glass.",
          "Incorrect. Bread basket napkins are non-hazardous."
        ],
        correctExplanation: "Clean unbleached kraft napkins can be composted as carbon material or discarded in general waste.",
        incorrectExplanation: "Plain brown napkins decompose easily in compost heaps when free of synthetic coatings.",
        practicalTakeaway: "Unbleached plain paper napkins can enrich organic compost piles when free of heavy animal fats.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "A delivery of catering lunch boxes is stamped 'OK Compost HOME'. Does your hotel's standard organic collection automatically accept them?",
        options: [
          "Verify with the hotel compost manager or service partner first; many local farms and compost piles only accept pure food scraps because compostable packaging degrades slowly",
          "Assume that all items stamped compostable break down overnight in any bin",
          "Throw them in the plastic bottle recycling bin",
          "Throw them in the glass recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Always verify with your facility operator: compostable certified packaging often requires specific moisture and heat conditions and is rejected by farm swill collectors.",
          "Incorrect. 'Compostable' packaging does not break down overnight and can persist for months in basic piles, causing farmers to reject deliveries.",
          "Incorrect. Compostable packaging is not recyclable in plastic bottle streams.",
          "Incorrect. Packaging does not belong in glass bins."
        ],
        correctExplanation: "Certified compostable packaging is not accepted by all organic collectors in Mauritius. Always check your facility's acceptance rules.",
        incorrectExplanation: "Do not assume compostable packaging is accepted in standard food waste streams without confirmation from the operator.",
        practicalTakeaway: "Check with your site's compost partner before adding compostable bioplastics or fiber boxes to food waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "A kitchen steward accidentally drops plastic cling wrap and a metal soup spoon into an organic food waste bin destined for a local registered pig farm. What are the severe downstream consequences?",
        options: [
          "The plastic can cause fatal intestinal blockage in livestock, while the metal spoon can damage industrial feed grinders or injure animals",
          "The pig farm will turn the spoon into animal feed",
          "The plastic cling film will dissolve safely in animal stomachs",
          "No consequence because farms do not inspect feed"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Plastic wrap causes fatal impaction in animals, and metal objects break machinery and cause severe mouth and digestive trauma to livestock.",
          "Incorrect. Metal spoons cannot be digested and cause serious injury.",
          "Incorrect. Plastic cling wrap never dissolves in digestive tracts; it creates fatal obstructions.",
          "Incorrect. Farms perform rigorous checks and will terminate waste contracts if contamination occurs."
        ],
        correctExplanation: "Physical contamination in food waste creates life-threatening risks for livestock and destroys farm partnership agreements.",
        incorrectExplanation: "Plastics and metals in animal feed streams cause fatal injuries and lead to immediate contract termination.",
        practicalTakeaway: "Treat organic bins with the same discipline as food preparation: zero non-food items allowed.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 6: Batteries, Bulbs and Small Electronics (Office clear-out)
  // =========================================================================
  {
    order: 6,
    courseCode: "ELH-41",
    slug: "batteries-bulbs-and-small-electronics",
    title: "Batteries, Bulbs and Small Electronics",
    scenario: "An office clear-out at a technology company in Bagatelle dealing with depleted alkaline batteries, a swollen lithium laptop battery, spent fluorescent lighting tubes, and broken USB charging cables.",
    learningObjective: "Safely handle hazardous workplace e-waste, lithium battery fire hazards, and mercury-containing lamps using designated Mauritian drop-off and recycling channels.",
    workplaceActionTakeaway: "Set up a dedicated e-waste collection box at your office reception or IT store and tape the terminals of all lithium batteries.",
    durationMinutes: 7,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Bagatelle Office Clear-Out: Hazardous Workplace Waste",
        durationMinutes: 2,
        content: "Electronic waste (WEEE), batteries, and lighting tubes contain heavy metals (lead, mercury, cadmium) and volatile chemicals. Under Mauritian environmental regulations, commercial enterprises are prohibited from dumping hazardous electronics into municipal general waste bins heading to Mare Chicose.",
        contentBlocks: [
          {
            type: "text",
            heading: "Certified E-Waste Take-Back in Mauritius",
            body: "Authorized recyclers (including Brikole, Polygreen, WeCycle, and DKD) process electronic scrap to recover copper, gold, and aluminium. Certified drop-off bins are also available at major retail hubs e.g. Bagatelle Mall, Super U, and municipal civic amenity sites."
          },
          {
            type: "callout",
            title: "Lithium-Ion Fire Hazard",
            body: "Lithium batteries store intense chemical energy. When crushed in garbage trucks or punctured at landfills, damaged lithium batteries ignite violently and cause uncontrollable toxic landfill fires."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Battery Terminal Taping & Fluorescent Tube Handling",
        durationMinutes: 2,
        content: "Alkaline batteries, button cells, and lithium batteries must have their positive and negative terminals covered with non-conductive electrical tape before deposit. Fluorescent lamps contain toxic mercury vapor and must be stored intact without breakage.",
        contentBlocks: [
          {
            type: "text",
            heading: "Three Critical Safety Steps",
            body: "1. Tape battery terminals with clear or electrical tape to prevent short circuits.\n2. Store spent fluorescent tubes in their original cardboard sleeves.\n3. Keep swollen batteries in an insulated, non-flammable container away from heat."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Office E-Waste Box Setup",
        durationMinutes: 3,
        content: "Designate a safe, labeled container in your IT storage or supply room for small electronic peripherals, cables, and batteries.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to a hazardous waste practice in your office:",
            commitmentOptions: [
              { value: "tape_battery_terminals", label: "Tape the terminals of all used lithium and 9V batteries before disposal" },
              { value: "separate_ewaste_box", label: "Establish a dedicated e-waste collection box for spent cables and devices" },
              { value: "safe_tube_storage", label: "Store spent fluorescent lighting tubes intact in protective sleeves" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "During an office drawer clean-out in Bagatelle, you gather 6 depleted AA alkaline batteries from wireless mouse units. Where should they be placed?",
        options: [
          "In the dedicated workplace battery collection box (or supermarket battery drop box e.g. Bagatelle collection point)",
          "In the General Waste bin with office dustbin bags",
          "In the Clean Plastic Bottles & Cans recycling bin",
          "In the paper recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Spent batteries must be diverted to specialized battery collection boxes for safe neutralizing and heavy metal extraction.",
          "Incorrect. Batteries placed in general waste end up at Mare Chicose landfill where heavy metals corrode and leach into groundwater.",
          "Incorrect. Batteries are hazardous e-waste, not container plastics or aluminium cans.",
          "Incorrect. Batteries pose severe fire risks in paper recycling pulpers."
        ],
        correctExplanation: "Used batteries belong in designated battery drop-off bins, never in general municipal waste or standard recycling.",
        incorrectExplanation: "Batteries contain toxic heavy metals and must be collected through dedicated hazardous waste collection points.",
        practicalTakeaway: "Collect spent batteries in a small container and drop them into an authorized battery collection box.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "An old corporate laptop has a visibly swollen, puffy lithium-ion battery that has expanded the casing. What is the immediate safety and sorting procedure?",
        options: [
          "High fire hazard: isolate the device, tape exposed contacts with insulating tape, store in a fire-safe non-conductive container, and contact health & safety/IT immediately",
          "Throw it forcefully into the metal recycling skip",
          "Puncture the puffy pouch with a pin to release the gas",
          "Put it in the kitchen microwave to discharge it"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Swollen lithium batteries are in thermal runaway danger and can spontaneously ignite; isolating them in a cool, non-combustible space with taped terminals is the mandatory safety protocol.",
          "Incorrect. Compacting or dropping swollen lithium batteries triggers immediate violent explosions and metal fires.",
          "Incorrect. Piercing a swollen battery releases toxic hydrogen fluoride gas and immediately sparks a fiery chemical explosion.",
          "Incorrect. Microwaving a lithium battery will cause an instant catastrophic explosion."
        ],
        correctExplanation: "Swollen lithium batteries are severe fire hazards; isolate them in non-flammable containers and escalate to health & safety.",
        incorrectExplanation: "Never crush, puncture, or landfill swollen batteries; handle with extreme caution under hazardous waste protocols.",
        practicalTakeaway: "Treat swollen batteries as hazardous fire risks: isolate immediately, tape terminals, and alert IT/safety officers.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "Staff find a tangle of broken smartphone charging cables, defunct USB hubs, and frayed power cords. Where should these items be sorted?",
        options: [
          "In the workplace Small WEEE (Waste Electrical & Electronic Equipment) collection box",
          "In the Clean Dry Paper & Cardboard bin",
          "In the General Waste compactor",
          "In the food compost bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Cables contain high-purity copper and recyclable PVC/TPE coatings that are stripped and granulated by certified Mauritian e-waste recyclers.",
          "Incorrect. Cables contain copper wire and synthetic polymers, not paper fiber.",
          "Incorrect. Landfilling electrical cords wastes valuable copper and contributes to landfill volume.",
          "Incorrect. Electronics do not decompose in compost."
        ],
        correctExplanation: "Cables and small electronic accessories belong in electronic waste collection for copper recovery.",
        incorrectExplanation: "Copper cables are valuable electronic scrap and should be recycled via designated e-waste drop points.",
        practicalTakeaway: "Save old cables, adapters, and chargers for your company's periodic e-waste collection drive.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "A facilities technician replaces two 4-foot fluorescent lighting tubes in the office hallway. How must the spent tubes be handled?",
        options: [
          "Store them intact inside protective cardboard sleeves in the hazardous lamp collection area; never crush or smash them",
          "Smash them into the glass bottle skip to save space",
          "Throw them into the general waste dumpster",
          "Leave them loose on the floor"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Fluorescent tubes contain toxic mercury vapour; storing them unbroken inside sleeves ensures safe handling by certified hazardous waste contractors.",
          "Incorrect. Smashing tubes releases neurotoxic mercury vapour into the air and ruins bottle glass recycling.",
          "Incorrect. Mercury tubes in general waste contaminate landfill soil and groundwater.",
          "Incorrect. Loose tubes roll and shatter easily, posing immediate respiratory and laceration risks."
        ],
        correctExplanation: "Fluorescent tubes contain toxic mercury vapour and must be stored intact in protective packaging for hazardous waste collection.",
        incorrectExplanation: "Never break or crush fluorescent tubes; mercury vapour is hazardous to inhale and contaminates facilities.",
        practicalTakeaway: "Keep spent fluorescent tubes intact in cardboard sleeves and hand over to certified hazardous waste recyclers.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "An office is retiring an old desktop inkjet printer that still contains ink cartridges. You are unsure whether the cartridges can stay inside or must be removed before e-waste collection. What should you do?",
        options: [
          "Consult your company's e-waste procedure or printer take-back guidelines; ink and toner cartridges should be removed for dedicated cartridge recycling rather than crushed with scrap",
          "Throw the entire printer into the general waste skip with cartridges inside",
          "Pour the liquid ink down the washroom sink",
          "Smash the printer with a hammer to get the plastic parts out"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Checking the workplace procedure ensures ink cartridges are removed for closed-loop cartridge refilling/recycling programs (e.g. OEM take-back), preventing liquid ink leaks during e-waste shredding.",
          "Incorrect. Landfilling complete printers violates commercial hazardous waste rules.",
          "Incorrect. Pouring concentrated chemical ink pigments into drains contaminates wastewater and municipal sewers.",
          "Incorrect. Smashing printers creates sharp plastic debris and toner powder hazards."
        ],
        correctExplanation: "Check workplace instructions: cartridges should be removed and returned through specialized cartridge return schemes.",
        incorrectExplanation: "Ink and toner cartridges should be separated from e-waste frames to avoid chemical spills during recycling.",
        practicalTakeaway: "Remove ink and toner cartridges before recycling printers, and return them via certified cartridge take-back boxes.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "Someone tosses three small lithium button-cell batteries into an office general waste bin heading to Mare Chicose landfill. Why is this action critically dangerous?",
        options: [
          "Compacted lithium batteries short-circuit and ignite, sparking toxic landfill fires that release heavy metals into the air and groundwater",
          "Button batteries attract wild animals to the landfill",
          "Button batteries make the landfill too light and float away",
          "The batteries will turn general waste into gold"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Damaged lithium batteries are the primary cause of waste truck and landfill fires in modern waste management, releasing toxic heavy metals into the environment.",
          "Incorrect. Animals are not attracted to lithium cells; the threat is combustion and toxic heavy metal leaching.",
          "Incorrect. This is completely baseless.",
          "Incorrect. This is fantasy."
        ],
        correctExplanation: "Lithium batteries cause dangerous fires when compressed in garbage trucks or landfills and must never enter general waste.",
        incorrectExplanation: "Lithium cells trigger landfill fires and release toxic chemicals; they must always be collected in dedicated battery bins.",
        practicalTakeaway: "Never dispose of any battery in general waste: use your workplace battery collection container.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 7: Tricky Takeaway Packaging (Team lunch)
  // =========================================================================
  {
    order: 7,
    courseCode: "ELH-42",
    slug: "tricky-takeaway-packaging",
    title: "Tricky Takeaway Packaging",
    scenario: "A Friday team lunch at an office in Port Louis with hot tea paper cups, plastic-lined cardboard containers, expanded polystyrene (styrofoam) burger boxes, clear plastic sushi trays, and wooden chopsticks.",
    learningObjective: "Identify deceptive hybrid packaging, recognize hidden plastic barrier linings, and prevent grease-soiled takeaway containers from spoiling clean recycling streams.",
    workplaceActionTakeaway: "Bring your own reusable mug and lunch container for takeaway meals to eliminate single-use hybrid packaging entirely.",
    durationMinutes: 7,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Port Louis Lunch: The Hybrid Packaging Trap",
        durationMinutes: 2,
        content: "Takeaway food packaging looks like paper, but paper alone cannot hold hot broth, curries, or greasy noodles without leaking. Manufacturers fuse a microscopic layer of polyethylene (PE) or wax to the interior of paper cups and boxes, creating hybrid packaging that standard paper recycling cannot process.",
        contentBlocks: [
          {
            type: "text",
            heading: "Deceptive Takeaway Materials",
            body: "• Paper Coffee & Tea Cups: 95% paper bonded with 5% waterproof polyethylene film (cannot be repulped in normal paper mills).\n• Styrofoam Clamshells (Expanded Polystyrene): Fragile, grease-absorbing, and non-recyclable locally.\n• Foil Takeaway Trays: Highly recyclable aluminium, but only when food oils and sauce are completely cleaned off."
          },
          {
            type: "callout",
            title: "The Tear Test",
            body: "To check if paper packaging has a plastic barrier, tear the edge slowly. If you see a clear plastic film stretching across the tear, the item is lined with plastic and cannot go into plain paper recycling."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Food Residue on Metal and Rigid Plastics",
        durationMinutes: 2,
        content: "Aluminium foil containers and clear plastic sushi trays are recyclable only when wiped or rinsed clean. Rancid curry oil, chili paste, and mayonnaise residues cause recycling depots to reject containers immediately.",
        contentBlocks: [
          {
            type: "text",
            heading: "Takeaway Cleaning Rules",
            body: "1. Empty all food leftovers into general waste or compost.\n2. Wipe or rinse grease from foil trays.\n3. If heavily coated with baked-on oil that cannot be cleaned, discard in General Waste."
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Reusable Lunch Campaign",
        durationMinutes: 3,
        content: "The most sustainable takeaway meal is the one with zero single-use packaging. Keep a reusable container and coffee cup at your desk.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to a takeaway packaging habit at work:",
            commitmentOptions: [
              { value: "reusable_mug", label: "Use a personal ceramic or stainless steel mug for all takeaway coffee and tea" },
              { value: "tear_test_verification", label: "Perform the tear test to identify hidden plastic linings before recycling" },
              { value: "clean_foil_trays", label: "Wipe or rinse aluminium foil food containers before placing into metal recycling" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "You buy a hot takeaway tea in a single-use paper cup. The cup has an internal waterproof polyethylene plastic lining to prevent leaks. Where does the cup body belong?",
        options: [
          "General Waste bin (unless your building has a specialized poly-coat cup recycling service)",
          "Clean Paper & Cardboard recycling bin",
          "Plastic Bottle recycling bin",
          "Glass recycling skip"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Standard single-use coffee and tea cups have bonded plastic linings that do not separate in normal paper recycling; they belong in general waste.",
          "Incorrect. Coffee cups in paper recycling do not dissolve in water hydropulpers; the plastic film clogs paper screens and causes rejected bales.",
          "Incorrect. The cup is 90%+ paper fiber and will ruin plastic bottle recycling.",
          "Incorrect. Paper cups never belong in glass skips."
        ],
        correctExplanation: "Plastic-lined paper takeaway cups cannot be processed in standard paper recycling mills and must go to general waste.",
        incorrectExplanation: "The bonded polyethylene liner prevents paper pulping; coffee cups belong in general waste unless specialized cup recycling is available.",
        practicalTakeaway: "Place disposable takeaway cups in general waste, and switch to a reusable travel mug for daily office drinks.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "The hot tea cup had a white plastic lid marked with plastic code 6 (PS - Polystyrene). The lid is clean and dry. Your office bin sign specifies 'Bottles Only (PET #1 & HDPE #2)'. Where should the lid go?",
        options: [
          "General Waste bin (to follow site rules and avoid contaminating the bottle stream)",
          "Plastic Bottle bin (because plastic is plastic)",
          "Paper recycling bin",
          "Leave it on the kitchenette counter"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Coffee cup lids made of polystyrene #6 are not accepted in Mauritian bottle collection streams; throwing them in bottle bins contaminates the recycling stream.",
          "Incorrect. The site instructions specify bottles only; mixing polystyrene lids with PET bottles degrades the plastic flaking quality.",
          "Incorrect. Plastic lids never belong in paper recycling.",
          "Incorrect. Leaving trash on counters creates clutter and hygiene issues."
        ],
        correctExplanation: "Coffee lids (PS #6) are not recyclable in bottle streams. Follow your site's bin rules and discard them in general waste.",
        incorrectExplanation: "Polystyrene lids contaminate bottle recycling lines; obey your site's specific accepted materials list.",
        practicalTakeaway: "Keep coffee cup lids out of bottle recycling bins unless your facility explicitly accepts mixed rigid plastics.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "A takeaway burger arrived in an expanded polystyrene (white styrofoam) clamshell box. The box has ketchup and burger grease smeared inside. Where does it belong?",
        options: [
          "General Waste bin",
          "Clean Paper & Cardboard recycling bin",
          "Clean Plastic Bottle bin",
          "Compost bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Food-soiled expanded polystyrene has no commercial post-consumer recycling in Mauritius and breaks into microplastic pellets; it belongs in general waste.",
          "Incorrect. Styrofoam is expanded synthetic polystyrene, not paper.",
          "Incorrect. Food-stained styrofoam clamshells severely contaminate bottle recycling bins.",
          "Incorrect. Polystyrene is synthetic plastic that never decomposes in compost."
        ],
        correctExplanation: "Styrofoam food packaging is not recyclable locally once soiled with grease and must go into general waste.",
        incorrectExplanation: "Soiled styrofoam has no recycling stream in Mauritius and belongs in general waste.",
        practicalTakeaway: "Put styrofoam food clamshells in general waste and encourage your favourite food vendors to use sustainable alternatives.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "A team member uses clean, plain wooden chopsticks for their noodle dish. Where should the used wooden chopsticks be placed?",
        options: [
          "General Waste bin (or site organic compost if untreated wood)",
          "Clean Dry Paper & Cardboard recycling bin",
          "Clean Plastic Bottle bin",
          "Metal recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Solid wood and bamboo chopsticks cannot be processed into paper pulp and belong in general waste or organic compost if chemical-free.",
          "Incorrect. Solid bamboo sticks do not break down in paper hydropulpers and jam paper processing machinery.",
          "Incorrect. Wood is not plastic.",
          "Incorrect. Wood is not metal."
        ],
        correctExplanation: "Solid wooden cutlery and chopsticks cannot be recycled in paper or plastic streams; dispose in general waste or composting.",
        incorrectExplanation: "Wood items jam paper pulpers and must never be placed in paper recycling bins.",
        practicalTakeaway: "Place wooden and bamboo utensils in general waste or organic compost, never in paper recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "You receive a cardboard takeaway noodle box with a matte exterior that looks like plain paper, but holds hot oily soup without leaking. How can you verify whether it has a hidden plastic lining before recycling?",
        options: [
          "Perform the tear test: tear the paper edge slowly; if a transparent plastic film stretches across the tear, it has a laminated barrier and cannot be recycled with plain paper",
          "Assume that all brown cardboard boxes can be recycled regardless of soup or oil",
          "Soak the box in a bucket of cold water for 3 hours",
          "Set the box on fire to see if it smells like plastic"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. The tear test is the industry standard frontline test: tearing the rim reveals whether an invisible plastic barrier film exists.",
          "Incorrect. If a box holds liquid without leaking, it almost certainly has an internal plastic or wax barrier.",
          "Incorrect. Soaking boxes in water creates unnecessary mess and ruins fiber structure.",
          "Incorrect. Burning waste is dangerous, hazardous, and illegal."
        ],
        correctExplanation: "The tear test quickly exposes hidden plastic liners. If film stretches at the tear, the box cannot go into plain paper recycling.",
        incorrectExplanation: "Never assume leak-proof food boxes are plain paper; the tear test confirms whether a plastic barrier is present.",
        practicalTakeaway: "Tear the edge: if a stretchy plastic layer appears, put the box in general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "A lunch party discards heavy aluminium foil takeaway trays containing half-eaten briani rice and thick curry sauce directly into the metal recycling bin. What is the impact?",
        options: [
          "Food grease and rice rot in the bin, generating foul odours, attracting insects, and causing the recycler to reject the contaminated metal batch",
          "The curry spices improve the melting point of aluminium",
          "The briani grease makes the aluminium shiny and clean",
          "No impact because food grease evaporates during transport"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Food residue in metal recycling creates severe pest infestations, odors, and causes collectors to dump the whole bin into the landfill as rejected waste.",
          "Incorrect. Food grease produces carbon impurities and toxic smoke during metal remelting.",
          "Incorrect. Food residue corrodes and soils scrap metal.",
          "Incorrect. Food residue does not evaporate; it rots and attracts vermin."
        ],
        correctExplanation: "Food-encrusted aluminium trays cannot be recycled and spoil clean metals. They must be wiped clean or discarded in general waste.",
        incorrectExplanation: "Food residue ruins metal recycling batches and causes collection skips to be diverted to landfill.",
        practicalTakeaway: "Scrape all food and give foil containers a quick wipe or rinse before recycling; if encrusted with grease, put in general waste.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  },

  // =========================================================================
  // Challenge 8: The Final Sorting Challenge (Company event clean-up)
  // =========================================================================
  {
    order: 8,
    courseCode: "ELH-43",
    slug: "the-final-sorting-challenge",
    title: "The Final Sorting Challenge",
    scenario: "Clean-up after a 100-person corporate anniversary cocktail event at a business centre in Moka. Four multi-stream sorting bins were set up, but guests have mixed up several items. The learner acts as sorting auditor before collection trucks arrive.",
    learningObjective: "Conduct a systematic visual sorting audit of a multi-stream workplace waste station, identify cross-contamination errors, and implement decisive corrective actions before collection.",
    workplaceActionTakeaway: "Conduct a 2-minute visual check of your workplace bins each morning and share one friendly sorting correction tip with your team.",
    durationMinutes: 8,
    isFreeEntry: false,
    lessons: [
      {
        orderIndex: 0,
        title: "Moka Event Clean-Up: The Pre-Collection Audit",
        durationMinutes: 3,
        content: "After a 100-person corporate cocktail event in Moka, the venue has four streams: [1. Clean Paper & Cardboard], [2. Plastics & Cans], [3. Glass Bottles], and [4. General Waste]. Before the recycling contractor (Recyclean) arrives for morning pickup, you perform a 5-minute visual audit to correct guest errors and rescue misallocated recyclables.",
        contentBlocks: [
          {
            type: "text",
            heading: "The Auditor Mindset",
            body: "A successful recycling program depends on the final pre-collection audit. In Mauritius, commercial collection contracts allow a maximum contamination threshold (typically 5–10%). Exceeding this threshold results in contamination penalty fines or the entire truckload being diverted directly to Mare Chicose landfill."
          },
          {
            type: "callout",
            title: "Safety First During Audits",
            body: "Always wear protective gloves when inspecting bins. Never push down on waste with your bare hands, as concealed broken glass or cocktail skewers can cause serious puncture wounds."
          }
        ]
      },
      {
        orderIndex: 1,
        title: "Audit Checklist: Inspecting the 4 Streams",
        durationMinutes: 2,
        content: "Inspect each bin systematically:\n• Paper Stream: Check for coffee cups, plastic binders, and grease.\n• Plastics & Cans: Check for unrinsed liquids, polystyrene glasses, and cling wrap.\n• Glass: Check for broken drinking glasses or ceramics.\n• General Waste: Check for clean cardboard or unopened bottles that can be rescued.",
        contentBlocks: [
          {
            type: "text",
            heading: "Four Quick Verification Checks",
            body: "1. Are paper fibers dry and clean?\n2. Are drink containers empty of liquid?\n3. Are all glass items bottle glass (no tumblers or ceramics)?\n4. Are recyclable boxes flattened and saved from the general waste bin?"
          }
        ]
      },
      {
        orderIndex: 2,
        title: "Workplace Action: Daily 2-Minute Bin Health Check",
        durationMinutes: 3,
        content: "Make sorting vigilance a daily operational habit. Spend 2 minutes each morning checking your department's waste stations.",
        contentBlocks: [
          {
            type: "commitment",
            prompt: "Commit to a waste leadership habit in your organisation:",
            commitmentOptions: [
              { value: "daily_bin_check", label: "Perform a quick 2-minute visual check of office bins every morning" },
              { value: "peer_coaching", label: "Share friendly sorting corrections with colleagues when mistakes occur" },
              { value: "event_waste_planning", label: "Pre-brief event catering staff on waste sorting rules before all company events" }
            ]
          }
        ]
      }
    ],
    questions: [
      {
        orderIndex: 0,
        questionType: "sorting_decision",
        question: "In the [Clean Paper & Cardboard] bin, you spot an unopened glossy corporate presentation booklet with a heavy metal spiral wire binding and clear plastic cover. How do you prepare it for collection?",
        options: [
          "Detach the metal wire binding and plastic cover (putting them in metal and general waste), then place the clean inner paper pages into the paper bin",
          "Leave the booklet intact in the paper bin; the paper mill will deal with it",
          "Throw the entire booklet into General Waste",
          "Throw the entire booklet into the Glass recycling bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Separating multi-material items is the hallmark of an effective waste auditor: detaching the metal coil and plastic sheets allows 100% of the paper pages to be recycled cleanly.",
          "Incorrect. Heavy metal spiral wire jams paper hydropulpers and damages cutting machinery.",
          "Incorrect. Throwing 50 pages of clean paper into landfill when a 10-second separation rescues it is wasteful.",
          "Incorrect. Paper and metal wire never belong in glass skips."
        ],
        correctExplanation: "Separating metal spiral bindings and plastic covers allows the clean inner paper to be recovered cleanly.",
        incorrectExplanation: "Metal spiral coils damage paper shredders; remove bindings before recycling clean paper.",
        practicalTakeaway: "Separate composite stationery: remove metal coils and plastic sleeves so clean paper fibers can be recycled.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 1,
        questionType: "sorting_decision",
        question: "In the [Plastics & Cans] bin, you find 10 plastic cocktail glasses made of brittle crystal polystyrene (PS #6) mixed with 15 aluminium drink cans. What corrective action is required?",
        options: [
          "Leave the aluminium cans in the bin (they are high-value recyclables); remove the brittle PS plastic glasses and put them in General Waste",
          "Throw all 15 aluminium cans into General Waste along with the glasses",
          "Leave everything as is; recyclers sort everything automatically",
          "Crush the brittle plastic glasses into powder inside the bin"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Removing the non-accepted brittle polystyrene glasses protects the aluminium can stream from polymer contamination.",
          "Incorrect. Discarding 15 clean aluminium cans into general waste destroys valuable circular materials.",
          "Incorrect. Leaving unaccepted plastics in the bin risks the collector rejecting the entire container load.",
          "Incorrect. Crushing brittle polystyrene creates microplastic shards that disperse through the bin and cannot be removed."
        ],
        correctExplanation: "Remove unaccepted polystyrene items to protect high-value aluminium cans from contamination rejection.",
        incorrectExplanation: "Polystyrene glasses contaminate container streams; remove them while keeping clean cans in the recycling bin.",
        practicalTakeaway: "Conduct quick pre-collection sweeps to pluck out non-accepted rigid plastic cups and tableware.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 2,
        questionType: "sorting_decision",
        question: "In the [Glass Bottles] bin, you see 3 intact wine bottles alongside 2 shattered crystal champagne flutes (table drinking glass). How should you resolve this?",
        options: [
          "Wearing protective gloves, carefully remove the broken crystal flutes, wrap them in thick paper, and place them in General Waste; keep the intact wine bottles in the glass bin",
          "Leave the broken crystal flutes in the glass bin because all glass is melted together",
          "Throw the intact wine bottles into General Waste",
          "Pour water into the glass bin to wash the glass"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Crystal flutes contain lead oxide and different chemical flux that ruins bottle glass remelting. Removing and wrapping them safely rescues the wine bottles and prevents handler injuries.",
          "Incorrect. Tableware crystal and drinking glass ruin bottle kilns and must never be baled with container glass.",
          "Incorrect. Throwing intact wine bottles into general waste wastes recyclable container glass.",
          "Incorrect. Adding water creates a hazardous sludge and does not solve material contamination."
        ],
        correctExplanation: "Tableware crystal must be removed from bottle recycling; wrap safely and discard in general waste.",
        incorrectExplanation: "Crystal contains chemical additives that weaken new container bottles. Keep table glass out of bottle skips.",
        practicalTakeaway: "Never mix broken bar glassware or champagne flutes into bottle glass recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 3,
        questionType: "sorting_decision",
        question: "During your audit of the [General Waste] dumpster, you find 3 large, clean, corrugated cardboard boxes that originally contained wine bottles. What should you do?",
        options: [
          "Rescue the boxes from general waste: flatten them flat and place them into the clean cardboard recycling stack",
          "Leave them in general waste because once an item touches general waste it is illegal to touch it",
          "Burn them in the venue car park",
          "Soak them with dirty dishwater"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Rescuing clean dry corrugated boxes from general waste saves landfill space and recovers high-value cardboard fiber.",
          "Incorrect. Clean, dry boxes that have not been contaminated by wet garbage should always be rescued and recycled.",
          "Incorrect. Burning cardboard creates smoke, safety hazards, and is illegal.",
          "Incorrect. Soaking boxes ruins fiber recyclability."
        ],
        correctExplanation: "Clean dry cardboard found in general waste should be rescued, flattened, and added to the paper stream.",
        incorrectExplanation: "Never leave clean recyclable cardboard in general waste when it can be easily recovered.",
        practicalTakeaway: "Active auditors look for clean items accidentally thrown into general waste and divert them back into recycling.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 4,
        questionType: "uncertainty",
        question: "Behind the event bar, the catering team left three empty metal sterno chafing dish fuel cans. You are unsure whether sterno fuel cans can be placed in the aluminium can recycling bin. What is the proper procedure?",
        options: [
          "Consult the event safety coordinator or hazardous waste guide: flammable fuel cans contain toxic petroleum residue and cannot be mixed with beverage cans",
          "Toss them into the beverage can bin because they are made of metal",
          "Rinse them in the sink with warm water and pour fuel residue down the drain",
          "Crush them with your shoe"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. Cans containing flammable chemical fuel (diethylene glycol or alcohol gel) are hazardous waste and must never be mixed with food and beverage cans.",
          "Incorrect. Beverage can recyclers will reject loads containing industrial or chemical fuel cans due to fire and chemical contamination risks.",
          "Incorrect. Pouring petroleum or alcohol gel fuel residues down sinks contaminates municipal waterways.",
          "Incorrect. Crushing hazardous chemical cans can spray toxic chemicals."
        ],
        correctExplanation: "Chemical fuel cans are hazardous waste and must not be commingled with beverage drink cans. Verify with your safety coordinator.",
        incorrectExplanation: "Flammable fuel residues pose fire risks at recycling depots and are barred from standard can recycling.",
        practicalTakeaway: "Keep industrial, chemical, and fuel containers separate from food and beverage packaging; verify hazardous disposal routes.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      },
      {
        orderIndex: 5,
        questionType: "contamination",
        question: "Why is conducting this 5-minute pre-collection visual audit so vital for your company's waste collection contract with local recyclers in Mauritius?",
        options: [
          "Commercial recyclers enforce strict contamination thresholds (typically 5–10%) and will reject the entire load or charge penalty fees if contaminated bins are presented",
          "Audits are done only for aesthetic photo opportunities",
          "Audits ensure recycling trucks arrive an hour earlier",
          "Audits make the rubbish smell like perfume"
        ],
        correctOption: 0,
        optionFeedback: [
          "Correct. If contamination exceeds allowable limits, collectors refuse pickup, charge contamination penalty fees, or divert the entire truckload to Mare Chicose landfill.",
          "Incorrect. Audits prevent genuine commercial rejection and save tonnes of recyclable materials from landfill.",
          "Incorrect. Audits do not change truck arrival schedules.",
          "Incorrect. This has no basis in waste operations."
        ],
        correctExplanation: "Pre-collection audits prevent contaminated loads from being rejected and landfilled at Mare Chicose.",
        incorrectExplanation: "Commercial recyclers reject contaminated bins and impose fines; pre-collection checks protect company sustainability performance.",
        practicalTakeaway: "A 5-minute pre-collection check ensures your team's sorting efforts result in actual recycling rather than landfill diversion.",
        competencyArea: "Workplace Waste Sorting & Contamination Control"
      }
    ]
  }
];
