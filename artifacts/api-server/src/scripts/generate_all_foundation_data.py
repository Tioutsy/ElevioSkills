import json

# Full dataset generator for Sprint 17.0A
# Courses ELH-02 through ELH-11 (10 questions each, balanced keys, complete optionFeedback)

COURSES = {}

# Helper to build question
def make_q(order, question, options, correct, correct_exp, incorrect_exp, option_feedback, comp):
    assert len(options) == 4
    assert len(option_feedback) == 4
    assert 0 <= correct <= 3
    return {
        "order": order,
        "question": question,
        "options": options,
        "correct": correct,
        "correctExplanation": correct_exp,
        "incorrectExplanation": incorrect_exp,
        "optionFeedback": option_feedback,
        "competencyArea": comp
    }

# ----------------------------------------------------
# ELH-02: Waste Sorting & Mauritian Bin System (Next: 3)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-02"] = {
    "courseCode": "ELH-02",
    "courseId": 2,
    "slug": "waste-sorting-mauritian-bin-system",
    "title": "Waste Sorting & the Mauritian Bin System",
    "recommendedNextCourseId": 3,
    "seedName": "waste-sorting-mauritian-bin-system-v3",
    "questions": [
        make_q(
            1,
            "Where does unsorted general waste in Mauritius ultimately end up?",
            [
                "Community compost facilities across the island",
                "Exported for international recycling",
                "The Mare Chicose landfill",
                "Incinerated for renewable grid electricity"
            ],
            2,
            "Most unsorted waste in Mauritius goes to Mare Chicose landfill, making waste reduction and proper sorting essential.",
            "Incorrect. Mare Chicose is the central landfill site in Mauritius.",
            [
                "Incorrect. General waste bins are not sent to organic composting sites.",
                "Incorrect. Unsorted mixed waste is not exported for recycling.",
                "Correct. Mare Chicose is the primary sanitary landfill receiving unsorted municipal and commercial waste.",
                "Incorrect. Mauritius does not operate a large-scale municipal solid waste incineration power plant."
            ],
            "Waste Sorting & Island Realities"
        ),
        make_q(
            2,
            "Why must employees follow explicit workplace bin labels instead of assuming a universal national color scheme?",
            [
                "Waste collection rules depend on the specific collector contracted by your employer",
                "Commercial bins are only decorative",
                "All Mauritian workplaces use identical private recycling trucks",
                "Only organic food waste is collected in Mauritius"
            ],
            0,
            "Different employers contract different waste collection services with unique guidelines and accepted items.",
            "Incorrect. Bin systems and accepted materials vary by employer and waste collector.",
            [
                "Correct. Commercial waste collectors in Mauritius have distinct sorting rules and color schemes; always follow on-site labels.",
                "Incorrect. Labelled bins are active sorting systems designed to divert recyclables from landfill.",
                "Incorrect. Multiple private service providers operate in Mauritius with different collection streams.",
                "Incorrect. Paper, cardboard, plastics, and metals are widely collected alongside general waste."
            ],
            "Workplace Bin Practices"
        ),
        make_q(
            3,
            "How does food grease or residual liquid affect a bin of clean paper and cardboard?",
            [
                "It gets washed off automatically during industrial paper recycling",
                "It ruins paper fibers during repulping, often causing the entire batch to be sent to landfill",
                "It turns the paper into organic compost instantly",
                "It increases the commercial value of recycled paper"
            ],
            1,
            "Grease and moisture disrupt repulping processes, contaminating dry paper streams beyond recovery.",
            "Incorrect. Food oil and moisture permanently spoil recyclable paper streams.",
            [
                "Incorrect. Paper recycling relies on clean water repulping; oil and grease cannot be separated from cellulose fibers.",
                "Correct. Oil and food grease saturate paper fibers, making them unrecyclable and causing whole bales to be rejected.",
                "Incorrect. Contaminated paper in a recycling bin does not compost; it ruins the recyclable dry stream.",
                "Incorrect. Contamination drastically degrades or destroys the economic value of collected recyclables."
            ],
            "Contamination Prevention"
        ),
        make_q(
            4,
            "Which item requires special hazardous waste handling and should NEVER go into standard office recycling or general bins?",
            [
                "Clean PET plastic water bottles",
                "Flattened cardboard shipping boxes",
                "Clean aluminum soda cans",
                "Used batteries and electronic waste"
            ],
            3,
            "Batteries contain hazardous heavy metals and chemicals that require dedicated collection procedures.",
            "Incorrect. Batteries and e-waste must be escalated to special collection points.",
            [
                "Incorrect. PET bottles belong in clean plastics recycling streams.",
                "Incorrect. Flattened cardboard belongs in clean paper and cardboard streams.",
                "Incorrect. Aluminum cans are valuable non-ferrous metals for standard recycling.",
                "Correct. Batteries and electronics contain toxic electrolytes and heavy metals that cause landfill fires and soil contamination."
            ],
            "Hazardous Materials & Escalation"
        ),
        make_q(
            5,
            "What is the best action when preparing a plastic bottle containing leftover liquid for recycling?",
            [
                "Throw it into the recycling bin with the liquid inside",
                "Empty all liquid, rinse if possible, and place in the plastic recycling bin",
                "Throw it into the paper recycling bin",
                "Leave it on your desk for cleaning staff to handle"
            ],
            1,
            "Emptying liquids prevents leaks that destroy adjacent paper and cardboard recyclables.",
            "Incorrect. Liquids must be emptied before placing containers into recycling streams.",
            [
                "Incorrect. Remaining liquids leak onto other materials in the collection bin, causing mould and contamination.",
                "Correct. Emptying and lightly rinsing ensures containers remain clean and prevents liquids from spoiling other recyclables.",
                "Incorrect. Plastic bottles must never be placed in paper bins.",
                "Incorrect. Every employee is responsible for sorting their own beverage and food packaging."
            ],
            "Practical Sorting"
        ),
        make_q(
            6,
            "When you are standing at a workplace waste station holding packaging with no clear bin label, what is the best immediate practice?",
            [
                "Check the company waste sorting guide or ask facilities before discarding, placing it in general waste only if unrecyclable",
                "Toss it into the nearest plastic bin and assume sorting facility workers will fix it",
                "Hide it behind the waste bins on the floor to avoid making a wrong decision",
                "Burn the packaging in the outdoor car park"
            ],
            0,
            "Checking site guidance or asking the facility coordinator prevents contaminating clean recycling streams.",
            "Incorrect. Guessing can contaminate clean recyclable materials.",
            [
                "Correct. When in doubt, check site guidance; preventing recycling stream contamination protects the entire batch.",
                "Incorrect. Wish-cycling (guessing into recycling) contaminates clean batches and increases processing costs.",
                "Incorrect. Leaving waste on the floor creates housekeeping and pest hazards.",
                "Incorrect. Open burning of waste is hazardous and illegal under Mauritian environmental laws."
            ],
            "Decision Protocols"
        ),
        make_q(
            7,
            "Why is 'segregation at source' considered the most effective principle in commercial waste management?",
            [
                "It makes office corridors look busier and more colorful",
                "It allows companies to eliminate all cleaning staff contracts",
                "Separating materials immediately when discarded keeps clean recyclables dry and prevents cross-contamination",
                "It is required only for luxury tourist resorts and not for regular commercial buildings"
            ],
            2,
            "Segregating at source prevents clean materials from contacting wet or oily waste, ensuring high recovery rates.",
            "Incorrect. Source segregation prevents clean recyclables from being ruined by mixed waste.",
            [
                "Incorrect. The primary goal is resource recovery, not aesthetic decoration.",
                "Incorrect. Housekeeping teams remain vital for managing collection streams and transfers.",
                "Correct. Once wet organic waste mixes with clean paper or cardboard, recovery is almost impossible.",
                "Incorrect. Segregation at source applies to all commercial, industrial, and retail workplaces across Mauritius."
            ],
            "Waste Hierarchy & Segregation"
        ),
        make_q(
            8,
            "A team orders takeaway lunch and leaves oily polystyrene clamshells with chicken curry gravy. Where do these containers belong?",
            [
                "In the clean paper recycling bin because they held food items",
                "In the clean plastics bin because polystyrene is technically a polymer",
                "In the outdoor storm drain",
                "In general waste, because food-soaked polystyrene cannot be recycled and contaminates clean packaging"
            ],
            3,
            "Heavily food-soaked polystyrene cannot be processed by commercial recyclers and must be directed to general waste.",
            "Incorrect. Food-soaked expanded polystyrene contaminates recycling streams.",
            [
                "Incorrect. Polystyrene is not paper, and food gravy severely contaminates paper recycling.",
                "Incorrect. Recyclers in Mauritius do not accept food-contaminated expanded polystyrene clamshells.",
                "Incorrect. Placing waste in storm drains is illegal and severely pollutes marine habitats.",
                "Correct. Greasy polystyrene cannot be cleaned economically and will ruin clean recyclable batches."
            ],
            "Contamination Scenarios"
        ),
        make_q(
            9,
            "During a facility tidy-up, a worker finds two cracked fluorescent lighting tubes. How should these tubes be handled?",
            [
                "Wrap them carefully, isolate them from general bins, and escalate to facilities for hazardous waste disposal",
                "Crush them into a paper bin to save space in the office",
                "Throw them into the outdoor glass bottle recycling bin",
                "Flush them down the staff restroom sink with tap water"
            ],
            0,
            "Fluorescent tubes contain hazardous mercury vapour and phosphor powders, requiring specialized hazardous waste handling.",
            "Incorrect. Fluorescent tubes contain toxic mercury and must never be crushed or mixed with ordinary glass.",
            [
                "Correct. Fluorescent tubes contain toxic mercury vapour and must be isolated and disposed of via certified hazardous waste handlers.",
                "Incorrect. Crushing releases toxic mercury vapor directly into indoor breathing air.",
                "Incorrect. Fluorescent tube glass has a different chemical composition and toxic coating than bottle glass.",
                "Incorrect. Disposing of fluorescent materials down drains contaminates public wastewater systems."
            ],
            "Hazardous Escalation"
        ),
        make_q(
            10,
            "You notice that the main cardboard recycling bin in the reception corridor is overflowing and staff have started piling mixed rubbish on top. What is the best action?",
            [
                "Ignore it and leave it for the weekend cleaning crew",
                "Kick the excess boxes into the elevator lobby",
                "Notify facility management or the green team coordinator to arrange collection and request extra bins",
                "Dump the entire recycling bin into the outdoor general dumpster to clear the floor"
            ],
            2,
            "Reporting overflow promptly allows facilities to clear bins before cross-contamination occurs.",
            "Incorrect. Prompt notification enables facilities to manage collection capacity.",
            [
                "Incorrect. Ignoring overflow leads to progressive contamination as mixed trash is tossed on top.",
                "Incorrect. Spreading waste creates slip and fire hazards in public corridors.",
                "Correct. Alerting the facilities coordinator ensures timely bin clearance and assesses whether bin capacity needs adjusting.",
                "Incorrect. Diverting a bin of clean cardboard to general waste unnecessarily wastes valuable recyclable material."
            ],
            "Operational Escalation"
        )
    ]
}

