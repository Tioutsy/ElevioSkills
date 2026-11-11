/**
 * Morieva Skills — Free Foundational Learning Challenges Pathway
 * Single source of truth for the 10 free challenges, ordering, competencies, and review mapping.
 */

export interface FreeChallengeDefinition {
  order: number;
  courseId: number;
  courseCode: string;
  slug: string;
  title: string;
  topic: string;
  description: string;
  rationale: string;
  competencyArea: string;
  targetAudience: string;
  whatYouWillPractise: string[];
}

export const FREE_FOUNDATIONAL_CHALLENGES: FreeChallengeDefinition[] = [
  {
    order: 1,
    courseId: 1,
    courseCode: "ELH-01",
    slug: "sustainability-foundations",
    title: "Sustainability Foundations",
    topic: "Workplace Sustainability Fundamentals",
    description: "Understand the core pillars of sustainability and why practical action matters in everyday Mauritian workplaces.",
    rationale: "The essential orientation challenge that frames why sustainability matters to businesses and employees across Mauritius.",
    competencyArea: "Foundational Sustainability Principles",
    targetAudience: "All employees across all sectors in Mauritius",
    whatYouWillPractise: [
      "Distinguish between environmental, social, and economic workplace impacts",
      "Identify daily operational decisions that reduce resource waste",
      "Connect personal workplace habits to national sustainability goals"
    ]
  },
  {
    order: 2,
    courseId: 2,
    courseCode: "ELH-02",
    slug: "waste-sorting-mauritian-bin-system",
    title: "Waste Sorting & the Mauritian Bin System",
    topic: "Workplace Waste & Sorting Rules",
    description: "Master workplace waste sorting, identify clean recyclables, and follow your site's designated bin labels to protect Mare Chicose landfill.",
    rationale: "Addresses the most immediate daily physical action in Mauritian workplaces: correct waste separation and contamination prevention.",
    competencyArea: "Workplace Waste Sorting & Contamination Control",
    targetAudience: "Frontline, office, hospitality, and facility staff",
    whatYouWillPractise: [
      "Follow workplace-specific bin labels rather than assuming generic colour schemes",
      "Prevent food and liquid contamination of clean recyclables",
      "Safely escalate hazardous items such as batteries and electronic waste"
    ]
  },
  {
    order: 3,
    courseId: 3,
    courseCode: "ELH-03",
    slug: "energy-efficiency-at-work",
    title: "Energy Efficiency at Work",
    topic: "Energy Habits & Climate Control",
    description: "Reduce peak electricity usage, optimize air conditioning setpoints (24°C–25°C), and build consistent end-of-day shutdown habits.",
    rationale: "Energy in Mauritius relies significantly on imported fossil fuels; simple office and workplace habits yield immediate carbon and cost reductions.",
    competencyArea: "Workplace Energy Efficiency & HVAC Management",
    targetAudience: "Office employees, facility managers, and operations teams",
    whatYouWillPractise: [
      "Maintain air conditioning thermostats between 24°C and 25°C to avoid energy spikes",
      "Implement reliable end-of-shift shutdown routines for lighting and computers",
      "Report energy inefficiencies and malfunctioning equipment to facilities"
    ]
  },
  {
    order: 4,
    courseId: 4,
    courseCode: "ELH-04",
    slug: "water-conservation",
    title: "Water Conservation",
    topic: "Water Stewardship & Leak Reporting",
    description: "Recognize island freshwater vulnerability, eliminate water waste in staff amenities, and report leaks rapidly to facilities.",
    rationale: "Mauritius experiences seasonal dry spells and reservoir pressure; frontline water awareness is critical for every company.",
    competencyArea: "Freshwater Stewardship & Leak Detection",
    targetAudience: "All staff, especially housekeeping, food and beverage, and maintenance",
    whatYouWillPractise: [
      "Recognize the critical freshwater realities and reservoir constraints in Mauritius",
      "Identify and immediately report dripping taps, leaking toilets, and pipe fractures",
      "Adopt water-smart cleaning and washroom habits"
    ]
  },
  {
    order: 5,
    courseId: 6,
    courseCode: "ELH-06",
    slug: "green-office-practices",
    title: "Green Office Practices",
    topic: "Daily Office Habits & Resource Care",
    description: "Adopt paperless administrative routines, extend hardware lifespan, and eliminate unnecessary consumable waste across workstations.",
    rationale: "Provides universal, easy-to-implement habits for desk and administrative employees across all corporate sectors.",
    competencyArea: "Green Office Administration & Daily Eco-Habits",
    targetAudience: "Administrative, finance, corporate, and knowledge workers",
    whatYouWillPractise: [
      "Transition from printed documentation to digital approval workflows",
      "Reduce unnecessary printing and double-sided print formatting",
      "Maintain workstation hardware to extend operational equipment life"
    ]
  },
  {
    order: 6,
    courseId: 5,
    courseCode: "ELH-05",
    slug: "sustainable-procurement",
    title: "Sustainable Purchasing for Non-Specialists",
    topic: "Eco-Friendly Ordering & Single-Use Elimination",
    description: "Make responsible purchasing choices for everyday team supplies, event catering, and packaging, eliminating single-use plastics.",
    rationale: "Empowers employees who order daily office supplies or team catering to choose reusable, low-impact local alternatives.",
    competencyArea: "Sustainable Sourcing & Single-Use Plastic Elimination",
    targetAudience: "Team leads, office coordinators, event planners, and purchasing assistants",
    whatYouWillPractise: [
      "Evaluate suppliers on local packaging and recyclable materials",
      "Eliminate single-use plastic cups, cutlery, and water bottles at work events",
      "Prioritise certified sustainable and local Mauritian products"
    ]
  },
  {
    order: 7,
    courseId: 7,
    courseCode: "ELH-07",
    slug: "carbon-footprint-awareness",
    title: "Carbon Footprint Awareness",
    topic: "Carbon Emissions & Commuter Impact",
    description: "Measure personal and team carbon footprints, recognize Scope 1, 2, and 3 emission sources, and choose lower-emission commute habits.",
    rationale: "Connects daily decisions (carpooling, metro, remote work days, travel) to measurable national decarbonization targets.",
    competencyArea: "Carbon Footprint Calculation & Commute Decarbonisation",
    targetAudience: "All staff and line managers",
    whatYouWillPractise: [
      "Distinguish between Scope 1 (direct), Scope 2 (electricity), and Scope 3 (value chain) emissions",
      "Calculate commuter emission differences between solo driving, carpooling, and Metro Express",
      "Identify operational adjustments that reduce business travel emissions"
    ]
  },
  {
    order: 8,
    courseId: 8,
    courseCode: "ELH-08",
    slug: "biodiversity-in-mauritius",
    title: "Biodiversity in Mauritius",
    topic: "Island Ecosystems & Coastal Protection",
    description: "Protect unique Mauritian native flora and fauna, understand lagoon ecosystem fragility, and stop chemical or plastic runoff at work.",
    rationale: "Tailored to our island reality: Mauritius is a global biodiversity hotspot with delicate coastal lagoons that depend on clean business practices.",
    competencyArea: "Mauritian Biodiversity & Lagoon Protection",
    targetAudience: "All staff, particularly tourism, agriculture, landscaping, and logistics",
    whatYouWillPractise: [
      "Understand the sensitivity of Mauritian coral reefs, endemic species, and coastal wetlands",
      "Prevent outdoor storm drain contamination from industrial detergents and grease",
      "Promote indigenous plant species in workplace outdoor landscaping"
    ]
  },
  {
    order: 9,
    courseId: 11,
    courseCode: "ELH-11",
    slug: "circular-economy",
    title: "Circular Economy",
    topic: "Circular Resource Loops & Material Reuse",
    description: "Move from the linear 'take-make-dispose' model to circular practices: reuse, repair, packaging return, and partnering with local recyclers.",
    rationale: "Prepares employees to identify reuse opportunities and support circular initiatives that keep materials in economic circulation.",
    competencyArea: "Circular Economy & Material Life-Cycle Extension",
    targetAudience: "Operations, logistics, facilities, and procurement staff",
    whatYouWillPractise: [
      "Identify opportunities to repair or refurbish equipment rather than discarding",
      "Partner with accredited Mauritian recycling collectors for closed-loop packaging",
      "Design zero-waste processes for common workplace workflows"
    ]
  },
  {
    order: 10,
    courseId: 9,
    courseCode: "ELH-09",
    slug: "esg-basics",
    title: "ESG Basics",
    topic: "Environmental, Social & Governance Integration",
    description: "Understand Environmental, Social, and Governance principles, see how workplace actions support corporate ESG disclosures, and prepare for performance review.",
    rationale: "The culminating foundational challenge that ties all habits together into corporate ESG accountability and unlocks the personal Sustainability Skills Review.",
    competencyArea: "ESG Governance & Workplace Policy Application",
    targetAudience: "All employees and managers",
    whatYouWillPractise: [
      "Explain how daily frontline behaviours feed into corporate ESG reporting",
      "Recognize the Governance and Social responsibilities of ethical business in Mauritius",
      "Synthesize personal sustainability habits to complete the foundational learning journey"
    ]
  }
];

