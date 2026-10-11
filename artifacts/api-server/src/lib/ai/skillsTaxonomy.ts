export type KnowledgeDomain = "environmental" | "social" | "governance";

export interface KnowledgeTopic {
  id: string;
  domain: KnowledgeDomain;
  label: string;
  description: string;
  keywords: string[];
}

export const KNOWLEDGE_TAXONOMY: KnowledgeTopic[] = [
  // Environmental Domain
  {
    id: "sustainability_foundations",
    domain: "environmental",
    label: "Sustainability Foundations",
    description: "Core ESG concepts, ecological principles, and climate literacy basics.",
    keywords: ["sustainability foundations", "sustainability basics", "sustainability", "climate literacy", "elh-01"],
  },
  {
    id: "waste_management",
    domain: "environmental",
    label: "Waste Management & Circular Economy",
    description: "Waste segregation, recycling procedures, circular materials, and reduction strategies.",
    keywords: ["waste", "recycling", "sorting", "circular", "refuse", "litter", "elh-02"],
  },
  {
    id: "energy_efficiency",
    domain: "environmental",
    label: "Energy Efficiency & Renewables",
    description: "Energy conservation practices, renewables, power efficiency, and carbon reduction.",
    keywords: ["energy efficiency", "energy conservation", "energy", "power efficiency", "renewables", "electricity", "carbon reduction", "elh-03"],
  },
  {
    id: "biodiversity",
    domain: "environmental",
    label: "Biodiversity & Natural Ecosystems",
    description: "Ecosystem protection, biodiversity impacts, local conservation, and habitat preservation.",
    keywords: ["biodiversity", "nature ecosystem", "ecosystem protection", "flora and fauna", "habitat preservation", "elh-04"],
  },
  {
    id: "climate_risk",
    domain: "environmental",
    label: "Climate Risk & Resilience",
    description: "Climate change adaptation, physical and transition risk analysis, and operational resilience.",
    keywords: ["climate risk", "resilience", "adaptation", "emissions", "weather"],
  },
  {
    id: "water_conservation",
    domain: "environmental",
    label: "Water Efficiency & Stewardship",
    description: "Water usage monitoring, conservation techniques, effluent management, and watershed care.",
    keywords: ["water", "effluent", "conservation", "plumbing", "stewardship"],
  },
  {
    id: "green_office",
    domain: "environmental",
    label: "Green Office & Eco Operations",
    description: "Resource reduction in office environments, paperless workflows, and sustainable workplace habits.",
    keywords: ["office", "green office", "workplace", "paperless", "facility"],
  },
  {
    id: "sustainable_procurement",
    domain: "environmental",
    label: "Sustainable Procurement & Supply Chain",
    description: "Supplier ESG criteria, sustainable purchasing, Scope 3 supply chain standards, and eco-labels.",
    keywords: ["procurement", "purchasing", "supply chain", "vendor", "supplier"],
  },

  // Social Domain
  {
    id: "workplace_responsibility",
    domain: "social",
    label: "Workplace Responsibility & Safety",
    description: "Occupational health and safety, employee wellbeing, fair labor standards, and workplace dignity.",
    keywords: ["social", "wellbeing", "safety", "health", "workplace", "responsibility"],
  },
  {
    id: "inclusion_awareness",
    domain: "social",
    label: "Diversity, Equity & Inclusion (DEI)",
    description: "DEI principles, equal opportunity, bias awareness, and inclusive workplace practices.",
    keywords: ["dei", "diversity", "inclusion", "equity", "belonging"],
  },
  {
    id: "community_engagement",
    domain: "social",
    label: "Community & Stakeholder Relations",
    description: "Local community engagement, corporate social responsibility (CSR), and stakeholder trust.",
    keywords: ["community", "csr", "social impact", "stakeholders"],
  },

  // Governance Domain
  {
    id: "business_ethics",
    domain: "governance",
    label: "Business Ethics & Integrity",
    description: "Anti-corruption, conflicts of interest, ethical decision-making, and whistleblower protections.",
    keywords: ["ethics", "integrity", "governance", "compliance", "whistleblower", "conduct"],
  },
  {
    id: "esg_data",
    domain: "governance",
    label: "ESG Data Management & Disclosure",
    description: "Data collection, ESG metrics tracking, reporting standards, and regulatory disclosures.",
    keywords: ["esg data", "reporting", "disclosure", "metrics", "audit", "compliance"],
  },
  {
    id: "action_planning",
    domain: "governance",
    label: "Sustainability Action Planning",
    description: "Goal setting, KPI tracking, sustainability roadmaps, and continuous improvement.",
    keywords: ["action plan", "planning", "strategy", "roadmap", "target", "kpi"],
  },
];

export function getTopicById(id: string): KnowledgeTopic | undefined {
  return KNOWLEDGE_TAXONOMY.find((t) => t.id === id);
}

export function mapCourseToTopics(course: {
  id?: number;
  courseId?: number;
  title: string;
  description?: string;
  category?: string;
  courseCode?: string;
}): KnowledgeTopic[] {
  const textToSearch = `${course.courseCode || ""} ${course.title} ${course.description || ""} ${course.category || ""}`.toLowerCase();
  
  const matches = KNOWLEDGE_TAXONOMY.filter((topic) =>
    topic.keywords.some((kw) => textToSearch.includes(kw.toLowerCase()))
  );

  if (matches.length > 0) {
    matches.sort((a, b) => {
      const maxA = Math.max(...a.keywords.filter(kw => textToSearch.includes(kw.toLowerCase())).map(kw => kw.length));
      const maxB = Math.max(...b.keywords.filter(kw => textToSearch.includes(kw.toLowerCase())).map(kw => kw.length));
      return maxB - maxA;
    });
    return matches;
  }

  // Default fallback if no keyword matches
  return [KNOWLEDGE_TAXONOMY[0]]; // Sustainability Foundations
}

export function mapCompanyPriorityToTopics(priority: string): KnowledgeTopic[] {
  const pLower = priority.toLowerCase();
  const matches = KNOWLEDGE_TAXONOMY.filter((topic) =>
    topic.keywords.some((kw) => pLower.includes(kw.toLowerCase()) || kw.toLowerCase().includes(pLower))
  );

  if (matches.length > 0) return matches;
  return [KNOWLEDGE_TAXONOMY[0]];
}