# ----------------------------------------------------
# ELH-03: Energy Efficiency at Work (Next: 4)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-03"] = {
    "courseCode": "ELH-03",
    "courseId": 3,
    "slug": "energy-efficiency-at-work",
    "title": "Energy Efficiency at Work",
    "recommendedNextCourseId": 4,
    "seedName": "energy-efficiency-at-work-v3",
    "questions": [
        make_q(
            1,
            "What is the primary goal of workplace energy efficiency?",
            [
                "To work in complete darkness and disable all computers",
                "To eliminate electricity completely by moving all operations outdoors",
                "To deliver the same or better operational productivity and comfort while using less energy",
                "To satisfy decorative corporate marketing goals without changing consumption"
            ],
            2,
            "Energy efficiency focuses on eliminating waste while maintaining productive business operations and comfort.",
            "Incorrect. Energy efficiency delivers productivity and comfort with less energy.",
            [
                "Incorrect. Extreme privation damages business productivity and worker health.",
                "Incorrect. Operations require reliable power; efficiency optimizes rather than halts use.",
                "Correct. True efficiency maintains productive output, comfort, and service quality with reduced kilowatt-hours.",
                "Incorrect. Marketing claims without consumption reduction do not constitute energy efficiency."
            ],
            "Energy Fundamentals"
        ),
        make_q(
            2,
            "Why is keeping windows and doors closed essential when air conditioning is running in a Mauritian facility?",
            [
                "It prevents hot, humid outdoor air from entering, which reduces cooling load and energy waste",
                "It is a legal requirement enforced by the local police station",
                "It makes the indoor air temperature rise to 35°C immediately",
                "It increases the amount of dust inside the room"
            ],
            0,
            "Open doors and windows allow hot humid air in, forcing air conditioners to work continuously at maximum power.",
            "Incorrect. Keeping openings closed prevents external heat and moisture from overwhelming the cooling system.",
            [
                "Correct. In Mauritius' tropical climate, outdoor humidity and heat force compressors to run continuously if openings are unsealed.",
                "Incorrect. This is an operational efficiency best practice rather than a police-enforced penal code.",
                "Incorrect. Closing windows retains cooled air inside the room.",
                "Incorrect. Closed windows reduce the ingress of outdoor dust and particulate matter."
            ],
            "Cooling Efficiency"
        ),
        make_q(
            3,
            "What is 'vampire' or standby power draw in commercial equipment?",
            [
                "Power consumed exclusively by horror movie production equipment",
                "Electricity drawn by electronic devices while plugged in but turned off or in idle mode",
                "A billing penalty charged when facilities consume electricity after midnight",
                "The energy needed to recharge high-voltage electric delivery trucks"
            ],
            1,
            "Standby power refers to the continuous electricity drawn by appliances and chargers even when idle.",
            "Incorrect. Standby power is the continuous background draw of devices when not in active use.",
            [
                "Incorrect. Standby power is a universal electrical phenomenon affecting all electronic appliances.",
                "Correct. Devices with internal transformers, remote sensors, or LED displays draw continuous power when plugged in.",
                "Incorrect. Standby power is physical energy consumption, not a tariff penalty rate.",
                "Incorrect. Charging vehicle batteries is active high-power consumption, not standby draw."
            ],
            "Standby Power"
        ),
        make_q(
            4,
            "Which of the following equipment must NEVER be switched off or unplugged during a routine office energy sweep?",
            [
                "Individual desk phone chargers",
                "Electric water coolers in the staff pantry",
                "Unoccupied meeting room presentation monitors",
                "Core IT server racks, network switches, and emergency exit lighting"
            ],
            3,
            "Critical network hardware, telecommunications, and safety systems must remain powered continuously.",
            "Incorrect. Core IT, network, and life-safety systems must never be disconnected.",
            [
                "Incorrect. Phone chargers can and should be safely unplugged when not in use.",
                "Incorrect. Pantry coolers can be put on timers or powered down during extended holiday shutdowns.",
                "Incorrect. Meeting room monitors should be powered down when rooms are vacant.",
                "Correct. Disrupting IT server infrastructure or safety emergency signs causes business downtime and safety risks."
            ],
            "Critical Boundaries"
        ),
        make_q(
            5,
            "What is the correct action when you notice an office thermostat set to 18°C while occupants are shivering in sweaters?",
            [
                "Open all exterior windows to warm the room with outdoor air",
                "Adjust the thermostat to the recommended comfort range of 24°C and notify facilities if temperature fluctuates",
                "Bring in portable 2,000W electric space heaters to place under every desk",
                "Turn off the building main breaker without telling anyone"
            ],
            1,
            "Setting air conditioning to 24°C provides optimal thermal comfort in tropical climates while saving substantial energy.",
            "Incorrect. Setting thermostats to 24°C balances comfort and efficiency.",
            [
                "Incorrect. Opening windows while running AC wastes energy and causes severe condensation.",
                "Correct. 24°C is the recognized energy-efficient comfort standard; every degree lower increases cooling consumption by 6–8%.",
                "Incorrect. Running electric space heaters against active cooling is an extreme waste of electrical energy.",
                "Incorrect. Switching off main breakers shuts down essential business IT systems and lighting."
            ],
            "Thermostat Control"
        ),
        make_q(
            6,
            "Why does setting an AC remote to 18°C NOT cool an office room down any faster than setting it to 24°C?",
            [
                "AC units deliver conditioned air at a constant design temperature; the setpoint only determines when the compressor cycles off",
                "Thermostats only respond to outdoor sunlight rather than indoor air temperature",
                "Modern air conditioning units are programmed to ignore temperature requests from remote controls",
                "The Central Electricity Board automatically caps indoor temperatures at 24°C from the grid"
            ],
            0,
            "Air conditioners blow air at the same constant cold temperature regardless of remote setting; lower setpoints simply keep the compressor running longer.",
            "Incorrect. ACs blow air at a fixed cooling rate; setting it lower does not accelerate initial cooling.",
            [
                "Correct. The AC unit cools at a fixed rate; setting it to 18°C just ensures it overcools the space and runs continuously.",
                "Incorrect. Thermostat sensors measure the return air temperature from inside the room.",
                "Incorrect. Units respond directly to the setpoint by cycling the compressor on and off.",
                "Incorrect. The CEB supplies electricity; it does not control private building thermostat remote settings."
            ],
            "AC Mechanics"
        ),
        make_q(
            7,
            "You notice that the weatherstrip seal on the main exterior glass door of an air-conditioned reception area is torn and letting in a continuous hot draft. What should you do?",
            [
                "Prop the door open permanently with a doorstop",
                "Ignore it because small drafts do not affect building energy use",
                "Log a maintenance request to replace the weatherstripping and keep the door firmly closed in the meantime",
                "Spray perfume on the seal to mask the outdoor smell"
            ],
            2,
            "Fixing broken door seals stops air infiltration, protecting indoor thermal comfort and preventing AC compressor overload.",
            "Incorrect. Reporting damaged weatherstripping ensures thermal envelopes remain sealed.",
            [
                "Incorrect. Propping the door open creates massive cooling loss and increases humidity.",
                "Incorrect. Continuous infiltration of humid island air significantly increases refrigeration compressor loads.",
                "Correct. Repairing door seals prevents hot draft infiltration, lowers cooling costs, and prevents indoor humidity issues.",
                "Incorrect. Perfume does not fix air leaks or thermal energy loss."
            ],
            "Building Envelope"
        ),
        make_q(
            8,
            "At the end of Friday work, which routine best helps reduce unnecessary weekend electricity draw in a commercial office?",
            [
                "Leaving all desktop computers in active screensaver mode with monitors on",
                "Turning up all AC units to maximum fan speed for the weekend",
                "Switching off all hallway emergency exit battery luminaires",
                "Powering down non-critical monitors, desktop printers, laminators, and meeting room displays from power strips"
            ],
            3,
            "Shutting down peripheral equipment and unneeded display devices eliminates two full days of weekend standby draw.",
            "Incorrect. Powering down non-essential peripherals over the weekend saves significant standby electricity.",
            [
                "Incorrect. Screensavers keep graphic cards and display monitors in active high-power states.",
                "Incorrect. Running cooling fans in empty buildings over the weekend wastes electricity.",
                "Incorrect. Emergency exit luminaires are mandatory safety devices and must never be disabled.",
                "Correct. Switching off multi-outlet surge protectors for peripherals eliminates standby consumption over 60 weekend hours."
            ],
            "Shutdown Routines"
        ),
        make_q(
            9,
            "How can employees best utilize natural daylighting in perimeter offices during bright morning hours?",
            [
                "Open window blinds to illuminate desks and switch off electric light banks directly adjacent to the windows",
                "Keep heavy blackout curtains drawn and turn on all high-output ceiling halogen spotlights",
                "Place cardboard over all windows to prevent outdoor light from entering",
                "Replace window glass with opaque aluminium sheeting"
            ],
            0,
            "Daylight harvesting utilizes free natural sunlight to replace electric overhead lighting in perimeter office zones.",
            "Incorrect. Opening blinds and switching off perimeter lighting banks saves electricity.",
            [
                "Correct. Natural daylight in Mauritius is abundant; switching off perimeter lights reduces electrical draw and internal heat gain.",
                "Incorrect. Blocking daylight forces unnecessary artificial lighting use and increases electricity costs.",
                "Incorrect. Cardboard creates fire hazards and blocks natural illumination.",
                "Incorrect. Opaque coverings eliminate natural views and daylighting benefits for occupants."
            ],
            "Daylight Harvesting"
        ),
        make_q(
            10,
            "In the context of the Mauritian national electricity grid, why does reducing commercial electricity waste during peak daytime hours matter environmentally?",
            [
                "Electricity is completely stored in underground batteries across the island",
                "Grid electricity has zero environmental impact in Mauritius",
                "Peak daytime demand often requires additional thermal generation from imported fossil fuels (heavy fuel oil and coal)",
                "The electricity grid automatically shuts down if offices use power between 9 AM and 4 PM"
            ],
            2,
            "Reducing peak commercial demand lowers the requirement for fossil-fuel thermal peaking plants, cutting island carbon emissions.",
            "Incorrect. The Mauritian electricity grid relies heavily on thermal generation; peak demand drives fossil fuel consumption.",
            [
                "Incorrect. Mauritius does not have island-scale battery storage capable of powering the whole grid.",
                "Incorrect. Over 70% of Mauritian grid power has historically relied on imported fossil fuels (HFO and coal).",
                "Correct. Daytime commercial air conditioning and industrial peaks require dispatching fossil-fuel thermal generators; efficiency cuts these emissions directly.",
                "Incorrect. The CEB grid operates continuously 24/7."
            ],
            "Grid Context"
        )
    ]
}

# ----------------------------------------------------
# ELH-04: Water Conservation (Next: 5)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), D (3), C (2), A (0), D (3) -> A:3, B:2, C:2, D:3
# ----------------------------------------------------
COURSES["ELH-04"] = {
    "courseCode": "ELH-04",
    "courseId": 4,
    "slug": "water-conservation",
    "title": "Water Conservation",
    "recommendedNextCourseId": 5,
    "seedName": "water-conservation-v3",
    "questions": [
        make_q(
            1,
            "Why should employees report minor dripping taps or refilling cisterns promptly?",
            [
                "A dripping tap causes zero water loss over an entire year",
                "Water in commercial buildings is completely free and unlimited in Mauritius",
                "Even a slow drip can waste thousands of litres of fresh water over time and strains island storage reservoirs",
                "Dripping taps are required by building regulations to remain unreported"
            ],
            2,
            "Slow leaks accumulate into significant losses over days and weeks, wasting treated drinking water.",
            "Incorrect. Even minor leaks waste substantial volumes of treated water.",
            [
                "Incorrect. A tap dripping at one drop per second wastes over 10,000 litres of water annually.",
                "Incorrect. Commercial water is metered and treated, and Mauritius experiences seasonal reservoir constraints.",
                "Correct. Prompt leak reporting prevents cumulative water waste and protects island water resources like Mare aux Vacoas.",
                "Incorrect. Building standards prioritize water efficiency and leak prevention."
            ],
            "Leak Detection"
        ),
        make_q(
            2,
            "What is the relationship between water conservation and workplace hygiene?",
            [
                "Handwashing and sanitisation must never be compromised while avoiding running taps continuously when lathering",
                "Employees should stop washing their hands to save water",
                "Hygiene rules only apply to hospital operating theatres",
                "Using soap without water is the recommended commercial practice"
            ],
            0,
            "Effective water conservation maintains complete hygiene and health standards by eliminating waste, not cleanliness.",
            "Incorrect. Water conservation never compromises health, sanitation, or handwashing.",
            [
                "Correct. Thorough handwashing with soap protects health; turn off taps while lathering or use sensor taps to prevent waste.",
                "Incorrect. Sacrificing handwashing violates health regulations and spreads workplace illness.",
                "Incorrect. Hand hygiene is essential across all offices, hospitality, retail, and manufacturing workplaces.",
                "Incorrect. Proper hand hygiene requires clean rinsing water."
            ],
            "Hygiene & Conservation"
        ),
        make_q(
            3,
            "Which of the following actions should be classified under 'TECHNICAL ESCALATION' rather than general employee action?",
            [
                "Turning off a sink tap tightly after washing hands",
                "Repairing an underground water main rupture or adjusting mechanical booster pump pressure valves",
                "Wiping down a dining table with a damp cloth instead of hosing the floor",
                "Reporting a running toilet cistern to the maintenance desk"
            ],
            1,
            "Major plumbing repairs, pressure regulation, and underground lines require licensed plumbers and specialized equipment.",
            "Incorrect. Complex piping, pumps, and underground repairs must be escalated to qualified technicians.",
            [
                "Incorrect. Closing taps tightly is a basic everyday responsibility for all employees.",
                "Correct. High-pressure valves, booster pumps, and buried pipelines involve safety hazards and require qualified engineering technicians.",
                "Incorrect. Wiping surfaces with a damp microfiber cloth is a standard daily cleaning practice.",
                "Incorrect. Logging a maintenance report is an everyday reporting action for all staff."
            ],
            "Technical Boundaries"
        ),
        make_q(
            4,
            "What is a water-efficient alternative to hosing down outdoor driveways, loading docks, or hardstands?",
            [
                "Using an open high-pressure fire hose for two hours",
                "Leaving running garden hoses unattended overnight",
                "Pumping sea water directly onto office carpets",
                "Sweeping with a stiff outdoor broom and using spot cleaning with a mop and bucket for stubborn marks"
            ],
            4 - 1, # index 3 (D)
            "Dry sweeping removes leaves and dust effectively without consuming hundreds of litres of potable water.",
            "Incorrect. Dry sweeping with brooms replaces wasteful outdoor hose washing.",
            [
                "Incorrect. Using fire hoses for routine cleaning wastes thousands of litres and violates fire safety equipment protocols.",
                "Incorrect. Leaving hoses running unattended causes massive water loss and soil erosion.",
                "Incorrect. Sea water damages interior flooring and introduces corrosive salt crystals.",
                "Correct. Sweeping dry debris with a broom and spot-cleaning stains saves hundreds of litres of potable water per clean."
            ],
            "Outdoor Cleaning"
        ),
        make_q(
            5,
            "At the end of your shift, you notice water pooling under a staff kitchenette sink. What is the most appropriate first action?",
            [
                "Walk away because your shift has ended",
                "Check if safe, close the local mini-ball isolation valve under the sink, and report the leak immediately to maintenance",
                "Cover the puddle with paper towels and hope it evaporates by morning",
                "Pour dishwashing liquid into the puddle to make it smell fresh"
            ],
            1,
            "Isolating the local supply stops the leak immediately, while logging a ticket ensures a permanent repair before overnight flooding.",
            "Incorrect. Isolating the local valve if safe and notifying maintenance prevents flooding.",
            [
                "Incorrect. Ignoring leaks can lead to overnight flooding, structural damage, and severe water loss.",
                "Correct. Turning the local isolation valve stops the flow safely, and logging a maintenance ticket ensures rapid morning repair.",
                "Incorrect. Paper towels cannot absorb a continuous pipe leak and create unhygienic pulp waste.",
                "Incorrect. Soap in water creates an extreme slip-and-fall hazard for colleagues and cleaning crews."
            ],
            "Kitchenette Leaks"
        ),
        make_q(
            6,
            "How should employees use dual-flush toilet cisterns to achieve intended water savings?",
            [
                "Use the half-flush button for liquid waste and the full-flush button only when necessary for solid waste",
                "Press both buttons simultaneously with maximum force every time",
                "Hold down the full-flush button for three minutes",
                "Never flush toilets during the working day"
            ],
            0,
            "Dual-flush toilets save 3 to 5 litres per use when employees correctly choose the half-flush button for liquid waste.",
            "Incorrect. Use the smaller button for liquid waste and the full flush only when needed.",
            [
                "Correct. Half-flush uses approximately 3 litres compared to 6–9 litres for full flush, saving thousands of litres across a busy workforce.",
                "Incorrect. Pressing both buttons can jam the internal valve mechanism and cause continuous refilling leaks.",
                "Incorrect. Holding buttons down does not increase effectiveness and wastes water.",
                "Incorrect. Proper sanitary flushing is essential for hygiene; use the appropriate flush volume."
            ],
            "Restroom Fixtures"
        ),
        make_q(
            7,
            "In commercial kitchen and canteen operations, what dishwashing habit conserves the most water?",
            [
                "Letting kitchen taps run at full blast for three hours during vegetable prep",
                "Thawing frozen poultry and seafood under continuous warm running water",
                "Hosing down clean floor tiles with hot drinking water",
                "Scraping food residues into compost/waste bins and washing dishes in filled wash/rinse basins rather than under continuous flowing taps"
            ],
            3,
            "Pre-scraping plates and washing in filled multi-compartment sinks uses a fraction of the water compared to continuous tap flow.",
            "Incorrect. Pre-scraping and using filled sinks conserves substantial kitchen water.",
            [
                "Incorrect. Continuous running taps during food prep can waste over 1,000 litres of treated water per shift.",
                "Incorrect. Running water thawing wastes huge volumes; thaw items in refrigerated chillers overnight instead.",
                "Incorrect. Floor hosing wastes water; use mops and buckets with appropriate sanitation cleaning solutions.",
                "Correct. Scrape food waste into bins dry, then use filled wash and rinse basins to maximize cleaning efficiency per litre."
            ],
            "Commercial Kitchens"
        ),
        make_q(
            8,
            "When watering workplace gardens or potted landscaped areas in Mauritius, what is the best schedule to minimize evaporation?",
            [
                "Water at midday between 12 PM and 2 PM under direct tropical sunshine",
                "Leave automated sprinklers running during tropical downpours",
                "Water early in the morning before 8 AM or in the evening after 5 PM",
                "Pour boiling water on decorative shrub roots twice daily"
            ],
            2,
            "Watering during cooler morning or evening hours allows moisture to penetrate soil roots before the tropical sun evaporates it.",
            "Incorrect. Watering early morning or late afternoon prevents evaporative water loss.",
            [
                "Incorrect. Midday watering causes up to 40% of applied water to evaporate immediately into the atmosphere.",
                "Incorrect. Running irrigation during heavy rain is wasteful and causes soil waterlogging.",
                "Correct. Morning and evening watering gives roots time to absorb water without intense solar evaporation.",
                "Incorrect. Boiling water kills beneficial soil organisms and destroys plant root systems."
            ],
            "Landscape Efficiency"
        ),
        make_q(
            9,
            "What is the primary benefit of installing water aerators on commercial handwashing taps?",
            [
                "They mix air into the water stream, reducing flow volume by up to 50% while maintaining strong wash pressure",
                "They heat tap water to 90°C instantly without using electricity",
                "They turn tap water into sparkling mineral water for office staff",
                "They completely stop water from flowing out of the faucet"
            ],
            0,
            "Aerators introduce micro-bubbles into the water stream, cutting volume while maintaining effective washing velocity.",
            "Incorrect. Tap aerators mix air into water to reduce consumption without losing pressure.",
            [
                "Correct. Aerators maintain high perceived stream pressure and coverage while reducing flow from 10 L/min to 4–5 L/min.",
                "Incorrect. Aerators are passive mesh screens; they do not heat water.",
                "Incorrect. Aerators do not carbonize water into sparkling beverage streams.",
                "Incorrect. Aerators maintain smooth water flow; they do not block faucets."
            ],
            "Flow Aeration"
        ),
        make_q(
            10,
            "Why must commercial organisations in Mauritius practice year-round water conservation, even during rainy cyclone periods?",
            [
                "Because water pipes are dismantled by the water authority every winter",
                "Because rainwater cannot enter island rivers or dams",
                "Because commercial buildings are legally prohibited from connecting to water grids",
                "Because island reservoirs have finite storage capacity, and dry season deficits can quickly threaten national water security"
            ],
            3,
            "Mauritius relies on seasonal storage in reservoirs and aquifers; heavy cyclone runoff passes quickly to the sea, making year-round conservation essential.",
            "Incorrect. Finite reservoir storage and seasonal dry periods require consistent year-round conservation.",
            [
                "Incorrect. Water networks operate throughout the year across all districts.",
                "Incorrect. Rainwater feeds surface dams and aquifers, but excess runoff drains to the ocean.",
                "Incorrect. Commercial buildings connect to the Central Water Authority (CWA) grid and private licensed boreholes.",
                "Correct. Storage dams (like La Nicolière, Piton du Milieu, Mare aux Vacoas) fill quickly but deplete during dry months; steady commercial habits protect resilience."
            ],
            "Island Water Security"
        )
    ]
}