export const FREE_CHALLENGE_COURSE_IDS = FREE_FOUNDATIONAL_CHALLENGES.map((c) => c.courseId);

export function isFreeFoundationalChallenge(courseId: number): boolean {
  return FREE_CHALLENGE_COURSE_IDS.includes(courseId);
}

export function getFreeChallengeByCourseId(courseId: number): FreeChallengeDefinition | undefined {
  return FREE_FOUNDATIONAL_CHALLENGES.find((c) => c.courseId === courseId);
}

export function getFreeChallengeByOrder(order: number): FreeChallengeDefinition | undefined {
  return FREE_FOUNDATIONAL_CHALLENGES.find((c) => c.order === order);
}

/**
 * Topic mapping from foundational competency areas to recommended paid follow-on challenges
 */
export interface TopicRecommendationRule {
  competencyArea: string;
  recommendedCourseId: number;
  recommendedCourseCode: string;
  recommendedTitle: string;
  reason: string;
}

export const TOPIC_PAID_RECOMMENDATIONS: TopicRecommendationRule[] = [
  {
    competencyArea: "Foundational Sustainability Principles",
    recommendedCourseId: 13,
    recommendedCourseCode: "ELH-13",
    recommendedTitle: "Sustainability Action Planning",
    reason: "Translate high-level sustainability concepts into structured departmental action roadmaps."
  },
  {
    competencyArea: "Workplace Waste Sorting & Contamination Control",
    recommendedCourseId: 37,
    recommendedCourseCode: "ELH-37",
    recommendedTitle: "Hotel Food Waste Prevention & Composting",
    reason: "Deepen waste diversion with advanced organic waste management, measurement, and on-site composting."
  },
  {
    competencyArea: "Workplace Energy Efficiency & HVAC Management",
    recommendedCourseId: 27,
    recommendedCourseCode: "ELH-27",
    recommendedTitle: "Sustainability for Facilities and Property Teams",
    reason: "Take energy stewardship further with building automation, HVAC maintenance, and energy auditing protocols."
  },
  {
    competencyArea: "Freshwater Stewardship & Leak Detection",
    recommendedCourseId: 38,
    recommendedCourseCode: "ELH-38",
    recommendedTitle: "Hotel Laundry & Water Stewardship",
    reason: "Explore commercial water recycling, industrial laundry efficiency, and advanced rainwater harvesting."
  },
  {
    competencyArea: "Green Office Administration & Daily Eco-Habits",
    recommendedCourseId: 15,
    recommendedCourseCode: "ELH-15",
    recommendedTitle: "Building a Workplace Sustainability Team",
    reason: "Learn how to establish, run, and maintain an active cross-functional Green Team in your office."
  },
  {
    competencyArea: "Sustainable Sourcing & Single-Use Plastic Elimination",
    recommendedCourseId: 26,
    recommendedCourseCode: "ELH-26",
    recommendedTitle: "Sustainability for Procurement and Purchasing Teams",
    reason: "Professionalise supplier evaluation, tender ESG criteria, and supply chain contract clauses."
  },
  {
    competencyArea: "Carbon Footprint Calculation & Commute Decarbonisation",
    recommendedCourseId: 30,
    recommendedCourseCode: "ELH-30",
    recommendedTitle: "Climate Risk & Workplace Resilience",
    reason: "Evaluate how extreme island weather, cyclones, and sea-level rise affect business continuity and supply chains."
  },
  {
    competencyArea: "Mauritian Biodiversity & Lagoon Protection",
    recommendedCourseId: 46,
    recommendedCourseCode: "ELH-46",
    recommendedTitle: "Eco-Tourism & Marine Biodiversity Protection",
    reason: "Specialized maritime conservation, coral reef protection, and eco-certification for Mauritian enterprises."
  },
  {
    competencyArea: "Circular Economy & Material Life-Cycle Extension",
    recommendedCourseId: 29,
    recommendedCourseCode: "ELH-29",
    recommendedTitle: "Sustainability for Operations and Frontline Teams",
    reason: "Apply lean circular manufacturing, reduce frontline operational scrap, and implement packaging take-back."
  },
  {
    competencyArea: "ESG Governance & Workplace Policy Application",
    recommendedCourseId: 33,
    recommendedCourseCode: "ELH-33",
    recommendedTitle: "ESG Data, Measurement & Reporting Basics",
    reason: "Master key corporate sustainability indicators, materiality, and compliance reporting frameworks."
  }
];

export const CAPSTONE_RECOMMENDATION = {
  courseId: 12,
  courseCode: "ELH-12",
  title: "Final Sustainability Certification",
  reason: "Earn your formal qualification by completing the comprehensive 12-competency Morieva Skills capstone assessment."
};

export const DETERMINISTIC_FALLBACK_RECOMMENDATION = {
  courseId: 13,
  courseCode: "ELH-13",
  title: "Sustainability Action Planning",
  reason: "Turn your foundational knowledge into structured, measurable actions across your workplace."
};
