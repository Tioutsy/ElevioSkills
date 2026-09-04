#!/usr/bin/env python3
import json
import os

def get_courses_5_to_8():
    return [
      # 5. ELH-21: Building Employee Engagement in Sustainability (D3)
      {
        "courseCode": "ELH-21",
        "title": "Building Employee Engagement in Sustainability",
        "slug": "building-employee-engagement-in-sustainability",
        "description": "Drive authentic workplace behavioral change, apply psychological choice architecture (nudges), gamify operational eco-habits, and overcome disengagement.",
        "fullDescription": "Building Employee Engagement in Sustainability trains people managers, HR professionals, and departmental leaders to shift organizational culture from passive compliance to active, enthusiastic sustainability participation. Learn how to apply behavioral economics and choice architecture in the workplace, design non-punitive gamified challenges, harness social proof and micro-incentives, address eco-cynicism, and empower self-directed green initiatives across all levels of the workforce.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_SOCIAL_COMMUNITY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Apply behavioral economics principles (default effects, choice architecture, visual feedback) to workplace sustainability.",
          "Design collaborative, non-punitive team challenges that gamify resource conservation.",
          "Identify and resolve root causes of employee eco-cynicism and change resistance.",
          "Structure peer-recognition and micro-incentive systems that sustain long-term engagement."
        ],
        "intendedRoles": ["HR Specialists", "Culture Champions", "Team Leads", "Department Supervisors"],
        "badgeName": "Sustainability Engagement Leader",
        "badgeDescription": "Demonstrated competence in behavioral change design, choice architecture, and employee eco-engagement.",
        "completionMessage": "Congratulations! You have completed Building Employee Engagement in Sustainability and are equipped to cultivate an active green culture.",
        "recommendedNextCourseCode": "ELH-22",
        "lessons": [
          {
            "title": "1. Behavioral Economics & Workplace Choice Architecture",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why knowledge alone does not change behavior and how smart environment design makes sustainable choices automatic.",
            "contentBlocks": [
              { "id": "elh21-h1", "type": "heading", "level": 3, "text": "Beyond Awareness: Designing the Sustainable Default" },
              { "id": "elh21-t1", "type": "short_text", "position": 1, "bodyText": "A central finding of behavioral economics is the 'Value-Action Gap': employees may genuinely care about the environment, yet continue wasteful workplace habits because friction makes the unsustainable option easier. Rather than relying on willpower or lectures, high-engagement organizations re-engineer the workplace environment using **Choice Architecture**: (1) Setting double-sided duplex printing as the automated IT default; (2) Placing waste sorting stations closer to coffee points than general trash; and (3) Positioning water refill carafes on meeting room tables." },
              { "id": "elh21-c1", "type": "callout", "variant": "info", "title": "Default Effect Invariant", "bodyText": "Over 80% of employees stick with the default setting. Make the sustainable action the default, effortless path." }
            ]
          },
          {
            "title": "2. Collaborative Gamification vs Destructive Competition",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Designing team challenges that inspire collaboration rather than creating perverse incentives or resentment.",
            "contentBlocks": [
              { "id": "elh21-h2", "type": "heading", "level": 3, "text": "Gamifying Sustainable Habits Authentically" },
              { "id": "elh21-t2", "type": "short_text", "position": 1, "bodyText": "Gamification can boost workplace participation when structured around collaborative team achievements rather than individual zero-sum competition. Effective engagement programs use: (1) **Team-Based Milestones** (e.g. 'Department reaches 90% weekend shutdown and unlocks a team lunch'); (2) **Visual Progress Telemetry** (live energy dashboards in staff breakout zones); and (3) **Shared Reward Pools** (diverting electricity bill savings into employee-chosen community charity donations or wellness perks)." },
              { "id": "elh21-c2", "type": "callout", "variant": "tip", "title": "Incentive Rule", "bodyText": "Never use individual financial penalties to enforce sustainability habits; positive peer recognition drives sustainable culture." }
            ]
          },
          {
            "title": "3. Overcoming Eco-Cynicism & Corporate Skepticism",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Addressing employee suspicions of executive greenwashing with transparency and tangible proof.",
            "contentBlocks": [
              { "id": "elh21-h3", "type": "heading", "level": 3, "text": "Building Trust Through Radical Operational Transparency" },
              { "id": "elh21-t3", "type": "short_text", "position": 1, "bodyText": "Employees quickly become cynical if they perceive corporate sustainability as a superficial PR gimmick while leadership continues wasteful practices. Combat skepticism by: (1) Leading from the top (executives adopting identical energy and travel policies); (2) Publishing real audit numbers including challenges and areas needing improvement; and (3) Involving frontline staff in selecting which environmental projects receive investment." },
              { "id": "elh21-c3", "type": "callout", "variant": "action", "title": "Trust Standard", "bodyText": "Share verified audit metrics openly with staff, celebrating genuine progress while transparently acknowledging unsolved operational challenges." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Engagement Dilemmas",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Resolve complex workplace engagement scenarios involving team motivation, skepticism, and incentives.",
            "contentBlocks": [
              {
                "id": "elh21-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Designing an Energy Reduction Team Incentive",
                "prompt": "Management wants to reduce office electricity consumption by 12% across 4 departments. As HR Engagement Lead, what incentive structure do you propose?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Name and shame the worst-performing department on the company noticeboard every Friday.",
                    "consequence": "Toxic cultural failure. Destroys morale, creates inter-departmental hostility, and encourages employees to sabotage each other's meters.",
                    "feedback": "Public shaming creates resentment and actively undermines psychological safety.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Structure a collaborative 'Shared Savings Pool': 30% of verified monthly electricity utility savings will be pooled into a staff social fund for team-voted perks (e.g. coffee machines, wellness passes, local mangrove planting days), supported by weekly visual dashboard updates.",
                    "consequence": "Optimal engagement architecture. Employees see a direct connection between daily habits (switching off monitors, AC adjustments) and collective tangible rewards, driving 92% sustained participation.",
                    "feedback": "Correct! Reinvesting verified utility savings into shared employee perks creates a self-reinforcing, positive engagement loop.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Send an email telling staff that saving electricity is their moral duty with zero follow-up or recognition.",
                    "consequence": "Zero impact. Generic moralizing emails are ignored within 24 hours, yielding no measurable energy reduction.",
                    "feedback": "Moral appeals without structural feedback or positive incentives fail to produce enduring behavioral change.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh21-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Addressing Frontline Cynicism Around Corporate Pledges",
                "prompt": "During an all-hands meeting announcing the company's new ESG roadmap, an influential senior forklift driver says: 'Management tells us to save paper, but the executive directors fly business class and leave their office AC on all night. It is all hypocritical greenwashing.' How do you address this?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Discipline the forklift driver for speaking out during the company town hall.",
                    "consequence": "Catastrophic leadership failure. Validates employee suspicions of hypocrisy and silences honest feedback across the entire workforce.",
                    "feedback": "Punishing legitimate frontline observations confirms skepticism and destroys trust.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Acknowledge the valid observation openly, invite the driver to join the executive facility walkthrough next Tuesday to audit executive wing BMS setback controls, and mandate uniform temperature and travel policies across all levels.",
                    "consequence": "Optimal leadership response. You demonstrate authentic humility, establish universal organizational standards, and convert a vocal skeptic into an active, respected workplace champion.",
                    "feedback": "Excellent! Validating constructive criticism, enforcing uniform standards, and inviting skeptics into governance builds unshakeable organizational credibility.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Engagement Challenge Design",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Design and launch a collaborative 30-day departmental sustainability engagement sprint.",
            "contentBlocks": [
              { "id": "elh21-h4", "type": "heading", "level": 3, "text": "Your 30-Day Engagement Campaign" },
              { "id": "elh21-t4", "type": "short_text", "position": 1, "bodyText": "Design a 3-point Departmental Engagement Sprint: (1) Re-engineer one default choice in your workplace (e.g. duplex printing or central sorting placement); (2) Launch a 2-week team collaborative habit challenge; and (3) Establish a shared celebration milestone for when the target is achieved." },
              { "id": "elh21-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Implement one choice-architecture default change and launch your team's 2-week collaborative sprint within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the 'Value-Action Gap' in organizational sustainability psychology?",
            "options": [
              "The gap between the purchase price of solar panels and their salvage value.",
              "The phenomenon where employees hold strong pro-environmental values in theory but fail to practice sustainable behaviors at work due to convenience friction, default habits, or lack of feedback.",
              "A software error in financial accounting spreadsheets.",
              "The distance between an employee's desk and the recycling bin."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The Value-Action Gap explains why awareness alone does not change behavior; workplace systems must make sustainable actions easy, visible, and the default choice.",
            "incorrectExplanation": "The Value-Action Gap describes the disconnect between holding green values and executing daily sustainable habits due to systemic friction.",
            "optionFeedback": [
              "Incorrect. The Value-Action Gap is a psychological behavioral concept, not capital depreciation.",
              "Correct! The Value-Action Gap explains why high awareness does not translate into action without choice architecture that removes operational friction.",
              "Incorrect. It is a recognized behavioral economics and social psychology term.",
              "Incorrect. Physical layout is a factor, but the term refers to the broader psychological phenomenon."
            ],
            "practicalTakeaway": "Overcome the Value-Action Gap by removing operational friction and setting sustainable defaults.",
            "learningOutcome": "Understand the Value-Action Gap in organizational behavior",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How does 'Choice Architecture' (such as setting double-sided printing as the automatic IT default) drive sustainability outcomes?",
            "options": [
              "By forcing employees to pass an exam before printing.",
              "It leverages the power of default bias, ensuring the vast majority of users automatically execute the sustainable action without requiring conscious daily effort.",
              "It breaks all computer monitors so printing becomes impossible.",
              "It increases the cost of paper by 500%."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Research in behavioral economics shows that 80%+ of users stick with default settings; configuring sustainable defaults eliminates massive resource waste effortlessly.",
            "incorrectExplanation": "Default settings leverage cognitive inertia, ensuring the sustainable path is followed automatically by the vast majority of users.",
            "optionFeedback": [
              "Incorrect. Default architecture operates seamlessly without testing barriers.",
              "Correct! Default bias ensures that setting the sustainable choice as the pre-configured default yields immediate, widespread behavioral compliance.",
              "Incorrect. Choice architecture optimizes equipment configuration rather than damaging hardware.",
              "Incorrect. Default duplexing cuts paper purchasing costs significantly."
            ],
            "practicalTakeaway": "Configure IT systems and physical workstations with sustainable pre-set defaults.",
            "learningOutcome": "Apply choice architecture and default bias to workplace systems",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is collaborative team-based gamification significantly more effective than individual zero-sum competition for workplace sustainability?",
            "options": [
              "Because individual competition is forbidden by labor unions.",
              "Individual competition can create resentment, cheating, and public embarrassment for lower performers, whereas collaborative team goals foster shared peer support and lasting cultural norms.",
              "Team challenges take zero minutes to organize.",
              "Individual competition always costs 10 times more money."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Collaborative challenges unite teams around shared purpose, encourage peer mentoring, and avoid the negative psychological blowback of individual ranking.",
            "incorrectExplanation": "Team-based collaborative challenges foster mutual support and positive social norms, avoiding the toxicity of individual ranking.",
            "optionFeedback": [
              "Incorrect. The choice is governed by behavioral effectiveness and culture building.",
              "Correct! Collaborative team goals foster peer support, build inclusive norms, and eliminate the anxiety and perverse incentives of individual zero-sum ranking.",
              "Incorrect. Both formats require structured design and telemetry tracking.",
              "Incorrect. Cost depends on reward structures, but team formats yield superior cultural ROI."
            ],
            "practicalTakeaway": "Structure workplace sustainability campaigns around collaborative team milestones.",
            "learningOutcome": "Design collaborative workplace gamification systems",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the primary cause of employee 'Eco-Cynicism' toward corporate sustainability initiatives?",
            "options": [
              "Employees receiving too many promotions.",
              "Observing executive double standards (e.g. leadership preaching energy conservation while wasting resources) and heavy PR self-congratulation that masks operational inaction.",
              "The office cafeteria serving delicious organic meals.",
              "Company computers running on high-speed internet."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Perceived hypocrisy between leadership rhetoric and daily executive behavior breeds deep cynicism, undermining employee willingness to participate in green programs.",
            "incorrectExplanation": "Executive double standards and superficial PR disconnects trigger widespread cynicism among frontline employees.",
            "optionFeedback": [
              "Incorrect. Career advancement fosters positive engagement.",
              "Correct! When employees witness executive double standards and empty PR slogans, they develop cynicism and disengage from sustainability initiatives.",
              "Incorrect. Quality amenities reinforce authentic wellness culture.",
              "Incorrect. Technical infrastructure supports efficient operations."
            ],
            "practicalTakeaway": "Ensure leadership models strict adherence to corporate sustainability policies to preserve trust.",
            "learningOutcome": "Diagnose and prevent causes of workplace eco-cynicism",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How does a 'Shared Savings Pool' incentive structure motivate sustained departmental resource conservation?",
            "options": [
              "By giving all utility savings directly to the CEO as a cash bonus.",
              "By transparently allocating a percentage of verified utility reductions into a collective employee-directed fund for workplace amenities or community charity projects.",
              "By cancelling employee health insurance if energy use rises.",
              "By forcing employees to pay for their own office lighting."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Directly connecting daily conservation habits to tangible, shared workplace benefits creates a clear, motivating stakeholder feedback loop.",
            "incorrectExplanation": "Reinvesting a share of verified savings into collective employee amenities creates a tangible stakeholder reward loop.",
            "optionFeedback": [
              "Incorrect. Funneling savings exclusively to executives alienates frontline staff.",
              "Correct! Reinvesting a verified portion of utility savings into team-voted perks or community projects gives employees a direct, tangible stake in conservation.",
              "Incorrect. Punitive benefit cuts violate employment contracts and labor law.",
              "Incorrect. Facility utilities are operational employer expenses."
            ],
            "practicalTakeaway": "Reinvest a portion of verified utility savings into team-directed workplace amenities.",
            "learningOutcome": "Structure shared-savings incentive frameworks",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "When a vocal employee openly challenges the sincerity of a new corporate green campaign, what is the most constructive leadership response?",
            "options": [
              "Terminate the employee's contract immediately for disloyalty.",
              "Validate the concerns with empathy, share transparent operational data, and invite the employee to actively participate in auditing practices and shaping solutions.",
              "Pretend the employee never spoke and delete all meeting recordings.",
              "Make fun of the employee in the company newsletter."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Constructive engagement validates critical feedback, exposes real operational challenges, and channels the skeptic's energy into active, credible problem-solving.",
            "incorrectExplanation": "Listening with empathy, sharing transparent data, and co-opting skeptics into project taskforces converts cynicism into advocacy.",
            "optionFeedback": [
              "Incorrect. Unlawful termination triggers severe legal liability and destroys workplace psychological safety.",
              "Correct! Validating concerns, sharing transparent audit data, and inviting critical employees to co-design solutions builds authentic credibility.",
              "Incorrect. Ignoring dissent allows cynicism to spread underground.",
              "Incorrect. Public mockery breaches professional ethics and labor standards."
            ],
            "practicalTakeaway": "Engage skeptical employees directly by inviting them to audit and co-design sustainability initiatives.",
            "learningOutcome": "Transform skeptic feedback into constructive participation",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is real-time or weekly visual progress telemetry (e.g. digital energy dashboards in staff breakout rooms) effective in sustaining workplace eco-habits?",
            "options": [
              "It consumes extra electricity to keep the screens illuminated.",
              "It closes the feedback loop between daily operational actions and macro environmental impact, reinforcing positive collective behavior while it is fresh in memory.",
              "It replaces the need for annual financial reporting.",
              "It allows computers to run without software."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "Immediate visual feedback reinforces the causal link between switching off equipment and tangible departmental savings, sustaining behavioral focus.",
            "incorrectExplanation": "Frequent visual telemetry closes the feedback loop, showing teams the immediate impact of their collective habits.",
            "optionFeedback": [
              "Incorrect. Low-power digital displays use minimal energy compared to the savings they stimulate.",
              "Correct! Visual telemetry provides timely feedback, demonstrating that daily habits produce measurable collective results.",
              "Incorrect. Operational telemetry complements statutory financial and ESG reporting.",
              "Incorrect. Telemetry is powered by software analytics."
            ],
            "practicalTakeaway": "Provide visible, frequent progress telemetry to reinforce daily sustainable habits.",
            "learningOutcome": "Utilize visual telemetry to close behavioral feedback loops",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace employee engagement action commitment?",
            "options": [
              "Sending an angry email demanding that everyone become eco-friendly immediately.",
              "Configuring a sustainable workplace default setting (e.g. default duplex printing or sleep timers) and launching a collaborative 2-week team conservation sprint with shared celebration.",
              "Banning employees from having lunch together.",
              "Deleting the employee suggestions database."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Combining structural choice-architecture defaults with a positive, collaborative team sprint delivers immediate and enduring engagement.",
            "incorrectExplanation": "Re-engineering a workplace default and launching a collaborative team sprint creates lasting engagement and impact.",
            "optionFeedback": [
              "Incorrect. Aggressive demands alienate employees and provoke resistance.",
              "Correct! Re-engineering a sustainable default and pairing it with a positive collaborative sprint establishes an effective, enduring behavioral foundation.",
              "Incorrect. Social interaction is vital for team cohesion and morale.",
              "Incorrect. Employee suggestion repositories are essential for continuous improvement."
            ],
            "practicalTakeaway": "Re-engineer one sustainable default and run a collaborative team sprint this month.",
            "learningOutcome": "Execute 30-day employee engagement action commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 6. ELH-22: Creating and Running Effective Green Teams (D3)
      {
        "courseCode": "ELH-22",
        "title": "Creating and Running Effective Green Teams",
        "slug": "creating-and-running-effective-green-teams",
        "description": "Establish high-impact workplace Green Teams, govern structured monthly sprint meetings, manage project pipelines, and measure verified operational ROI.",
        "fullDescription": "Creating and Running Effective Green Teams provides committee chairs, HR coordinators, and departmental representatives with the operational governance tools to lead successful environmental working groups. Learn how to draft enforceable committee charters, run 45-minute structured sprint meetings, prioritize actionable eco-projects, measure verified financial and environmental returns, pitch business cases to executive sponsors, and sustain long-term cross-departmental engagement.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_SOCIAL_COMMUNITY", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Establish an operational Green Team governance structure with executive sponsorship and departmental representation.",
          "Facilitate disciplined, action-oriented monthly committee sprint meetings using structured action logs.",
          "Prioritize and manage an annual pipeline of workplace eco-efficiency projects.",
          "Calculate and report verified cost savings, waste diversion, and carbon reductions to executive leadership."
        ],
        "intendedRoles": ["Green Team Chairs", "Committee Secretaries", "Departmental Champions", "Facilities Coordinators"],
        "badgeName": "Green Team Leader",
        "badgeDescription": "Demonstrated capability in establishing, facilitating, and governing high-impact workplace Green Teams.",
        "completionMessage": "Congratulations! You have completed Creating and Running Effective Green Teams and are certified to lead high-performing environmental taskforces.",
        "recommendedNextCourseCode": "ELH-117",
        "lessons": [
          {
            "title": "1. Green Team Architecture & Governance Model",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Structuring committee roles, executive sponsorship, and departmental representation for maximum execution power.",
            "contentBlocks": [
              { "id": "elh22-h1", "type": "heading", "level": 3, "text": "The Anatomy of a High-Performing Green Team" },
              { "id": "elh22-t1", "type": "short_text", "position": 1, "bodyText": "Effective Green Teams are structured like agile operational taskforces, not informal social clubs. Key governance roles include: (1) **Committee Chair** (sets agendas, facilitates meetings, tracks milestone delivery); (2) **Executive Sponsor** (C-suite champion who unblocks budget hurdles and attends quarterly reviews); (3) **Technical / Facilities Lead** (validates engineering feasibility and telemetry data); (4) **Communications Coordinator** (crafts visual storytelling and nudges); and (5) **Departmental Representatives** (lead local implementation within their units)." },
              { "id": "elh22-c1", "type": "callout", "variant": "info", "title": "Governance Invariant", "bodyText": "Maintain a balanced team size of 6 to 12 active members with dedicated, approved time allocation from line managers." }
            ]
          },
          {
            "title": "2. Facilitating the 45-Minute Action-Oriented Meeting",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Replacing rambling discussions with disciplined sprint agendas and live Action Logs.",
            "contentBlocks": [
              { "id": "elh22-h2", "type": "heading", "level": 3, "text": "Disciplined Meeting Execution" },
              { "id": "elh22-t2", "type": "short_text", "position": 1, "bodyText": "Green Team meetings must be ruthlessly action-focused: (1) **First 10 mins: Sprint Review** (review Action Log deliverables from last month, marking items Done or Escalated); (2) **Middle 25 mins: Project Deep-Dive** (focus on one active initiative, e.g. eliminating single-use canteen plastics or sub-metering rollout); and (3) **Final 10 mins: Action Assignment** (assign every new task to a single named owner with a strict 30-day deadline). Avoid unstructured debates by capturing tangential topics on a 'Parking Lot' list for future review." },
              { "id": "elh22-c2", "type": "callout", "variant": "tip", "title": "Meeting Rule", "bodyText": "Never end a Green Team meeting without an updated, circulated Action Log specifying named owners and deadlines." }
            ]
          },
          {
            "title": "3. Measuring and Reporting Green Team ROI",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Translating committee activities into verified financial and environmental returns for executive leadership.",
            "contentBlocks": [
              { "id": "elh22-h3", "type": "heading", "level": 3, "text": "Proving the Business Value of Green Teams" },
              { "id": "elh22-t3", "type": "short_text", "position": 1, "bodyText": "To sustain executive funding and organizational credibility, Green Teams must quantify their impact: (1) **Financial ROI** (net utility and procurement savings generated minus project capital costs); (2) **Resource Diversion** (tonnes of clean waste diverted from Mare Chicose landfill, cubic meters of water saved); and (3) **Employee Engagement** (participation rates in campaigns, number of Kaizen ideas submitted and implemented). Present an annual 2-page 'Green Team Impact Report' to the Board or Executive Committee." },
              { "id": "elh22-c3", "type": "callout", "variant": "action", "title": "Reporting Standard", "bodyText": "Reconcile reported cost savings with official finance and utility invoices before presenting annual impact numbers to executive leadership." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Green Team Leadership",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Address challenging committee leadership scenarios regarding project failure, funding, and member turnover.",
            "contentBlocks": [
              {
                "id": "elh22-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Defending Seed Funding at the Executive Committee",
                "prompt": "You are presenting the Green Team's annual budget request (Rs 150,000 for aerator nozzles, sub-metering sensors, and compost bins) to the Executive Committee. The CFO asks: 'Why should we allocate capital to an informal volunteer committee during a cost-tightening year?' How do you respond?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Apologize for asking and withdraw the budget request immediately.",
                    "consequence": "Project collapse. Leaves the Green Team with zero capital, limiting initiatives to zero-cost posters and stifling operational impact.",
                    "feedback": "Withdrawing viable proposals forfeits significant operational savings and demoralizes champions.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Present a structured 1-page financial business case showing that last year's zero-cost HVAC shutdown campaign saved Rs 240,000 in CEB bills, and the requested Rs 150,000 capital will deliver Rs 380,000 in recurring water and energy savings within 14 months (253% ROI).",
                    "consequence": "Optimal executive persuasion. You demonstrate commercial credibility, prove past financial delivery, and frame the budget request as a high-return investment rather than an overhead expense.",
                    "feedback": "Correct! Backing funding requests with historical delivery and quantified ROI projections wins executive capital approval.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Argue emotionally that the CFO does not care about saving polar bears and the planet.",
                    "consequence": "Executive alienation. Emotional hostility destroys professional credibility and guarantees budget rejection.",
                    "feedback": "Emotional confrontation without business data alienates financial decision-makers.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh22-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Resuscitating a Stalled Waste Segregation Rollout",
                "prompt": "The Green Team rolled out 4-stream waste bins in the main office 2 months ago, but cleaning staff report that 60% of paper bins are contaminated with takeaway food and coffee cups. What is the team's corrective action?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Remove all recycling bins and send all waste back to the general landfill.",
                    "consequence": "Complete initiative failure. Abandons circularity and locks the enterprise into 100% landfill disposal.",
                    "feedback": "Abandoning segregation at the first hurdle defeats continuous improvement.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Execute a 3-part corrective sprint: (1) Conduct a visual audit to identify which specific floors have high contamination; (2) Upgrade bin signage with high-contrast pictorial labels in Creole, French, and English; and (3) Station Green Team champions at disposal hubs during lunch hours for 3 days to provide friendly, in-person peer guidance.",
                    "consequence": "Optimal operational turnaround. You diagnose root causes, eliminate signage ambiguity, provide positive peer coaching, and reduce contamination below 5% within two weeks.",
                    "feedback": "Excellent! Root-cause analysis, clear multi-lingual visual signage, and proactive peer coaching rapidly restore waste stream purity.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Green Team Operating Rhythm Setup",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Establish the foundational operational tools for your organization's Green Team.",
            "contentBlocks": [
              { "id": "elh22-h4", "type": "heading", "level": 3, "text": "Setting Up Your Green Team Tools" },
              { "id": "elh22-t4", "type": "short_text", "position": 1, "bodyText": "Implement three operational assets for your Green Team: (1) A standardized 45-minute Sprint Agenda template; (2) A shared digital Action Log (with RACI ownership and deadlines); and (3) A monthly 1-page telemetry dashboard tracking utility savings and waste diversion." },
              { "id": "elh22-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Establish your team's digital Action Log and schedule your first 45-minute monthly sprint meeting within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the recommended meeting duration and structure for a high-performing workplace Green Team monthly sprint?",
            "options": [
              "A 4-hour open-ended debate with no set agenda.",
              "A disciplined 45-minute meeting: 10 mins Sprint Deliverable Review, 25 mins Focus Project Deep-Dive, and 10 mins Action Assignment with named owners and deadlines.",
              "A 5-minute meeting held once every two years.",
              "Meetings should only occur when the company experiences a major power outage."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "A disciplined 45-minute sprint structure maintains urgency, avoids meeting fatigue, and ensures every session concludes with unambiguous action assignments.",
            "incorrectExplanation": "A 45-minute structured sprint structure ensures accountability, focused project advancement, and clear action assignment.",
            "optionFeedback": [
              "Incorrect. Long unstructured meetings cause fatigue and poor attendance.",
              "Correct! The 45-minute sprint structure (10 min review, 25 min deep-dive, 10 min action assignment) maximizes focus and execution velocity.",
              "Incorrect. Bi-annual meetings lack operational momentum.",
              "Incorrect. Proactive monthly cadence is essential for steady progress."
            ],
            "practicalTakeaway": "Run disciplined 45-minute monthly sprint meetings with structured time-boxes.",
            "learningOutcome": "Facilitate disciplined Green Team sprint meetings",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why must every new task generated in a Green Team meeting be assigned to a single named owner in the Action Log?",
            "options": [
              "So that person can be blamed if anything goes wrong in the company.",
              "To prevent diffusion of responsibility, ensuring clear individual ownership for executing the deliverable and reporting back at the next sprint.",
              "Because software only allows typing one name per row.",
              "To ensure managers do not have to know what is happening."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Shared unassigned tasks are rarely completed; naming a single owner establishes clear accountability for progress and barrier resolution.",
            "incorrectExplanation": "Single-point ownership prevents diffusion of responsibility and ensures dedicated task completion.",
            "optionFeedback": [
              "Incorrect. Accountability structures support delivery, not punitive blame.",
              "Correct! Assigning a single named owner eliminates ambiguity and ensures dedicated responsibility for milestone execution.",
              "Incorrect. Governance principles dictate ownership, not software constraints.",
              "Incorrect. Management visibility is maintained through transparent action logs."
            ],
            "practicalTakeaway": "Assign every Action Log item to exactly one named owner with a strict 30-day deadline.",
            "learningOutcome": "Apply single-point accountability in committee action logs",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "How should a Green Team calculate and present its annual Financial Return on Investment (ROI) to executive leadership?",
            "options": [
              "By guessing how much money the company saved without checking bills.",
              "By calculating verified utility reductions (kWh electricity, m3 water) and reduced consumable expenses (reams of paper, packaging) minus project implementation capital, verified by Finance.",
              "By claiming 100% of the company's annual net profit as Green Team savings.",
              "By multiplying the number of committee meetings by Rs 1,000,000."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Reconciling physical consumption drops against baseline utility bills in partnership with Finance provides credible, audited ROI proof to executives.",
            "incorrectExplanation": "Audited utility and consumable reductions verified against baseline invoices establish defensible financial ROI.",
            "optionFeedback": [
              "Incorrect. Unsubstantiated estimates fail executive financial scrutiny.",
              "Correct! Reconciling physical resource savings against utility bills with Finance validation establishes bulletproof ROI credibility.",
              "Incorrect. Claiming unrelated corporate profits destroys credibility.",
              "Incorrect. Meeting frequency is an operational overhead, not a financial return."
            ],
            "practicalTakeaway": "Partner with Finance to verify annual utility and consumable savings before reporting to ExCo.",
            "learningOutcome": "Calculate verified Green Team financial ROI",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the role of a 'Parking Lot' list during a Green Team meeting?",
            "options": [
              "A list of employees who parked their cars illegally.",
              "A structured mechanism to capture tangential ideas or complex complaints during discussion without derailing the 45-minute scheduled agenda, preserved for future prioritization.",
              "A list of parking spaces reserved for electric vehicles only.",
              "A document that gets shredded after every meeting."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "A Parking Lot validates member contributions while keeping the meeting strictly on track, ensuring off-topic items are recorded for later evaluation.",
            "incorrectExplanation": "A Parking Lot captures off-agenda topics for future review without derailing the current meeting focus.",
            "optionFeedback": [
              "Incorrect. Parking Lot is a facilitation term, not a traffic violation record.",
              "Correct! The Parking Lot captures valuable side-topics and ideas for future evaluation without derailing the scheduled meeting agenda.",
              "Incorrect. EV parking allocation is handled by Facilities infrastructure.",
              "Incorrect. Parking Lot items are reviewed and prioritized in future sprint planning."
            ],
            "practicalTakeaway": "Use a Parking Lot to capture side-topics and keep sprint meetings focused.",
            "learningOutcome": "Manage meeting facilitation using parking lot tools",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "When a Green Team project encounters severe operational resistance from a department manager, what is the best escalation pathway?",
            "options": [
              "Launch a public smear campaign against the manager on social media.",
              "Engage the Executive Sponsor to facilitate a collaborative review, demonstrating how the project can be adapted to solve the manager's departmental pain points without disrupting production.",
              "Abandon the project and dissolve the Green Team immediately.",
              "Report the manager to the police."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "The Executive Sponsor possesses the organizational authority to mediate cross-departmental friction and align sustainability with operational priorities.",
            "incorrectExplanation": "Leveraging the Executive Sponsor to align project design with departmental needs resolves operational roadblocks constructively.",
            "optionFeedback": [
              "Incorrect. Public attacks destroy professional relationships and organizational cohesion.",
              "Correct! The Executive Sponsor unblocks resistance by facilitating high-level alignment and adapting project design to support departmental needs.",
              "Incorrect. Dissolving the team surrenders organizational progress over a resolvable hurdle.",
              "Incorrect. Internal operational differences are governed by corporate leadership."
            ],
            "practicalTakeaway": "Leverage your Executive Sponsor to unblock cross-departmental operational friction.",
            "learningOutcome": "Navigate organizational roadblocks and executive escalation",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why should Green Teams include representatives from frontline operations and maintenance alongside administrative staff?",
            "options": [
              "To make sure meetings are held in the factory warehouse.",
              "Frontline and maintenance personnel have hands-on control over physical plant equipment, understand technical constraints, and ensure solutions are practical and durable.",
              "Because administrative staff are not allowed to join committees.",
              "To teach maintenance staff how to use social media."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Frontline technicians know how systems actually operate in practice, preventing committees from designing theoretical solutions that fail in the field.",
            "incorrectExplanation": "Frontline technicians ensure solutions are technically feasible, operationally practical, and properly maintained.",
            "optionFeedback": [
              "Incorrect. Meeting locations can rotate, but technical input is essential.",
              "Correct! Technical and frontline representation ensures projects are grounded in operational reality and can be maintained practically.",
              "Incorrect. High-performing committees unite administrative and technical personnel.",
              "Incorrect. Technical expertise focuses on physical resource efficiency."
            ],
            "practicalTakeaway": "Ensure active maintenance and frontline representation on your Green Team.",
            "learningOutcome": "Integrate technical frontline perspectives into project design",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the primary content of an effective annual 'Green Team Impact Report' presented to the Board or Executive Committee?",
            "options": [
              "A collection of group photos from office parties.",
              "A concise 2-page dashboard summarizing verified financial utility savings, physical resource diversion (tonnes of waste, m3 of water, kWh saved), and employee engagement milestones.",
              "A list of complaints about office snacks.",
              "A technical manual on how to repair photocopiers."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "A concise executive dashboard highlights financial savings, verified physical metrics, and cultural milestones, proving the team's strategic business value.",
            "incorrectExplanation": "A 2-page executive summary linking financial savings, physical resource reductions, and employee engagement proves business value.",
            "optionFeedback": [
              "Incorrect. Executive reporting requires verified business metrics, not social photos.",
              "Correct! Highlighting verified financial savings, physical resource reductions, and engagement metrics proves the strategic value of the Green Team.",
              "Incorrect. Trivial complaints undermine executive credibility.",
              "Incorrect. Executive reports focus on high-level operational impact and ROI."
            ],
            "practicalTakeaway": "Publish an annual 2-page Green Team Impact Report showing verified financial and resource ROI.",
            "learningOutcome": "Author executive-grade Green Team impact reports",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day workplace action commitment for a Green Team chair?",
            "options": [
              "Canceling all committee meetings for the rest of the year.",
              "Establishing a shared digital Action Log, defining a 45-minute sprint agenda, and facilitating the committee's first structured monthly project review.",
              "Ordering 1,000 plastic banners before setting any project goals.",
              "Deleting the committee membership roster."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Setting up the digital Action Log, establishing the 45-minute sprint format, and facilitating the first structured review institutes lasting operational governance.",
            "incorrectExplanation": "Establishing the digital Action Log, standard agenda, and facilitating the first monthly sprint builds foundational team discipline.",
            "optionFeedback": [
              "Incorrect. Inaction forfeits momentum and leadership mandate.",
              "Correct! Implementing the digital Action Log and running a structured 45-minute sprint meeting establishes immediate operational discipline.",
              "Incorrect. Promotional merchandise without governance is wasteful.",
              "Incorrect. Preserving member rosters is essential for governance and communication."
            ],
            "practicalTakeaway": "Set up a digital Action Log and run your first 45-minute sprint meeting this month.",
            "learningOutcome": "Execute 30-day Green Team leadership commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 7. ELH-117: Setting SMART Departmental Sustainability Targets (D3)
      {
        "courseCode": "ELH-117",
        "title": "Setting SMART Departmental Sustainability Targets",
        "slug": "setting-smart-departmental-sustainability-targets",
        "description": "Formulate mathematically robust, auditable SMART sustainability KPIs, calibrate intensity baselines, and structure milestone variance tracking across business units.",
        "fullDescription": "Setting SMART Departmental Sustainability Targets equips operational managers, functional directors, and ESG data leads to formulate precise, auditable, and achievable sustainability KPIs. Master mathematical normalization techniques (e.g. Scope 1/2 GHG intensity per revenue unit or square meter, water consumption per operational unit), avoid common baseline distortion traps, establish quarterly variance control limits, and integrate targets directly into ERP and performance management systems.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Formulate mathematically sound, auditable SMART sustainability KPIs across operational functions.",
          "Calculate normalized intensity baselines accounting for operational capacity, production volume, and weather seasonality.",
          "Establish upper and lower control limits for quarterly KPI variance tracking.",
          "Integrate departmental targets into corporate ERP systems and executive reporting dashboards."
        ],
        "intendedRoles": ["Operations Managers", "Performance Analysts", "Department Heads", "ESG Coordinators"],
        "badgeName": "SMART Target Specialist",
        "badgeDescription": "Demonstrated competence in mathematical KPI formulation, baseline normalization, and variance control.",
        "completionMessage": "Congratulations! You have completed Setting SMART Departmental Sustainability Targets and are qualified to architect auditable performance metrics.",
        "recommendedNextCourseCode": "ELH-118",
        "lessons": [
          {
            "title": "1. Mathematical Rigor in Sustainability Target Architecture",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why vague targets destroy auditability and how to define precise numerators, denominators, and boundary rules.",
            "contentBlocks": [
              { "id": "elh117-h1", "type": "heading", "level": 3, "text": "Structuring Audit-Grade Departmental KPIs" },
              { "id": "elh117-t1", "type": "short_text", "position": 1, "bodyText": "A sustainability target without mathematical rigor cannot withstand external assurance or provide actionable operational feedback. Every robust KPI requires four structural definitions: (1) **Numerator** (the exact physical resource measured in standard SI units: kWh, kg CO2e, m3 water, metric tonnes waste); (2) **Denominator / Normalization Factor** (the operational business driver: occupied room nights, tonnes of sugar refined, productive machine hours, headcount); (3) **Organizational Boundary** (exact facility, meters, or operational scope included); and (4) **Baseline Period** (typically a 12-month representative historical window)." },
              { "id": "elh117-c1", "type": "callout", "variant": "info", "title": "Formula Standard", "bodyText": "KPI = [Total Resource Units Consumed in Period] / [Total Operational Activity Units in Period]. Ensure both numerator and denominator share identical time boundaries." }
            ]
          },
          {
            "title": "2. Baseline Calibration & Seasonality Adjustments",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Avoiding common baseline errors caused by weather anomalies, pandemic shutdowns, or abnormal production surges.",
            "contentBlocks": [
              { "id": "elh117-h2", "type": "heading", "level": 3, "text": "Selecting and Calibrating a Representative Baseline" },
              { "id": "elh117-t2", "type": "short_text", "position": 1, "bodyText": "Selecting an abnormal baseline year (e.g. an uncharacteristically hot summer, a cyclone shutdown month, or temporary factory expansion) distorts target credibility. Baseline best practice: (1) Use 12 consecutive months of verified primary billing/meter data; (2) Normalize for cooling degree days (CDD) in HVAC energy targets; and (3) Establish a formal Baseline Recalculation Policy triggered if organizational structural changes (mergers, acquisitions, outsourcing) alter the operational asset base by more than 5%." },
              { "id": "elh117-c2", "type": "callout", "variant": "tip", "title": "Recalculation Invariant", "bodyText": "Always document the baseline recalculation threshold in your departmental KPI charter to prevent arbitrary baseline shifting." }
            ]
          },
          {
            "title": "3. Setting Statistical Control Limits & Variance Triggers",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Establishing ±5% and ±10% variance thresholds to trigger timely operational investigations.",
            "contentBlocks": [
              { "id": "elh117-h3", "type": "heading", "level": 3, "text": "Early Warning Systems for KPI Performance" },
              { "id": "elh117-t3", "type": "short_text", "position": 1, "bodyText": "Waiting until the end of the fiscal year to discover that a department missed its energy target by 18% is a governance failure. Institute Statistical Process Control thresholds: (1) **Green Zone (Within ±5% of trajectory)**: Normal operational variation; (2) **Amber Warning (+5% to +10% overconsumption)**: Triggers internal engineering walk-through and sub-meter audit within 7 days; and (3) **Red Alert (>+10% overconsumption)**: Triggers formal Root Cause Analysis (RCA) and mandatory corrective action submission to ExCo within 14 days." },
              { "id": "elh117-c3", "type": "callout", "variant": "action", "title": "Variance Rule", "bodyText": "Automate variance alerts in your monthly reporting spreadsheet to flag amber and red deviations immediately." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Target Calibration",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Evaluate real-world target formulation and variance management scenarios.",
            "contentBlocks": [
              {
                "id": "elh117-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Formulating a Packaging Plant Energy Intensity Target",
                "prompt": "You are the Plant Manager at a corrugated box manufacturing facility in Port Louis. Management asks for a 3-year Scope 2 electricity reduction target. Production volume is projected to grow from 10,000 tonnes to 16,000 tonnes. Which target formulation is technically sound and audit-ready?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Target: 'Cut total plant electricity consumption by 25% in absolute kilowatt-hours'.",
                    "consequence": "Mathematically impossible under 60% production growth. Cutting absolute electricity while manufacturing 60% more boxes would require shutting down machines during working hours, guaranteeing severe commercial delivery failure.",
                    "feedback": "Absolute targets without normalization are unachievable during significant production volume expansion.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Target: 'Reduce electrical energy intensity from 420 kWh per tonne of finished product to 345 kWh per tonne of finished product (-17.9%) by December 2028, verified via sub-metered production logs and CEB utility invoices'.",
                    "consequence": "Optimal target architecture. It establishes a rigorous, normalized metric that reflects true manufacturing energy efficiency, accommodates business expansion, and provides verifiable audit data.",
                    "feedback": "Correct! A normalized intensity KPI (kWh/tonne) with explicit baseline, target value, timeline, and primary verification source is fully SMART and audit-grade.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Target: 'Become the most energy-conscious packaging company in Mauritius'.",
                    "consequence": "Unmeasurable slogan. Lacks mathematical formula, baseline, target number, and audit verification.",
                    "feedback": "Vague aspirations without quantitative metrics fail all SMART criteria.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh117-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Investigating a Red-Alert Water Consumption Spike",
                "prompt": "In July, your textile dyeing facility's water intensity metric spikes by +22% (Red Alert zone). The shift supervisor claims: 'It's just colder weather in July, don't worry about it.' What is your management response?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Accept the supervisor's verbal explanation and close the alert without further investigation.",
                    "consequence": "Severe operational neglect. A major underground pipe rupture continues leaking 15,000 liters of treated water daily, resulting in a Rs 400,000 utility penalty and severe municipal scrutiny.",
                    "feedback": "Dismissing Red-Alert variances without physical verification permits catastrophic leaks to continue.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Trigger a formal 48-hour Root Cause Analysis (RCA): execute night-flow pressure telemetry testing, inspect boiler steam traps, and audit rinse water recovery valves to identify and isolate the physical failure.",
                    "consequence": "Optimal operational management. Night telemetry reveals a failed solenoid valve on Rinse Tank 3 running continuously. Repairing the valve eliminates 15,000 L/day of waste and restores the KPI to the Green Zone within 48 hours.",
                    "feedback": "Excellent! Rigorous Root Cause Analysis with physical pressure and sub-meter diagnostics swiftly detects and resolves hidden waste.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: SMART Target Formulation Sheet",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Formulate one audit-ready SMART sustainability KPI for your department.",
            "contentBlocks": [
              { "id": "elh117-h4", "type": "heading", "level": 3, "text": "Drafting Your Departmental SMART KPI" },
              { "id": "elh117-t4", "type": "short_text", "position": 1, "bodyText": "Complete a 1-page SMART Target Specification Sheet: (1) State exact Numerator and Denominator units; (2) Define 12-month baseline data and calculation formula; (3) Set 3-year annual milestone targets; and (4) Establish ±5% and >+10% variance investigation protocols." },
              { "id": "elh117-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Draft your departmental SMART Target Specification Sheet this month and review it with your finance business partner." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What four structural components are mandatory to make a departmental sustainability KPI audit-grade and mathematically sound?",
            "options": [
              "A catchy slogan, an AI image, a meeting date, and a signature in green ink.",
              "A defined Numerator (physical resource in SI units), Denominator (operational business driver), Organizational Boundary, and a verified 12-month Baseline Period.",
              "A list of company holidays, a font size, a printer name, and an email address.",
              "A qualitative promise, a phone number, a website URL, and a logo."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "Audit-ready metrics require explicit mathematical definition: physical numerator, operational denominator, physical boundary, and historical baseline.",
            "incorrectExplanation": "An audit-ready KPI requires a defined numerator, denominator, organizational boundary, and verified baseline period.",
            "optionFeedback": [
              "Incorrect. Visual design elements do not establish mathematical auditability.",
              "Correct! Explicitly defining the numerator, denominator, organizational boundary, and baseline window ensures mathematical rigor and audit defensibility.",
              "Incorrect. Administrative data does not constitute a mathematical metric.",
              "Incorrect. Qualitative statements lack quantitative auditability."
            ],
            "practicalTakeaway": "Always specify the numerator, denominator, boundary, and baseline period for every KPI.",
            "learningOutcome": "Structure audit-grade sustainability KPI definitions",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is normalizing energy consumption against 'Cooling Degree Days' (CDD) recommended when setting HVAC energy targets in tropical commercial buildings?",
            "options": [
              "Because CDD calculations make the weather colder.",
              "CDD normalizes energy data for outdoor temperature extremes, ensuring a department is neither falsely penalized during severe heatwaves nor falsely praised during unusually cool seasons.",
              "CDD is a tax credit issued by the Central Electricity Board.",
              "CDD allows air conditioners to operate without electricity."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "Weather normalization isolates actual mechanical and behavioral efficiency improvements from ambient climatic variations.",
            "incorrectExplanation": "Cooling Degree Day normalization removes outdoor weather bias, measuring true thermodynamic efficiency.",
            "optionFeedback": [
              "Incorrect. Degree days are statistical climate metrics, not weather control.",
              "Correct! Weather normalization with CDD ensures performance metrics reflect genuine mechanical efficiency rather than outdoor weather fluctuations.",
              "Incorrect. CDD is an engineering calculation, not a fiscal tariff.",
              "Incorrect. HVAC systems consume standard electrical power."
            ],
            "practicalTakeaway": "Apply CDD weather normalization to HVAC energy efficiency targets.",
            "learningOutcome": "Apply weather normalization techniques to energy KPIs",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is a 'Baseline Recalculation Policy' in corporate sustainability target governance?",
            "options": [
              "A rule that requires changing the baseline every Monday morning.",
              "A formalized threshold (typically a ±5% shift in asset base from acquisitions, divestments, or boundary changes) that defines when historical baselines must be mathematically recalculated to maintain comparability.",
              "A policy that deletes all previous energy records after 6 months.",
              "A method to recalculate employee salaries based on the weather."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Baseline recalculation policies maintain longitudinal comparability when corporate mergers, acquisitions, or plant closures alter the operational asset base.",
            "incorrectExplanation": "A baseline recalculation policy establishes formal rules for updating baselines when structural corporate changes alter the asset base.",
            "optionFeedback": [
              "Incorrect. Baselines remain stable unless triggered by material structural events.",
              "Correct! Defining a formal recalculation threshold ensures historical baselines remain comparable after corporate acquisitions, divestments, or major boundary shifts.",
              "Incorrect. Historical records must be preserved permanently for audit verification.",
              "Incorrect. Payroll administration is distinct from carbon accounting boundaries."
            ],
            "practicalTakeaway": "Establish a formal baseline recalculation threshold (e.g. ±5% asset change) in your KPI charter.",
            "learningOutcome": "Govern baseline recalculation protocols during structural change",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Under Statistical Process Control principles for KPI monitoring, what operational action is triggered when a metric enters the 'Amber Warning Zone' (+5% to +10% overconsumption)?",
            "options": [
              "Instant dismissal of the entire engineering shift.",
              "A targeted operational walkthrough, sub-meter inspection, and maintenance verification within 7 days to diagnose and correct consumption drift before month-end.",
              "Ignoring the data until the annual financial audit.",
              "Ordering all machines to be permanently shut down."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "Amber alerts provide early warning of operational drift, prompting swift technical inspection to resolve minor faults before they escalate into major cost overruns.",
            "incorrectExplanation": "Amber warnings trigger prompt technical walkthroughs and sub-meter checks to catch operational drift early.",
            "optionFeedback": [
              "Incorrect. Disciplinary action without investigation violates basic management fairness.",
              "Correct! Amber thresholds trigger prompt operational inspections and sub-meter checks to remediate drift before billing cycles close.",
              "Incorrect. Inaction allows minor equipment faults to escalate into severe utility waste.",
              "Incorrect. Complete shutdowns cause severe commercial disruption."
            ],
            "practicalTakeaway": "Conduct prompt technical inspections whenever a KPI breaches the +5% Amber threshold.",
            "learningOutcome": "Manage early-warning variance control thresholds",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "A hotel resort establishes a water conservation target of 250 liters per occupied room night. In January, occupancy was 90% and water intensity was 240 L/guest night. In June, occupancy dropped to 40% and water intensity spiked to 380 L/guest night. What explains this variance?",
            "options": [
              "Guests in June drank 50 times more water than guests in January.",
              "Fixed baseload water consumption (cooling towers, swimming pool evaporation, grounds irrigation) is divided over far fewer guest nights during low occupancy periods.",
              "The water meters automatically double their readings in winter.",
              "Water pipes freeze in Mauritius in June."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Facilities have fixed baseload water demands; during low-occupancy periods, fixed consumption is divided over fewer guest units, driving up the intensity ratio.",
            "incorrectExplanation": "Fixed facility baseloads divided over low denominator volumes cause intensity spikes during off-peak seasons.",
            "optionFeedback": [
              "Incorrect. Individual human drinking consumption remains relatively stable.",
              "Correct! Fixed facility baseloads (irrigation, pool filtration, cooling towers) distributed over low guest counts cause natural intensity rises during low-occupancy months.",
              "Incorrect. Utility meters measure physical volume accurately regardless of season.",
              "Incorrect. Tropical Mauritius does not experience pipe-freezing temperatures."
            ],
            "practicalTakeaway": "Account for fixed facility baseloads when analyzing seasonal intensity KPI fluctuations.",
            "learningOutcome": "Analyze fixed baseload effects on normalized intensity metrics",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents the most appropriate data verification source for a departmental Scope 1 diesel reduction KPI?",
            "options": [
              "An informal verbal estimate provided by drivers at the end of the year.",
              "Itemized monthly fuel card transaction statements linked to vehicle odometer logs and telematics reports.",
              "The price of crude oil on the New York Stock Exchange.",
              "The number of parking spots in the company garage."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Auditable fuel card transaction reports matched with GPS odometer logs provide primary, verifiable physical activity data.",
            "incorrectExplanation": "Primary fuel card statements combined with odometer telemetry provide auditable Scope 1 verification.",
            "optionFeedback": [
              "Incorrect. Verbal estimates fail all audit and assurance standards.",
              "Correct! Itemized fuel card receipts reconciled with vehicle odometer logs provide auditable primary evidence for Scope 1 tracking.",
              "Incorrect. Global oil commodity pricing does not track internal vehicle consumption.",
              "Incorrect. Parking space count is unrelated to fuel throughput."
            ],
            "practicalTakeaway": "Rely on fuel card transaction statements and telematics for Scope 1 data verification.",
            "learningOutcome": "Select primary data verification sources for targets",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why should departmental sustainability targets be integrated directly into enterprise ERP and executive reporting software?",
            "options": [
              "To make the software company richer.",
              "To automate data aggregation, ensure audit traceability, provide real-time dashboard visibility to executive leaders, and eliminate manual spreadsheet error.",
              "To replace all human managers with artificial intelligence.",
              "Because paper spreadsheets are legally prohibited in Mauritius."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "ERP integration automates data pipelines, eliminates manual data-entry errors, and provides executive leadership with real-time performance telemetry.",
            "incorrectExplanation": "ERP integration ensures automated data pipelines, eliminates spreadsheet errors, and provides auditable executive dashboards.",
            "optionFeedback": [
              "Incorrect. Technology adoption is driven by operational efficiency and data integrity.",
              "Correct! Integrating sustainability metrics into core enterprise systems eliminates manual spreadsheet errors and provides seamless executive visibility.",
              "Incorrect. ERP systems augment human management decision-making.",
              "Incorrect. Spreadsheets are permitted but prone to manual formula and version errors."
            ],
            "practicalTakeaway": "Integrate sustainability KPIs into core enterprise ERP reporting dashboards.",
            "learningOutcome": "Integrate sustainability metrics into enterprise software systems",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day SMART target formulation commitment for a department head?",
            "options": [
              "Telling staff to turn off lights when they remember without tracking data.",
              "Drafting a formal SMART Target Specification Sheet defining normalized numerators, denominators, 12-month baselines, and variance alert thresholds for the department's top resource stream.",
              "Deleting historical utility records to start with a clean slate.",
              "Refusing to participate in corporate ESG reporting."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Drafting an audit-ready SMART specification sheet with normalized formulas and variance thresholds establishes rigorous, durable target governance.",
            "incorrectExplanation": "Formulating an audit-ready SMART target specification sheet with normalized baselines establishes sound operational governance.",
            "optionFeedback": [
              "Incorrect. Informal reminders without tracking fail to deliver measurable results.",
              "Correct! Formulating a formal SMART Target Specification Sheet with normalized formulas and variance thresholds institutes sound operational target governance.",
              "Incorrect. Historical records must be preserved for audit baselines.",
              "Incorrect. ESG compliance is an essential corporate leadership responsibility."
            ],
            "practicalTakeaway": "Draft a formal SMART Target Specification Sheet with normalized formulas this month.",
            "learningOutcome": "Execute 30-day SMART target formulation action commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      },

      # 8. ELH-118: Managing Sustainability Performance & KPIs (D3)
      {
        "courseCode": "ELH-118",
        "title": "Managing Sustainability Performance & KPIs",
        "slug": "managing-sustainability-performance-kpis",
        "description": "Master continuous KPI monitoring, variance root-cause analysis (5-Whys, Ishikawa), corrective action plans (CAP), and executive performance reporting.",
        "fullDescription": "Managing Sustainability Performance & KPIs teaches operational leaders, quality managers, and sustainability coordinators how to govern and sustain departmental performance after targets are established. Master monthly variance analysis, root-cause troubleshooting tools (5-Whys, Fishbone diagrams), time-bound Corrective Action Plans (CAP), performance escalation paths, and executive dashboard communications that keep multi-year decarbonization roadmaps strictly on schedule.",
        "categoryId": 1,
        "durationMinutes": 20,
        "priceUsd": "0.00",
        "level": "D3 Applied",
        "passingScore": 75,
        "primaryCompetency": "COMP_LEADERSHIP",
        "secondaryCompetencies": ["COMP_REPORTING", "COMP_GOVERNANCE_ETHICS"],
        "learningObjectives": [
          "Execute systematic monthly variance reviews comparing actual departmental consumption against target trajectories.",
          "Apply structured Root Cause Analysis (RCA) techniques (5-Whys, Ishikawa Fishbone) to diagnose operational overconsumption.",
          "Formulate time-bound Corrective Action Plans (CAP) with 30-day remediation milestones and single-point accountability.",
          "Prepare executive-grade performance summaries highlighting variances, root causes, and corrective actions."
        ],
        "intendedRoles": ["Operations Managers", "Continuous Improvement Leads", "Department Supervisors", "HSE Officers"],
        "badgeName": "Sustainability Performance Manager",
        "badgeDescription": "Demonstrated capability in KPI variance analysis, root cause troubleshooting, and corrective action governance.",
        "completionMessage": "Congratulations! You have completed Managing Sustainability Performance & KPIs and are equipped to maintain operational excellence.",
        "recommendedNextCourseCode": "ELH-121",
        "lessons": [
          {
            "title": "1. The Performance Management Cycle & Telemetry Rhythms",
            "orderIndex": 0,
            "durationMinutes": 4,
            "content": "Why setting targets is insufficient without continuous operational monitoring and feedback.",
            "contentBlocks": [
              { "id": "elh118-h1", "type": "heading", "level": 3, "text": "Closing the Plan-Do-Check-Act (PDCA) Loop" },
              { "id": "elh118-t1", "type": "short_text", "position": 1, "bodyText": "Sustainability targets fail when organizations treat goal-setting as an annual event rather than a continuous operational discipline. Governed by the Plan-Do-Check-Act (PDCA) cycle, high-performing departments maintain disciplined telemetry rhythms: (1) Weekly sub-meter reviews to detect mechanical anomalies; (2) Monthly KPI variance reconciliation against utility invoices; (3) Quarterly executive milestone reporting; and (4) Annual target recalibration based on verified audited results." },
              { "id": "elh118-c1", "type": "callout", "variant": "info", "title": "Cadence Invariant", "bodyText": "Never allow more than 30 days to pass without reconciling departmental resource consumption against the target trajectory." }
            ]
          },
          {
            "title": "2. Root Cause Analysis: 5-Whys & Fishbone Diagnostics",
            "orderIndex": 1,
            "durationMinutes": 4,
            "content": "Diagnosing the underlying physical and behavioral causes of KPI overconsumption rather than treating symptoms.",
            "contentBlocks": [
              { "id": "elh118-h2", "type": "heading", "level": 3, "text": "Diagnosing the Real Problem" },
              { "id": "elh118-t2", "type": "short_text", "position": 1, "bodyText": "When a department experiences an energy or water spike, superficial reactions (like sending an angry email) fail to solve the issue. Apply structured Root Cause Analysis (RCA): (1) **The 5-Whys Technique**: Drill down iteratively through symptoms to identify systemic failures (e.g. Electricity spiked -> AC ran overnight -> Timer overridden -> Sensor failed -> Preventative maintenance contract expired); and (2) **Ishikawa (Fishbone) Diagram**: Categorize potential failure modes across People, Machinery, Methods, and Materials." },
              { "id": "elh118-c2", "type": "callout", "variant": "tip", "title": "RCA Principle", "bodyText": "Always identify the systemic process failure behind human error. Blaming individuals never cures recurring mechanical waste." }
            ]
          },
          {
            "title": "3. The 30-Day Corrective Action Plan (CAP) Framework",
            "orderIndex": 2,
            "durationMinutes": 4,
            "content": "Structuring time-bound remedial roadmaps to restore off-track KPIs to green status.",
            "contentBlocks": [
              { "id": "elh118-h3", "type": "heading", "level": 3, "text": "Restoring Off-Track KPIs to Target Trajectory" },
              { "id": "elh118-t3", "type": "short_text", "position": 1, "bodyText": "When a metric breaches the +10% Red Alert threshold, the department must submit a formal 30-day Corrective Action Plan (CAP): (1) **Immediate Containment Action** (within 24h: e.g. isolate leaking pipe valve); (2) **Root Cause Finding** (within 72h: e.g. corroded valve seat); (3) **Permanent Corrective Action** (within 14 days: e.g. replace valve with stainless steel unit and update PM schedule); and (4) **Verification Audit** (at Day 30: confirm water intensity metric returned to Green Zone)." },
              { "id": "elh118-c3", "type": "callout", "variant": "action", "title": "CAP Governance", "bodyText": "Log every CAP in the central compliance register and require formal sign-off from the Department Head once Day-30 verification data is confirmed." }
            ]
          },
          {
            "title": "4. Interactive Decision Scenarios: Performance Management",
            "orderIndex": 3,
            "durationMinutes": 4,
            "content": "Navigate operational performance crises involving unexpected consumption spikes and executive reporting.",
            "contentBlocks": [
              {
                "id": "elh118-s1",
                "type": "interactive_scenario",
                "title": "Scenario 1: Diagnosing an Unexplained Weekend Power Spike",
                "prompt": "Your corporate headquarters experiences a 40% surge in weekend electrical baseload over 3 consecutive weekends, threatening the department's annual Scope 2 KPI. How do you lead the investigation?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Issue an all-staff reprimand email accusing employees of leaving their phone chargers plugged in.",
                    "consequence": "Ineffective diagnosis. Phone chargers consume negligible wattage (<5W); the email alienates staff while the massive multi-kilowatt power leak continues undetected.",
                    "feedback": "Making uninformed assumptions and blaming staff without technical data fails to diagnose industrial-scale power surges.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Conduct an after-hours physical walkthrough on Saturday night with an electrical sub-meter data logger, discovering that the IT server room backup CRAC chiller was stuck in continuous manual defrost heating mode due to a faulty relay.",
                    "consequence": "Optimal technical diagnosis. You isolate the exact physical mechanical failure, replace the Rs 2,500 relay on Monday, eliminate 12,000 kWh of monthly waste, and restore the KPI to the Green Zone.",
                    "feedback": "Correct! Systematic physical and telemetry diagnostics quickly identify mechanical faults that account for large industrial power anomalies.",
                    "score": 100
                  },
                  {
                    "id": "opt_c",
                    "text": "Ignore the weekend data because the office is closed on weekends.",
                    "consequence": "Severe financial waste. The faulty chiller heating element continues running 24/7, adding Rs 85,000/month to utility bills and risking compressor burnout.",
                    "feedback": "Ignoring unmanaged baseload consumption causes severe financial and equipment reliability damage.",
                    "score": 0
                  }
                ]
              },
              {
                "id": "elh118-s2",
                "type": "interactive_scenario",
                "title": "Scenario 2: Executive Reporting on an Off-Track Annual Goal",
                "prompt": "At the Q3 Executive Committee meeting, your department is tracking 12% behind its annual paperless digitization target due to delays in legal contract approval workflows. How do you present the performance status?",
                "options": [
                  {
                    "id": "opt_a",
                    "text": "Manipulate the slide chart axes to make the 12% deficit look like a minor 1% dip and hope no one notices.",
                    "consequence": "Catastrophic governance breach. Falsifying visual data violates executive trust, triggers audit sanctions, and prevents leadership from helping unblock legal bottlenecks.",
                    "feedback": "Distorting reporting charts is unethical, destroys leadership credibility, and breaches internal governance.",
                    "score": 0
                  },
                  {
                    "id": "opt_b",
                    "text": "Present the 12% variance transparently, explain the specific legal bottleneck with data, and present an approved Corrective Action Plan that integrates cloud e-signature API workflows to achieve full target recovery by Q4.",
                    "consequence": "Optimal executive leadership. You demonstrate transparent governance, provide a clear technical recovery plan, and secure executive support to unblock legal workflow approvals.",
                    "feedback": "Excellent! Transparent variance reporting combined with an actionable, data-backed recovery roadmap builds executive confidence.",
                    "score": 100
                  }
                ]
              }
            ]
          },
          {
            "title": "5. Workplace Action: Monthly Performance Review Protocol",
            "orderIndex": 4,
            "durationMinutes": 4,
            "content": "Institutionalize a monthly KPI variance and corrective action routine in your department.",
            "contentBlocks": [
              { "id": "elh118-h4", "type": "heading", "level": 3, "text": "Setting Up Your Monthly KPI Review" },
              { "id": "elh118-t4", "type": "short_text", "position": 1, "bodyText": "Establish three operational assets: (1) A monthly 1-page KPI Variance Tracker; (2) A standardized 5-Whys Root Cause Analysis template; and (3) A 30-day Corrective Action Plan (CAP) log for Amber and Red deviations." },
              { "id": "elh118-c4", "type": "callout", "variant": "action", "title": "Workplace Action", "bodyText": "Conduct your department's first structured monthly KPI variance review and document any corrective action plans within the next 30 days." }
            ]
          }
        ],
        "quizQuestions": [
          {
            "question": "What is the primary objective of applying the '5-Whys' technique during a sustainability KPI variance investigation?",
            "options": [
              "To ask five different employees why they dislike coming to work.",
              "To drill down through visible superficial symptoms to identify the underlying systemic or mechanical root cause of resource overconsumption.",
              "To spend five hours in a meeting room arguing.",
              "To write five apology letters to the Central Electricity Board."
            ],
            "correctOption": 1,
            "orderIndex": 0,
            "correctExplanation": "The 5-Whys technique methodically peels back layers of symptoms to expose the root procedural, mechanical, or governance failure driving resource waste.",
            "incorrectExplanation": "The 5-Whys methodology drills down through symptoms to identify and resolve systemic root causes.",
            "optionFeedback": [
              "Incorrect. The technique investigates operational systems, not personal employee sentiment.",
              "Correct! The 5-Whys method moves past superficial symptoms to uncover the root systemic process or mechanical failure.",
              "Incorrect. RCA is a structured, time-efficient diagnostic discipline.",
              "Incorrect. Investigation focuses on internal operational root cause elimination."
            ],
            "practicalTakeaway": "Use the 5-Whys technique to uncover root systemic process failures behind KPI spikes.",
            "learningOutcome": "Apply 5-Whys root cause analysis to sustainability variances",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What are the four essential stages of a 30-Day Corrective Action Plan (CAP) when a sustainability metric breaches the Red Alert threshold (>+10%)?",
            "options": [
              "Panic, Blame, Denial, and Resignation.",
              "Immediate Containment (24h), Root Cause Diagnosis (72h), Permanent Remedial Action (14 days), and Day-30 Data Verification Audit.",
              "Writing a press release, hiring an actor, planting a flower, and deleting the data.",
              "Ignoring the issue for 30 days to see if the metric fixes itself."
            ],
            "correctOption": 1,
            "orderIndex": 1,
            "correctExplanation": "A disciplined CAP stops immediate loss within 24h, diagnoses root causes in 72h, implements permanent fixes in 14 days, and audits data at Day 30.",
            "incorrectExplanation": "A structured CAP framework encompasses 24h containment, 72h root cause analysis, 14-day permanent fix, and Day-30 verification.",
            "optionFeedback": [
              "Incorrect. Professional governance requires structured, objective problem-solving.",
              "Correct! Systematic 24h containment, 72h root cause analysis, 14-day permanent repair, and Day-30 verification ensures durable performance recovery.",
              "Incorrect. Superficial PR actions do not fix physical operational breakdowns.",
              "Incorrect. Inaction allows physical resource waste and financial losses to compound."
            ],
            "practicalTakeaway": "Execute the 4-stage CAP framework (Containment, Diagnosis, Fix, Verification) for Red Alert variances.",
            "learningOutcome": "Structure time-bound Corrective Action Plans",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is blaming human error an ineffective long-term solution for recurring operational energy or water waste?",
            "options": [
              "Because humans are legally exempt from making mistakes.",
              "Human error is almost always a symptom of flawed process design, broken automated controls, poor signage, or lack of preventative maintenance; fixing the system prevents recurring failure.",
              "Because machines never break down.",
              "Blaming humans makes the electricity meters spin backwards."
            ],
            "correctOption": 1,
            "orderIndex": 2,
            "correctExplanation": "Sustainable operations rely on poka-yoke (error-proofing) and robust automated controls; fixing system design prevents errors regardless of which employee is on shift.",
            "incorrectExplanation": "Systemic process and engineering improvements prevent recurring errors, whereas blaming individuals leaves underlying system flaws untouched.",
            "optionFeedback": [
              "Incorrect. Human performance is governed by workplace environment design.",
              "Correct! Error-proofing process design, automated setbacks, and preventative maintenance prevent waste regardless of personnel rotation.",
              "Incorrect. Mechanical hardware requires active maintenance.",
              "Incorrect. Utility metering measures physical energy flow."
            ],
            "practicalTakeaway": "Address systemic process design and automated controls rather than stopping at human error.",
            "learningOutcome": "Diagnose systemic process failures over individual blame",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "In an Ishikawa (Fishbone) diagram for an industrial chemical waste spike, which four standard categories should a team analyze?",
            "options": [
              "Spring, Summer, Autumn, and Winter.",
              "People (training, shift handover), Machinery (valves, meters), Methods (SOPs, dilution ratios), and Materials (chemical purity, batch quality).",
              "Facebook, Instagram, LinkedIn, and TikTok.",
              "Gold, Silver, Bronze, and Platinum."
            ],
            "correctOption": 1,
            "orderIndex": 3,
            "correctExplanation": "The 4M framework (Man/People, Machine, Method, Material) systematically covers all operational variables driving industrial process variance.",
            "incorrectExplanation": "The 4M framework (People, Machinery, Methods, Materials) structures root-cause analysis across all operational failure modes.",
            "optionFeedback": [
              "Incorrect. Seasonal categories do not capture operational process variables.",
              "Correct! Categorizing potential failure modes across People, Machinery, Methods, and Materials ensures comprehensive diagnostic coverage.",
              "Incorrect. Social media channels are unrelated to industrial chemical process control.",
              "Incorrect. Precious metals are irrelevant to root-cause categorization."
            ],
            "practicalTakeaway": "Use the 4M Fishbone framework (People, Machine, Method, Material) to structure diagnostic audits.",
            "learningOutcome": "Apply Ishikawa Fishbone diagrams to resource overconsumption",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "When presenting an off-track quarterly sustainability KPI to the Executive Committee, what reporting format maintains maximum leadership credibility?",
            "options": [
              "Hiding the slide and hoping the meeting ends before anyone asks.",
              "Presenting the variance transparently, explaining the diagnosed root cause with primary data, and providing an actionable Corrective Action Plan with recovery milestones.",
              "Blaming the weather, the government, and the junior interns.",
              "Altering the chart numbers so the line looks green."
            ],
            "correctOption": 1,
            "orderIndex": 4,
            "correctExplanation": "Transparent, data-backed reporting coupled with an actionable, time-bound recovery plan demonstrates professional managerial control and integrity.",
            "incorrectExplanation": "Transparent variance disclosure combined with data-backed root causes and actionable recovery roadmaps maintains executive confidence.",
            "optionFeedback": [
              "Incorrect. Concealing performance gaps breaches governance and destroys executive trust.",
              "Correct! Transparent variance disclosure, data-backed root cause explanation, and a clear Corrective Action Plan project competence and leadership integrity.",
              "Incorrect. Passing blame demonstrates lack of managerial accountability.",
              "Incorrect. Falsifying reporting charts is fraudulent and violates audit standards."
            ],
            "practicalTakeaway": "Present off-track variances transparently alongside data-backed root causes and recovery CAPs.",
            "learningOutcome": "Deliver executive-grade performance and variance reports",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "What is the role of 'Statistical Process Control' (SPC) upper and lower limits in ongoing sustainability performance management?",
            "options": [
              "To restrict employee internet access.",
              "To distinguish normal, expected operational baseline noise (±5%) from genuine systemic equipment failures or leaks requiring immediate management intervention.",
              "To calculate monthly income taxes automatically.",
              "To turn off the building's water supply every night."
            ],
            "correctOption": 1,
            "orderIndex": 5,
            "correctExplanation": "Control limits prevent teams from over-reacting to minor random fluctuations while guaranteeing immediate investigation of statistically significant anomalies.",
            "incorrectExplanation": "Control limits separate normal operational noise from genuine equipment anomalies requiring technical intervention.",
            "optionFeedback": [
              "Incorrect. SPC is an analytical quality and telemetry discipline.",
              "Correct! SPC thresholds filter out random operational noise while ensuring significant consumption spikes immediately trigger technical root-cause investigation.",
              "Incorrect. Tax calculations are governed by MRA revenue statutes.",
              "Incorrect. Control limits trigger diagnostic analysis, not indiscriminate utility shutdowns."
            ],
            "practicalTakeaway": "Use SPC control limits to distinguish random baseline noise from true operational failures.",
            "learningOutcome": "Apply Statistical Process Control thresholds to telemetry",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Why is a Day-30 Verification Audit mandatory before closing a formal Corrective Action Plan (CAP)?",
            "options": [
              "To celebrate with a party.",
              "To verify with fresh metered activity data that the remedial fix successfully resolved the root cause and permanently returned the KPI to the Green Zone.",
              "To reset all computer passwords in the department.",
              "Because international law requires 30 days of paperwork."
            ],
            "correctOption": 1,
            "orderIndex": 6,
            "correctExplanation": "A CAP cannot be closed on promises alone; fresh metered telemetry is required to prove that the corrective action permanently eliminated the physical waste.",
            "incorrectExplanation": "Day-30 verification proves with fresh telemetry that the fix permanently returned the metric to the target trajectory.",
            "optionFeedback": [
              "Incorrect. Milestone celebrations follow verified performance results.",
              "Correct! Verifying with fresh metered data ensures the physical problem was permanently resolved rather than temporarily patched.",
              "Incorrect. IT security administration is distinct from environmental CAP verification.",
              "Incorrect. Verification is an essential operational quality control standard."
            ],
            "practicalTakeaway": "Mandate fresh metered data verification before officially closing any Corrective Action Plan.",
            "learningOutcome": "Execute data-backed verification audits for corrective actions",
            "competencyArea": "COMP_LEADERSHIP"
          },
          {
            "question": "Which of the following represents an effective 30-day performance management action commitment for an operational supervisor?",
            "options": [
              "Ignoring sub-meter data until the end of the year.",
              "Conducting a monthly KPI variance audit, performing a 5-Whys root-cause investigation on any off-track metrics, and establishing a 30-day Corrective Action Plan.",
              "Disabling all utility sub-meters to prevent alarms from ringing.",
              "Refusing to report consumption data to management."
            ],
            "correctOption": 1,
            "orderIndex": 7,
            "correctExplanation": "Conducting systematic monthly variance reviews, applying 5-Whys diagnostics, and managing time-bound CAPs embeds continuous operational excellence.",
            "incorrectExplanation": "Conducting monthly variance reviews and applying 5-Whys diagnostics with 30-day CAPs institutionalizes performance management.",
            "optionFeedback": [
              "Incorrect. Delaying telemetry analysis allows severe utility waste to compound.",
              "Correct! Systematic monthly variance auditing, 5-Whys root cause diagnosis, and 30-day CAP tracking institutionalizes continuous operational excellence.",
              "Incorrect. Tampering with telemetry breaches corporate compliance and safety codes.",
              "Incorrect. Transparent reporting is fundamental to operational governance."
            ],
            "practicalTakeaway": "Conduct monthly variance reviews and manage 30-day CAPs for any off-track KPIs.",
            "learningOutcome": "Execute 30-day performance management action commitment",
            "competencyArea": "COMP_LEADERSHIP"
          }
        ]
      }
    ]

print("Wave 3A Module 2 ready.")