print("ELH-02, ELH-03, ELH-04 completed.")

# ----------------------------------------------------
# ELH-05: Sustainable Procurement (Next: 6)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-05"] = {
    "courseCode": "ELH-05",
    "courseId": 5,
    "slug": "sustainable-procurement",
    "title": "Sustainable Procurement",
    "recommendedNextCourseId": 6,
    "seedName": "sustainable-procurement-v3",
    "questions": [
        make_q(
            1,
            "What is the primary goal of sustainable procurement in commercial organisations?",
            [
                "To buy the cheapest available item regardless of quality, toxicity, or origin",
                "To cease all purchasing and manufacture every item internally",
                "To deliver whole-life value by meeting operational needs with minimal environmental and social impact",
                "To purchase luxury branded goods exclusively to impress prospective clients"
            ],
            2,
            "Sustainable procurement evaluates whole-life cost, environmental impact, and supplier ethics rather than short-term purchase price alone.",
            "Incorrect. Sustainable procurement balances whole-life cost, quality, and environmental impact.",
            [
                "Incorrect. The cheapest upfront purchase often has higher maintenance, energy, and disposal costs.",
                "Incorrect. Organisations must purchase supplies and services to function; procurement focuses on responsible purchasing.",
                "Correct. Whole-life value integrates initial price, operating efficiency, durability, and responsible supplier practices.",
                "Incorrect. Procurement is based on objective operational requirements, not cosmetic prestige."
            ],
            "Procurement Foundations"
        ),
        make_q(
            2,
            "What is Step 1 of the 6-Step Sustainable Procurement Framework?",
            [
                "Challenge and verify the actual operational need before ordering",
                "Send an immediate purchase order to the nearest hardware store",
                "Approve supplier invoices without checking delivery receipts",
                "Sign a 10-year exclusive contract without requesting competitive bids"
            ],
            0,
            "The most sustainable purchase is the one not made; verifying need prevents duplicate and avoidable orders.",
            "Incorrect. Step 1 is always to question and verify the operational need.",
            [
                "Correct. Asking 'Do we truly need this, or can we share, repair, or repurpose existing equipment?' prevents wasteful spending.",
                "Incorrect. Sending orders before verifying need leads to unnecessary inventory accumulation.",
                "Incorrect. Invoice verification is a post-delivery governance control.",
                "Incorrect. Long-term exclusive contracts require rigorous supplier evaluation and approval."
            ],
            "Need Verification"
        ),
        make_q(
            3,
            "How should a workplace buyer evaluate a supplier quote claiming a product is '100% Eco-Friendly'?",
            [
                "Accept the claim immediately because marketing brochures are always legally accurate",
                "Request independent third-party certifications, technical data sheets, and verified standards (e.g. ISO, Energy Star)",
                "Reject the supplier automatically and report them to the police",
                "Pay double the requested price because the word 'Eco' is printed on the box"
            ],
            1,
            "Vague claims require independent verification to prevent greenwashing and ensure compliance.",
            "Incorrect. Environmental claims must be supported by verifiable third-party documentation.",
            [
                "Incorrect. Unsubstantiated marketing claims frequently constitute greenwashing.",
                "Correct. Legitimate sustainable products provide recognized eco-labels, test results, or lifecycle evidence to prove claims.",
                "Incorrect. Buyers should request evidence through normal clarification channels before making judgments.",
                "Incorrect. Sustainable products should demonstrate fair market value, not unquestioned price premiums."
            ],
            "Greenwashing Detection"
        ),
        make_q(
            4,
            "What should an employee do if a prospective supplier offers a personal gift or luxury weekend stay in exchange for awarding a contract?",
            [
                "Accept the gift quietly and tell nobody in the office",
                "Ask for cash instead so that no physical items can be tracked",
                "Accept the gift on behalf of the entire procurement committee",
                "Politely decline and declare the offer immediately in writing in accordance with the company anti-bribery and ethics policy"
            ],
            3,
            "Personal gifts create severe conflicts of interest and compromise procurement integrity.",
            "Incorrect. Personal gifts must be declined and reported per company ethics policies.",
            [
                "Incorrect. Secretly accepting gifts violates fiduciary duties and anti-corruption regulations.",
                "Incorrect. Cash kickbacks constitute criminal bribery.",
                "Incorrect. Committee members must remain impartial and refuse inducements.",
                "Correct. Immediate declination and transparent declaration protect corporate governance and procurement fairness."
            ],
            "Ethics & Governance"
        ),
        make_q(
            5,
            "Which decision must be ESCALATED to senior management or procurement specialists?",
            [
                "Purchasing a pack of certified recycled printer paper within your departmental allowance",
                "Entering into a long-term supply contract that exceeds authorized financial limits or waives mandatory environmental criteria",
                "Requesting a supplier to deliver goods in reusable crates instead of single-use cardboard",
                "Replacing single-use plastic water bottles with ceramic glasses for a meeting"
            ],
            1,
            "Contract commitments exceeding financial approval limits or altering compliance standards require executive sign-off.",
            "Incorrect. Exceeding spending limits or waiving compliance rules requires formal escalation.",
            [
                "Incorrect. Routine budgeted office supplies within threshold can be handled at operational level.",
                "Correct. Exceeding delegated approval authority or waiving environmental specifications exposes the company to contractual and audit risks.",
                "Incorrect. Requesting reusable packaging is an operational preference within routine vendor communications.",
                "Incorrect. Using ceramic glasses is a standard workplace habit within employee authority."
            ],
            "Authority Boundaries"
        ),
        make_q(
            6,
            "What is Total Cost of Ownership (TCO) in commercial purchasing decisions?",
            [
                "Evaluating the complete cost across an asset's life, including purchase price, energy use, maintenance, and disposal",
                "The initial purchase price printed at the bottom of the first quote",
                "The total amount of cash stored in the company bank account",
                "The fee paid to delivery couriers for transport"
            ],
            0,
            "TCO assesses the full expenditure of owning an asset, proving that energy-efficient, durable products often cost less overall.",
            "Incorrect. TCO accounts for operational, energy, maintenance, and disposal costs across the asset lifecycle.",
            [
                "Correct. Factoring in energy consumption, repair costs, and expected lifespan reveals the true economic value of equipment.",
                "Incorrect. Looking only at initial purchase price ignores ongoing electricity, consumable, and repair expenses.",
                "Incorrect. TCO is an asset evaluation methodology, not a measure of cash reserves.",
                "Incorrect. Delivery fees are only a minor component of initial acquisition."
            ],
            "Lifecycle Costing"
        ),
        make_q(
            7,
            "How can a procurement officer reduce supply chain packaging waste when ordering routine spare parts or bulk goods?",
            [
                "Request that each individual bolt and washer be wrapped in five layers of plastic bubble wrap",
                "Order items in daily single-unit packages to keep delivery trucks busy",
                "Specify reusable returnable transit crates and require suppliers to take back secondary transport packaging",
                "Throw all wooden delivery pallets into the sea after unloading"
            ],
            2,
            "Contracting for reusable transit packaging eliminates single-use cardboard and plastic film across recurring deliveries.",
            "Incorrect. Specifying reusable packaging and vendor take-back prevents supply chain packaging waste.",
            [
                "Incorrect. Over-packaging small items generates massive avoidable plastic waste.",
                "Incorrect. Frequent micro-deliveries increase packaging volume and transport emissions.",
                "Correct. Reusable plastic containers and pallet return agreements eliminate tons of packaging waste over supply contracts.",
                "Incorrect. Discarding pallets into waterways is illegal and creates navigational and ecological hazards."
            ],
            "Packaging Reduction"
        ),
        make_q(
            8,
            "When evaluating two commercial printer proposals, why is spare parts availability and repairability a critical sustainability factor?",
            [
                "It guarantees the machine will never need cleaning",
                "It allows employees to disassemble printers during lunch breaks for amusement",
                "It is a requirement created solely to increase service invoice fees",
                "It ensures the machine can be serviced locally for 5–7 years, avoiding premature replacement and electronic waste"
            ],
            3,
            "Equipment that can be repaired locally extends operational lifespan and prevents functional machines from becoming e-waste.",
            "Incorrect. Repairability ensures long operational life and prevents premature electronic waste.",
            [
                "Incorrect. Regular cleaning and preventative maintenance remain essential for all office equipment.",
                "Incorrect. Equipment repairs must be performed by authorized service technicians.",
                "Incorrect. Serviceability protects investment value; it is not an arbitrary fee scheme.",
                "Correct. Ready access to replacement rollers, fusers, and local technician support keeps hardware operational for years."
            ],
            "Durability & Repair"
        ),
        make_q(
            9,
            "Which of the following is a classic indicator of 'greenwashing' in a vendor product catalog?",
            [
                "Using vague marketing phrases like 'all-natural' or 'eco-friendly' with no standard certification, testing data, or verifiable ingredients",
                "Providing an ISO 14001 certification certificate and third-party laboratory test report",
                "Listing the exact percentage of post-consumer recycled content in the product casing",
                "Displaying a valid Energy Star rating badge registered on the official database"
            ],
            0,
            "Unsubstantiated green buzzwords without independent credentials or verifiable data are the hallmarks of greenwashing.",
            "Incorrect. Vague unverified claims are typical greenwashing signs.",
            [
                "Correct. Greenwashing relies on emotional, unsubstantiated claims rather than measurable technical standards.",
                "Incorrect. ISO 14001 and independent lab tests are credible evidence of environmental management.",
                "Incorrect. Specifying exact audited recycled content percentages provides transparent, verifiable data.",
                "Incorrect. Officially registered Energy Star ratings are verified performance standards."
            ],
            "Supplier Due Diligence"
        ),
        make_q(
            10,
            "What is an environmental and operational advantage of prioritizing qualified local suppliers in Mauritius when quality and cost are comparable?",
            [
                "Local suppliers are legally exempt from all corporate taxation",
                "Local purchasing eliminates all company accounting audits",
                "Shorter delivery distances reduce international freight emissions, lower supply chain disruption risks, and support local circular value",
                "Goods manufactured locally are indestructible and never break"
            ],
            2,
            "Local procurement shortens logistics routes, lowers transport carbon emissions, and enhances supply chain resilience.",
            "Incorrect. Sourcing locally reduces maritime/air freight emissions and shortens supply lead times.",
            [
                "Incorrect. Local businesses operate under standard national tax and corporate laws.",
                "Incorrect. All transactions require standard audit trails and purchase orders.",
                "Correct. Local sourcing avoids maritime freight delays, reduces scope 3 transport emissions, and strengthens domestic economic resilience.",
                "Incorrect. Local goods require standard quality assurance and maintenance."
            ],
            "Local Sourcing"
        )
    ]
}

