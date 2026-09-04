#!/usr/bin/env python3
import json
import os

def get_courses_10_to_14():
    return [
      # 10. ELH-47: Green Leases & Tenant Sustainability Engagement (D3)
      {
        "courseCode": "ELH-47",
        "title": "Green Leases & Tenant Sustainability Engagement",
        "slug": "green-leases-and-tenant-sustainability-engagement",
        "description": "Master green lease drafting, split-incentive resolution, tenant sub-metering, shared energy targets, and fit-out environmental standards in commercial property.",
        "fullDescription": "Green Leases & Tenant Sustainability Engagement equips commercial property asset managers, leasing executives, and facilities directors to align landlord and tenant environmental incentives. Learn how to draft enforceable green lease clauses, overcome the traditional landlord-tenant split-incentive barrier through capital recovery mechanisms, establish transparent tenant utility sub-metering, mandate sustainable tenant fit-out guides, and form collaborative building green committees.",
        "categoryId": 3,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_GOVERNANCE_ETHICS",
        "secondaryCompetencies": ["COMP_ENERGY", "COMP_LEADERSHIP"],
        "learningObjectives": [
          "Draft enforceable Green Lease clauses covering energy data sharing, operational schedules, and waste diversion.",
          "Structure capital cost-recovery mechanisms to solve the landlord-tenant split-incentive barrier for energy retrofits.",
          "Implement sustainable tenant fit-out guidelines (LED lighting power densities, low-VOC materials, sub-metering).",
          "Establish active Landlord-Tenant Green Committees to govern shared building resource targets."
        ],
        "intendedRoles": ["Commercial Property Managers", "Leasing Executives", "Asset Managers", "Corporate Real Estate Leads"],
        "badgeName": "Green Leasing Specialist",
        "badgeDescription": "Demonstrated competence in structuring green lease agreements, resolving split-incentives, and governing tenant sustainability.",
        "completionMessage": "Congratulations! You have completed Green Leases & Tenant Sustainability Engagement and are prepared to align landlord-tenant environmental governance.",
        "recommendedNextCourseCode": "ELH-48",
        "lessons": [
          {
            "title": "1. The Split-Incentive Dilemma & Green Lease Foundations",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why traditional commercial leases block sustainability investments and how green leases align financial interests.",
            "contentBlocks": [
              { "id": "elh47-h1", "type": "heading", "level": 3, "text": "Overcoming the Landlord-Tenant Split Incentive" },
              { "id": "elh47-t1", "type": "short_text", "position": 1, "bodyText": "In traditional commercial leases, landlords have little incentive to invest in high-efficiency chillers or solar panels because the tenant receives 100% of the utility bill savings. Conversely, tenants hesitate to invest in fixtures because they do not own the building. A **Green Lease (or Aligned Lease)** resolves this split-incentive by including capital cost-recovery clauses: the landlord funds the high-efficiency retrofit, and the tenant reimburses a portion of the capital cost through a service fee that is strictly smaller than their verified utility bill savings, creating an immediate win-win." },
              { "id": "elh47-c1", "type": "callout", "variant": "info", "title": "Split-Incentive Principle", "bodyText": "A successful green lease ensures that neither party bears the full capital cost while the other receives all the financial rewards." }
            ]
          },
          {
            "title": "2. Core Green Lease Clauses & Data Transparency",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Drafting data-sharing obligations, operational operating hours, and waste segregation covenants.",
            "contentBlocks": [
              { "id": "elh47-h2", "type": "heading", "level": 3, "text": "Standardizing Green Lease Legal Clauses" },
              { "id": "elh47-t2", "type": "short_text", "position": 1, "bodyText": "A standard Green Lease contains four core covenants: (1) **Automated Energy & Water Data Sharing**: Tenants must grant landlords access to sub-metered telemetry for mandatory ESG and national carbon reporting; (2) **Operating Hours & Temperature Bounds**: Setting standard office comfort bands (23–25°C) and defining after-hours HVAC request surcharges; (3) **Waste Segregation**: Mandating tenant compliance with building 4-stream recycling; and (4) **Sustainable Procurement**: Requiring cleaning contractors to use certified green chemicals." },
              { "id": "elh47-c2", "type": "callout", "variant": "tip", "title": "Data Access Invariant", "bodyText": "Include explicit monthly automated utility telemetry sharing clauses in all commercial leasing schedules." }
            ]
          },
          {
            "title": "3. Sustainable Fit-Out Guides & Commissioning Handover",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Enforcing lighting power densities, low-VOC finishes, and sub-metering during tenant interior construction.",
            "contentBlocks": [
              { "id": "elh47-h3", "type": "heading", "level": 3, "text": "Governing Tenant Interior Fit-Outs" },
              { "id": "elh47-t3", "type": "short_text", "position": 1, "bodyText": "A building's operational efficiency is easily ruined by inefficient tenant fit-outs. Mandatory Sustainable Fit-Out Guidelines must enforce: (1) Maximum Lighting Power Density (< 6.0 W/m2 using 100% LED with daylight harvesting); (2) Mandatory digital electric and water sub-meters integrated with the building BMS; (3) Low-VOC paints, adhesives, and sealants (< 50 g/L); and (4) Strict construction waste recycling (> 75% diversion). Landlords must inspect and commission fit-outs prior to issuing tenant occupancy certificates." },
              { "id": "elh47-c3", "type": "callout", "variant": "action", "title": "Fit-Out Commissioning", "bodyText": "Withhold fit-out security deposits until independent engineering verification confirms sub-meter telemetry and lighting density compliance." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Green Leasing Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate tenant lease negotiations, data sharing friction, and after-hours HVAC requests.",
            "contentBlocks": [
              {
                "id": "elh47-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Tenant Refusing Smart Sub-Meter Telemetry Sharing",
                "prompt": "An international corporate tenant renting 3 floors in your commercial tower refuses to share their sub-metered electricity consumption data with building management, claiming it violates internal corporate confidentiality. As Asset Manager, how do you resolve this?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Cut off all electrical power to the tenant's 3 floors immediately.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Unlawful power disconnection violates commercial tenancy law and creates severe legal liability."
                  },
                  {
                    "id": "opt_b",
                    "text": "Explain that sub-metered kWh telemetry is used exclusively for aggregated whole-building carbon and green certification reporting (LEED/BREEAM), provide a standard data-protection annex guaranteeing data anonymization, and reference the Green Lease data-sharing covenant.",
                    "isCorrect": True,
                    "feedback": "Correct! Addressing confidentiality concerns with formal data protection guarantees while referencing contractual green covenants resolves friction constructively."
                  },
                  {
                    "id": "opt_c",
                    "text": "Remove the sub-meters and let the tenant consume unlimited unmetered electricity.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Removing sub-meters destroys utility accountability and ruins whole-building energy tracking."
                  },
                  {
                    "id": "opt_d",
                    "text": "Guess the tenant's consumption numbers and submit fabricated data.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Fabricating data violates ESG reporting standards and creates audit fraud."
                  }
                ]
              },
              {
                "id": "elh47-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Excessive After-Hours HVAC Overrides",
                "prompt": "A financial services tenant routinely requests after-hours central chiller cooling for their entire 1,500 m2 floor on weekends, even though only 3 employees are working at desks. The central chiller plant consumes 250 kW just to cool the mostly empty floor. How do you resolve this energy waste?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Allow the central plant to run at full power for 3 people at zero extra charge.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Absorbing massive central plant costs encourages continuous energy waste and inflates building carbon emissions."
                  },
                  {
                    "id": "opt_b",
                    "text": "Meet with the tenant to propose installing dedicated small-tonnage Variable Refrigerant Flow (VRF) split units for their weekend shift zone, while establishing a cost-reflective after-hours central plant hourly billing tariff in their lease agreement.",
                    "isCorrect": True,
                    "feedback": "Correct! Providing zoned small-scale cooling solutions combined with transparent, cost-reflective after-hours tariffs eliminates central plant idling waste."
                  },
                  {
                    "id": "opt_c",
                    "text": "Ban employees from ever working on weekends.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Landlords cannot dictate tenant business hours."
                  },
                  {
                    "id": "opt_d",
                    "text": "Lock all building doors on Friday afternoon.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Locking out tenants violates lease access agreements and causes commercial disputes."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Tenant Governance & 30-Day Green Lease Implementation",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Chartering building green committees and executing your 30-day leasing roadmap.",
            "contentBlocks": [
              { "id": "elh47-h4", "type": "heading", "level": 3, "text": "Chartering the Building Green Committee" },
              { "id": "elh47-t4", "type": "short_text", "position": 1, "bodyText": "Establish a quarterly Building Green Committee bringing together building facilities management and tenant sustainability leads. Use these sessions to review whole-building energy/water performance, celebrate tenant recycling champions, coordinate annual e-waste collection drives, and collaborate on shared green building certification milestones." },
              { "id": "elh47-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Review your standard commercial lease template and insert standard green leasing clauses; (2) Publish an updated Sustainable Tenant Fit-Out Guide; and (3) Schedule the inaugural meeting of your property's Building Green Committee." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the 'Split-Incentive Barrier' in commercial property leasing and how does a Green Lease resolve it?",
            "options": [
              "When tenants split their monthly rent in half without permission.",
              "When landlords pay for capital efficiency retrofits but tenants receive 100% of the utility savings; resolved by cost-recovery clauses where tenants share verified energy savings to reimburse capital.",
              "When building elevators break down in between floors.",
              "When landlords charge tenants for outdoor sunshine."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The split incentive occurs when the party funding the upgrade (landlord) does not receive the operational utility savings (tenant); green lease cost-recovery clauses align these incentives.",
            "incorrectExplanation": "Green lease cost-recovery clauses align capital expenditure with operational utility bill reductions.",
            "optionFeedback": [
              "Incorrect. Rent payment splitting is a lease default issue, not the split-incentive barrier.",
              "Correct! Green leases resolve the split-incentive by sharing verified utility bill savings to amortize landlord capital investments.",
              "Incorrect. Elevator breakdowns are mechanical maintenance issues.",
              "Incorrect. Sunshine charges do not exist in commercial leasing."
            ],
            "practicalTakeaway": "Incorporate capital cost-recovery clauses in green leases to enable landlords and tenants to co-invest in high-yield energy retrofits.",
            "learningOutcome": "Resolve landlord-tenant split incentives in commercial leasing",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "Which of the following is a core clause typically found in an enforceable Green Lease agreement?",
            "options": [
              "Tenants must wear green clothing to work on Mondays.",
              "Mandatory energy and water sub-meter telemetry sharing for ESG reporting, sustainable fit-out standards, and building recycling compliance.",
              "Landlords are allowed to enter tenant offices unannounced at any time of night.",
              "Tenants must agree never to use air conditioning."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Core green lease covenants establish data sharing for ESG reporting, enforce fit-out environmental standards, and mandate waste recycling compliance.",
            "incorrectExplanation": "Standard green covenants mandate telemetry data sharing, fit-out standards, and recycling compliance.",
            "optionFeedback": [
              "Incorrect. Dress codes have no place in commercial leasing contracts.",
              "Correct! Telemetry sharing, fit-out guidelines, and recycling covenants form the legal backbone of green leases.",
              "Incorrect. Unannounced night entry violates tenant quiet enjoyment and security covenants.",
              "Incorrect. Green leases manage efficiency within comfortable thermal standards, not ban cooling."
            ],
            "practicalTakeaway": "Standardize data-sharing and fit-out covenants across all commercial leasing contracts.",
            "learningOutcome": "Draft enforceable green lease covenants",
            "competencyArea": "COMP_GOVERNANCE_ETHICS"
          },
          {
            "question": "What is the recommended maximum Lighting Power Density (LPD) for tenant office fit-outs in sustainable commercial buildings?",
            "options": [
              "50.0 W/m2 using incandescent floodlights.",
              "Less than 6.0 W/m2 using 100% LED fixtures with occupancy sensing and daylight harvesting.",
              "500 W/m2.",
              "0.0 W/m2 (complete darkness)."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Modern high-efficiency LED office lighting achieves optimal visual ergonomics and lux levels while consuming under 6.0 Watts per square meter.",
            "incorrectExplanation": "High-efficiency LED systems with smart controls deliver excellent lighting quality under 6.0 W/m2.",
            "optionFeedback": [
              "Incorrect. 50 W/m2 represents obsolete, highly wasteful lighting technology.",
              "Correct! < 6.0 W/m2 using smart LEDs is the international green building standard for commercial offices.",
              "Incorrect. 500 W/m2 is an extreme fire hazard.",
              "Incorrect. Workplaces require proper illumination for safety and productivity."
            ],
            "practicalTakeaway": "Mandate an LPD ceiling of < 6.0 W/m2 in tenant fit-out guidelines to prevent lighting energy bloat.",
            "learningOutcome": "Specify lighting power density limits in fit-out guidelines",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "Why should tenant fit-out guidelines strictly regulate the Volatile Organic Compound (VOC) content of interior paints and adhesives?",
            "options": [
              "To ensure the paint dries in exactly 3 seconds.",
              "To protect indoor air quality (IAQ), prevent off-gassing of toxic chemicals, and reduce employee respiratory illness and Sick Building Syndrome.",
              "To make the walls waterproof against tsunamis.",
              "To increase the weight of building partitions."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Low-VOC finishes (< 50 g/L) prevent toxic chemical off-gassing, safeguarding occupant health, cognitive performance, and indoor air quality.",
            "incorrectExplanation": "Low-VOC paints and adhesives protect occupant health and eliminate indoor air pollution.",
            "optionFeedback": [
              "Incorrect. VOC content governs chemical toxicity, not drying speed.",
              "Correct! Low-VOC materials safeguard indoor air quality and prevent Sick Building Syndrome for office workers.",
              "Incorrect. Low-VOC formulations are interior air quality specifications, not maritime flood barriers.",
              "Incorrect. VOC content does not alter structural partition mass."
            ],
            "practicalTakeaway": "Enforce low-VOC material standards (< 50 g/L) in all tenant fit-outs to ensure healthy indoor air quality.",
            "learningOutcome": "Enforce low-VOC and indoor environmental quality standards",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "How does installing digital tenant electricity sub-metering improve commercial building energy efficiency?",
            "options": [
              "It automatically turns off tenant computers during meetings.",
              "It establishes direct utility cost accountability based on actual tenant consumption rather than arbitrary square-meter allocation, motivating active conservation.",
              "It eliminates the need for power lines in the building.",
              "It generates cryptocurrency for the landlord."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Sub-metering charges tenants for actual consumption, eliminating the 'free rider' effect where wasteful tenants are subsidized by conservative ones.",
            "incorrectExplanation": "Direct sub-metering replaces arbitrary pro-rata billing with actual consumption accountability, driving 15-20% conservation.",
            "optionFeedback": [
              "Incorrect. Sub-meters measure power; they do not control tenant IT devices.",
              "Correct! Direct consumption billing creates financial accountability and eliminates the pro-rata free-rider problem.",
              "Incorrect. Sub-meters monitor electrical distribution; they do not replace wiring.",
              "Incorrect. Sub-meters measure kWh; they do not mine cryptocurrency."
            ],
            "practicalTakeaway": "Require digital sub-metering in all tenant lease agreements to drive direct energy accountability.",
            "learningOutcome": "Implement tenant digital sub-metering and billing governance",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "What is the primary role of a quarterly Building Green Committee in commercial real estate?",
            "options": [
              "To organize mandatory employee karaoke competitions.",
              "To provide a collaborative forum for landlords and tenants to review shared resource data, coordinate waste campaigns, and resolve operational sustainability friction.",
              "To audit employee personal bank accounts.",
              "To enforce dress code rules in tenant private suites."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Green Committees foster ongoing collaboration between landlords and tenants, reviewing utility performance and driving joint sustainability initiatives.",
            "incorrectExplanation": "Building Green Committees align landlord and tenant stakeholders around shared building environmental performance goals.",
            "optionFeedback": [
              "Incorrect. Green committees focus on environmental governance, not social karaoke.",
              "Correct! Collaborative committees allow landlords and tenants to review resource data and drive joint efficiency campaigns.",
              "Incorrect. Financial auditing of personal accounts is illegal.",
              "Incorrect. Tenancy committees have no authority over private tenant workplace dress."
            ],
            "practicalTakeaway": "Establish a Building Green Committee to maintain active stakeholder collaboration throughout the lease term.",
            "learningOutcome": "Establish and facilitate building green committees",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How should landlords manage construction and demolition (C&D) waste generated during tenant office fit-outs?",
            "options": [
              "Allow contractors to throw drywall and metal into building general waste compactors.",
              "Mandate a C&D Waste Management Plan requiring minimum 75% diversion from landfill through on-site sorting and verified recycling manifests.",
              "Dump all construction debris in the building basement permanently.",
              "Throw construction debris out of upper floor windows into the street."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Fit-out guides must require structured waste diversion (> 75%), on-site sorting of gypsum, timber, and metals, and verified disposal receipts.",
            "incorrectExplanation": "Mandatory C&D waste management plans require source separation and verified recycling diversion above 75%.",
            "optionFeedback": [
              "Incorrect. General compactors are for operational waste, not heavy construction debris.",
              "Correct! Requiring a C&D Waste Plan with >= 75% recycling diversion prevents landfill dumping and recovers valuable materials.",
              "Incorrect. Storing construction debris in basements violates fire and safety codes.",
              "Incorrect. Throwing debris from windows is an illegal, life-threatening safety violation."
            ],
            "practicalTakeaway": "Require tenant contractors to submit verified waste recycling manifests before releasing fit-out security deposits.",
            "learningOutcome": "Manage construction waste diversion in tenant fit-outs",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Which action should a Commercial Property Manager prioritize within their first 30 days of green lease adoption?",
            "options": [
              "Evict all existing commercial tenants immediately.",
              "Incorporate standard green lease clauses into upcoming lease renewals, publish a Sustainable Fit-Out Guide, and schedule the inaugural Green Committee meeting.",
              "Shut off water to all office restrooms to save utility costs.",
              "Replace all glass windows with solid concrete blocks."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days should focus on updating lease contract templates, issuing fit-out guides, and convening the tenant Green Committee.",
            "incorrectExplanation": "Prioritize lease contract template updates, fit-out guidelines, and tenant green committee kickoff during initial implementation.",
            "optionFeedback": [
              "Incorrect. Mass evictions destroy rental income and create severe legal disputes.",
              "Correct! Updating lease templates, publishing fit-out guides, and convening green committees establishes immediate leasing governance.",
              "Incorrect. Cutting restroom water violates occupational health and safety regulations.",
              "Incorrect. Blocking windows eliminates natural daylight and violates building codes."
            ],
            "practicalTakeaway": "Update your standard lease template and publish a sustainable fit-out guide during your first month.",
            "learningOutcome": "Execute a 30-day green leasing roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 11. ELH-48: Smart Building Automation & BMS Optimization (D3)
      {
        "courseCode": "ELH-48",
        "title": "Smart Building Automation & BMS Optimization",
        "slug": "smart-building-automation-bms-optimization",
        "description": "Master Building Management System (BMS) architecture, automated schedule optimization, sensor calibration, fault detection diagnostics (FDD), and IoT integration in commercial properties.",
        "fullDescription": "Smart Building Automation & BMS Optimization equips facility engineers, BMS operators, and MEP supervisors to unlock the full energy-saving potential of digital building automation systems. Learn how to eliminate automated override drift, program dynamic night purge ventilation and enthalpy economizers, implement automated Fault Detection and Diagnostics (FDD), integrate IoT sub-metering protocols (BACnet/Modbus), and configure alarm priority management that prevents alert fatigue.",
        "categoryId": 3,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_ENERGY",
        "secondaryCompetencies": ["COMP_TECHNOLOGY", "COMP_GHG"],
        "learningObjectives": [
          "Audit and eliminate manual BMS software overrides and schedule drift across commercial facilities.",
          "Program dynamic enthalpy economizers and night purge ventilation algorithms to exploit favorable ambient conditions.",
          "Deploy automated Fault Detection and Diagnostics (FDD) rules to identify stuck valves and simultaneous heating/cooling.",
          "Establish systematic annual sensor calibration protocols for temperature, humidity, CO2, and pressure transducers."
        ],
        "intendedRoles": ["BMS Operators", "Facility Engineers", "MEP Supervisors", "Energy Analysts"],
        "badgeName": "BMS Automation Specialist",
        "badgeDescription": "Demonstrated competence in Building Management System optimization, automated scheduling, and fault detection analytics.",
        "completionMessage": "Congratulations! You have completed Smart Building Automation & BMS Optimization and are equipped to operate intelligent, low-carbon building systems.",
        "recommendedNextCourseCode": "ELH-49",
        "lessons": [
          {
            "title": "1. BMS Architecture, Override Audits & Schedule Hygiene",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why 70% of BMS systems suffer from operational override drift and how to restore automated schedule control.",
            "contentBlocks": [
              { "id": "elh48-h1", "type": "heading", "level": 3, "text": "Restoring Automated BMS Schedule Integrity" },
              { "id": "elh48-t1", "type": "short_text", "position": 1, "bodyText": "Building Management Systems are designed to automate energy efficiency, yet studies show that within three years of commissioning, up to 70% of building control loops have been placed into permanent manual software override by operators solving temporary complaints. This 'override drift' leaves large fans, pumps, and chillers running 24/7 in empty buildings. Implementing weekly automated override audit reports and programming automatic 4-hour software timeout resets restores automated control and eliminates baseload energy waste." },
              { "id": "elh48-c1", "type": "callout", "variant": "info", "title": "Override Governance Invariant", "bodyText": "Never permit permanent manual software overrides. All manual overrides must feature automatic software timeout resets (max 4 hours)." }
            ]
          },
          {
            "title": "2. Advanced Control Strategies: Economizers & Night Purge",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Programming free cooling enthalpy economizers, outdoor air resets, and pre-dawn night purge ventilation.",
            "contentBlocks": [
              { "id": "elh48-h2", "type": "heading", "level": 3, "text": "Harnessing Free Cooling and Thermal Purge" },
              { "id": "elh48-t2", "type": "short_text", "position": 1, "bodyText": "Advanced BMS programming captures free environmental cooling: (1) **Enthalpy Economizers**: When outdoor air is cooler and drier than return air (e.g. during cool tropical winter mornings), dampers open to 100% fresh air, reducing chiller mechanical load; (2) **Night Purge Ventilation**: Running high-volume fresh air fans between 4:00 AM and 6:00 AM flushes out trapped nighttime building heat and structural thermal mass, cooling the interior before occupants arrive; and (3) **Static Pressure Reset**: Modulating VAV supply fan duct static pressure based on the most demanding terminal box cuts fan power by 25%." },
              { "id": "elh48-c2", "type": "callout", "variant": "tip", "title": "Economizer Safety", "bodyText": "Use dual-enthalpy controls (temperature + relative humidity) rather than dry-bulb temperature alone to prevent introducing humid tropical air into air-conditioned spaces." }
            ]
          },
          {
            "title": "3. Automated Fault Detection & Diagnostics (FDD)",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Deploying automated FDD rule engines to detect stuck actuator valves, hunting dampers, and simultaneous heating/cooling.",
            "contentBlocks": [
              { "id": "elh48-h3", "type": "heading", "level": 3, "text": "Automating Invisible Mechanical Failure Detection" },
              { "id": "elh48-t3", "type": "short_text", "position": 1, "bodyText": "Many HVAC energy leaks are invisible to human operators: a chilled water valve stuck 20% open while an electric reheat coil runs simultaneously to maintain room temperature. **Fault Detection and Diagnostics (FDD)** algorithms continuously analyze BMS sensor telemetry to detect anomalies: (1) Simultaneous heating and cooling; (2) Valve or damper actuator hunting (oscillating open/closed every 30 seconds); (3) Economizer damper leakage; and (4) Disconnected temperature sensors reading constant frozen values." },
              { "id": "elh48-c3", "type": "callout", "variant": "action", "title": "FDD Protocol", "bodyText": "Review weekly FDD automated diagnostic reports during engineering maintenance planning meetings." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Building Automation Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate BMS override management, economizer programming, and alarm prioritization trade-offs.",
            "contentBlocks": [
              {
                "id": "elh48-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Diagnosing Simultaneous Heating and Cooling",
                "prompt": "An FDD alert reports that Air Handling Unit 4 (serving a commercial office floor) has its chilled water valve commanded 85% open while its electric reheat coil is operating at 60% power during lunch hours. The zone temperature is steady at 22°C and no occupants are complaining. What is your engineering action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Ignore the alert since occupants are comfortable and the zone temperature is 22°C.",
                    "isCorrect": False,
                    "feedback": "Incorrect. The zone is comfortable only because energy-intensive cooling and electric heating are fighting each other, wasting massive electricity."
                  },
                  {
                    "id": "opt_b",
                    "text": "Inspect the supply air temperature sensor and BMS deadband logic, discover that the cooling and heating setpoints are overlapping at 22.0°C with 0°C deadband, and reprogram a 2.0°C deadband (Cooling: 24°C, Heating: 21.5°C) with heating lockout during cooling mode.",
                    "isCorrect": True,
                    "feedback": "Correct! Implementing proper temperature deadbands and software lockouts eliminates simultaneous heating/cooling and saves massive utility spend."
                  },
                  {
                    "id": "opt_c",
                    "text": "Disable the FDD software so it stops generating alerts.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Suppressing diagnostic alerts blinds engineering to active energy waste."
                  },
                  {
                    "id": "opt_d",
                    "text": "Increase electric reheat power to 100% to overpower the chilled water valve.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Increasing reheat power escalates energy waste and risks tripping electrical breakers."
                  }
                ]
              },
              {
                "id": "elh48-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Flooding BMS Alarm Console & Alarm Fatigue",
                "prompt": "The BMS control console is flooded with 1,200 non-critical nuisance alarms every 24 hours (mostly minor 0.2°C temperature fluctuations in storage rooms). Technicians have muted the sound and stopped reviewing the alarm log, causing them to miss a critical server room cooling failure. How do you re-engineer the alarm system?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Delete all alarms in the entire BMS database permanently.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Deleting all alarms leaves critical facilities without emergency warning protection."
                  },
                  {
                    "id": "opt_b",
                    "text": "Implement an Alarm Rationalization audit: categorize alarms into Critical (immediate life safety/IT risk), Warning (operational degradation requiring 4-hour action), and Informational (logged silently without popups), and widen non-critical storage room deadbands.",
                    "isCorrect": True,
                    "feedback": "Correct! Alarm rationalization eliminates nuisance alarms, cures alert fatigue, and ensures critical equipment failures receive immediate response."
                  },
                  {
                    "id": "opt_c",
                    "text": "Hire 5 additional operators to stare at the unrationalized alarm screen 24/7.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Adding staff without fixing alarm thresholds perpetuates alert fatigue and high labor costs."
                  },
                  {
                    "id": "opt_d",
                    "text": "Change all alarm text to flashing red strobe banners.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Adding visual noise worsens cognitive overload and technician burnout."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. BMS Governance & 30-Day Automation Optimization Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing sensor calibration cycles, operator password tiers, and executing your 30-day BMS plan.",
            "contentBlocks": [
              { "id": "elh48-h4", "type": "heading", "level": 3, "text": "Institutionalizing BMS Governance Protocols" },
              { "id": "elh48-t4", "type": "short_text", "position": 1, "bodyText": "Maintain strict BMS access control: (1) Operator-level accounts (view status and request timed overrides); (2) Supervisor-level accounts (modify schedules and clear alarms); and (3) Administrator accounts (modify control logic and setpoints). Schedule annual physical calibration of outdoor enthalpy sensors, zone CO2 sensors, and chilled water temperature probes using certified reference instruments." },
              { "id": "elh48-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Run a full BMS manual override audit and clear all permanent overrides; (2) Program automated 4-hour timeout limits on all manual operator commands; and (3) Implement an alarm rationalization review to eliminate nuisance alarm fatigue." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is 'BMS Override Drift' and why is it a primary cause of commercial building energy waste?",
            "options": [
              "When computers physically slide off the operator desk.",
              "When operators place equipment control loops into permanent manual software overrides to solve temporary hot/cold calls, leaving systems running 24/7 indefinitely.",
              "When electrical power lines drift across the street.",
              "When air conditioning air flows backwards into water pipes."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Override drift occurs when temporary manual overrides are forgotten, leaving fans, pumps, and chillers running continuously during unoccupied hours.",
            "incorrectExplanation": "Override drift refers to forgotten manual software overrides running equipment 24/7 in empty buildings.",
            "optionFeedback": [
              "Incorrect. Override drift is a software control governance failure, not physical furniture movement.",
              "Correct! Forgotten manual software overrides run equipment continuously, wasting 15-30% of total building energy.",
              "Incorrect. Power lines are physical infrastructure, unrelated to BMS control loops.",
              "Incorrect. Hydronic and airflow systems are isolated mechanical circuits."
            ],
            "practicalTakeaway": "Audit BMS manual software overrides weekly and mandate automated 4-hour software timeout resets.",
            "learningOutcome": "Audit and eliminate BMS software override drift",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "Why is dual-enthalpy measurement (temperature and relative humidity) essential when programming air economizer free cooling in tropical climates?",
            "options": [
              "Because dry-bulb temperature alone ignores moisture content; cool outdoor air with 95% humidity will overload indoor dehumidification systems if introduced.",
              "Because enthalpy measurements make building fans run at supersonic speeds.",
              "Because dry-bulb sensors are illegal in commercial buildings.",
              "Because enthalpy measurements convert outdoor air into pure oxygen."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Tropical air can be 22°C but 95% relative humidity; measuring total enthalpy prevents drawing in moist air that causes indoor condensation and mold.",
            "incorrectExplanation": "Dual-enthalpy ensures outdoor air is both cool and dry before activating free-cooling dampers.",
            "optionFeedback": [
              "Correct! Dual-enthalpy prevents drawing in cool but highly humid tropical air that causes indoor mold and moisture damage.",
              "Incorrect. Economizers modulate standard commercial airflow, not supersonic speeds.",
              "Incorrect. Dry-bulb temperature sensors are standard components.",
              "Incorrect. Economizers circulate outdoor atmospheric air; they do not alter oxygen concentration."
            ],
            "practicalTakeaway": "Always use dual-enthalpy controls (temperature + humidity) for economizer free cooling in humid climates.",
            "learningOutcome": "Program dual-enthalpy economizer control strategies",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is 'Simultaneous Heating and Cooling' and how does Fault Detection and Diagnostics (FDD) identify it?",
            "options": [
              "When a room has a refrigerator and a microwave oven.",
              "When cooling valves and heating coils operate at the same time in the same zone due to overlapping setpoints or deadband failure; detected by FDD comparing valve positions and temperature sensors.",
              "When building occupants drink hot coffee in an air-conditioned room.",
              "When the sun shines through window glass."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Simultaneous heating and cooling occurs when mechanical cooling and heating fight each other in the same zone; FDD flags conflicting valve commands and abnormal thermal gradients.",
            "incorrectExplanation": "Simultaneous heating and cooling wastes massive energy when heating and cooling actuators operate concurrently in the same space.",
            "optionFeedback": [
              "Incorrect. Kitchen appliances are standard occupant conveniences, not HVAC simultaneous heating/cooling.",
              "Correct! FDD algorithms identify when chilled water valves and heating elements operate concurrently, eliminating severe energy waste.",
              "Incorrect. Occupant beverages do not alter central HVAC mechanical staging.",
              "Incorrect. Solar gain is an external thermal load, not internal mechanical conflict."
            ],
            "practicalTakeaway": "Deploy automated FDD rules to catch simultaneous heating and cooling conflicts across all air handling units.",
            "learningOutcome": "Detect and eliminate simultaneous heating and cooling with FDD",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the primary operational benefit of programming Night Purge Ventilation in commercial buildings during pre-dawn hours (4:00 AM–6:00 AM)?",
            "options": [
              "It scares away nocturnal birds from the building roof.",
              "It flushes out trapped heat and cools down structural concrete thermal mass using cool outdoor morning air, reducing chiller startup load by 15% to 25%.",
              "It increases the building heating bill.",
              "It replaces the need for morning office vacuuming."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Night purge flushes warm indoor air and cools structural concrete with cool morning air, significantly lowering chiller load when work begins.",
            "incorrectExplanation": "Night purge utilizes cool pre-dawn air to pre-cool structural thermal mass, reducing peak electrical demand during morning startup.",
            "optionFeedback": [
              "Incorrect. Night purge operates inside air distribution systems, unrelated to outdoor birds.",
              "Correct! Flushing warm indoor air with cool pre-dawn air pre-cools building thermal mass, cutting morning chiller startup loads by 15-25%.",
              "Incorrect. Night purge is used in cooling-dominated facilities to reduce cooling energy.",
              "Incorrect. Night purge ventilates air; it does not perform physical floor cleaning."
            ],
            "practicalTakeaway": "Program automated night purge ventilation to pre-cool building thermal mass during cool pre-dawn hours.",
            "learningOutcome": "Implement night purge ventilation strategies",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is 'Alarm Fatigue' in BMS operations and how can Alarm Rationalization resolve it?",
            "options": [
              "When building alarm bells run out of electrical battery power.",
              "When operators are overwhelmed by thousands of nuisance non-critical alarms, causing them to ignore all alarms; resolved by filtering, prioritizing, and widening nuisance deadbands.",
              "When building alarms play soft lullaby music.",
              "When fire alarms activate every 10 seconds legally."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Alarm fatigue occurs when excessive nuisance alerts cause operators to ignore the console; rationalization categorizes alarms by criticality and eliminates noise.",
            "incorrectExplanation": "Alarm rationalization filters nuisance alerts into clear priority tiers, ensuring critical life-safety and equipment alarms receive immediate action.",
            "optionFeedback": [
              "Incorrect. Alarm fatigue is human cognitive overload, not hardware battery depletion.",
              "Correct! Alarm rationalization eliminates nuisance alarms and categorizes alerts by true urgency, ensuring critical failures are not missed.",
              "Incorrect. BMS alarms provide audio/visual warnings, not music.",
              "Incorrect. Frequent false fire alarms indicate sensor faults and violate life safety standards."
            ],
            "practicalTakeaway": "Perform an Alarm Rationalization review to eliminate nuisance alerts and prevent dangerous operator alarm fatigue.",
            "learningOutcome": "Execute BMS alarm rationalization and priority management",
            "competencyArea": "COMP_TECHNOLOGY"
          },
          {
            "question": "How does VAV (Variable Air Volume) Static Pressure Reset save supply fan energy?",
            "options": [
              "By turning off all building ventilation fans permanently.",
              "By dynamically modulating fan speed to maintain the lowest duct static pressure required to satisfy the single most open VAV damper, rather than maintaining a constant high pressure.",
              "By blowing air at maximum pressure 24/7.",
              "By pressurizing air conditioning ducts with steam."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Static pressure reset dynamically lowers fan speed until the most demanding VAV damper is ~90% open, minimizing fan power according to fan affinity laws.",
            "incorrectExplanation": "Dynamic static pressure reset minimizes fan energy by trimming duct pressure to match real-time terminal box requirements.",
            "optionFeedback": [
              "Incorrect. Ventilation fans must operate to maintain indoor air quality.",
              "Correct! Static pressure reset reduces fan speed to match actual demand, cutting supply fan power by 20-30% under fan affinity laws.",
              "Incorrect. Constant maximum pressure causes high energy waste and noisy terminal dampers.",
              "Incorrect. Ductwork circulates cooled air, not high-pressure steam."
            ],
            "practicalTakeaway": "Program dynamic static pressure reset on all VAV supply fans to save 20-30% in fan electrical power.",
            "learningOutcome": "Configure dynamic static pressure reset on VAV systems",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "Why is annual calibration of zone CO2 sensors critical for Demand-Controlled Ventilation (DCV)?",
            "options": [
              "Because CO2 sensors turn into smoke detectors if not calibrated.",
              "Because optical CO2 sensors drift over time; an uncalibrated sensor reading falsely high forces excessive fresh air intake, while reading falsely low causes occupant drowsiness and poor IAQ.",
              "Because CO2 sensors consume 50 kW of electricity if uncalibrated.",
              "Because uncalibrated sensors change building room numbers."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Sensor drift distorts outdoor air ventilation rates; false high readings waste immense cooling energy, while false low readings cause poor air quality and cognitive fatigue.",
            "incorrectExplanation": "CO2 sensor calibration ensures fresh air ventilation matches actual occupancy without wasting energy on over-ventilation.",
            "optionFeedback": [
              "Incorrect. CO2 sensors measure carbon dioxide concentration; smoke detectors operate on optical or ionization principles.",
              "Correct! Calibrated CO2 sensors ensure accurate ventilation, preventing costly over-ventilation and poor indoor air quality.",
              "Incorrect. CO2 sensors are low-voltage electronic devices consuming under 2 Watts.",
              "Incorrect. Sensors measure gas concentration; they do not interact with room signage."
            ],
            "practicalTakeaway": "Calibrate zone CO2 sensors annually using certified calibration gas to ensure accurate Demand-Controlled Ventilation.",
            "learningOutcome": "Maintain CO2 sensor calibration for Demand-Controlled Ventilation",
            "competencyArea": "COMP_DATA_ANALYTICS"
          },
          {
            "question": "Which action should a BMS Facility Engineer prioritize during their first 30 days of automation optimization?",
            "options": [
              "Delete the BMS operating software from the main server.",
              "Audit all manual software overrides, program automated 4-hour timeout limits, and conduct an alarm rationalization review.",
              "Lock all building thermostats at 16°C permanently.",
              "Turn off all building safety exhaust fans."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days must focus on eliminating manual override drift, setting timeout guardrails, and cleaning up the alarm console.",
            "incorrectExplanation": "Initial focus must center on override audits, timeout automation, and alarm rationalization.",
            "optionFeedback": [
              "Incorrect. Deleting BMS software destroys building automation and central control.",
              "Correct! Auditing overrides, enforcing automated timeouts, and rationalizing alarms establishes immediate operational control.",
              "Incorrect. Chilling spaces to 16°C causes massive energy waste and severe occupant complaints.",
              "Incorrect. Disabling safety exhaust creates dangerous environmental and fire hazards."
            ],
            "practicalTakeaway": "Clear manual overrides, set auto-timeouts, and clean up alarm consoles during your first month of BMS optimization.",
            "learningOutcome": "Execute a 30-day BMS optimization action roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 12. ELH-49: Construction Site Environmental Controls (D3)
      {
        "courseCode": "ELH-49",
        "title": "Construction Site Environmental Controls",
        "slug": "construction-site-environmental-controls",
        "description": "Master construction site environmental management, erosion and sediment control (ESCP), dust suppression, chemical bunding, noise mitigation, and statutory compliance in civil projects.",
        "fullDescription": "Construction Site Environmental Controls equips site project managers, civil engineers, environmental officers, and main contractors to enforce statutory environmental compliance across civil and building construction sites. Learn how to design and maintain Erosion and Sediment Control Plans (ESCP), deploy silt fences and sediment retention basins, suppress airborne PM10/PM2.5 dust emissions, manage chemical and fuel storage bunds, control construction noise and vibration in residential zones, and pass regulatory environmental inspections.",
        "categoryId": 4,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_COMPLIANCE",
        "secondaryCompetencies": ["COMP_WATER", "COMP_BIODIVERSITY"],
        "learningObjectives": [
          "Formulate and implement a site-specific Erosion and Sediment Control Plan (ESCP) complying with national environmental regulations.",
          "Deploy effective sediment barriers, silt fences, and sediment retention basins before ground disturbance.",
          "Implement continuous dust suppression protocols (wheel wash stations, water misting, stabilized haul roads).",
          "Establish secondary containment bunding (110% capacity) for all on-site fuel, hydraulic oil, and hazardous chemical storage."
        ],
        "intendedRoles": ["Site Engineers", "Construction Project Managers", "EHS Officers", "Civil Contractors"],
        "badgeName": "Construction Environmental Officer",
        "badgeDescription": "Demonstrated competence in construction site environmental management, sediment control, and statutory EHS compliance.",
        "completionMessage": "Congratulations! You have completed Construction Site Environmental Controls and are prepared to lead compliant, low-impact construction operations.",
        "recommendedNextCourseCode": "ELH-50",
        "lessons": [
          {
            "title": "1. Statutory Environmental Obligations & Site Management Plans",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Understanding EIA licensing conditions, environmental stop-work orders, and constructing the CEMP.",
            "contentBlocks": [
              { "id": "elh49-h1", "type": "heading", "level": 3, "text": "Construction Environmental Management Plans (CEMP)" },
              { "id": "elh49-t1", "type": "short_text", "position": 1, "bodyText": "Construction activities in Mauritius are governed by the Environment Protection Act (EPA) and specific Environmental Impact Assessment (EIA) license conditions. Failing to manage sediment runoff, oil leaks, or dust can trigger immediate statutory Stop-Work Orders, criminal fines, and severe commercial delays. A comprehensive **Construction Environmental Management Plan (CEMP)** maps all sensitive receptors (neighboring homes, coral lagoons, waterways), establishes physical control perimeters, and defines daily monitoring routines before earthmoving equipment mobilizes." },
              { "id": "elh49-c1", "type": "callout", "variant": "info", "title": "Compliance Invariant", "bodyText": "All physical erosion barriers and chemical bunds must be fully installed and inspected prior to initiating any site excavation or tree clearing." }
            ]
          },
          {
            "title": "2. Erosion, Sedimentation & Stormwater Runoff Control",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Installing geotextile silt fences, sediment basins, interceptor swales, and concrete washout pits.",
            "contentBlocks": [
              { "id": "elh49-h2", "type": "heading", "level": 3, "text": "Preventing Sediment Runoff into Waterways and Lagoons" },
              { "id": "elh49-t2", "type": "short_text", "position": 1, "bodyText": "Uncontrolled muddy runoff from construction sites suffocates freshwater streams, smothers coastal coral reefs, and blocks municipal drainage systems. Effective **Erosion and Sediment Control (ESCP)** requires: (1) Trenching silt fences into the ground (minimum 150mm depth) along down-slope perimeters; (2) Constructing sediment settling ponds with gravel check dams; (3) Stabilizing exposed earth embankments with geotextile hydro-seeding; and (4) Providing dedicated, impermeable, lined **Concrete Washout Pits** to prevent high-pH (pH > 12) concrete slurry from entering groundwater." },
              { "id": "elh49-c2", "type": "callout", "variant": "tip", "title": "Silt Fence Installation Rule", "bodyText": "Never place silt fences across concentrated flow channels or streams; they are designed exclusively for sheet flow runoff along slope perimeters." }
            ]
          },
          {
            "title": "3. Dust Suppression, Noise & Chemical Bunding",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Deploying wheel wash bays, water bowser misting, 110% chemical bunding, and acoustic noise screens.",
            "contentBlocks": [
              { "id": "elh49-h3", "type": "heading", "level": 3, "text": "Dust, Noise and Hazardous Substance Controls" },
              { "id": "elh49-t3", "type": "short_text", "position": 1, "bodyText": "Protecting neighborhood air quality and soil requires: (1) **Dust Control**: Operating automated vehicle wheel wash bays at site exit gates, paving or gravel-stabilizing primary haul roads, and wetting earth stockpiles with water bowsers during dry wind conditions; (2) **Noise & Vibration**: Restricting noisy breaking and piling to authorized daytime hours and deploying acoustic barrier curtains; and (3) **Chemical Bunding**: Storing all diesel fuel, generator sets, formwork oil, and solvents within impermeable secondary containment bunds sized to hold 110% of the largest tank volume." },
              { "id": "elh49-c3", "type": "callout", "variant": "action", "title": "Bunding Standard", "bodyText": "Verify that all chemical storage bunds have 110% containment capacity and are equipped with drainage valves kept strictly locked in the closed position." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Site Environmental Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate real-world site inspection crises, torrential storm runoff, and chemical spill responses.",
            "contentBlocks": [
              {
                "id": "elh49-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Torrential Storm Runoff Breaching Perimeter Silt Fences",
                "prompt": "A sudden tropical downpour occurs during heavy earthworks. Muddy runoff is overflowing the perimeter silt fences and discharging red sediment slurry directly into a public road stormwater drain leading to the lagoon. The excavation subcontractor wants to keep digging to stay on schedule. What is your site management action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Allow excavation to continue and ignore the stormwater drain.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Discharging sediment into public drains and coastal lagoons violates the EPA, causes severe coral reef damage, and triggers immediate legal closure."
                  },
                  {
                    "id": "opt_b",
                    "text": "Issue an immediate temporary stop-work on earthmoving, deploy straw bales and sandbags to reinforce the breached perimeter, redirect runoff into an on-site sediment retention basin, and de-silt the retention pond with vacuum pumps before resuming work.",
                    "isCorrect": True,
                    "feedback": "Correct! Immediate physical containment, halting earth disturbance, and redirecting runoff into retention basins stops illegal discharge and protects marine ecology."
                  },
                  {
                    "id": "opt_c",
                    "text": "Pour bleach into the muddy runoff to clear the color.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Adding bleach introduces toxic chemical pollution that kills aquatic life."
                  },
                  {
                    "id": "opt_d",
                    "text": "Blame the municipal road department for having drains near the site.",
                    "isCorrect": False,
                    "feedback": "Incorrect. The contractor has full statutory responsibility for managing all site runoff."
                  }
                ]
              },
              {
                "id": "elh49-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Ready-Mix Concrete Truck Washing into Soil",
                "prompt": "A ready-mix concrete truck driver finishes pouring a foundation slab and begins washing the concrete chute directly onto exposed soil near the site boundary, causing caustic milky slurry (pH 12.5) to pool on the ground. What do you do?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Allow the driver to finish and cover the slurry with sand.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Concrete washout water is highly caustic (pH 12+) and leaches heavy metals into groundwater; burying it violates environmental regulations."
                  },
                  {
                    "id": "opt_b",
                    "text": "Stop the driver immediately, direct the truck to the designated lined Concrete Washout Pit, excavate the contaminated soil for neutralization and disposal, and issue a formal non-conformance penalty to the concrete supplier.",
                    "isCorrect": True,
                    "feedback": "Correct! Enforcing the use of impermeable washout pits, remediating contaminated soil, and penalizing supplier non-compliance ensures environmental protection."
                  },
                  {
                    "id": "opt_c",
                    "text": "Wash the caustic slurry into the nearest drinking water well.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Discharging caustic waste into drinking water aquifers is a catastrophic criminal offense."
                  },
                  {
                    "id": "opt_d",
                    "text": "Order the driver to wash their chute on the public highway.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Washing concrete onto public roads causes traffic hazards and environmental contamination."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Site Inspection Checklists & 30-Day Environmental Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Conducting daily environmental walkabouts, maintaining statutory registers, and executing your 30-day site plan.",
            "contentBlocks": [
              { "id": "elh49-h4", "type": "heading", "level": 3, "text": "Conducting Daily Site Environmental Walkabouts" },
              { "id": "elh49-t4", "type": "short_text", "position": 1, "bodyText": "Daily site environmental walkabouts by site engineers prevent violations before government inspectors arrive. Use a 5-point daily inspection card: (1) Silt fence anchoring and sediment buildup (< 50% capacity); (2) Wheel wash operation and haul road dust levels; (3) Fuel bund integrity and drip tray placement under mobile generators; (4) Concrete washout pit lining integrity; and (5) Waste segregation bin purity (scrap steel, timber, general waste). Log all findings in the site environmental register." },
              { "id": "elh49-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Inspect all site perimeter silt fences and clear accumulated sediment; (2) Verify that all mobile diesel generators have dedicated secondary containment drip trays; and (3) Install a designated lined Concrete Washout Pit at the batching/wash area." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary statutory purpose of a Construction Environmental Management Plan (CEMP)?",
            "options": [
              "To design the interior furniture layout of the site office.",
              "To systematically identify environmental risks, define physical control measures, and ensure full compliance with EIA license conditions and national environmental laws.",
              "To calculate the total financial profits of the main contractor.",
              "To eliminate the need for architectural construction drawings."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "A CEMP establishes the mandatory operational controls and monitoring protocols required to prevent environmental harm and comply with statutory EIA licenses.",
            "incorrectExplanation": "A CEMP provides the environmental governance framework ensuring compliance with EIA licenses and environmental legislation.",
            "optionFeedback": [
              "Incorrect. CEMP governs environmental risk management, not office furniture design.",
              "Correct! The CEMP operationalizes environmental compliance and mitigates pollution risks across the construction lifecycle.",
              "Incorrect. Financial accounting is managed through commercial contracts, not the CEMP.",
              "Incorrect. Architectural and engineering drawings remain mandatory for structural delivery."
            ],
            "practicalTakeaway": "Ensure a site-specific CEMP is approved and implemented before breaking ground on any civil project.",
            "learningOutcome": "Formulate and apply Construction Environmental Management Plans",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "How must a geotextile silt fence be installed to function effectively as a sediment barrier?",
            "options": [
              "Laid loosely on top of grass without any trenching or stakes.",
              "Trenched into the ground at least 150mm deep, backfilled with compacted soil, and staked on the downslope side along slope contour perimeters.",
              "Hung from the branches of nearby trees.",
              "Placed across the middle of a high-velocity river."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Silt fences must be trenched 150mm into the ground and staked to prevent muddy water from flowing underneath the fabric.",
            "incorrectExplanation": "Proper silt fence installation requires trenching into the ground to prevent undercutting by runoff.",
            "optionFeedback": [
              "Incorrect. Untrenched fabric allows sediment runoff to flow directly underneath.",
              "Correct! Trenching at least 150mm deep and staking securely along contours ensures effective sediment capture.",
              "Incorrect. Silt fences must be grounded along soil perimeters, not hung in trees.",
              "Incorrect. Silt fences are designed for sheet runoff, not high-velocity stream channels."
            ],
            "practicalTakeaway": "Always verify that silt fences are trenched at least 150mm into the soil to prevent undercutting.",
            "learningOutcome": "Install and inspect geotextile sediment barriers correctly",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "Why is concrete washout slurry (pH > 12) considered hazardous to site soil and groundwater if not contained in lined pits?",
            "options": [
              "Because it turns soil into pure gold.",
              "Because it is highly caustic, leaches toxic heavy metals, and severely alters soil and groundwater pH, killing plant microbiomes and aquatic life.",
              "Because concrete water is too cold for local bacteria.",
              "Because it attracts dangerous wild sharks onto the construction site."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Concrete washout has a caustic pH of 12+ (similar to liquid bleach) and leaches metals, severely damaging soil ecology and contaminating groundwater aquifers.",
            "incorrectExplanation": "Caustic concrete washout water alters soil pH and contaminates groundwater unless contained in impermeable lined pits.",
            "optionFeedback": [
              "Incorrect. Concrete slurry is a polluting waste, not precious metal.",
              "Correct! Concrete washout is highly caustic (pH 12+) and leaches toxic metals, requiring strict containment in lined washout pits.",
              "Incorrect. Temperature is not the primary hazard; chemical alkalinity and heavy metal toxicity are.",
              "Incorrect. Land-based construction sites are isolated from marine predators."
            ],
            "practicalTakeaway": "Mandate dedicated, impermeable, lined Concrete Washout Pits for all concrete truck chute washing on site.",
            "learningOutcome": "Manage caustic concrete washout containment and disposal",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the standard required secondary containment capacity for on-site diesel fuel storage bunds?",
            "options": [
              "10% of tank capacity.",
              "110% of the single largest tank capacity (or 25% of aggregate storage volume, whichever is greater).",
              "0% (single-walled unbunded plastic drums placed on soil).",
              "500%."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Environmental regulations require secondary containment bunds to hold 110% of the largest tank capacity to capture catastrophic leaks and rainfall buffer.",
            "incorrectExplanation": "Secondary containment bunds must hold 110% of the largest tank capacity to ensure complete spill capture.",
            "optionFeedback": [
              "Incorrect. 10% capacity is completely inadequate to contain a fuel tank breach.",
              "Correct! 110% secondary containment ensures complete spill capture and prevents soil and aquifer contamination.",
              "Incorrect. Storing fuel without bunding is a severe environmental violation.",
              "Incorrect. 500% is excessive for standard civil engineering secondary containment."
            ],
            "practicalTakeaway": "Ensure all diesel and chemical storage bunds provide at least 110% secondary containment capacity.",
            "learningOutcome": "Implement secondary containment bunding for hazardous substances",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "What is the most effective operational method for preventing fugitive dust emissions from construction haul roads and vehicle exits?",
            "options": [
              "Encouraging trucks to drive at 100 km/h across dry dirt roads.",
              "Operating an automated tire wheel wash bay at site gates, surfacing haul roads with crushed aggregate, and regular water bowser misting.",
              "Banning all trucks from leaving the construction site permanently.",
              "Lighting fires on the haul roads."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Wheel wash stations prevent mud tracking onto public roads, while gravel surfaces and water bowser misting suppress airborne PM10/PM2.5 dust.",
            "incorrectExplanation": "Gravel stabilization, wheel wash bays, and water misting combine to eliminate fugitive dust and road mud tracking.",
            "optionFeedback": [
              "Incorrect. High vehicle speeds generate massive clouds of hazardous dust and cause site accidents.",
              "Correct! Automated wheel washes, gravel-stabilized roads, and water misting effectively control dust and road tracking.",
              "Incorrect. Vehicle movement is required for site logistics.",
              "Incorrect. Open burning on construction sites is strictly illegal."
            ],
            "practicalTakeaway": "Install wheel wash stations and deploy water bowsers to maintain low-dust, compliant haul roads.",
            "learningOutcome": "Deploy fugitive dust and vehicle track-out suppression systems",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "When should sediment buildup behind a perimeter silt fence be cleared out by maintenance crews?",
            "options": [
              "Only after the silt fence collapses completely into the neighbor's property.",
              "When accumulated sediment reaches one-third to one-half (33–50%) of the fence height, restoring retention capacity before the next storm.",
              "Never; sediment must be left to accumulate indefinitely.",
              "Every 5 minutes regardless of weather."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Clearing sediment when it reaches 33–50% height prevents structural fence failure and ensures adequate storm retention capacity.",
            "incorrectExplanation": "Maintenance protocols require desilting when sediment reaches 33-50% height to prevent fence overtopping and collapse.",
            "optionFeedback": [
              "Incorrect. Waiting for structural collapse causes severe environmental contamination and clean-up costs.",
              "Correct! Clearing sediment at 33-50% fence height prevents fence failure and maintains stormwater capacity.",
              "Incorrect. Accumulated sediment eventually overspills and tears the fabric.",
              "Incorrect. Routine inspections determine maintenance timing based on actual sediment depth."
            ],
            "practicalTakeaway": "Inspect silt fences after every rainstorm and desilt when buildup reaches 50% capacity.",
            "learningOutcome": "Maintain and service sediment control infrastructure",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "How should mobile diesel generators and fuel transfer pumps be protected against ground leaks on a construction site?",
            "options": [
              "Placed directly over open stormwater trenches.",
              "Stationed inside impermeable, chemical-resistant drip trays equipped with oil-absorbent pads and rain covers.",
              "Buried underground in wet soil.",
              "Left unmonitored in dense vegetation."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Mobile machinery must sit in secondary containment drip trays to catch fuel drips and hydraulic oil leaks before they penetrate soil.",
            "incorrectExplanation": "Drip trays with absorbent spill pads prevent localized oil and fuel drips from contaminating soil and groundwater.",
            "optionFeedback": [
              "Incorrect. Placing equipment over storm drains allows direct fuel runoff into waterways.",
              "Correct! Impermeable drip trays and spill kits catch equipment drips and prevent soil contamination.",
              "Incorrect. Direct soil contact allows oil to leach into groundwater aquifers.",
              "Incorrect. Unmonitored machinery in vegetation creates fire and environmental contamination risks."
            ],
            "practicalTakeaway": "Place all mobile generators and pumps inside dedicated secondary drip trays with oil spill pads.",
            "learningOutcome": "Deploy mobile equipment drip containment and spill prevention",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Which action should a Construction Environmental Officer prioritize within the first 30 days of mobilization?",
            "options": [
              "Demolish all neighboring buildings without permits.",
              "Inspect and trench perimeter silt fences, install a lined concrete washout pit, and verify 110% bunding for all fuel storage tanks.",
              "Allow subcontractors to dump waste in local mangrove wetlands.",
              "Turn off all site drinking water systems."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days of mobilization require establishing physical environmental controls: trenched silt fences, concrete washouts, and fuel bunds.",
            "incorrectExplanation": "Initial site environmental setup focuses on sediment fences, lined washout pits, and secondary fuel bunds.",
            "optionFeedback": [
              "Incorrect. Unpermitted demolition is illegal and violates civil safety laws.",
              "Correct! Silt fences, lined concrete washouts, and 110% fuel bunding establish core statutory environmental safeguards.",
              "Incorrect. Dumping in wetlands is a severe criminal environmental offense.",
              "Incorrect. Providing clean drinking water is a basic statutory worker health and safety requirement."
            ],
            "practicalTakeaway": "Install trenched silt fences, concrete washout pits, and fuel bunds before commencing site earthworks.",
            "learningOutcome": "Execute a 30-day construction environmental mobilization roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 13. ELH-50: Sustainable Building Materials & Low-Carbon Concrete (D3)
      {
        "courseCode": "ELH-50",
        "title": "Sustainable Building Materials & Low-Carbon Concrete",
        "slug": "sustainable-building-materials-and-low-carbon-concrete",
        "description": "Master embodied carbon reduction, Supplementary Cementitious Materials (SCMs), timber construction, Environmental Product Declarations (EPDs), and circular material procurement in civil engineering.",
        "fullDescription": "Sustainable Building Materials & Low-Carbon Concrete equips structural engineers, procurement leads, and construction project managers to slash the upfront embodied carbon (A1–A5 lifecycle stages) of built assets. Learn how to specify low-carbon concrete mixes using Supplementary Cementitious Materials (SCMs such as GGBS and pulverized fuel ash), evaluate Environmental Product Declarations (EPDs), integrate sustainably certified mass timber (FSC/PEFC), design for deconstruction (DfD), and source circular recycled aggregates in island construction.",
        "categoryId": 4,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_CIRCULARITY",
        "secondaryCompetencies": ["COMP_GHG", "COMP_SUPPLY_CHAIN"],
        "learningObjectives": [
          "Specify low-carbon concrete mix designs using Ground Granulated Blast-furnace Slag (GGBS) and fly ash SCMs.",
          "Interpret and compare Environmental Product Declarations (EPDs) for structural building products.",
          "Evaluate structural applications for sustainably certified timber and engineered bamboo.",
          "Incorporate circular aggregate recycling and Design for Deconstruction (DfD) into structural specifications."
        ],
        "intendedRoles": ["Structural Engineers", "Materials Procurement Managers", "Civil Project Leads", "Sustainability Consultants"],
        "badgeName": "Low-Carbon Materials Specialist",
        "badgeDescription": "Demonstrated competence in specifying low-carbon concrete mixes, evaluating EPDs, and procuring circular building materials.",
        "completionMessage": "Congratulations! You have completed Sustainable Building Materials & Low-Carbon Concrete and are equipped to decarbonize the built environment.",
        "recommendedNextCourseCode": "ELH-52",
        "lessons": [
          {
            "title": "1. Embodied Carbon Fundamentals & The Cement Challenge",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why embodied carbon dominates the building lifecycle and how clinker replacement slashes concrete emissions.",
            "contentBlocks": [
              { "id": "elh50-h1", "type": "heading", "level": 3, "text": "Decarbonizing Upfront Embodied Carbon (A1–A5)" },
              { "id": "elh50-t1", "type": "short_text", "position": 1, "bodyText": "As operational building energy becomes cleaner through renewables, **embodied carbon**—the greenhouse gas emissions generated during material extraction, manufacturing, transport, and construction (Lifecycle stages A1–A5)—accounts for over 50% of a new building's total lifetime carbon footprint. Traditional Ordinary Portland Cement (OPC) is responsible for approximately 8% of global carbon emissions due to high-temperature limestone calcination. Replacing 50% to 70% of OPC clinker with Supplementary Cementitious Materials (SCMs) such as Ground Granulated Blast-furnace Slag (GGBS) cuts concrete carbon intensity by up to 60% while enhancing long-term durability in tropical marine environments." },
              { "id": "elh50-c1", "type": "callout", "variant": "info", "title": "Marine Durability Bonus", "bodyText": "High-GGBS concrete mixes offer superior resistance to chloride attack and sulfate penetration, making them ideal for coastal Mauritian foundations." }
            ]
          },
          {
            "title": "2. Environmental Product Declarations (EPDs) & Material Selection",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Interpreting ISO 14025 Type III EPDs and calculating Global Warming Potential (GWP) per unit.",
            "contentBlocks": [
              { "id": "elh50-h2", "type": "heading", "level": 3, "text": "Reading and Comparing Structural EPDs" },
              { "id": "elh50-t2", "type": "short_text", "position": 1, "bodyText": "An **Environmental Product Declaration (EPD)** is an independently verified, standardized document (under ISO 14025 / EN 15804) quantifying a product's environmental impact across its lifecycle. Structural engineers must evaluate the **Global Warming Potential (GWP)** metric (expressed in kg CO2-equivalent per m3 of concrete or per tonne of rebar). When specifying materials, mandate third-party verified Type III EPDs to compare competing suppliers objectively rather than relying on unverified vendor marketing claims." },
              { "id": "elh50-c2", "type": "callout", "variant": "tip", "title": "Specification Standard", "bodyText": "Mandate product-specific Type III EPDs in all structural concrete, steel, and masonry procurement tender packages." }
            ]
          },
          {
            "title": "3. Mass Timber, Bio-Based Materials & Recycled Aggregates",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Integrating FSC-certified mass timber, engineered bamboo, and recycled crushed concrete aggregates.",
            "contentBlocks": [
              { "id": "elh50-h3", "type": "heading", "level": 3, "text": "Bio-Based Structural Systems and Recycled Aggregates" },
              { "id": "elh50-t3", "type": "short_text", "position": 1, "bodyText": "Transitioning beyond concrete and steel involves two powerful strategies: (1) **Bio-Based Mass Timber (CLT/Glulam)**: Certified timber (FSC/PEFC) acts as a carbon sink, sequestering atmospheric CO2 into the building structure while reducing building weight and foundation loads; and (2) **Recycled Crushed Aggregates**: Crushing clean demolition concrete for use as road sub-base, non-structural blinding concrete, and drainage aggregate diverts thousands of tonnes of demolition rubble from landfills and preserves natural quarry resources." },
              { "id": "elh50-c3", "type": "callout", "variant": "action", "title": "Circular Aggregates Policy", "bodyText": "Specify a minimum of 20% recycled crushed concrete aggregate for non-structural fill and road sub-base applications." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Structural Decarbonization Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate concrete strength gain trade-offs, mass timber logistics, and aggregate circularity.",
            "contentBlocks": [
              {
                "id": "elh50-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Balancing Early Strength Gain with Low-Carbon Concrete",
                "prompt": "Your structural engineering team wants to specify a 65% GGBS low-carbon concrete mix for foundation pile caps (reducing carbon by 55%). The structural contractor objects, arguing that high-GGBS mixes have slower early strength gain at 7 days and will delay formwork striking. How do you resolve this engineering challenge?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Cancel the low-carbon mix and revert 100% to standard high-carbon CEM I cement.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Reverting to standard CEM I cement increases embodied carbon by over 100% and misses major sustainability targets."
                  },
                  {
                    "id": "opt_b",
                    "text": "Maintain the 65% GGBS mix for mass foundation elements (where thermal cracking control and long-term 56-day strength are paramount) while adjusting formwork striking schedules, and use targeted 40% GGBS mixes for vertical columns requiring faster cycle times.",
                    "isCorrect": True,
                    "feedback": "Correct! Matching SCM replacement ratios to specific structural elements (mass foundations vs rapid vertical elements) optimizes carbon reduction while protecting construction schedules."
                  },
                  {
                    "id": "opt_c",
                    "text": "Pour the foundations with dry sand without any cement.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Sand alone has zero structural compressive strength and will cause catastrophic building collapse."
                  },
                  {
                    "id": "opt_d",
                    "text": "Add sea water to the concrete mix to accelerate curing.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Mixing concrete with seawater introduces chlorides that rapidly corrode steel rebar, causing severe structural failure."
                  }
                ]
              },
              {
                "id": "elh50-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Evaluating Unverified 'Eco-Block' Marketing Claims",
                "prompt": "A masonry supplier offers an 'Eco-Smart Building Block' claiming it is '100% carbon-negative and eco-friendly'. However, when you request a Type III Environmental Product Declaration (EPD) or testing lab report, the vendor provides only a marketing brochure. What is your procurement decision?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Award the contract immediately based on the brochure's environmental claims.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Unverified vendor marketing claims often constitute greenwashing and expose the project to compliance and certification audit rejection."
                  },
                  {
                    "id": "opt_b",
                    "text": "Reject the unverified claim and require the supplier to provide an ISO 14025 third-party verified Type III EPD and certified compressive strength test reports from an accredited materials lab before approval.",
                    "isCorrect": True,
                    "feedback": "Correct! Demanding third-party verified EPDs and accredited laboratory testing ensures genuine carbon performance and structural safety."
                  },
                  {
                    "id": "opt_c",
                    "text": "Ban all masonry blocks from the building design.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Masonry blocks are standard building elements; the objective is verifying sustainable performance, not eliminating construction materials."
                  },
                  {
                    "id": "opt_d",
                    "text": "Pay the supplier double the price without documentation.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Overpaying for unverified claims violates procurement governance and budget discipline."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Materials Governance & 30-Day Decarbonization Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Drafting low-carbon material specifications and executing your 30-day structural decarbonization plan.",
            "contentBlocks": [
              { "id": "elh50-h4", "type": "heading", "level": 3, "text": "Institutionalizing Embodied Carbon Specifications" },
              { "id": "elh50-t4", "type": "short_text", "position": 1, "bodyText": "Incorporate embodied carbon ceilings into standard structural engineering specifications: (1) Maximum GWP limits for concrete grades (e.g. C30/37 < 220 kg CO2e/m3); (2) Mandatory EPD submissions for top 5 structural materials; (3) 100% certified legal timber sourcing (FSC/PEFC); and (4) Minimum 20% recycled content in steel rebar (Electric Arc Furnace production). Review material submittals against these benchmarks during tender appraisal." },
              { "id": "elh50-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Establish maximum kg CO2e/m3 GWP targets for structural concrete in your upcoming project; (2) Require Type III EPDs in material tender documents; and (3) Specify 20% recycled aggregate in non-structural site works." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is 'Embodied Carbon' (A1–A5 lifecycle stages) in building construction?",
            "options": [
              "The electricity consumed by occupants while living in the completed building.",
              "The greenhouse gas emissions generated during raw material extraction, manufacturing, transport, and on-site assembly of building products before occupancy.",
              "The carbon absorbed by trees in a national park.",
              "The carbon emissions of employee personal vehicles on weekends."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Embodied carbon encompasses the upfront greenhouse gas footprint generated by material manufacturing, shipping, and construction (A1–A5).",
            "incorrectExplanation": "Embodied carbon refers to the emissions generated from raw material extraction to final on-site construction.",
            "optionFeedback": [
              "Incorrect. Electricity consumed during building operation is operational carbon (B6 stage), not embodied carbon.",
              "Correct! Embodied carbon represents the upfront emissions from material extraction, manufacturing, transport, and construction (A1–A5).",
              "Incorrect. Tree carbon absorption is biological biogenic carbon sequestration.",
              "Incorrect. Personal weekend commuting is outside the building material scope."
            ],
            "practicalTakeaway": "Target upfront embodied carbon (A1-A5) during early design to lock in deep structural decarbonization.",
            "learningOutcome": "Define and measure upfront embodied carbon in buildings",
            "competencyArea": "COMP_GHG"
          },
          {
            "question": "How does replacing Ordinary Portland Cement (OPC) with Ground Granulated Blast-furnace Slag (GGBS) reduce concrete's carbon footprint?",
            "options": [
              "It increases cement kiln fuel consumption by 300%.",
              "GGBS is an industrial byproduct of steel manufacturing; replacing clinker with GGBS eliminates high-temperature limestone calcination emissions, cutting concrete carbon by up to 60%.",
              "GGBS makes concrete dissolve in rainwater.",
              "GGBS turns concrete into plastic."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "GGBS repurposes an industrial byproduct, displacing carbon-intensive clinker and eliminating the direct fossil fuel and calcination emissions of cement kilns.",
            "incorrectExplanation": "Using GGBS as a clinker substitute avoids high-temperature limestone calcination, cutting embodied carbon by 50-60%.",
            "optionFeedback": [
              "Incorrect. GGBS reduces cement manufacturing fuel consumption because it is a byproduct that does not require re-calcination.",
              "Correct! Replacing clinker with byproduct GGBS avoids limestone calcination, slashing concrete embodied carbon by up to 60%.",
              "Incorrect. GGBS produces highly durable, dense, water-resistant concrete.",
              "Incorrect. GGBS is an inorganic mineral binder, not a synthetic polymer."
            ],
            "practicalTakeaway": "Specify 50-70% GGBS replacement in mass concrete elements to cut structural carbon by over half.",
            "learningOutcome": "Specify Supplementary Cementitious Materials (SCMs) in low-carbon concrete",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "What is an Environmental Product Declaration (EPD) under ISO 14025 / EN 15804 standards?",
            "options": [
              "A marketing brochure written by an advertising agency.",
              "An independently third-party verified, standardized declaration quantifying a building product's environmental impacts and Global Warming Potential (GWP) across its lifecycle.",
              "A receipt for paying local property taxes.",
              "An architectural building permit issued by a municipal council."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "An EPD is a standardized, third-party audited lifecycle assessment document quantifying a product's verified environmental footprint.",
            "incorrectExplanation": "EPDs are independently verified lifecycle assessments that provide standardized Global Warming Potential data.",
            "optionFeedback": [
              "Incorrect. EPDs are standardized engineering life-cycle assessments, not subjective marketing brochures.",
              "Correct! EPDs provide independently verified, standardized data on product carbon footprint (GWP) and environmental impacts.",
              "Incorrect. Tax receipts document municipal revenue, not environmental product lifecycles.",
              "Incorrect. Building permits authorize construction; EPDs disclose product material impacts."
            ],
            "practicalTakeaway": "Require third-party verified Type III EPDs to compare structural materials objectively during procurement.",
            "learningOutcome": "Interpret Environmental Product Declarations (EPDs)",
            "competencyArea": "COMP_COMPLIANCE"
          },
          {
            "question": "Why is sustainably certified Mass Timber (e.g. Cross-Laminated Timber) considered a low-carbon structural alternative to concrete and steel?",
            "options": [
              "Because wood trees emit massive amounts of carbon when growing.",
              "Timber sequesters and stores atmospheric CO2 within the building structure over its lifetime and requires significantly less manufacturing energy than steel or cement.",
              "Because timber structures last only two weeks before decomposing.",
              "Because timber is completely immune to fire without treatment."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Trees absorb atmospheric CO2 as they grow, locking biogenic carbon into timber building elements while avoiding the heavy manufacturing footprint of steel and concrete.",
            "incorrectExplanation": "Timber sequesters carbon within the building and requires far less fossil energy to process than cement or virgin steel.",
            "optionFeedback": [
              "Incorrect. Growing trees absorb carbon dioxide from the atmosphere through photosynthesis.",
              "Correct! Certified timber locks sequestered carbon into building structures and requires far less energy to manufacture than concrete or steel.",
              "Incorrect. Engineered mass timber structures are engineered for 50-100+ year design lifespans.",
              "Incorrect. Mass timber chars predictably, providing fire resistance, but requires standard fire design."
            ],
            "practicalTakeaway": "Consider certified mass timber structural elements to incorporate biogenic carbon storage into building designs.",
            "learningOutcome": "Evaluate mass timber and bio-based structural systems",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "What is an appropriate application for recycled crushed concrete aggregates on a civil construction site?",
            "options": [
              "High-stress post-tensioned bridge cables.",
              "Road sub-base, non-structural site fill, retaining wall backfill, and non-structural blinding concrete.",
              "Interior decorative crystal chandeliers.",
              "Drinking water filtration media."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Recycled concrete aggregate is ideally suited for road sub-bases, backfill, and blinding layers, diverting rubble from landfills while preserving virgin quarry rock.",
            "incorrectExplanation": "Crushed concrete is proven for civil applications like road sub-base, blinding concrete, and drainage fill.",
            "optionFeedback": [
              "Incorrect. Bridge cables require high-tensile steel wire, not crushed aggregate.",
              "Correct! Road sub-base, fill, and blinding layers are ideal applications that reuse concrete rubble and protect virgin quarries.",
              "Incorrect. Lighting fixtures require glass and metal components.",
              "Incorrect. Concrete aggregates are alkaline and unsuitable for drinking water filtration."
            ],
            "practicalTakeaway": "Specify recycled crushed concrete aggregates for road sub-bases and non-structural backfill.",
            "learningOutcome": "Incorporate circular recycled aggregates into civil specifications",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Why does high-GGBS concrete perform exceptionally well in coastal marine environments such as Mauritius?",
            "options": [
              "Because GGBS dissolves instantly in saltwater.",
              "GGBS produces a denser, less permeable pore structure that resists chloride ion penetration and sulfate attack, protecting steel reinforcement from corrosion.",
              "Because GGBS attracts marine fish to the foundations.",
              "Because GGBS increases concrete drying shrinkage by 500%."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "GGBS refines the concrete pore network, drastically reducing permeability and blocking chloride penetration, extending marine foundation life.",
            "incorrectExplanation": "GGBS creates low-permeability concrete that resists chloride attack and prevents rebar corrosion in coastal environments.",
            "optionFeedback": [
              "Incorrect. GGBS produces highly durable, insoluble concrete binders.",
              "Correct! Refined pore microstructure blocks chloride ions, providing superior corrosion protection for marine and coastal foundations.",
              "Incorrect. Concrete foundations provide structural support, not marine feeding attractants.",
              "Incorrect. High-GGBS mixes reduce thermal heat of hydration, minimizing thermal cracking risks in mass foundations."
            ],
            "practicalTakeaway": "Specify high-GGBS mixes for coastal and marine foundations to achieve superior chloride resistance and carbon savings.",
            "learningOutcome": "Evaluate concrete durability and chloride resistance in marine environments",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "What is 'Design for Deconstruction' (DfD) in sustainable structural engineering?",
            "options": [
              "Designing a building to collapse during the opening ribbon ceremony.",
              "Designing structural connections and material assemblies to be easily disassembled, recovered, and reused at the end of the building's life without destruction.",
              "Using low-quality mortar so walls crumble easily.",
              "Omitting all bolts and welds from steel structures."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Design for Deconstruction uses bolted, modular connections and standardized components to allow future building disassembly and circular material reuse.",
            "incorrectExplanation": "DfD designs structural elements with demountable connections to enable circular material salvage at end of life.",
            "optionFeedback": [
              "Incorrect. Structural design always guarantees safety and longevity during operating life.",
              "Correct! Bolted, modular connections allow structural components to be disassembled and reused in the circular economy.",
              "Incorrect. Mortar must meet structural strength and safety standards.",
              "Incorrect. Bolted connections must be fully engineered to handle structural loads."
            ],
            "practicalTakeaway": "Incorporate demountable, bolted structural details to enable circular reuse at building end-of-life.",
            "learningOutcome": "Apply Design for Deconstruction (DfD) principles",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Which action should a Structural Project Manager prioritize during their first 30 days of material decarbonization?",
            "options": [
              "Order all construction materials from unvetted suppliers without specifications.",
              "Establish maximum GWP carbon ceilings for concrete mixes, mandate Type III EPDs in tenders, and specify 20% recycled aggregate in civil site works.",
              "Ban all cement from civil construction sites permanently.",
              "Use ocean beach sand for structural concrete mixing."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days require establishing concrete GWP carbon ceilings, demanding EPDs in tenders, and introducing recycled aggregates.",
            "incorrectExplanation": "Initial materials decarbonization focuses on concrete GWP limits, EPD tender requirements, and recycled aggregate mandates.",
            "optionFeedback": [
              "Incorrect. Unvetted purchasing locks in high embodied carbon and structural quality risks.",
              "Correct! GWP ceilings, mandatory EPDs, and recycled aggregate quotas establish structural decarbonization governance.",
              "Incorrect. Cementitious binders remain necessary for structural stability; the goal is low-carbon SCM replacement.",
              "Incorrect. Beach sand contains chlorides that destroy steel rebar and is strictly prohibited by building codes."
            ],
            "practicalTakeaway": "Set clear GWP carbon ceilings and require EPDs in structural tender packages during project kickoff.",
            "learningOutcome": "Execute a 30-day structural material decarbonization roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      },

      # 14. ELH-52: Sustainable Property Facility Operations (D3)
      {
        "courseCode": "ELH-52",
        "title": "Sustainable Property Facility Operations",
        "slug": "sustainable-property-facility-operations",
        "description": "Master commercial facility energy benchmarking, water conservation auditing, preventive maintenance schedules, smart building sensor analytics, and waste diversion operations.",
        "fullDescription": "Sustainable Property Facility Operations equips commercial property managers, facility directors, and building maintenance supervisors to optimize daily building operations. Learn how to calculate Energy Use Intensity (EUI) benchmarks, execute commercial water audits and cooling tower water balance calculations, structure green preventive maintenance (PM) routines, govern multi-stream tenant waste diversion, and achieve sustainable building performance certifications.",
        "categoryId": 3,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_WATER",
        "secondaryCompetencies": ["COMP_ENERGY", "COMP_CIRCULARITY"],
        "learningObjectives": [
          "Calculate and benchmark building Energy Use Intensity (EUI in kWh/m2/year) against regional commercial averages.",
          "Conduct facility-wide water balance audits covering domestic, irrigation, and cooling tower make-up flows.",
          "Design and execute green Preventive Maintenance (PM) work orders that sustain mechanical efficiency.",
          "Establish high-purity multi-stream tenant waste diversion and e-waste recycling operations."
        ],
        "intendedRoles": ["Facility Managers", "Property Operations Leads", "Maintenance Supervisors", "Asset Operations Officers"],
        "badgeName": "Sustainable Facility Operations Lead",
        "badgeDescription": "Demonstrated competence in commercial facility energy benchmarking, water balance auditing, and green PM governance.",
        "completionMessage": "Congratulations! You have completed Sustainable Property Facility Operations and are prepared to maintain high-performance commercial assets.",
        "recommendedNextCourseCode": "ELH-53",
        "lessons": [
          {
            "title": "1. Energy Benchmarking & Energy Use Intensity (EUI)",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Calculating normalized EUI (kWh/m2/year) and benchmarking commercial building performance.",
            "contentBlocks": [
              { "id": "elh52-h1", "type": "heading", "level": 3, "text": "Benchmarking Facility Energy Use Intensity" },
              { "id": "elh52-t1", "type": "short_text", "position": 1, "bodyText": "You cannot manage what you do not measure. **Energy Use Intensity (EUI)**—calculated as total annual building energy consumption (kWh) divided by Gross Floor Area (GFA in m2)—is the standard metric for property energy efficiency. In tropical commercial office buildings, typical unmanaged buildings operate at 180 to 250 kWh/m2/year, while high-performance certified assets operate at 90 to 120 kWh/m2/year. Establishing sub-metered EUI benchmarks across tenant floors, common areas, and central plant identifies operational waste immediately." },
              { "id": "elh52-c1", "type": "callout", "variant": "info", "title": "EUI Benchmark", "bodyText": "Target an annual facility operational EUI of < 120 kWh/m2/year for commercial office properties in tropical climates." }
            ]
          },
          {
            "title": "2. Facility Water Balance Audits & Irrigation Optimization",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Executing mass-balance water audits, smart irrigation weather controllers, and fixture aerators.",
            "contentBlocks": [
              { "id": "elh52-h2", "type": "heading", "level": 3, "text": "Mapping the Facility Water Mass Balance" },
              { "id": "elh52-t2", "type": "short_text", "position": 1, "bodyText": "Commercial properties consume water across three main systems: domestic restrooms (40%), cooling tower evaporative makeup (45%), and landscape irrigation (15%). Conducting a **Water Balance Audit** compares main utility meter inflow against sub-metered end-use sums. Any unmetered variance > 10% indicates underground pipe leakage. Retrofitting low-flow restroom aerators (cutting tap flow from 9 L/min to 2 L/min) and deploying smart weather-based irrigation controllers (using rain sensors and soil moisture probes) cuts building water demand by 30% to 40%." },
              { "id": "elh52-c2", "type": "callout", "variant": "tip", "title": "Irrigation Efficiency Rule", "bodyText": "Never irrigate commercial landscaping between 10:00 AM and 4:00 PM; irrigate at night or early morning to prevent 50% evaporation loss." }
            ]
          },
          {
            "title": "3. Green Preventive Maintenance (PM) & Asset Life-Extension",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Integrating sustainability checkpoints into Computerized Maintenance Management Systems (CMMS).",
            "contentBlocks": [
              { "id": "elh52-h3", "type": "heading", "level": 3, "text": "Sustainability in Preventive Maintenance" },
              { "id": "elh52-t3", "type": "short_text", "position": 1, "bodyText": "Poorly maintained equipment wastes energy quietly: dirty AHU filters increase fan power by 20%, unlubricated pump bearings cause motor overheating, and misaligned fan belts slip and lose airflow. Embedding green checkpoints into your Computerized Maintenance Management System (CMMS) ensures that monthly PM work orders require: (1) Filter differential pressure checks; (2) Infrared thermographic scanning of electrical switchboards; (3) Acoustic ultrasonic leak detection on compressed air and steam lines; and (4) Refrigerant leak testing under EPA F-gas protocols." },
              { "id": "elh52-c3", "type": "callout", "variant": "action", "title": "CMMS Protocol", "bodyText": "Require photographic evidence of clean filters and calibrated setpoints before closing PM work orders in the CMMS." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Facility Operations Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate water leak emergencies, tenant recycling enforcement, and maintenance trade-offs.",
            "contentBlocks": [
              {
                "id": "elh52-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Diagnosing Hidden Underground Water Pipe Leakage",
                "prompt": "The monthly water bill for a 5-story commercial property indicates water consumption surged from 800 m3 to 2,200 m3 (+175%), but restroom sub-meters and cooling tower meters show normal usage. The property maintenance technician says 'it must be a utility billing mistake'. How do you investigate?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the technician's opinion, pay the bill, and do nothing.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Ignoring a 1,400 m3 unmetered water spike wastes thousands of rupees monthly and risks foundation soil erosion and building settlement."
                  },
                  {
                    "id": "opt_b",
                    "text": "Perform a midnight static pressure isolation test: close all building internal isolation valves at midnight, monitor the main utility water meter for continuous flow, and deploy acoustic underground pipe leak locators to pinpoint and repair the burst buried main.",
                    "isCorrect": True,
                    "feedback": "Correct! Midnight static pressure testing and acoustic leak detection pinpoints underground leaks immediately, halting water waste and structural damage."
                  },
                  {
                    "id": "opt_c",
                    "text": "Shut off all water to the building permanently and tell tenants to bring bottled water.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Cutting water supply violates commercial lease covenants and municipal sanitation regulations."
                  },
                  {
                    "id": "opt_d",
                    "text": "Pour dye into the roof gutters during rain.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Gutter dyeing tests roof drainage, not buried pressurized supply mains."
                  }
                ]
              },
              {
                "id": "elh52-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Tenant Floor Trash Chute Contamination",
                "prompt": "Your property introduced separated multi-stream recycling (Paper, Plastics, General Waste) on all office floors. However, the central waste contractor rejects the entire recycling skip because tenants are dumping food waste and coffee cups into the paper recycling bins. How does the Facility Manager resolve this?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Cancel recycling across the entire building and send all bins to the municipal landfill.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Abandoning recycling causes the building to fail green certifications and ESG lease commitments."
                  },
                  {
                    "id": "opt_b",
                    "text": "Remove individual desk under-desk general trash bins, install centralized high-visibility sorting stations with clear visual icon signage, provide dedicated organic waste caddies in floor pantries, and share floor-by-floor monthly recycling purity scores.",
                    "isCorrect": True,
                    "feedback": "Correct! Centralizing waste stations, providing pantry organic bins, and using clear visual signage eliminates contamination at the source."
                  },
                  {
                    "id": "opt_c",
                    "text": "Station security guards inside tenant private offices to search waste bins.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Invasive policing violates tenant privacy and ruins commercial landlord relationships."
                  },
                  {
                    "id": "opt_d",
                    "text": "Burn the contaminated paper in the building parking lot.",
                    "isCorrect": False,
                    "feedback": "Incorrect. Burning waste on commercial property is a hazardous, illegal fire safety violation."
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Property Operations Governance & 30-Day Facility Action Plan",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establishing daily building walkabouts and executing your 30-day sustainable facility roadmap.",
            "contentBlocks": [
              { "id": "elh52-h4", "type": "heading", "level": 3, "text": "Institutionalizing Facility Green Operations" },
              { "id": "elh52-t4", "type": "short_text", "position": 1, "bodyText": "Daily facility manager walkabouts ensure operational standards are maintained: (1) Verify main utility meter readings against sub-meter sums; (2) Inspect AHU filter cleanliness and differential pressure gauges; (3) Check waste holding rooms for source segregation purity; and (4) Verify irrigation rain sensor lockouts. Maintain a digital logbook for immediate corrective action." },
              { "id": "elh52-c4", "type": "callout", "variant": "action", "title": "30-Day Workplace Action Commitment", "bodyText": "Within the next 30 days: (1) Calculate your commercial facility's baseline EUI (kWh/m2/year); (2) Conduct a midnight static water leak test; and (3) Add green energy and filter checkpoints to all CMMS preventive maintenance work orders." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is Energy Use Intensity (EUI) and how is it calculated for commercial buildings?",
            "options": [
              "The number of light bulbs divided by building height.",
              "Total annual building energy consumption (kWh) divided by Gross Floor Area (GFA in m2), expressed as kWh/m2/year.",
              "The cost of the building elevator divided by monthly rent.",
              "The volume of water in the fire sprinkler tank."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "EUI normalizes total annual energy use by gross floor area (kWh/m2/year), providing the universal benchmark for commercial building energy efficiency.",
            "incorrectExplanation": "EUI is calculated as Total Annual Energy (kWh) divided by Gross Floor Area (m2).",
            "optionFeedback": [
              "Incorrect. EUI measures total energy consumption per unit of floor area, not fixture count.",
              "Correct! Annual kWh divided by Gross Floor Area (m2) gives Energy Use Intensity (kWh/m2/year).",
              "Incorrect. Elevator cost is a capital expense, unrelated to operational energy intensity.",
              "Incorrect. Sprinkler volume is a life-safety metric, not an energy benchmark."
            ],
            "practicalTakeaway": "Track annual building EUI (kWh/m2/year) to benchmark performance against national and international green building standards.",
            "learningOutcome": "Calculate and benchmark building Energy Use Intensity (EUI)",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "How can a facility engineering team detect hidden underground water supply pipe leaks without digging up the property?",
            "options": [
              "By smelling the building exterior walls.",
              "By closing all internal building fixtures at midnight, observing the main utility meter for continuous unmetered flow, and deploying acoustic leak detection equipment.",
              "By painting the water pipes green.",
              "By turning off the electricity supply to the building."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Midnight static pressure testing verifies baseline flow during zero occupancy, while acoustic listening devices pinpoint buried pipe fractures.",
            "incorrectExplanation": "Midnight isolation testing and acoustic listening sensors locate pressurized pipe leaks without destructive digging.",
            "optionFeedback": [
              "Incorrect. Pressurized clean water leaks in soil cannot be detected by smell.",
              "Correct! Midnight static flow checks and acoustic sensors pinpoint buried leaks without destructive excavation.",
              "Incorrect. Painting pipes provides corrosion protection but does not detect buried leaks.",
              "Incorrect. Electrical shutoffs do not affect pressurized hydraulic water lines."
            ],
            "practicalTakeaway": "Perform midnight static water tests to detect hidden underground pipe leaks before structural or financial damage occurs.",
            "learningOutcome": "Detect and diagnose underground water pipe leaks",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "Why should commercial landscape irrigation systems be programmed to operate only during night or early morning hours (before 6:00 AM)?",
            "options": [
              "Because plants are afraid of daylight.",
              "Irrigating during peak daylight hours (10:00 AM–4:00 PM) loses up to 50% of water to solar evaporation and wind drift before it reaches root zones.",
              "Because irrigation pumps only run in the dark.",
              "Because night water has higher mineral content."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Irrigating during hot daytime hours causes severe evaporation and wind drift loss; night/early morning irrigation maximizes root absorption.",
            "incorrectExplanation": "Nighttime and early morning irrigation prevents severe evaporative losses caused by midday heat and wind.",
            "optionFeedback": [
              "Incorrect. Plants photosynthesize in daylight; irrigation timing is driven by evaporation physics.",
              "Correct! Night and early morning watering prevents 50% water loss from solar evaporation and wind drift.",
              "Incorrect. Electrical pumps operate at any time commanded by timers or BMS.",
              "Incorrect. Water mineral content is constant regardless of time of day."
            ],
            "practicalTakeaway": "Program landscape irrigation to run strictly between 9:00 PM and 5:00 AM with rain sensor lockouts.",
            "learningOutcome": "Optimize commercial landscape irrigation efficiency",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "How does dirty, clogged Air Handling Unit (AHU) air filters impact building operating efficiency?",
            "options": [
              "They make the fans spin faster while consuming less power.",
              "They increase aerodynamic static resistance, forcing supply fan motors to draw 15% to 25% more electrical energy while reducing airflow and cooling capacity.",
              "They convert dirty air into pure fragrance.",
              "They turn off all building computer networks."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Clogged filters increase duct static pressure, forcing fan motors to consume significantly more power while degrading cooling delivery.",
            "incorrectExplanation": "Dirty filters increase static pressure drop, forcing fan motors to work harder and wasting significant electrical power.",
            "optionFeedback": [
              "Incorrect. Increased resistance always increases electrical power draw on fan motors.",
              "Correct! High filter resistance forces fans to draw 15-25% more power while starving occupied zones of cooling airflow.",
              "Incorrect. Dirty filters trap dust and mold, degrading indoor air quality.",
              "Incorrect. Air filters are mechanical filtration media with no IT network interaction."
            ],
            "practicalTakeaway": "Monitor filter differential pressure gauges and replace AHU filters routinely in your CMMS preventive maintenance schedule.",
            "learningOutcome": "Maintain AHU filtration and aerodynamic efficiency",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "What is the most effective operational strategy for eliminating recyclable waste contamination in multi-tenant commercial office buildings?",
            "options": [
              "Removing all recycling bins and forcing everyone to use one landfill bin.",
              "Replacing individual desk trash bins with centralized multi-stream sorting stations featuring clear visual icon signage, and providing dedicated pantry food waste caddies.",
              "Searching tenant backpacks as they leave the building.",
              "Fining the cleaning staff whenever a plastic bottle is found."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Centralized sorting stations with clear visual icon signage force conscious sorting, while desk-side bins encourage mindless mixed dumping.",
            "incorrectExplanation": "Centralizing sorting stations and providing dedicated food waste caddies dramatically increases recycling purity.",
            "optionFeedback": [
              "Incorrect. Removing recycling bins guarantees 100% landfill dumping, violating ESG commitments.",
              "Correct! Centralized sorting hubs with visual icons and pantry compost bins eliminate contamination at the source.",
              "Incorrect. Searching employee bags violates civil rights and workplace trust.",
              "Incorrect. Penalizing cleaners fails to address the root cause of tenant improper sorting."
            ],
            "practicalTakeaway": "Eliminate desk-side trash bins and deploy centralized visual sorting stations to boost recycling purity.",
            "learningOutcome": "Implement commercial tenant waste segregation systems",
            "competencyArea": "COMP_CIRCULARITY"
          },
          {
            "question": "Why is infrared thermographic scanning of main electrical distribution switchboards considered an essential sustainability and safety practice?",
            "options": [
              "It makes the switchboard look high-tech in annual reports.",
              "It detects loose electrical connections, phase imbalances, and overheating components before they cause energy loss, equipment burnout, or electrical fires.",
              "It cools down the electrical switchboard automatically.",
              "It charges the building batteries with infrared light."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Loose electrical lugs generate high resistive heat (I2R power losses); thermographic imaging pinpoints hot spots for tightening before fire or failure occurs.",
            "incorrectExplanation": "Thermographic scanning identifies resistive overheating from loose connections, preventing electrical fires and power waste.",
            "optionFeedback": [
              "Incorrect. Thermography is an electrical engineering diagnostic tool, not marketing photography.",
              "Correct! Thermographic scans identify loose connections and phase imbalances, preventing resistive energy loss and catastrophic electrical fires.",
              "Incorrect. Thermography measures thermal radiation; it does not cool equipment.",
              "Incorrect. Thermal imaging cameras detect heat; they do not charge batteries."
            ],
            "practicalTakeaway": "Conduct annual infrared thermographic scans on all main switchboards as part of your green PM routine.",
            "learningOutcome": "Deploy infrared thermography in preventive maintenance",
            "competencyArea": "COMP_ENERGY"
          },
          {
            "question": "How do faucet aerators reduce commercial building water consumption?",
            "options": [
              "By shutting off water permanently in executive offices.",
              "By mixing air into the water stream, reducing flow rate from 9–12 L/min to 1.5–2.0 L/min while maintaining comfortable washing pressure and sensory volume.",
              "By turning tap water into sparkling mineral water.",
              "By heating the water to 100°C."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Aerators inject air into the water flow, slashing water volume by up to 75% without compromising handwashing sensory comfort.",
            "incorrectExplanation": "Faucet aerators blend air into the water stream, reducing flow from ~9 L/min to ~2 L/min while preserving spray pressure.",
            "optionFeedback": [
              "Incorrect. Aerators maintain operational water service for handwashing.",
              "Correct! Aerators mix air into the flow, cutting water use by up to 75% while maintaining excellent sensory wash pressure.",
              "Incorrect. Aerators do not carbonate water.",
              "Incorrect. Aerators do not alter water temperature."
            ],
            "practicalTakeaway": "Retrofit high-efficiency 1.5–2.0 L/min aerators on all commercial restroom faucets to achieve immediate 70% water savings.",
            "learningOutcome": "Deploy low-flow plumbing fixtures and aerators",
            "competencyArea": "COMP_WATER"
          },
          {
            "question": "Which action should a Commercial Facility Manager prioritize within their first 30 days of sustainable property remediation?",
            "options": [
              "Shut down all building elevators and lock the front doors.",
              "Calculate the building baseline EUI (kWh/m2/year), execute a midnight static water leak test, and embed green checkpoints in CMMS work orders.",
              "Repaint the parking lot lines using non-standard fluorescent colors.",
              "Discard all historical utility invoices."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "The first 30 days must focus on establishing baseline EUI, running water leak diagnostics, and embedding green maintenance checkpoints.",
            "incorrectExplanation": "Initial facility remediation prioritizes EUI benchmarking, water leak testing, and green PM integration in CMMS.",
            "optionFeedback": [
              "Incorrect. Shutting down building access violates commercial leasing contracts.",
              "Correct! EUI benchmarking, midnight water testing, and green PM work orders establish immediate operational control.",
              "Incorrect. Parking line paint provides zero energy or water efficiency benefit.",
              "Incorrect. Discarding utility invoices destroys historical audit trails and violates accounting standards."
            ],
            "practicalTakeaway": "Benchmark building EUI, perform a midnight water leak audit, and update CMMS PM work orders during your first month.",
            "learningOutcome": "Execute a 30-day sustainable facility operations action roadmap",
            "competencyArea": "COMP_STRATEGY"
          }
        ]
      }
    ]

if __name__ == "__main__":
    courses = get_courses_10_to_14()
    print(f"Loaded {len(courses)} courses from Module 3.")