# ----------------------------------------------------
# ELH-06: Green Office Practices (Next: 7)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-06"] = {
    "courseCode": "ELH-06",
    "courseId": 6,
    "slug": "green-office-practices",
    "title": "Green Office Practices",
    "recommendedNextCourseId": 7,
    "seedName": "green-office-practices-v5",
    "questions": [
        make_q(
            1,
            "What is the primary objective of practicing green office routines?",
            [
                "To eliminate desks and force all staff to work while standing in the parking lot",
                "To monitor employees' private homes through mandatory video cameras",
                "To build coordinated daily habits that reduce unnecessary administrative waste, power draw, and material consumption",
                "To win social media contests while keeping office operations unchanged"
            ],
            2,
            "Green office practices coordinate daily team habits to eliminate avoidable paper, energy, and supply waste in shared work areas.",
            "Incorrect. Green office practices coordinate daily habits to reduce operational waste.",
            [
                "Incorrect. Ergonomic workspaces are essential; green routines optimize resource use within offices.",
                "Incorrect. Green office routines focus strictly on commercial workplace operations.",
                "Correct. Coordinated daily habits across lighting, printing, paperless workflows, and shared supplies minimize office overheads.",
                "Incorrect. Real sustainability focuses on verifiable operational reductions, not cosmetic publicity."
            ],
            "Office Ecology"
        ),
        make_q(
            2,
            "How should confidential paper records (e.g. employee contracts, bank details) be handled sustainably?",
            [
                "Shredded on-site and securely baled for dedicated paper recycling via certified confidential destruction services",
                "Burned in an open oil drum behind the office building",
                "Thrown into general waste dumpsters without tearing the pages",
                "Buried in the staff garden under vegetable beds"
            ],
            0,
            "Confidential documents must be shredded to protect data privacy while remaining in dedicated paper recycling streams.",
            "Incorrect. Secure shredding followed by certified recycling protects both data security and resource recovery.",
            [
                "Correct. Cross-cut shredding ensures data privacy compliance under Data Protection laws while preserving paper fibers for recycling.",
                "Incorrect. Open burning generates toxic smoke, violates environmental laws, and poses a severe fire risk.",
                "Incorrect. Discarding intact confidential papers in open bins causes severe data protection breaches.",
                "Incorrect. Buried paper with synthetic inks contaminates garden soils and does not compost securely."
            ],
            "Document Security"
        ),
        make_q(
            3,
            "Which piece of office equipment must NEVER be powered down or unplugged during routine evening desk shutdowns?",
            [
                "Personal phone chargers and desk fan cords",
                "Core internet routers, telecom gateways, and server rack cooling systems",
                "Individual computer monitors and laptop power bricks",
                "Shared desktop laminators in the copy center"
            ],
            1,
            "Central network infrastructure and server climate controls must remain active 24/7 to maintain business operations and remote access.",
            "Incorrect. Core networking, communications, and server equipment must never be disconnected.",
            [
                "Incorrect. Phone chargers and desk fans should be unplugged when unattended.",
                "Correct. Powering down network switches or server room AC disrupts company IT services, backups, and security monitoring.",
                "Incorrect. Computer screens should be switched off at the end of each working day.",
                "Incorrect. Laminating machines draw significant heat energy and should always be turned off after use."
            ],
            "Critical Equipment"
        ),
        make_q(
            4,
            "What is a key principle of lower-waste workplace meeting planning?",
            [
                "Printing 50-page presentation slide decks for every participant",
                "Providing disposable plastic bottles, plastic cups, and plastic cutlery for all internal meetings",
                "Refusing to invite participants to meetings to save lighting power",
                "Sharing agendas, spreadsheets, and presentations digitally in advance and using conference room screens"
            ],
            3,
            "Digital sharing eliminates unnecessary paper printing and reduces meeting preparation overheads.",
            "Incorrect. Sharing materials digitally replaces wasteful single-use meeting handouts.",
            [
                "Incorrect. Printing slide decks is costly and results in discarded paper within minutes of meeting completion.",
                "Incorrect. Single-use plastics in meetings generate avoidable landfill waste; use reusable glassware.",
                "Incorrect. Meetings should include necessary team members; sustainability focuses on paperless collaboration.",
                "Correct. Projecting onto shared screens and circulating digital files eliminates reams of wasted paper printouts."
            ],
            "Meeting Planning"
        ),
        make_q(
            5,
            "What is the most constructive and effective way to encourage green habits among office colleagues?",
            [
                "Publicly insulting colleagues who forget to turn off a screen",
                "Leading by example, sharing practical tips, and celebrating positive departmental savings collaboratively",
                "Submitting anonymous disciplinary complaints to Human Resources for minor sorting errors",
                "Confiscating colleagues' personal belongings from their desks"
            ],
            1,
            "Positive role modelling and team collaboration build lasting cultural change more effectively than punitive confrontation.",
            "Incorrect. Constructive engagement, positive role modelling, and clear communication build lasting habits.",
            [
                "Incorrect. Public shaming causes defensiveness and undermines team culture.",
                "Correct. Demonstrating simple habits, offering friendly assistance, and sharing progress fosters collective pride and adoption.",
                "Incorrect. Disciplinary escalation over minor oversights damages workplace relationships.",
                "Incorrect. Confiscating items is unprofessional and violates workplace codes of conduct."
            ],
            "Cultural Engagement"
        ),
        make_q(
            6,
            "How does managing digital clutter (e.g. deleting duplicate files, clearing unneeded cloud email attachments) support environmental sustainability?",
            [
                "Data centers consume substantial electricity and cooling; reducing unnecessary storage lowers continuous server grid loads",
                "It makes personal laptop keyboards weigh less physically",
                "It increases the internet connection speed of the entire Indian Ocean region by 500%",
                "It is purely an aesthetic exercise with zero environmental relevance"
            ],
            0,
            "Data storage requires continuous server power and cooling in data centers; digital housekeeping directly reduces energy demand.",
            "Incorrect. Data centers require continuous electricity and cooling; trimming unneeded data reduces energy consumption.",
            [
                "Correct. Cloud servers operate 24/7 with massive cooling demands; reducing obsolete storage directly saves server electricity.",
                "Incorrect. Digital files do not affect physical hardware weight.",
                "Incorrect. Cleaning inboxes does not alter submarine regional fiber bandwidth capacity.",
                "Incorrect. Digital storage has real physical energy footprints across international server networks."
            ],
            "Digital Footprint"
        ),
        make_q(
            7,
            "What should be the default configuration on all shared network office printers to minimize paper consumption?",
            [
                "Single-sided printing on heavy gloss paper with full-bleed colour",
                "Printing three blank cover pages before every print job",
                "Double-sided (duplex) printing in black and white / draft mode",
                "Automatically printing two copies of every incoming email"
            ],
            2,
            "Setting duplex black-and-white printing as the default cut paper consumption by up to 50% and lowers expensive colour toner usage.",
            "Incorrect. Defaulting to double-sided and black-and-white printing drastically reduces paper and toner waste.",
            [
                "Incorrect. Single-sided color printing doubles paper consumption and exhausts expensive color cartridges.",
                "Incorrect. Banner cover sheets generate massive piles of clean wasted paper around office printers.",
                "Correct. Default duplex printing instantly halves sheet count, while monochrome defaults prevent accidental color toner waste.",
                "Incorrect. Printing emails is unnecessary and highly wasteful; read correspondence digitally."
            ],
            "Printing Controls"
        ),
        make_q(
            8,
            "During an end-of-day office shutdown, what is the best practice for shared meeting rooms and collaborative spaces?",
            [
                "Leave all display panels, room video bars, and lighting banks on full brightness overnight",
                "Open all windows to let the night rain enter the carpeted rooms",
                "Disconnect all wall power sockets with a screwdriver",
                "Perform a quick sweep to turn off video display monitors, room lights, and air conditioning remotes"
            ],
            3,
            "A fast closing sweep ensures empty meeting rooms do not consume air conditioning and display energy for 14 unattended night hours.",
            "Incorrect. Turning off display screens, lights, and room AC prevents hours of wasted night-time power.",
            [
                "Incorrect. Leaving meeting room displays on all night burns standby power and shortens display panel lifespan.",
                "Incorrect. Leaving windows open exposes office furniture and electronics to storm and rain damage.",
                "Incorrect. Tampering with electrical outlets with tools causes electrocution risks.",
                "Correct. Ensuring screens, lights, and AC are powered off before leaving prevents hours of phantom electricity consumption."
            ],
            "Closing Procedures"
        ),
        make_q(
            9,
            "How can office kitchenettes eliminate recurring single-use waste from staff coffee and lunch breaks?",
            [
                "Provide durable ceramic mugs, washable stainless steel cutlery, and drinking water carafes with clear washing routines",
                "Provide individual plastic spoons wrapped in single-use plastic film for every coffee cup",
                "Ban coffee and tea consumption completely across the organisation",
                "Instruct employees to discard ceramic mugs in general waste after each use"
            ],
            0,
            "Providing reusable mugs, glasses, and utensils supported by dishwashing routines eliminates thousands of disposable items annually.",
            "Incorrect. Providing reusable mugs and cutlery eliminates recurring single-use breakroom waste.",
            [
                "Correct. Stocking washable mugs and utensils and establishing clean-as-you-go norms eliminates thousands of single-use cups.",
                "Incorrect. Individually wrapped plastic utensils generate unnecessary plastic litter.",
                "Incorrect. Coffee and tea breaks are important for staff wellbeing; provide sustainable reusable utensils instead.",
                "Incorrect. Ceramic mugs are durable assets meant to be washed and reused for years."
            ],
            "Kitchenette Waste"
        ),
        make_q(
            10,
            "What is a practical green office practice for managing desktop stationery and consumable supplies?",
            [
                "Allow every employee to hoard 20 boxes of staplers and pens in private desk drawers",
                "Throw away all half-used notebooks and binders at the end of every month",
                "Establish a central shared stationery station where surplus pens, folders, and binders are returned for reuse before ordering new items",
                "Order office supplies only in single units with express air courier delivery"
            ],
            2,
            "Centralizing stationery supplies allows surplus items to circulate internally, preventing duplicate orders of common office supplies.",
            "Incorrect. A central shared stationery station allows surplus items to be reused before purchasing new supplies.",
            [
                "Incorrect. Desk hoarding leads to duplicate purchasing while supplies dry out in personal drawers.",
                "Incorrect. Reusable ring binders and notebooks should be retained for future projects.",
                "Correct. A central 'stationery amnesty' shelf allows teams to find binders, pens, and clips without submitting new purchase requests.",
                "Incorrect. Micro-ordering via air freight multiplies delivery emissions and packaging waste."
            ],
            "Stationery Management"
        )
    ]
}

print("ELH-05, ELH-06 completed.")

# ----------------------------------------------------
# ELH-07: Carbon Footprint Awareness (Next: 8)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-07"] = {
    "courseCode": "ELH-07",
    "courseId": 7,
    "slug": "carbon-footprint-awareness",
    "title": "Carbon Footprint Awareness",
    "recommendedNextCourseId": 8,
    "seedName": "carbon-footprint-awareness-v4",
    "questions": [
        make_q(
            1,
            "What is the relationship between activity data and emission factors in calculating carbon footprints?",
            [
                "Activity data is multiplied by employee headcounts to predict next year's office rent",
                "Emission factors are added to bank statements to determine corporate tax liabilities",
                "Multiplying measurable activity data (litres of fuel, kWh of electricity) by an established emission factor calculates greenhouse gas emissions (CO2e)",
                "Activity data and emission factors are identical terms that can be used interchangeably"
            ],
            2,
            "Carbon calculations multiply verifiable resource use (activity data) by scientific emissions intensity factors to determine total carbon dioxide equivalent (CO2e).",
            "Incorrect. Multiplying activity data by an emission factor yields total CO2 equivalent emissions.",
            [
                "Incorrect. Activity data measures physical resource consumption, not headcounts or rental rates.",
                "Incorrect. Emission factors quantify greenhouse gas intensity, not financial tax liabilities.",
                "Correct. Activity Data (e.g. 1,000 litres of diesel) × Emission Factor (e.g. 2.68 kg CO2e/L) = Total Greenhouse Gas Emissions.",
                "Incorrect. Activity data is physical volume consumed, while an emission factor is the carbon intensity per unit."
            ],
            "Carbon Metrics"
        ),
        make_q(
            2,
            "Which option represents a Scope 1 (Direct) greenhouse gas emission for a commercial facility in Mauritius?",
            [
                "Diesel fuel combusted inside company delivery vans or on-site backup generators",
                "Purchased electricity consumed by office fluorescent lamps and air conditioning units",
                "An employee taking an international commercial airline flight for a overseas conference",
                "Paper discarded by an accounting firm into a municipal waste transfer station"
            ],
            0,
            "Scope 1 covers direct greenhouse gas emissions from fuel combustion in owned or controlled assets like vehicles and boilers.",
            "Incorrect. Scope 1 encompasses direct emissions from fuel burned in company-owned assets.",
            [
                "Correct. Burning diesel fuel in company-owned trucks or backup generator sets directly produces greenhouse gas emissions on-site.",
                "Incorrect. Purchased grid electricity is categorized as Scope 2 (Indirect Emissions from Purchased Energy).",
                "Incorrect. Commercial flights operated by airlines are categorized under Scope 3 (Value Chain Emissions).",
                "Incorrect. Third-party waste disposal and decomposition are categorized under Scope 3."
            ],
            "Scope 1 Emissions"
        ),
        make_q(
            3,
            "Why are AC refrigerant gas leaks considered a high-priority carbon issue in commercial buildings?",
            [
                "Refrigerant gases improve indoor air quality and eliminate dust",
                "Common fluorinated refrigerants (HFCs) have Global Warming Potentials hundreds to thousands of times higher than carbon dioxide",
                "Refrigerant leaks are required by law in commercial offices",
                "Leaking refrigerant gas makes computer screens operate faster"
            ],
            1,
            "Hydrofluorocarbons (HFCs) are super-pollutants; even small leaks of fluorinated gases create substantial global warming impact.",
            "Incorrect. Fluorinated refrigerants have extreme global warming potentials compared to carbon dioxide.",
            [
                "Incorrect. Escaping refrigerant gases do not purify indoor air; some pose asphyxiation or health risks in enclosed spaces.",
                "Correct. Escaping gases like R-410A or R-134a have Global Warming Potentials over 1,400 to 2,000 times that of CO2, making leak repair vital.",
                "Incorrect. Environmental regulations strictly require equipment leak inspections and containment.",
                "Incorrect. Refrigerant has zero connection to computer display processing speeds."
            ],
            "Refrigerant Impact"
        ),
        make_q(
            4,
            "How should a company evaluate a supplier claiming a product is '100% Carbon Neutral' without providing any verification?",
            [
                "Accept the statement immediately because green labels are always legally certified",
                "Reward the supplier with an exclusive five-year purchasing monopoly",
                "Assume the supplier has planted ten million indigenous trees on private land",
                "Request audited greenhouse gas calculation data, boundary disclosures, and verified carbon offset registry credits"
            ],
            3,
            "Unverified neutrality claims require scrutiny; companies must verify transparent emissions boundaries and accredited offset standards.",
            "Incorrect. Unverified carbon neutral claims require transparent data and recognized registry verification.",
            [
                "Incorrect. Unregulated carbon neutrality claims often mask partial accounting or dubious unverified offsets.",
                "Incorrect. Contracts should be awarded on verified performance, not unsubstantiated marketing statements.",
                "Incorrect. Tree-planting claims require verified registry tracking, permanence guarantees, and independent auditing.",
                "Correct. Credible carbon neutrality requires clear scope accounting (Cradle-to-Gate), emissions reduction evidence, and Gold Standard or Verra offsets."
            ],
            "Carbon Claims Verification"
        ),
        make_q(
            5,
            "At the end of the year, a facility's purchased electricity fell by 10%, but total operational carbon emissions rose. What could explain this?",
            [
                "Staff switched to writing with fountain pens instead of ballpoint pens",
                "Frequent national grid outages led to running on-site diesel backup generators for hundreds of hours",
                "The office cleaning team changed the brand of bathroom air freshener spray",
                "Solar panels absorbed moonlight during night shifts"
            ],
            1,
            "Diesel generators produce significantly more greenhouse gas emissions per kilowatt-hour than grid power, increasing net carbon footprint.",
            "Incorrect. Heavy generator runtime during grid disruptions increases carbon intensity.",
            [
                "Incorrect. Minor pen changes have no material effect on corporate carbon accounts.",
                "Correct. Diesel backup generators produce approximately 0.8–1.0 kg CO2e per kWh, often exceeding grid average intensity and spiking Scope 1 emissions.",
                "Incorrect. Air freshener sprays do not alter Scope 1 or Scope 2 energy footprints.",
                "Incorrect. Solar photovoltaic panels do not generate power from moonlight."
            ],
            "Emissions Analysis"
        ),
        make_q(
            6,
            "What do Scope 2 greenhouse gas emissions represent in a Mauritian corporate carbon inventory?",
            [
                "Indirect emissions generated from the production of purchased electricity consumed by the company from the Central Electricity Board (CEB)",
                "Exhaust emissions from employee personal bicycles",
                "Direct combustion of liquefied petroleum gas (LPG) inside the staff cafeteria stoves",
                "Methane gas released by ocean waves along public beaches"
            ],
            0,
            "Scope 2 accounts for indirect emissions associated with the generation of electricity, steam, or cooling purchased from a utility.",
            "Incorrect. Scope 2 accounts for indirect emissions from purchased grid electricity.",
            [
                "Correct. Scope 2 measures emissions emitted at CEB thermal power stations to generate the electrical energy consumed by the business.",
                "Incorrect. Bicycles do not produce direct fossil exhaust emissions.",
                "Incorrect. Burning LPG in kitchen stoves on-site is a direct Scope 1 combustion emission.",
                "Incorrect. Natural ocean waves are not part of an organisation's corporate greenhouse gas inventory."
            ],
            "Scope 2 Definition"
        ),
        make_q(
            7,
            "Which of the following activities falls under Scope 3 (Value Chain) greenhouse gas emissions?",
            [
                "Fuel combusted in an emergency backup generator owned by the facility",
                "Gasoline consumed by company-owned delivery motorcycles",
                "Commercial airline business travel and third-party transport of raw materials",
                "Refrigerant top-ups in the company's server room air conditioner"
            ],
            2,
            "Scope 3 covers all other indirect emissions across the upstream and downstream value chain, including outsourced travel and transport.",
            "Incorrect. Scope 3 encompasses indirect value chain activities like business flights and third-party logistics.",
            [
                "Incorrect. Fuel burned in company-owned generators is direct Scope 1.",
                "Incorrect. Fuel burned in company-owned vehicles is direct Scope 1.",
                "Correct. Flights on commercial airlines and freight carried by third-party logistics providers are classic Scope 3 indirect emissions.",
                "Incorrect. Fugitive refrigerant gas losses from owned AC systems are direct Scope 1 emissions."
            ],
            "Scope 3 Value Chain"
        ),
        make_q(
            8,
            "Why is collecting accurate, verifiable activity data (such as actual utility invoices and fuel receipts) critical for employee carbon reporting?",
            [
                "Government regulations require carbon reports to be handwritten in blue ink",
                "Carbon reporting software automatically deletes accounts if estimates are entered",
                "Utility companies give a 50% discount to companies that produce carbon spreadsheets",
                "Credible carbon accounting and climate disclosures require verifiable data trails that withstand internal and external audit scrutiny"
            ],
            3,
            "Auditable activity data ensures carbon inventories reflect genuine operational changes and meet regulatory and investor standards.",
            "Incorrect. Auditable activity data provides the foundation for credible climate disclosures and audits.",
            [
                "Incorrect. Data can be stored in digital accounting formats; accuracy matters, not ink color.",
                "Incorrect. Software systems accept inputs; accuracy depends on the validity of source data.",
                "Incorrect. Utilities bill based on measured meter consumption, not reporting outputs.",
                "Correct. Regulators, bank financiers, and carbon auditors require primary invoices and fuel receipts to verify reported greenhouse gas reductions."
            ],
            "Data Integrity"
        ),
        make_q(
            9,
            "What everyday habit by company fleet drivers can immediately reduce operational carbon emissions without any financial investment?",
            [
                "Eliminating unnecessary engine idling while parked or waiting for deliveries, and planning efficient route sequences",
                "Accelerating rapidly at every green traffic light to finish delivery routes early",
                "Overinflating vehicle tyres to twice their manufacturer recommended pressure rating",
                "Driving delivery vans in first gear continuously on public highways"
            ],
            0,
            "Eco-driving practices like shutting off idling engines and smoothing driving habits immediately cut vehicle fuel burn by 5–15%.",
            "Incorrect. Turning off idling engines and smooth route planning cut vehicle fuel consumption immediately.",
            [
                "Correct. Idling engines burn fuel without moving; turning off engines during unloading and planning multi-stop routes cuts fuel burn instantly.",
                "Incorrect. Aggressive acceleration significantly increases fuel consumption and wear on brake pads.",
                "Incorrect. Overinflating tyres creates dangerous blowout risks and reduces vehicle road grip.",
                "Incorrect. Driving in low gear at high RPM wastes fuel and risks engine overheating."
            ],
            "Eco-Driving"
        ),
        make_q(
            10,
            "How does regular preventative maintenance of commercial air conditioning units and industrial chillers lower carbon emissions?",
            [
                "It repaints external metal casings so they reflect moonlight",
                "It converts air conditioners into solar energy generators",
                "Clean heat-exchanger coils and correct refrigerant levels allow compressors to run at peak efficiency, consuming less grid electricity",
                "Maintenance permanently eliminates the need for grid power"
            ],
            2,
            "Clean condenser coils and calibrated refrigerant charges reduce compressor workload, saving substantial electricity over operational hours.",
            "Incorrect. Maintained equipment operates at design efficiency, consuming significantly less electrical energy.",
            [
                "Incorrect. Paint colors on outdoor chassis do not influence refrigeration cycle thermodynamics.",
                "Incorrect. Air conditioning units consume power; they do not generate solar electricity.",
                "Correct. Dirty coils force compressors to work 20–30% harder to transfer heat, consuming more CEB grid electricity and driving Scope 2 emissions.",
                "Incorrect. Electrical equipment always requires energy to operate."
            ],
            "Preventative Maintenance"
        )
    ]
}

# ----------------------------------------------------
# ELH-08: Biodiversity in Mauritius (Next: 9)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), D (3) -> A:3, B:2, C:2, D:3
# ----------------------------------------------------
COURSES["ELH-08"] = {
    "courseCode": "ELH-08",
    "courseId": 8,
    "slug": "biodiversity-in-mauritius",
    "title": "Biodiversity in Mauritius",
    "recommendedNextCourseId": 9,
    "seedName": "biodiversity-in-mauritius-v3",
    "questions": [
        make_q(
            1,
            "What is the difference between a native species and an endemic species in the context of Mauritius?",
            [
                "Native species were introduced by humans in 1990; endemic species arrived by aeroplane",
                "There is no difference; both terms refer to common farm animals",
                "A native species arrived naturally in Mauritius; an endemic species evolved here and exists naturally nowhere else on Earth",
                "Endemic species are harmful pests that must be exterminated by law"
            ],
            2,
            "Endemic species are uniquely native to Mauritius and cannot be found anywhere else in the world, making their conservation globally critical.",
            "Incorrect. Endemic species evolved locally and occur naturally only in Mauritius.",
            [
                "Incorrect. Species introduced by humans are exotic or alien, not native.",
                "Incorrect. Farm animals (like cattle and goats) are introduced domestic species.",
                "Correct. Native species arrived naturally without human aid; endemic species evolved here uniquely (e.g. Mauritius Kestrel, Pink Pigeon, native ebony trees).",
                "Incorrect. Endemic species are precious natural heritage, not pests."
            ],
            "Endemism Concepts"
        ),
        make_q(
            2,
            "Why is Strawberry Guava (Goyave de Chine / Psidium cattleyanum) classified as an Invasive Alien Species in Mauritian forests?",
            [
                "It spreads aggressively, forms impenetrable thickets, and prevents indigenous forest seedlings from regenerating",
                "Its red fruit is poisonous to all human beings",
                "It absorbs all oxygen from the atmosphere within a ten-mile radius",
                "It was declared an illegal plant by the Central Electricity Board"
            ],
            0,
            "Invasive alien plants like Goyave de Chine aggressively displace fragile native flora and disrupt native wildlife habitats.",
            "Incorrect. Invasive species aggressively outcompete native plants and alter native ecosystems.",
            [
                "Correct. Goyave de Chine forms dense monospecific thickets, shading out native seedlings and starving endemic birds that depend on indigenous trees.",
                "Incorrect. The fruit is edible for humans, but the plant's ecological invasiveness destroys native forest canopies.",
                "Incorrect. Plants release oxygen through photosynthesis; this claim is unscientific.",
                "Incorrect. Plant biosecurity is managed by the Ministry of Agro-Industry and National Parks and Conservation Service (NPCS), not the CEB."
            ],
            "Invasive Alien Species"
        ),
        make_q(
            3,
            "What should a maintenance employee do if an unfamiliar wild bird nest or native animal is discovered on commercial premises during site clearing?",
            [
                "Spray the nest with insect pesticide immediately",
                "Pause work in the immediate area, protect the site from disturbance, and inform the facility environmental lead or the National Parks and Conservation Service (NPCS)",
                "Remove the nest and throw it into the general waste dumpster",
                "Capture the animal and take it home as a family pet"
            ],
            1,
            "Pausing work protects potentially protected or endangered native wildlife from accidental destruction.",
            "Incorrect. Pause work, isolate the area, and escalate to environmental specialists or NPCS.",
            [
                "Incorrect. Spraying wildlife with pesticides is cruel, hazardous, and illegal under wildlife protection legislation.",
                "Correct. Ceasing work prevents accidental harm to native fauna (like Echo Parakeets or native reptiles) and allows certified wildlife officers to assess the site.",
                "Incorrect. Destroying nests of protected native birds violates the Native Terrestrial Biodiversity and National Parks Act 2015.",
                "Incorrect. Capturing protected wild animals is illegal and threatens species survival."
            ],
            "Wildlife Protection"
        ),
        make_q(
            4,
            "Why should chemical drums and loose plastic litter never be stored near unpaved ground or open storm drains?",
            [
                "Rainwater will cause chemical drums to rust into pure gold",
                "Chemical drums make the car park look too tidy",
                "Storm drains are reserved exclusively for swimming during lunch hours",
                "Runoff washes toxic chemicals and plastics into waterways, estuaries, and coastal coral reef lagoons, devastating marine life"
            ],
            3,
            "Stormwater runoff flows untreated into aquatic ecosystems; chemical spills and plastic litter cause severe marine pollution.",
            "Incorrect. Stormwater drains wash surface pollutants directly into rivers, coral reefs, and coastal lagoons.",
            [
                "Incorrect. Rusted steel drums release hazardous leaks into soil; they do not transmute into precious metals.",
                "Incorrect. Improper chemical storage is a major regulatory and environmental violation.",
                "Incorrect. Storm drains are drainage infrastructure, not recreational swimming facilities.",
                "Correct. Mauritius' coastal lagoons and coral reefs are vulnerable to terrestrial runoff; industrial chemicals and plastics poison fish and destroy coral colonies."
            ],
            "Lagoon & Runoff Protection"
        ),
        make_q(
            5,
            "A landscaping contractor offers to sell 'fast-growing exotic groundcover' for the corporate garden. What is the most responsible response?",
            [
                "Accept the offer immediately because fast-growing plants require zero maintenance",
                "Verify that the plant is non-invasive and prioritize hardy native or pollinator-friendly species adapted to local Mauritian climate conditions",
                "Plant the exotic groundcover inside natural forest reserves nearby",
                "Pour motor oil on the ground to prevent any plants from growing"
            ],
            1,
            "Selecting native or non-invasive plants prevents introducing new invasive weeds that escape into natural ecosystems.",
            "Incorrect. Landscaping should prioritize non-invasive native flora and verify plant species before planting.",
            [
                "Incorrect. Fast-growing exotic plants often escape cultivation and become devastating ecological weeds.",
                "Correct. Using native plants (such as endemic palms or coastal veloutier) supports local biodiversity without risking invasive spread into native ecosystems.",
                "Incorrect. Introducing non-native plants into forest reserves is strictly illegal and ecologically destructive.",
                "Incorrect. Pouring oil contaminates soil and groundwater and is a serious environmental offense."
            ],
            "Landscaping Choices"
        ),
        make_q(
            6,
            "Why should outdoor facility security floodlights be fitted with down-shields or directed downward rather than beaming upward into the night sky?",
            [
                "To prevent disorienting and grounding nocturnal seabirds (such as Petrels and Shearwaters) during their fledging season",
                "To prevent satellites in outer space from seeing the office building",
                "To make the car park completely dark so employees cannot find their vehicles",
                "Because upward-facing light consumes three times more electricity than downward light"
            ],
            0,
            "Light pollution disorients young native seabirds flying from inland mountain breeding burrows out to the Indian Ocean.",
            "Incorrect. Down-shielded lighting prevents disorienting native seabirds while maintaining safe ground illumination.",
            [
                "Correct. In Mauritius, fledging seabirds like the Round Island Petrel or Shearwaters get blinded by upward light spill, crash into buildings, and become prey to predators.",
                "Incorrect. Downward shielding is an ecological and light-spill mitigation measure, not related to space satellites.",
                "Incorrect. Properly directed down-lighting illuminates pathways and car parks with superior clarity and safety.",
                "Incorrect. Power draw is determined by bulb wattage, but shielding ensures the light illuminates ground areas where needed."
            ],
            "Light Pollution"
        ),
        make_q(
            7,
            "How does incorporating indigenous and endemic Mauritian trees (like Bois d'Ebene or Bois de Chandelle) into commercial property landscaping support local biodiversity?",
            [
                "Endemic trees produce synthetic plastic pellets for office printers",
                "They require massive amounts of chemical fertilizers and daily pesticide spraying",
                "They provide natural habitat, food, and nesting shelter for local birds, geckos, and pollinators while conserving irrigation water",
                "They prevent all rain from falling on the commercial site"
            ],
            2,
            "Endemic plants are adapted to local soil and rainfall, providing authentic ecological niches for indigenous Mauritian fauna.",
            "Incorrect. Endemic trees support local fauna, require minimal inputs once established, and restore native ecology.",
            [
                "Incorrect. Trees produce organic biomass, fruit, and oxygen; they do not manufacture synthetic plastics.",
                "Incorrect. Native species evolved in local soils and generally require fewer chemical fertilizers and pesticides than exotic ornamentals.",
                "Correct. Indigenous flora co-evolved with native fauna, providing optimal nectar, fruit, and nesting hollows for local birds and beneficial insects.",
                "Incorrect. Trees promote natural microclimates and soil moisture retention; they do not stop regional rainfall."
            ],
            "Native Landscaping"
        ),
        make_q(
            8,
            "Under the Native Terrestrial Biodiversity and National Parks Act 2015, what is the legal status of strictly protected endemic flora and fauna on state and private land?",
            [
                "Employees are allowed to chop down protected endemic trees if they need firewood for a beach picnic",
                "Protected species can be captured and sold at roadside market stalls without permits",
                "The law applies only on public holidays and does not cover commercial building sites",
                "It is a serious statutory offense to uproot, fell, damage, capture, or trade in protected wildlife and endangered native species without authorized government permits"
            ],
            3,
            "The Native Terrestrial Biodiversity and National Parks Act 2015 provides strict legal protections and criminal penalties for harming endangered native wildlife.",
            "Incorrect. The Native Terrestrial Biodiversity and National Parks Act 2015 strictly protects listed native flora and fauna.",
            [
                "Incorrect. Damaging or felling protected endemic trees is a criminal statutory violation.",
                "Incorrect. Capturing or trading in protected native species is strictly prohibited under national biodiversity legislation.",
                "Incorrect. Environmental statutes apply 365 days a year across all commercial, industrial, and development land.",
                "Correct. The Act establishes strict legal protection, requiring Environmental Impact Assessments and permits before any site clearing affecting protected wildlife."
            ],
            "Biodiversity Legislation"
        ),
        make_q(
            9,
            "How does securing outdoor facility waste dumpsters with tight-fitting lids protect native Mauritian wildlife?",
            [
                "It prevents pest animals (like black rats and feral cats) from scavenging food waste and multiplying into adjacent natural reserves",
                "It turns organic food waste into concrete blocks",
                "It makes the dumpster soundproof when people drop bottles inside",
                "It allows companies to keep waste inside bins for ten years without collection"
            ],
            0,
            "Exposed food waste breeds invasive rodents and predators that raid native bird nests in nearby forest and coastal habitats.",
            "Incorrect. Securing dumpsters stops invasive pests from proliferating and preying on native wildlife.",
            [
                "Correct. Open dumpsters provide continuous food for rats and feral animals, which are the single greatest predatory threat to native Mauritian birds and reptiles.",
                "Incorrect. Organic waste decomposes biologically; lids simply contain odours and exclude scavenger pests.",
                "Incorrect. Dumpster lids provide containment and pest exclusion, not acoustic soundproofing.",
                "Incorrect. Waste must still be collected and emptied regularly by scheduled waste management contractors."
            ],
            "Pest Exclusion"
        ),
        make_q(
            10,
            "What is Integrated Pest Management (IPM) in commercial facility grounds maintenance?",
            [
                "Spraying broad-spectrum chemical insecticides over every lawn every morning",
                "Pouring bleach into garden soil to kill all underground earthworms",
                "Introducing foreign poisonous snakes to control garden insects",
                "Combining preventative sanitation, mechanical controls, and biological measures to manage pests while minimizing toxic chemical applications"
            ],
            3,
            "Integrated Pest Management uses multi-layered preventative techniques to control pests without indiscriminate chemical spraying that poisons local ecosystems.",
            "Incorrect. Integrated Pest Management emphasizes prevention, mechanical controls, and targeted minimal chemical use.",
            [
                "Incorrect. Blanket chemical spraying kills beneficial pollinators (like bees) and contaminates runoff into water bodies.",
                "Incorrect. Bleach sterilizes soil, kills essential soil microorganisms, and poisons groundwater.",
                "Incorrect. Introducing alien predators causes catastrophic ecological harm, as historical mongoose introductions in Mauritius proved.",
                "Correct. IPM emphasizes hygiene, removing standing water, physical barriers, and targeted treatments, protecting pollinators and aquatic biodiversity."
            ],
            "Integrated Pest Management"
        )
    ]
}

# ----------------------------------------------------
# ELH-09: ESG Basics (Next: 10)
# Keys: B (1), A (0), C (2), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-09"] = {
    "courseCode": "ELH-09",
    "courseId": 9,
    "slug": "esg-basics",
    "title": "ESG Basics",
    "recommendedNextCourseId": 10,
    "seedName": "esg-basics-v4",
    "questions": [
        make_q(
            1,
            "What does ESG stand for in plain workplace language?",
            [
                "Electrical, Solar, and Gas",
                "Environmental, Social, and Governance",
                "Executive Salary Guidelines",
                "Emergency Safety Gear"
            ],
            1,
            "ESG stands for Environmental, Social, and Governance—the three foundational pillars of responsible, sustainable corporate practice.",
            "Incorrect. ESG stands for Environmental, Social, and Governance.",
            [
                "Incorrect. Energy sources are only one component within the Environmental pillar.",
                "Correct. Environmental (planet stewardship), Social (people and community relationships), and Governance (ethical corporate conduct and oversight).",
                "Incorrect. ESG is an overarching organizational framework, not executive compensation rules.",
                "Incorrect. While safety is vital under the Social pillar, ESG represents the broader management framework."
            ],
            "ESG Definition"
        ),
        make_q(
            2,
            "Which of the following actions is a practical workplace example of the Environmental (E) pillar?",
            [
                "Conducting energy audits to eliminate wasteful lighting and diverting packaging waste away from landfills",
                "Hosting an annual sports gala for executive managers only",
                "Auditing customer invoices to ensure correct bank account numbers",
                "Purchasing expensive office art to decorate the corporate boardroom"
            ],
            0,
            "The Environmental pillar focuses on managing and reducing an organisation's impact on the natural world, including energy and waste.",
            "Incorrect. Reducing energy consumption and diverting waste are core Environmental pillar actions.",
            [
                "Correct. Energy efficiency, water conservation, greenhouse gas reduction, and waste diversion are core Environmental operational responsibilities.",
                "Incorrect. Exclusive social events do not advance environmental stewardship or broad employee wellbeing.",
                "Incorrect. Invoice auditing falls under standard financial Governance, not environmental management.",
                "Incorrect. Aesthetic office decor is an interior design expense, not an environmental initiative."
            ],
            "Environmental Pillar"
        ),
        make_q(
            3,
            "Which workplace situation represents a Social (S) pillar issue in an organisation?",
            [
                "Checking the refrigerant pressure gauges on an outdoor chiller unit",
                "Installing photovoltaic solar panels on the facility roof",
                "Ensuring fair working hours, workplace health and safety protections, and equal opportunity for all staff",
                "Filing annual corporate financial tax statements with the revenue authority"
            ],
            2,
            "The Social pillar addresses how a company treats people—employees, contractors, customers, and local communities.",
            "Incorrect. Fair labor practices, occupational safety, and employee equity belong to the Social pillar.",
            [
                "Incorrect. Chiller maintenance addresses equipment performance under the Environmental pillar.",
                "Incorrect. Solar energy installation is an Environmental pillar initiative.",
                "Correct. Workforce wellbeing, occupational health and safety, non-discrimination, training, and fair pay are central Social responsibilities.",
                "Incorrect. Tax compliance and financial reporting belong to the Governance pillar."
            ],
            "Social Pillar"
        ),
        make_q(
            4,
            "How does an everyday employee contribute directly to the Governance (G) pillar in their daily work?",
            [
                "By ignoring company financial procedures whenever deadlines are tight",
                "By accepting cash gifts from prospective suppliers without telling anyone",
                "By writing fictional operational data in logbooks to make departments look good",
                "By adhering to company policies, recording operational and safety data honestly, and reporting conflicts of interest"
            ],
            3,
            "Governance depends on honest data recording, following internal controls, and operating with transparent integrity.",
            "Incorrect. Honest reporting, following ethical standards, and adhering to procedures support Governance.",
            [
                "Incorrect. Bypassing financial controls violates corporate governance and creates compliance exposure.",
                "Incorrect. Secretly accepting gifts breaches anti-bribery policies and fiduciary duties.",
                "Incorrect. Falsifying records corrupts audit trails and exposes the company to severe regulatory penalties.",
                "Correct. Governance is lived through everyday adherence to approved processes, truthful reporting, and transparent escalation of risks."
            ],
            "Governance Pillar"
        ),
        make_q(
            5,
            "What is the relationship between individual employee actions and a company's published corporate ESG report?",
            [
                "Published ESG reports are written entirely by artificial intelligence with zero connection to real workplace data",
                "Aggregate daily employee decisions and accurate data logging generate the verified operational evidence that underpins corporate ESG disclosures",
                "Employees are legally forbidden from reading their company's published ESG reports",
                "Individual employees have zero influence because ESG is managed exclusively by external public relations firms"
            ],
            1,
            "Corporate ESG disclosures are only as credible as the underlying operational data collected from daily employee activities.",
            "Incorrect. Company ESG reports rely directly on the aggregate operational data logged by employees.",
            [
                "Incorrect. Legitimate ESG disclosures require auditable operational records from physical facilities.",
                "Correct. Real corporate ESG performance is built from daily sorting, energy habits, safety logs, and ethical purchasing recorded by staff on the ground.",
                "Incorrect. Transparency requires making sustainability reports accessible to employees, investors, and the public.",
                "Incorrect. While PR teams format communications, the underlying facts and figures derive entirely from workplace operations."
            ],
            "Operational Connection"
        ),
        make_q(
            6,
            "Why is ESG not simply corporate philanthropy or occasional charitable donations?",
            [
                "ESG embeds sustainability and ethical accountability directly into core business strategies, operational processes, and risk management",
                "Charity is strictly illegal under commercial law in Mauritius",
                "ESG means companies are never permitted to make a financial profit",
                "Philanthropy is managed by the police while ESG is managed by firefighters"
            ],
            0,
            "Philanthropy donates surplus funds, whereas ESG governs how the company makes its money and manages operational impacts every day.",
            "Incorrect. ESG integrates environmental and social risk management into daily core business operations.",
            [
                "Correct. Philanthropy focuses on giving money away; ESG focuses on how responsibly the company operates, treats workers, and manages environmental risks daily.",
                "Incorrect. Corporate Social Responsibility (CSR) and charitable donations are standard, legal practices in Mauritius.",
                "Incorrect. Sustainable businesses must remain commercially viable and profitable over the long term.",
                "Incorrect. Corporate governance and sustainability are management functions, not emergency services."
            ],
            "ESG vs Philanthropy"
        ),
        make_q(
            7,
            "Under the Social (S) pillar, why is occupational health and safety (OHS) considered a foundational responsibility rather than an optional perk?",
            [
                "Because ensuring every worker returns home safely every day is a primary moral, legal, and operational obligation of every business",
                "Because safety helmets make employees look more fashionable on corporate social media",
                "Because occupational safety is only relevant on construction scaffolding above 50 meters",
                "Because accidents have zero financial cost to commercial employers"
            ],
            2,
            "Workplace safety protects human life and dignity, forming the bedrock of the Social pillar under statutory laws like OSHA 2005.",
            "Incorrect. Occupational safety is a fundamental legal, moral, and operational duty under the Social pillar.",
            [
                "Incorrect. Safety is grounded in human protection and legal duty, not public relations imagery.",
                "Incorrect. Health and safety applies across all office, warehouse, retail, hospitality, and industrial environments.",
                "Correct. Under the Occupational Safety and Health Act 2005 and ESG standards, protecting worker physical and mental integrity is an essential corporate duty.",
                "Incorrect. Workplace injuries cause immense human suffering, lost productivity, medical costs, and severe legal liability."
            ],
            "Health & Safety"
        ),
        make_q(
            8,
            "How does a robust whistleblower and grievance mechanism support the Governance (G) pillar?",
            [
                "It encourages employees to spread unsubstantiated gossip about colleagues during lunch breaks",
                "It allows companies to delete all internal audit records without government oversight",
                "It requires managers to approve all personal social media posts by employees",
                "It provides a secure, confidential channel for employees to report ethical breaches, fraud, or safety hazards without fear of retaliation"
            ],
            3,
            "Confidential reporting channels allow organisations to identify and correct compliance failures before they cause severe damage.",
            "Incorrect. Whistleblower channels provide confidential, safe avenues to report genuine misconduct and safety risks.",
            [
                "Incorrect. Whistleblower protections are serious legal compliance mechanisms for genuine misconduct, not workplace gossip.",
                "Incorrect. Deleting audit records violates company laws and accounting standards.",
                "Incorrect. Whistleblowing focuses on internal operational misconduct, not personal private communications.",
                "Correct. Effective whistleblower policies protect integrity by enabling early detection of fraud, safety breaches, or environmental violations without fear of reprisal."
            ],
            "Whistleblower Systems"
        ),
        make_q(
            9,
            "In what way does supply chain due diligence connect the Environmental (E) and Governance (G) pillars?",
            [
                "By requiring management to verify that contractors and suppliers comply with environmental permits, labor laws, and ethical standards",
                "By forcing all suppliers to relocate their factories to the same street",
                "By refusing to pay supplier invoices for twelve months to boost company cash flow",
                "By ordering goods exclusively from foreign websites that have no registered contact address"
            ],
            0,
            "Governance controls (audits, contracts, due diligence) enforce environmental and social standards across the supply chain.",
            "Incorrect. Supply chain due diligence uses governance procedures to ensure suppliers operate responsibly.",
            [
                "Correct. Governance provides the oversight policies and contractual checks that ensure third-party vendors meet environmental compliance and ethical standards.",
                "Incorrect. Supply chains are geographically distributed; governance audits their operational practices.",
                "Incorrect. Unethical payment withholding damages supplier relationships and violates fair business conduct.",
                "Incorrect. Untraceable suppliers create immense governance, counterfeit, and regulatory risks."
            ],
            "Supply Chain Due Diligence"
        ),
        make_q(
            10,
            "How do honest, verifiable activity logs protect an organisation against accusations of greenwashing?",
            [
                "They prove that the company owns expensive luxury delivery vans",
                "They eliminate the need to maintain employee payroll records",
                "They provide auditable, empirical evidence that substantiates public sustainability claims and demonstrates genuine progress",
                "They guarantee that the company will never be inspected by environmental authorities"
            ],
            2,
            "Auditable data trails prove that public environmental statements are backed by real operational facts rather than marketing exaggerations.",
            "Incorrect. Verifiable activity data substantiates claims with empirical evidence, preventing greenwashing.",
            [
                "Incorrect. Asset displays do not prove environmental performance.",
                "Incorrect. Payroll compliance is a distinct statutory obligation.",
                "Correct. Transparent data trails allow independent auditors, customers, and regulators to verify that published green metrics reflect real operational reality.",
                "Incorrect. Regulatory authorities retain the statutory right to inspect facilities regardless of records."
            ],
            "Anti-Greenwashing"
        )
    ]
}

# ----------------------------------------------------
# ELH-10: Environmental Compliance (Next: 11)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), D (3) -> A:3, B:2, C:2, D:3
# ----------------------------------------------------
COURSES["ELH-10"] = {
    "courseCode": "ELH-10",
    "courseId": 10,
    "slug": "environmental-compliance",
    "title": "Environmental Compliance",
    "recommendedNextCourseId": 11,
    "seedName": "environmental-compliance-v3",
    "questions": [
        make_q(
            1,
            "What is the difference between a Legal Requirement and a Company Procedure?",
            [
                "Legal Requirements only apply to police officers; Company Procedures only apply to hotel guests",
                "Company Procedures override national laws whenever a deadline is near",
                "Legal Requirements are binding statutory laws (e.g. Environment Protection Act); Company Procedures are internal operational rules set by management to meet those laws and standards",
                "There is no difference; both are optional suggestions for office workers"
            ],
            2,
            "Legal requirements are binding statutory obligations; company procedures are internal controls established to ensure ongoing compliance.",
            "Incorrect. Laws are statutory rules enacted by government; company procedures are internal operational controls.",
            [
                "Incorrect. Environmental statutes apply to all corporate organisations, managers, and employees.",
                "Incorrect. Internal procedures can never legalize actions prohibited by national law.",
                "Correct. Statutory laws (e.g. EPA Mauritius 2002/2024, OSHA 2005) are legally binding; company procedures translate these laws into day-to-day workplace instructions.",
                "Incorrect. Neither laws nor mandatory company procedures are optional suggestions."
            ],
            "Compliance Framework"
        ),
        make_q(
            2,
            "What is the first step in the STOP–CHECK–CONTROL–RECORD–ESCALATE protocol when observing an unapproved chemical spill near a drain?",
            [
                "STOP: Pause the unsafe or non-compliant activity safely to prevent further spill generation",
                "RECORD: Take 50 photos before telling anyone about the leak",
                "CONTROL: Wash the spill into the drain with a high-pressure hose",
                "ESCALATE: Post a public video online before talking to the site supervisor"
            ],
            0,
            "The immediate priority is to pause the activity safely so that no additional volume of pollutant escapes into the environment.",
            "Incorrect. The first step is STOP—pause the activity safely to stop additional pollution.",
            [
                "Correct. Safely stopping the source (e.g. turning off a pump, setting an upright drum) prevents the spill from growing larger.",
                "Incorrect. While documentation is important later, stopping the active leak comes first.",
                "Incorrect. Hosing chemical spills into drains causes severe environmental pollution and is illegal.",
                "Incorrect. Public broadcasting delays physical containment and bypasses internal emergency response."
            ],
            "Action Protocol"
        ),
        make_q(
            3,
            "Why should chemical spills or contaminated washwater NEVER be hosed into stormwater drains?",
            [
                "Hosing water into drains makes the pavement too clean for delivery trucks",
                "Stormwater drains discharge directly into rivers, groundwater, and coastal lagoons without water treatment, causing severe environmental contamination",
                "Stormwater drains are reserved exclusively for drinking water storage",
                "Chemicals in storm drains automatically destroy solar panels"
            ],
            1,
            "Unlike municipal sewers, storm drains flow untreated into natural water bodies; hosing chemicals into drains poisons aquatic ecosystems.",
            "Incorrect. Storm drains flow untreated into natural waterways, lagoons, and groundwater.",
            [
                "Incorrect. Cleanliness is not the issue; toxic runoff destroys ecosystems.",
                "Correct. In Mauritius, storm drains discharge directly into canals, rivers, and coastal lagoons; hosing toxic chemicals down them causes severe environmental destruction.",
                "Incorrect. Storm drains carry untreated surface runoff, not potable drinking water.",
                "Incorrect. Solar panels operate on roofs and have no contact with underground stormwater drains."
            ],
            "Drainage Protection"
        ),
        make_q(
            4,
            "An environmental inspector arrives for an unannounced inspection, but the hazardous waste collection log is missing two recent entries. What should the facility team do?",
            [
                "Refuse entry to the inspector and lock all facility gates",
                "Quickly backdate fictional numbers into the logbook with a fresh pen",
                "Shred the entire logbook and claim the company opened yesterday",
                "Present existing verified records honestly, explain the administrative gap transparently, and commit to immediate corrective reconciliation"
            ],
            3,
            "Integrity and transparency are paramount; falsifying or backdating compliance records is a serious statutory offense.",
            "Incorrect. Present existing records honestly, disclose gaps transparently, and never falsify compliance logs.",
            [
                "Incorrect. Obstructing an authorized environmental inspector is a statutory offense under the Environment Protection Act.",
                "Incorrect. Falsifying or backdating records constitutes criminal fraud during an official inspection.",
                "Incorrect. Destroying compliance records violates waste tracking regulations and triggers severe penalties.",
                "Correct. Transparent disclosure demonstrates good faith, while immediate corrective reconciliation resolves the administrative documentation gap lawfully."
            ],
            "Inspection Integrity"
        ),
        make_q(
            5,
            "How does third-party contractor management connect to a company's environmental compliance obligations?",
            [
                "Companies carry zero responsibility for anything contractors do on their premises",
                "Companies share legal and operational duty of care for environmental activities, hazardous waste, and discharges occurring on their site",
                "Contractors are legally allowed to dump chemical waste anywhere in Mauritius",
                "Contractors are supervised exclusively by the Ministry of Tourism"
            ],
            1,
            "Organisations remain responsible for ensuring third-party contractors follow environmental permits and site safety procedures on their property.",
            "Incorrect. Companies share legal responsibility for contractor activities and environmental compliance on their site.",
            [
                "Incorrect. Delegating work to a contractor does not eliminate site environmental duty of care.",
                "Correct. Employers must ensure contractors follow site work permits, spill containment rules, and approved waste disposal pathways.",
                "Incorrect. Illegal dumping by contractors exposes both the contractor and the site owner to severe legal prosecution.",
                "Incorrect. Environmental enforcement is governed by the Ministry of Environment and local authorities."
            ],
            "Contractor Management"
        ),
        make_q(
            6,
            "What is the operational purpose of installing secondary containment spill pallets underneath liquid chemical storage drums?",
            [
                "To capture leaks, punctures, or valve drips before hazardous liquids reach bare ground, concrete, or stormwater drains",
                "To make the chemical drums look more elevated and decorative for visitors",
                "To allow employees to mix different waste chemicals together in the open air",
                "To prevent chemical drums from being photographed by safety auditors"
            ],
            0,
            "Secondary containment bunds capture leaks and failures, preventing chemicals from escaping into permeable soil or surface drains.",
            "Incorrect. Secondary containment captures drips and catastrophic leaks before they reach the ground or drains.",
            [
                "Correct. Spill pallets provide a secondary containment barrier capable of holding at least 110% of the largest stored container.",
                "Incorrect. Containment is an engineered environmental safeguard, not decorative furniture.",
                "Incorrect. Mixing uncharacterized waste chemicals in open pallets can cause violent chemical reactions and toxic gas release.",
                "Incorrect. Containment facilities should be clearly visible and accessible for routine safety audits."
            ],
            "Secondary Containment"
        ),
        make_q(
            7,
            "What distinguishes specific conditions in an Environmental Impact Assessment (EIA) or Preliminary Environmental Report (PER) licence from general environmental guidelines?",
            [
                "EIA licence conditions are purely suggestions that companies can ignore without consequence",
                "EIA conditions are written exclusively in Latin and cannot be understood by technicians",
                "EIA and PER conditions are legally binding statutory obligations tailored to that specific facility, and violating them triggers formal notices or closure orders",
                "EIA licences expire automatically every afternoon at 5 PM"
            ],
            2,
            "EIA and PER licences grant statutory operating authority under the Environment Protection Act and contain binding, enforceable conditions.",
            "Incorrect. EIA licence conditions are legally binding statutory terms specific to that licensed facility.",
            [
                "Incorrect. Violating EIA conditions constitutes a direct violation of the Environment Protection Act.",
                "Incorrect. Licence conditions specify clear operational parameters (e.g. effluent decibels, stack limits, discharge thresholds).",
                "Correct. An EIA/PER licence establishes mandatory operational constraints (e.g. maximum wastewater discharge volume, stack emission limits); breaches trigger stop notices.",
                "Incorrect. Licences remain in force across project lifecycles subject to ongoing compliance and periodic review."
            ],
            "EIA Licence Conditions"
        ),
        make_q(
            8,
            "When logging an unexpected environmental incident (such as a diesel spill in a vehicle yard), what evidence should the responder record?",
            [
                "Vague rumours heard in the cafeteria three days later",
                "A fictional creative story about how clean the yard was last year",
                "The responder's personal political opinions on climate change",
                "Accurate facts including timestamped photographs, exact physical location, estimated volume, container labels, and containment steps taken"
            ],
            3,
            "Accurate factual evidence supports rapid emergency response, corrective action, and credible statutory reporting.",
            "Incorrect. Log exact facts, timestamped photos, exact location, estimated volume, and containment actions taken.",
            [
                "Incorrect. Second-hand rumors are unreliable and compromise incident investigation.",
                "Incorrect. Incident reports must state verified facts, not fictionalized statements.",
                "Incorrect. Political opinions are irrelevant to operational incident logs.",
                "Correct. Factual, contemporaneous documentation (photos, time, coordinates, labels, actions) enables technicians to evaluate root causes and prove containment."
            ],
            "Incident Evidence"
        ),
        make_q(
            9,
            "Under Section 14 of the Occupational Safety and Health Act 2005, what is an employee's statutory duty when discovering a workplace environmental hazard?",
            [
                "To report immediately to the employer or supervisor any situation which presents an imminent and serious danger to health, safety, or the environment",
                "To keep the hazard secret so that company insurance premiums do not increase",
                "To resign immediately and seek employment in another country",
                "To attempt dangerous technical repairs without personal protective equipment"
            ],
            0,
            "The law mandates that employees must take reasonable care and promptly report imminent health, safety, and environmental hazards to supervisors.",
            "Incorrect. Employees have a legal duty to report imminent hazards to supervisors promptly.",
            [
                "Correct. Section 14 of OSHA 2005 establishes a clear employee duty to report hazards promptly so that preventative action can be taken.",
                "Incorrect. Concealing hazards breaches statutory employee obligations and increases risk of harm.",
                "Incorrect. The law protects employees who report hazards internally through proper channels.",
                "Incorrect. Employees should not take personal physical risks; report and isolate safely."
            ],
            "Employee Legal Duty"
        ),
        make_q(
            10,
            "What are the operational consequences of attempting to conceal an environmental spill or falsify waste manifests compared to prompt reporting?",
            [
                "Concealment leads to immediate promotion and financial bonuses",
                "Concealment eliminates all chemical pollution through magic",
                "There is no difference in consequence between honesty and falsification",
                "Concealment allows pollution to spread deeper into groundwater, multiplies cleanup costs, and transforms an accidental spill into serious criminal prosecution"
            ],
            3,
            "Hiding an incident allows contaminants to migrate, turning a manageable local cleanup into an ecological catastrophe with severe legal liabilities.",
            "Incorrect. Concealment turns an accidental spill into criminal prosecution and allows pollution to spread uncontrollably.",
            [
                "Incorrect. Concealment is grounds for gross misconduct, termination, and statutory prosecution.",
                "Incorrect. Toxic contaminants migrate through soil and groundwater; they do not disappear.",
                "Incorrect. Regulators and courts treat accidental reporting cooperatively, but penalize deliberate concealment with maximum severity.",
                "Correct. Immediate reporting allows rapid containment before pollutants reach aquifers or lagoons; hiding it compounds damage and incurs severe criminal liability."
            ],
            "Consequences of Non-Compliance"
        )
    ]
}

# ----------------------------------------------------
# ELH-11: Circular Economy (Next: 12)
# Keys: C (2), A (0), B (1), D (3), B (1), A (0), C (2), D (3), A (0), C (2) -> A:3, B:2, C:3, D:2
# ----------------------------------------------------
COURSES["ELH-11"] = {
    "courseCode": "ELH-11",
    "courseId": 11,
    "slug": "circular-economy",
    "title": "Circular Economy",
    "recommendedNextCourseId": 12,
    "seedName": "circular-economy-v3",
    "questions": [
        make_q(
            1,
            "What is the fundamental difference between a Linear Economy and a Circular Economy?",
            [
                "Linear uses square boxes while Circular uses round barrels",
                "Linear economy is completely free while Circular economy requires payment in gold",
                "A Linear Economy follows a 'Take–Make–Waste' extractive model, whereas a Circular Economy designs out waste and keeps materials in productive use at highest value",
                "There is no difference; circular economy is a marketing slogan for landfill operations"
            ],
            2,
            "Circular economy shifts away from the resource-depleting take-make-dispose model to closed loops that retain value through reuse, repair, and recovery.",
            "Incorrect. Linear is 'take-make-waste', whereas circular designs out waste and keeps resources circulating.",
            [
                "Incorrect. The terms refer to resource flow models, not the geometric shape of packaging.",
                "Incorrect. Both operate within commercial economies; circular models often improve resource profitability.",
                "Correct. Linear models extract resources, produce goods, and discard them; Circular systems retain maximum material and energy value over multiple cycles.",
                "Incorrect. Circular principles actively divert materials from landfill through redesign, refurbishment, and recovery."
            ],
            "Circular Fundamentals"
        ),
        make_q(
            2,
            "In the 9-Step Circular Value Hierarchy (9R), which priority action should be taken BEFORE considering recycling?",
            [
                "Refusing unnecessary single-use items, reducing consumption, and reusing or repairing existing assets",
                "Sending all surplus items straight to the Mare Chicose landfill",
                "Incinerating all plastics in an open backyard fire",
                "Purchasing double the quantity of products each quarter"
            ],
            0,
            "Refuse, rethink, reduce, reuse, and repair retain far more value and energy than recycling, which should only be considered after higher loops are exhausted.",
            "Incorrect. Prevention, reuse, and repair always take precedence over recycling.",
            [
                "Correct. Higher-tier circular strategies (Refuse, Reduce, Reuse, Repair) preserve the manufactured integrity and embedded energy of products.",
                "Incorrect. Landfill disposal is the lowest endpoint of linear waste, not a circular strategy.",
                "Incorrect. Open burning is hazardous, toxic, and illegal under Mauritian environmental law.",
                "Incorrect. Over-purchasing accelerates linear resource depletion and waste generation."
            ],
            "9R Hierarchy"
        ),
        make_q(
            3,
            "What essential operational safeguard MUST be completed before surplus company computers or laptops are donated or refurbished for secondary use?",
            [
                "Painting the laptop screens with green enamel paint",
                "Conducting certified data sanitisation (cryptographic wiping) to protect sensitive company records and verifying electrical battery safety",
                "Deleting the desktop wallpaper and hoping no one finds confidential files",
                "Submerging the laptops in salt water to disinfect them"
            ],
            1,
            "Asset refurbishment must ensure rigorous data protection compliance and electrical safety before secondary transfer.",
            "Incorrect. Certified data wiping and battery safety checks must precede hardware donation or reuse.",
            [
                "Incorrect. Painting screens destroys electronic display hardware.",
                "Correct. Secure, certified data erasure complies with Data Protection regulations while battery health checks ensure user safety.",
                "Incorrect. Simply deleting wallpaper leaves confidential company and client data completely recoverable.",
                "Incorrect. Salt water causes short-circuits and permanent corrosive destruction of electronics."
            ],
            "Asset Refurbishment Safeguards"
        ),
        make_q(
            4,
            "A commercial logistics facility receives weekly shipments of components. Which packaging approach best demonstrates circular principles?",
            [
                "Ordering single-use thin plastic film that tears upon opening and must be discarded",
                "Wrapping each shipment in four layers of wax-coated paper that cannot be recycled",
                "Burning delivery boxes in the facility yard every Friday afternoon",
                "Using durable, standardized reusable plastic transit totes on a deposit-and-return system with the supplier"
            ],
            3,
            "Reusable standardized transit packaging circulates hundreds of times between suppliers and buyers, eliminating single-use packaging waste.",
            "Incorrect. Standardized reusable return crates eliminate recurring single-use packaging waste.",
            [
                "Incorrect. Single-use plastic wrap is discarded after one use, embodying linear waste.",
                "Incorrect. Wax coatings prevent paper repulping and render cardboard unrecyclable.",
                "Incorrect. Open burning of waste violates environmental and fire safety laws.",
                "Correct. Standardized returnable totes circulate over hundreds of delivery cycles, cutting packaging costs and eliminating cardboard waste."
            ],
            "Circular Logistics"
        ),
        make_q(
            5,
            "What is the first step in the CHECK–USE–CARE–SHARE–RECOVER operational protocol when an employee needs office equipment?",
            [
                "Submit an urgent external purchase order for the most expensive new model",
                "CHECK: Determine whether functional equipment already exists within the company, in storage, or can be shared across departments",
                "Throw away existing equipment to justify buying new models",
                "Borrow equipment from a competitor without permission"
            ],
            1,
            "Before purchasing new goods, checking internal inventory and asset availability prevents redundant purchasing and keeps existing assets in use.",
            "Incorrect. Step 1 is CHECK—verify whether existing equipment can be repurposed, shared, or retrieved from storage.",
            [
                "Incorrect. Purchasing without checking existing inventory drives unnecessary capital expenditure.",
                "Correct. Checking internal storage, asset registries, or neighbouring departments often resolves needs without spending new resources.",
                "Incorrect. Discarding functional equipment is the epitome of linear waste.",
                "Incorrect. Unauthorized appropriation of external property violates ethical and legal standards."
            ],
            "CHECK-USE-CARE Protocol"
        ),
        make_q(
            6,
            "How does repairing and reupholstering ergonomic office chairs rather than discarding them illustrate circular value retention?",
            [
                "It retains the high-value steel frame, mechanism, and embedded manufacturing energy while restoring comfort at a fraction of the cost of new chairs",
                "It forces employees to work on uncomfortable broken furniture to save money",
                "It guarantees that office chairs will become antique collector items in two months",
                "It is a ceremonial exercise that has zero economic or environmental benefit"
            ],
            0,
            "Repairing mechanical components and replacing upholstery preserves the structural steel and aluminium, saving 70–80% of costs and carbon.",
            "Incorrect. Repair and refurbishment preserve the embedded materials and energy of structural frames.",
            [
                "Correct. The heavy steel chassis and lift cylinder remain intact; repairing worn fabric retains 80% of the chair's value and prevents landfill disposal.",
                "Incorrect. Professional refurbishment restores full ergonomic function and comfort.",
                "Incorrect. Commercial office furniture is maintained for utility and comfort, not antique trading.",
                "Incorrect. Refurbishment delivers measurable financial savings and avoids substantial embodied carbon emissions."
            ],
            "Repair & Refurbishment"
        ),
        make_q(
            7,
            "Why is recycling alone insufficient to solve global resource depletion without aggressive waste prevention and reuse?",
            [
                "Recycling is legally prohibited in all developing island states",
                "Recycled materials can never be touched by human hands safely",
                "Recycling requires energy, degrades material fibers over successive cycles (downcycling), and does not stop continuous virgin resource extraction",
                "Recycling machines produce more toxic greenhouse gases than coal power stations"
            ],
            2,
            "Recycling is an energy-intensive industrial process that downcycles materials; eliminating waste at the source remains the superior ecological priority.",
            "Incorrect. Recycling consumes energy and downcycles materials; waste prevention and reuse must take precedence.",
            [
                "Incorrect. Recycling is active and encouraged across Mauritius and globally.",
                "Incorrect. Recycled materials are processed and manufactured into safe commercial products every day.",
                "Correct. Recycling paper or plastics degrades polymer lengths over cycles (downcycling); preventing waste and reusing items avoids extraction entirely.",
                "Incorrect. Modern recycling uses far less energy than virgin refining, but prevention remains far superior."
            ],
            "Recycling Limitations"
        ),
        make_q(
            8,
            "What is a 'Product-as-a-Service' (PaaS) commercial model in a circular office environment?",
            [
                "Buying 1,000 lightbulbs and throwing them in a dumpster when they burn out",
                "Requiring employees to build their own desk furniture from scrap wood",
                "Selling corporate office buildings to overseas investors every week",
                "Leasing services (such as lighting or printing) where the provider retains equipment ownership, manages maintenance, and takes back hardware for remanufacturing"
            ],
            3,
            "Product-as-a-Service incentivizes manufacturers to build durable, upgradeable equipment because they remain responsible for maintenance and end-of-life recovery.",
            "Incorrect. Product-as-a-Service leases performance while the manufacturer manages maintenance and end-of-life takeback.",
            [
                "Incorrect. Discarding lamps is a linear throwaway model.",
                "Incorrect. PaaS utilizes professional commercial equipment designed for long-term service contracts.",
                "Incorrect. Real estate sales are property transactions, not circular product service systems.",
                "Correct. When suppliers sell 'illumination' or 'printed pages' rather than hardware, they design durable, modular machines that are easy to repair and refurbish."
            ],
            "Product-as-a-Service"
        ),
        make_q(
            9,
            "How can a warehouse or retail store in Mauritius repurpose clean, unsoiled cardboard shipping cartons internally?",
            [
                "Shred or perforate clean cardboard on-site to create protective void-fill packaging for outgoing customer orders, replacing plastic bubble wrap",
                "Soak the cardboard in diesel fuel to make outdoor fire starters",
                "Bury the cardboard in public beaches to fertilize ocean coral",
                "Throw clean boxes into general waste dumpsters every morning"
            ],
            0,
            "Repurposing clean cardboard as packaging void-fill keeps materials circulating productively on-site and eliminates purchasing plastic packaging.",
            "Incorrect. Repurposing clean cardboard as packaging void-fill avoids purchasing virgin plastic bubble wrap.",
            [
                "Correct. On-site cardboard perforators turn scrap boxes into shock-absorbing packaging mesh, eliminating plastic bubble wrap costs and waste.",
                "Incorrect. Soaking cardboard in fuel is an extreme fire hazard and causes toxic air pollution.",
                "Incorrect. Discarding waste on beaches is illegal and causes severe coastal contamination.",
                "Incorrect. Discarding clean cardboard into general waste sends valuable fibers to Mare Chicose landfill."
            ],
            "Internal Repurposing"
        ),
        make_q(
            10,
            "What is a core circular principle to follow when designing new corporate uniforms, promotional merchandise, or workwear?",
            [
                "Using blended synthetic fabrics with glued metallic badges that can never be separated or recycled",
                "Manufacturing clothing designed to fall apart after three washes so staff order new clothes regularly",
                "Selecting durable, mono-material natural or recyclable fabrics designed for easy disassembly, repair, and end-of-life textile recycling",
                "Spraying uniforms with permanent fluorescent chemicals"
            ],
            2,
            "Designing with mono-materials and durable construction allows textiles to be repaired, disassembled, and recycled into high-value fibers at end-of-life.",
            "Incorrect. Selecting durable, mono-material textiles enables easy repair and end-of-life fiber recycling.",
            [
                "Incorrect. Multi-material blends (like cotton-poly-elastane with glued foils) cannot be mechanically or chemically recycled.",
                "Incorrect. Planned obsolescence is the hallmark of linear waste.",
                "Correct. Mono-material garments (e.g. 100% organic cotton or 100% recycled polyester) without glued composite badges enable straightforward mechanical textile recycling.",
                "Incorrect. Permanent fluorescent chemical treatments complicate textile recycling and wastewater safety."
            ],
            "Circular Design"
        )
    ]
}

# Output as python code
with open("artifacts/api-server/src/scripts/sprint17_0A_course_data.py", "w") as f:
    f.write("# Sprint 17.0A Course Assessment Remediation Data (ELH-01 through ELH-11)\n")
    f.write("# Generated deterministically with 10 questions per course, balanced keys, optionFeedback on all options.\n\n")
    f.write("COURSES_DATA = " + json.dumps(COURSES, indent=2) + "\n")

print("sprint17_0A_course_data.py successfully written with all courses ELH-02 through ELH-11!")
