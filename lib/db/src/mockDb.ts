import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { getTableName } from "drizzle-orm";

const VALID_QUERY_METHODS = new Set([
  "select", "insert", "update", "delete", "execute", "transaction", "query",
  "from", "where", "set", "values", "returning", "onConflictDoNothing", "onConflictDoUpdate",
  "limit", "offset", "orderBy", "groupBy", "having", "innerJoin", "leftJoin", "rightJoin",
  "fullJoin", "as", "then", "catch", "finally", "all", "get", "run", "toSQL", "$dynamic", "schema"
]);

function isIgnoredProp(prop: string | symbol): boolean {
  if (typeof prop === "symbol") return true;
  const ignored = ["inspect", "valueOf", "toString", "toJSON", "constructor", "prototype", "_driver", "_dialect"];
  return ignored.includes(String(prop));
}

function getTableNameSafe(table: any): string {
  if (!table) return "default";
  if (typeof table === "string") return table;
  try {
    if (table._ && table._.name) return table._.name;
    if (table[Symbol.for("drizzle:Name")]) return table[Symbol.for("drizzle:Name")];
    if (table[Symbol.for("drizzle:OriginalName")]) return table[Symbol.for("drizzle:OriginalName")];
    return getTableName(table);
  } catch {
    return table?.name || "default";
  }
}

function getColumnNameSafe(col: any): string | null {
  if (!col) return null;
  if (typeof col === "string") return col;
  try {
    if (col.key) return col.key;
    if (col.name) return col.name;
    if (col._?.name) return col._.name;
    if (col[Symbol.for("drizzle:Name")]) return col[Symbol.for("drizzle:Name")];
    return null;
  } catch {
    return null;
  }
}

const inMemoryStore = new Map<string, any[]>();
let autoIdCounter = 1000;

function getStoreTable(tableName: string): any[] {
  if (!inMemoryStore.has(tableName)) {
    inMemoryStore.set(tableName, []);
  }
  return inMemoryStore.get(tableName)!;
}

const PATTERN_10 = [1, 2, 0, 3, 1, 3, 0, 2, 1, 3];

const CANONICAL_COURSES = [
  { id: 1, code: "ELH-01", slug: "sustainability-foundations", title: "Sustainability Foundations" },
  { id: 2, code: "ELH-02", slug: "waste-sorting-the-mauritian-bin-system", title: "Waste Sorting & the Mauritian Bin System" },
  { id: 3, code: "ELH-03", slug: "energy-efficiency-at-work", title: "Energy Efficiency at Work" },
  { id: 4, code: "ELH-04", slug: "water-conservation", title: "Water Conservation" },
  { id: 5, code: "ELH-05", slug: "sustainable-purchasing-for-non-specialists", title: "Sustainable Purchasing for Non-Specialists" },
  { id: 6, code: "ELH-06", slug: "green-office-practices", title: "Green Office Practices" },
  { id: 7, code: "ELH-07", slug: "carbon-footprint-awareness", title: "Carbon Footprint Awareness" },
  { id: 8, code: "ELH-08", slug: "biodiversity-in-mauritius", title: "Biodiversity in Mauritius" },
  { id: 9, code: "ELH-09", slug: "esg-basics", title: "ESG Basics" },
  { id: 10, code: "ELH-10", slug: "environmental-compliance", title: "Environmental Compliance" },
  { id: 11, code: "ELH-11", slug: "circular-economy", title: "Circular Economy" },
  { id: 12, code: "ELH-12", slug: "final-sustainability-certification", title: "Final Sustainability Certification" },
  { id: 13, code: "ELH-13", slug: "sustainability-action-planning", title: "Sustainability Action Planning" },
  { id: 14, code: "ELH-14", slug: "setting-departmental-sustainability-goals", title: "Setting Departmental Sustainability Goals" },
  { id: 15, code: "ELH-15", slug: "building-a-workplace-sustainability-team", title: "Building a Workplace Sustainability Team" },
  { id: 16, code: "ELH-16", slug: "communicating-sustainability-at-work", title: "Communicating Sustainability at Work" },
  { id: 17, code: "ELH-17", slug: "tracking-sustainability-actions-and-progress", title: "Tracking Sustainability Actions and Progress" },
  { id: 18, code: "ELH-18", slug: "sustainability-data-collection-and-evidence", title: "Sustainability Data Collection and Evidence" },
  { id: 19, code: "ELH-19", slug: "reviewing-sustainability-performance-and-taking-corrective-action", title: "Reviewing Sustainability Performance and Taking Corrective Action" },
  { id: 20, code: "ELH-20", slug: "sustainability-roles-responsibilities-and-accountability", title: "Sustainability Roles, Responsibilities and Accountability" },
  { id: 21, code: "ELH-21", slug: "building-employee-engagement-in-sustainability", title: "Building Employee Engagement in Sustainability" },
  { id: 22, code: "ELH-22", slug: "creating-and-running-effective-green-teams", title: "Creating and Running Effective Green Teams" },
  { id: 23, code: "ELH-23", slug: "planning-and-delivering-workplace-sustainability-initiatives", title: "Planning and Delivering Workplace Sustainability Initiatives" },
  { id: 24, code: "ELH-24", slug: "sustainability-for-hr-teams", title: "Sustainability for HR Teams" },
  { id: 25, code: "ELH-25", slug: "sustainability-for-finance-teams", title: "Sustainability for Finance Teams" },
  { id: 26, code: "ELH-26", slug: "sustainability-for-procurement-and-purchasing-teams", title: "Sustainability for Procurement and Purchasing Teams" },
  { id: 27, code: "ELH-27", slug: "sustainability-for-facilities-and-property-teams", title: "Sustainability for Facilities and Property Teams" },
  { id: 28, code: "ELH-28", slug: "sustainability-for-sales-and-marketing-teams", title: "Sustainability for Sales and Marketing Teams" },
  { id: 29, code: "ELH-29", slug: "sustainability-for-operations-and-frontline-teams", title: "Sustainability for Operations and Frontline Teams" },
  { id: 30, code: "ELH-30", slug: "climate-risk-workplace-resilience", title: "Climate Risk & Workplace Resilience" },
  { id: 31, code: "ELH-31", slug: "social-responsibility-at-work", title: "Social Responsibility at Work" },
  { id: 32, code: "ELH-32", slug: "ethics-governance-responsible-business", title: "Ethics, Governance & Responsible Business" },
  { id: 33, code: "ELH-33", slug: "esg-data-measurement-reporting-basics", title: "ESG Data, Measurement & Reporting Basics" },
  { id: 34, code: "ELH-34", slug: "esg-in-my-job-from-policy-to-everyday-action", title: "ESG in My Job: From Policy to Everyday Action" },
  { id: 35, code: "ELH-35", slug: "sustainable-housekeeping-operations", title: "Sustainable Housekeeping Operations" },
  { id: 36, code: "ELH-36", slug: "sustainable-commercial-kitchens-culinary", title: "Sustainable Commercial Kitchens & Culinary" },
  { id: 37, code: "ELH-37", slug: "hotel-food-waste-prevention-composting", title: "Hotel Food Waste Prevention & Composting" },
  { id: 38, code: "ELH-38", slug: "hotel-laundry-water-stewardship", title: "Hotel Laundry & Water Stewardship" },
  { id: 39, code: "ELH-39", slug: "hotel-engineering-central-plant-hvac-optimization", title: "Hotel Engineering: Central Plant & HVAC Optimization" },
  { id: 40, code: "ELH-40", slug: "resort-guest-engagement-green-nudges", title: "Resort Guest Engagement & Green Nudges" },
  { id: 41, code: "ELH-41", slug: "sustainable-event-banquet-management", title: "Sustainable Event & Banquet Management" },
  { id: 42, code: "ELH-42", slug: "eco-friendly-pool-spa-wellness-operations", title: "Eco-Friendly Pool, Spa & Wellness Operations" },
  { id: 43, code: "ELH-43", slug: "energy-efficient-hotel-guest-rooms-smart-controls", title: "Energy-Efficient Hotel Guest Rooms & Smart Controls" },
  { id: 44, code: "ELH-44", slug: "sustainable-single-use-plastic-elimination-in-resorts", title: "Sustainable Single-Use Plastic Elimination in Resorts" },
  { id: 45, code: "ELH-45", slug: "sustainable-hospitality-sourcing-local-purchasing", title: "Sustainable Hospitality Sourcing & Local Purchasing" },
  { id: 46, code: "ELH-46", slug: "eco-tourism-marine-biodiversity-protection", title: "Eco-Tourism & Marine Biodiversity Protection" },
  { id: 47, code: "ELH-47", slug: "green-leases-tenant-sustainability-engagement", title: "Green Leases & Tenant Sustainability Engagement" },
  { id: 48, code: "ELH-48", slug: "smart-building-automation-bms-optimization", title: "Smart Building Automation & BMS Optimization" },
  { id: 49, code: "ELH-49", slug: "construction-site-environmental-controls", title: "Construction Site Environmental Controls" },
  { id: 50, code: "ELH-50", slug: "sustainable-building-materials-low-carbon-concrete", title: "Sustainable Building Materials & Low-Carbon Concrete" },
  { id: 51, code: "ELH-51", slug: "indoor-environmental-quality-well-being", title: "Indoor Environmental Quality & Well-Being" },
  { id: 52, code: "ELH-52", slug: "sustainable-property-facility-operations", title: "Sustainable Property Facility Operations" },
  { id: 53, code: "ELH-53", slug: "green-building-retrofits-decarbonization-pathways", title: "Green Building Retrofits & Decarbonization Pathways" },
  { id: 54, code: "ELH-54", slug: "sustainable-property-hvac-chiller-optimization", title: "Sustainable Property HVAC & Chiller Optimization" },
  { id: 55, code: "ELH-55", slug: "legionella-water-system-safety-in-facilities", title: "Legionella & Water System Safety in Facilities" },
  { id: 56, code: "ELH-56", slug: "sustainable-building-certifications-leed-breeam", title: "Sustainable Building Certifications (LEED/BREEAM)" },
  { id: 57, code: "ELH-57", slug: "industrial-energy-efficiency-compressed-air", title: "Industrial Energy Efficiency & Compressed Air" },
  { id: 58, code: "ELH-58", slug: "boiler-steam-system-optimization", title: "Boiler & Steam System Optimization" },
  { id: 59, code: "ELH-59", slug: "industrial-wastewater-effluent-treatment", title: "Industrial Wastewater & Effluent Treatment" },
  { id: 60, code: "ELH-60", slug: "industrial-energy-audit-motor-systems-optimization", title: "Industrial Energy Audit & Motor Systems Optimization" },
  { id: 61, code: "ELH-61", slug: "lean-green-manufacturing-waste-elimination", title: "Lean Green Manufacturing: Waste Elimination" },
  { id: 62, code: "ELH-62", slug: "industrial-chemical-management-ghs", title: "Industrial Chemical Management & GHS" },
  { id: 63, code: "ELH-63", slug: "sustainable-packaging-design-in-manufacturing", title: "Sustainable Packaging Design in Manufacturing" },
  { id: 64, code: "ELH-64", slug: "circular-raw-material-substitution-in-industry", title: "Circular Raw Material Substitution in Industry" },
  { id: 65, code: "ELH-65", slug: "industrial-air-quality-voc-controls-scrubbers", title: "Industrial Air Quality, VOC Controls & Scrubbers" },
  { id: 66, code: "ELH-66", slug: "sustainable-supply-chain-traceability-in-manufacturing", title: "Sustainable Supply Chain Traceability in Manufacturing" },
  { id: 67, code: "ELH-67", slug: "supermarket-cold-chain-refrigeration-efficiency", title: "Supermarket Cold Chain & Refrigeration Efficiency" },
  { id: 68, code: "ELH-68", slug: "retail-food-waste-dynamic-markdown-management", title: "Retail Food Waste & Dynamic Markdown Management" },
  { id: 69, code: "ELH-69", slug: "sustainable-retail-store-lighting-hvac-design", title: "Sustainable Retail Store Lighting & HVAC Design" },
  { id: 70, code: "ELH-70", slug: "sustainable-retail-sourcing-supplier-esg-code", title: "Sustainable Retail Sourcing & Supplier ESG Code" },
  { id: 71, code: "ELH-71", slug: "eliminating-single-use-plastics-in-retail", title: "Eliminating Single-Use Plastics in Retail" },
  { id: 72, code: "ELH-72", slug: "green-ecommerce-last-mile-delivery-packaging", title: "Green eCommerce, Last-Mile Delivery & Packaging" },
  { id: 73, code: "ELH-73", slug: "sustainable-quick-service-restaurant-qsr-operations", title: "Sustainable Quick-Service Restaurant (QSR) Operations" },
  { id: 74, code: "ELH-74", slug: "circular-textiles-sustainable-fashion-retailing", title: "Circular Textiles & Sustainable Fashion Retailing" },
  { id: 75, code: "ELH-75", slug: "sustainable-lending-green-credit-underwriting", title: "Sustainable Lending & Green Credit Underwriting" },
  { id: 76, code: "ELH-76", slug: "esg-risk-integration-in-commercial-credit", title: "ESG Risk Integration in Commercial Credit" },
  { id: 77, code: "ELH-77", slug: "tcfd-climate-financial-risk-disclosures", title: "TCFD & Climate Financial Risk Disclosures" },
  { id: 78, code: "ELH-78", slug: "carbon-markets-offsets-credit-verification", title: "Carbon Markets, Offsets & Credit Verification" },
  { id: 79, code: "ELH-79", slug: "anti-greenwashing-in-financial-products", title: "Anti-Greenwashing in Financial Products" },
  { id: 80, code: "ELH-80", slug: "sustainable-wealth-management-esg-advisory", title: "Sustainable Wealth Management & ESG Advisory" },
  { id: 81, code: "ELH-81", slug: "green-freight-multimodal-cargo-optimization", title: "Green Freight & Multimodal Cargo Optimization" },
  { id: 82, code: "ELH-82", slug: "maritime-port-shipping-sustainability-practices", title: "Maritime Port & Shipping Sustainability Practices" },
  { id: 83, code: "ELH-83", slug: "eco-driving-fleet-fuel-efficiency", title: "Eco-Driving & Fleet Fuel Efficiency" },
  { id: 84, code: "ELH-84", slug: "commercial-fleet-electrification-ev-charging", title: "Commercial Fleet Electrification & EV Charging" },
  { id: 85, code: "ELH-85", slug: "sustainable-warehouse-operations", title: "Sustainable Warehouse Operations" },
  { id: 86, code: "ELH-86", slug: "route-optimization-logistics-efficiency", title: "Route Optimization & Logistics Efficiency" },
  { id: 87, code: "ELH-87", slug: "regenerative-agriculture-soil-health", title: "Regenerative Agriculture & Soil Health" },
  { id: 88, code: "ELH-88", slug: "smart-irrigation-agricultural-water-efficiency", title: "Smart Irrigation & Agricultural Water Efficiency" },
  { id: 89, code: "ELH-89", slug: "organic-fertilizers-biological-pest-management", title: "Organic Fertilizers & Biological Pest Management" },
  { id: 90, code: "ELH-90", slug: "post-harvest-loss-reduction-cold-storage", title: "Post-Harvest Loss Reduction & Cold Storage" },
  { id: 91, code: "ELH-91", slug: "sustainable-aquaculture-responsible-fish-farming", title: "Sustainable Aquaculture & Responsible Fish Farming" },
  { id: 92, code: "ELH-92", slug: "mangrove-coastal-ecosystem-protection-in-agriculture", title: "Mangrove & Coastal Ecosystem Protection in Agriculture" },
  { id: 93, code: "ELH-93", slug: "agrochemical-safety-runoff-prevention", title: "Agrochemical Safety & Runoff Prevention" },
  { id: 94, code: "ELH-94", slug: "agri-food-carbon-footprinting-certification", title: "Agri-Food Carbon Footprinting & Certification" },
  { id: 95, code: "ELH-95", slug: "green-software-engineering-cloud-efficiency", title: "Green Software Engineering & Cloud Efficiency" },
  { id: 96, code: "ELH-96", slug: "data-center-energy-efficiency-cooling", title: "Data Center Energy Efficiency & Cooling" },
  { id: 97, code: "ELH-97", slug: "sustainable-it-hardware-lifecycle-e-waste", title: "Sustainable IT Hardware Lifecycle & E-Waste" },
  { id: 98, code: "ELH-98", slug: "green-office-systems-for-professional-services", title: "Green Office Systems for Professional Services" },
  { id: 99, code: "ELH-99", slug: "hospital-clinic-medical-waste-segregation", title: "Hospital & Clinic Medical Waste Segregation" },
  { id: 100, code: "ELH-100", slug: "energy-water-conservation-in-healthcare-facilities", title: "Energy & Water Conservation in Healthcare Facilities" },
  { id: 101, code: "ELH-101", slug: "sustainable-healthcare-procurement-single-use-reductions", title: "Sustainable Healthcare Procurement & Single-Use Reductions" },
  { id: 102, code: "ELH-102", slug: "anesthetic-gas-pharmaceutical-waste-management", title: "Anesthetic Gas & Pharmaceutical Waste Management" },
  { id: 103, code: "ELH-103", slug: "healthcare-indoor-air-quality-infection-ventilation", title: "Healthcare Indoor Air Quality & Infection Ventilation" },
  { id: 104, code: "ELH-104", slug: "climate-resilience-disaster-preparedness-for-hospitals", title: "Climate Resilience & Disaster Preparedness for Hospitals" },
  { id: 105, code: "ELH-105", slug: "sustainable-hotel-kitchen-energy-equipment", title: "Sustainable Hotel Kitchen Energy & Equipment" },
  { id: 106, code: "ELH-106", slug: "low-impact-coastal-resort-landscaping-native-flora", title: "Low-Impact Coastal Resort Landscaping & Native Flora" },
  { id: 107, code: "ELH-107", slug: "net-zero-energy-building-design-passive-architecture", title: "Net-Zero Energy Building Design & Passive Architecture" },
  { id: 108, code: "ELH-108", slug: "renewable-energy-rooftop-solar-pv-storage", title: "Renewable Energy: Rooftop Solar PV & Storage" },
  { id: 109, code: "ELH-109", slug: "industrial-heat-recovery-combined-heat-and-power", title: "Industrial Heat Recovery & Combined Heat and Power" },
  { id: 110, code: "ELH-110", slug: "closed-loop-water-recycling-in-commercial-real-estate", title: "Closed-Loop Water Recycling in Commercial Real Estate" },
  { id: 111, code: "ELH-111", slug: "zero-waste-to-landfill-certification-in-manufacturing", title: "Zero Waste to Landfill Certification in Manufacturing" },
  { id: 112, code: "ELH-112", slug: "green-cold-chain-logistics-refrigerated-transport", title: "Green Cold Chain Logistics & Refrigerated Transport" },
  { id: 113, code: "ELH-113", slug: "sustainable-packaging-procurement-for-logistics", title: "Sustainable Packaging Procurement for Logistics" },
  { id: 114, code: "ELH-114", slug: "esg-data-assurance-audit-readiness", title: "ESG Data Assurance & Audit Readiness" },
  { id: 115, code: "ELH-115", slug: "biodiversity-impact-assessment-bia-for-projects", title: "Biodiversity Impact Assessment (BIA) for Projects" },
  { id: 116, code: "ELH-116", slug: "circular-economy-business-models-product-as-a-service", title: "Circular Economy Business Models & Product-as-a-Service" },
  { id: 117, code: "ELH-117", slug: "setting-smart-departmental-sustainability-targets", title: "Setting SMART Departmental Sustainability Targets" },
  { id: 118, code: "ELH-118", slug: "managing-sustainability-performance-kpis", title: "Managing Sustainability Performance & KPIs" },
  { id: 119, code: "ELH-119", slug: "engaging-frontline-employees-in-green-initiatives", title: "Engaging Frontline Employees in Green Initiatives" },
  { id: 120, code: "ELH-120", slug: "cross-functional-sustainability-working-groups", title: "Cross-Functional Sustainability Working Groups" },
  { id: 121, code: "ELH-121", slug: "building-business-cases-for-sustainability-projects", title: "Building Business Cases for Sustainability Projects" },
  { id: 122, code: "ELH-122", slug: "managing-subcontractor-sustainability-compliance", title: "Managing Subcontractor Sustainability Compliance" },
  { id: 123, code: "ELH-123", slug: "managing-capital-expenditure-capex-for-energy-retrofits", title: "Managing Capital Expenditure (CapEx) for Energy Retrofits" },
  { id: 124, code: "ELH-124", slug: "executive-climate-governance-net-zero-strategy", title: "Executive Climate Governance & Net-Zero Strategy" },
  { id: 125, code: "ELH-125", slug: "occupational-health-safety-environmental-systems", title: "Occupational Health, Safety & Environmental Systems" },
  { id: 126, code: "ELH-126", slug: "facilities-energy-management-for-specialists", title: "Facilities Energy Management for Specialists" },
  { id: 127, code: "ELH-127", slug: "sustainable-supply-chain-management-for-procurement", title: "Sustainable Supply Chain Management for Procurement" },
  { id: 128, code: "ELH-128", slug: "sustainability-for-health-safety-hse-officers", title: "Sustainability for Health & Safety (HSE) Officers" },
  { id: 129, code: "ELH-129", slug: "environmental-risk-compliance-management", title: "Environmental Risk & Compliance Management" },
  { id: 130, code: "ELH-130", slug: "sustainability-communications-green-claims", title: "Sustainability Communications & Green Claims" },
  { id: 131, code: "ELH-131", slug: "executive-esg-strategy-board-oversight", title: "Executive ESG Strategy & Board Oversight" },
  { id: 132, code: "ELH-132", slug: "csrd-european-sustainability-reporting-standards-esrs", title: "CSRD & European Sustainability Reporting Standards (ESRS)" },
  { id: 133, code: "ELH-133", slug: "advanced-ghg-accounting-scope-1-2-3-emissions", title: "Advanced GHG Accounting: Scope 1, 2 & 3 Emissions" },
  { id: 134, code: "ELH-134", slug: "biodiversity-nature-related-disclosures-tnfd", title: "Biodiversity & Nature-Related Disclosures (TNFD)" },
  { id: 135, code: "ELH-135", slug: "internal-carbon-pricing-carbon-budgeting", title: "Internal Carbon Pricing & Carbon Budgeting" },
  { id: 136, code: "ELH-136", slug: "corporate-net-zero-transition-planning-science-based-targets-sbti", title: "Corporate Net-Zero Transition Planning & Science-Based Targets (SBTi)" },
];

function resetSeedInMemoryStore() {
  inMemoryStore.clear();
  inMemoryStore.set("subscription_plans", [
    { id: 1, code: "ESSENTIAL", name: "Essential", description: "Core sustainability learning and credible employee training records.", tagline: "Core sustainability learning for every employee.", displayOrder: 1 },
    { id: 2, code: "PROFESSIONAL", name: "Professional", description: "Practical sustainability implementation across teams and departments.", tagline: "Practical learning for workplace action and departments.", displayOrder: 2 },
    { id: 3, code: "COMPLETE", name: "Complete", description: "Complete sustainability learning, leadership development and advanced organisational reporting.", tagline: "Full learning access for sustainability leadership and reporting.", displayOrder: 3 },
  ]);
  inMemoryStore.set("employee_bands", [
    { id: 1, code: "UP_TO_25", label: "Up to 25 employees", minimumEmployees: 1, maximumEmployees: 25, displayOrder: 1, requiresTailoredQuote: false },
    { id: 2, code: "FROM_26_TO_50", label: "26–50 employees", minimumEmployees: 26, maximumEmployees: 50, displayOrder: 2, requiresTailoredQuote: false },
    { id: 3, code: "FROM_51_TO_80", label: "51–80 employees", minimumEmployees: 51, maximumEmployees: 80, displayOrder: 3, requiresTailoredQuote: false },
    { id: 4, code: "FROM_81_TO_120", label: "81–120 employees", minimumEmployees: 81, maximumEmployees: 120, displayOrder: 4, requiresTailoredQuote: false },
    { id: 5, code: "OVER_120", label: "Over 120 employees", minimumEmployees: 121, maximumEmployees: 9999, displayOrder: 5, requiresTailoredQuote: true },
  ]);

  const courses: any[] = [];
  const lessons: any[] = [];
  const questions: any[] = [];
  const entitlements: any[] = [];
  const prereqs: any[] = [];

  let entitlementId = 1;
  let prereqId = 1;

  for (const c of CANONICAL_COURSES) {
    const num = c.code ? parseInt(c.code.replace("ELH-", ""), 10) : c.id;
    const isUnpublished = (num >= 36 && num <= 139) || (c.id >= 36 && c.id <= 139);
    courses.push({
      id: c.id,
      courseCode: c.code,
      code: c.code,
      title: c.title,
      slug: c.slug,
      isPublished: !isUnpublished,
      status: isUnpublished ? "draft" : "published",
      version: c.id <= 11 ? 2 : 1,
      passingScore: 80,
      durationMinutes: (c.id === 1 || c.id === 2 || c.id === 3) ? 20 : 18,
      estimatedMinutes: (c.id === 1 || c.id === 2 || c.id === 3) ? 20 : 18,
      level: c.id <= 12 ? "Foundational" : "Intermediate",
      category: "Sustainability",
      categoryId: c.id <= 12 ? 1 : (c.id <= 23 ? 2 : (c.id <= 30 ? 3 : 4)),
      isFeatured: c.id <= 6,
      priceUsd: "0.00",
      rating: "4.8",
      thumbnailUrl: `/images/courses/${c.slug}.jpg`,
      description: `Comprehensive workplace curriculum and practical skills for ${c.title}.`,
      fullDescription: `Master essential principles, actionable protocols, and practical workplace behaviours in ${c.title}.`,
      badgeName: `${c.title} Practitioner`,
      badgeDescription: `Awarded for demonstrating proficiency and successful completion of ${c.title}.`,
      learningObjectives: [
        `Understand core principles and operational importance of ${c.title}.`,
        `Apply actionable workplace procedures and avoid common compliance mistakes.`,
        `Identify sustainability impact areas and report relevant facility data accurately.`,
        `Commit to daily best practices supporting Mauritian workplace sustainability.`
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 3 lessons per course
    for (let l = 1; l <= 3; l++) {
      lessons.push({
        id: (c.id - 1) * 3 + l,
        courseId: c.id,
        title: `Lesson ${l} for ${c.code}`,
        content: `Comprehensive learning module content for ${c.code} lesson ${l}.`,
        orderIndex: l,
        durationMinutes: 6,
        contentBlocks: [
          { id: `${c.code.toLowerCase()}-h${l}`, type: "heading", position: 1, headingText: `Core Principles: ${c.title} - Module ${l}` },
          { id: `${c.code.toLowerCase()}-t${l}`, type: "short_text", position: 2, bodyText: `Comprehensive guidance and practical application for ${c.title}.` },
          { id: `${c.code.toLowerCase()}-k${l}`, type: "key_message", position: 3, headingText: "Key Takeaway", bodyText: `Operational best practices and environmental compliance standards for ${c.title}.` }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // In mockDb procedural fixtures, generate 10 questions per course (340 total)
    // Authored seed files contain the certified 313 questions (provenance-verified)
    for (let q = 0; q < 10; q++) {
      const correctPos = PATTERN_10[q % PATTERN_10.length];
      questions.push({
        id: questions.length + 1,
        courseId: c.id,
        question: `Question ${q + 1} for ${c.code}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctOption: correctPos,
        correctAnswer: correctPos,
        orderIndex: q,
        isArchived: false,
        explanation: `Explanation for question ${q + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Entitlements:
    // Core (1..12): Essential (1), Professional (2), Complete (3)
    // Pathway (13..24): Professional (2), Complete (3)
    // Sector-specific (25..34): Complete (3)
    if (c.id <= 12) {
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 1, courseId: c.id, accessType: "INCLUDED" });
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 2, courseId: c.id, accessType: "INCLUDED" });
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 3, courseId: c.id, accessType: "INCLUDED" });
    } else if (c.id <= 24) {
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 2, courseId: c.id, accessType: "INCLUDED" });
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 3, courseId: c.id, accessType: "INCLUDED" });
    } else {
      entitlements.push({ id: entitlementId++, subscriptionPlanId: 3, courseId: c.id, accessType: "INCLUDED" });
    }

    // Register prerequisite for courses 13 to 34 (linking to course 1 or previous course, ELH-31..34 to ELH-09)
    if (c.id >= 13) {
      prereqs.push({
        id: prereqId++,
        courseId: c.id,
        prerequisiteCourseId: (c.id >= 31 && c.id <= 34) ? 9 : (c.id === 13 ? 1 : (c.id - 1)),
        requirementType: "recommended",
        isRequired: false,
        createdAt: new Date(),
      });
    }
  }

  // Course 12 (ELH-12) prerequisites: courses 1 through 11
  for (let p = 1; p <= 11; p++) {
    prereqs.push({
      id: prereqId++,
      courseId: 12,
      prerequisiteCourseId: p,
      requirementType: "required",
      isRequired: true,
      createdAt: new Date(),
    });
  }

  inMemoryStore.set("courses", courses);
  inMemoryStore.set("lessons", lessons);
  inMemoryStore.set("quiz_questions", questions);
  inMemoryStore.set("plan_course_entitlements", entitlements);
  inMemoryStore.set("course_prerequisites", prereqs);
  inMemoryStore.set("system_seeds", []);
  inMemoryStore.set("categories", [
    { id: 1, name: "Core Sustainability Certificate", slug: "core-sustainability-certificate", description: "Build the essential sustainability knowledge and practical workplace habits relevant across every role.", displayOrder: 1, iconName: "award", isVisible: true },
    { id: 2, name: "Sustainability in Action", slug: "sustainability-in-action", description: "Turn sustainability knowledge into organised actions, responsibilities, evidence and measurable workplace improvement.", displayOrder: 2, iconName: "activity", isVisible: true },
    { id: 3, name: "Sustainability by Department", slug: "sustainability-by-department", description: "Apply sustainability principles to the decisions, responsibilities and everyday work of specific departments.", displayOrder: 3, iconName: "building-2", isVisible: true },
    { id: 4, name: "Leadership and Sustainability Management", slug: "leadership-and-sustainability-management", description: "Lead workplace initiatives, clarify responsibilities, engage employees and review sustainability performance.", displayOrder: 4, iconName: "users", isVisible: true },
  ]);

  const assignments: any[] = [];
  let assignId = 1;
  for (const c of CANONICAL_COURSES) {
    if (c.id <= 12) {
      assignments.push({ id: assignId++, courseId: c.id, categoryId: 1, isPrimary: true, displayOrder: c.id });
    } else if (c.id <= 23 || (c.id >= 31 && c.id <= 34)) {
      assignments.push({ id: assignId++, courseId: c.id, categoryId: 2, isPrimary: true, displayOrder: c.id });
    } else {
      assignments.push({ id: assignId++, courseId: c.id, categoryId: 3, isPrimary: true, displayOrder: c.id });
    }
    if ([13, 19, 20, 21, 22, 23, 32].includes(c.id)) {
      assignments.push({ id: assignId++, courseId: c.id, categoryId: 4, isPrimary: false, displayOrder: c.id });
    }
  }
  inMemoryStore.set("course_category_assignments", assignments);
  inMemoryStore.set("users", []);
  inMemoryStore.set("companies", [
    { id: 1, name: "Eco Enterprise 1", slug: "eco-enterprise-1" },
    { id: 2, name: "Eco Enterprise 2", slug: "eco-enterprise-2" },
  ]);
  inMemoryStore.set("company_subscriptions", [
    { id: 1, companyId: 1, subscriptionPlanId: 3, employeeBandId: 1, status: "ACTIVE", agreedMonthlyAmount: "300.00", updatedAt: new Date() },
    { id: 2, companyId: 2, subscriptionPlanId: 2, employeeBandId: 2, status: "ACTIVE", agreedMonthlyAmount: "200.00", updatedAt: new Date() },
  ]);
}
resetSeedInMemoryStore();

function getFieldVal(record: any, key: string, name?: string): any {
  if (!record || typeof record !== "object") return undefined;
  if (record[key] !== undefined) return record[key];
  if (name && record[name] !== undefined) return record[name];

  const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  if (record[camelKey] !== undefined) return record[camelKey];

  const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  if (record[snakeKey] !== undefined) return record[snakeKey];

  if (name) {
    const camelName = name.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    if (record[camelName] !== undefined) return record[camelName];
    const snakeName = name.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    if (record[snakeName] !== undefined) return record[snakeName];
  }
  return undefined;
}

function evaluateChunks(record: any, chunks: any[]): boolean {
  if (!Array.isArray(chunks) || chunks.length === 0) return true;

  // If chunks contains an top-level "or" operator, split and evaluate with some()
  const orIndices: number[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk?.value && Array.isArray(chunk.value)) {
      const opStr = chunk.value.join("").trim().toLowerCase();
      if (opStr === "or") {
        orIndices.push(i);
      }
    }
  }

  if (orIndices.length > 0) {
    const clauses: any[][] = [];
    let start = 0;
    for (const idx of orIndices) {
      clauses.push(chunks.slice(start, idx));
      start = idx + 1;
    }
    clauses.push(chunks.slice(start));

    return clauses.some(clause => evaluateChunks(record, clause));
  }

  let currentColumnName: string | null = null;
  let currentOp: string = "=";

  for (const chunk of chunks) {
    if (!chunk) continue;

    // If chunk is a nested SQL object (like and / or)
    if (Array.isArray(chunk.queryChunks)) {
      if (!evaluateChunks(record, chunk.queryChunks)) return false;
      continue;
    }

    // If chunk is Column
    if (chunk.name !== undefined && typeof chunk.name === "string") {
      currentColumnName = chunk.name;
      continue;
    }

    // If chunk is operator StringChunk
    if (chunk.value && Array.isArray(chunk.value)) {
      const opStr = chunk.value.join("").trim().toLowerCase();
      if (opStr === "=" || opStr === "!=" || opStr === "<>" || opStr === ">" || opStr === "<" || opStr === ">=" || opStr === "<=") {
        currentOp = opStr;
        continue;
      }
      if (opStr.startsWith("not in") || opStr === "not in") {
        currentOp = "not in";
        continue;
      }
      if (opStr.startsWith("in") || opStr === "in") {
        currentOp = "in";
        continue;
      }
      if (opStr === "and") {
        currentColumnName = null;
        currentOp = "=";
        continue;
      }
      if (opStr === ")" || opStr === "(") {
        continue;
      }
    }

    // If chunk is array of Params (used by inArray)
    if (Array.isArray(chunk) && currentColumnName && (currentOp === "in" || currentOp === "not in")) {
      const rawVals = chunk.map((p: any) => p?.value !== undefined ? p.value : p);
      const recVal = getFieldVal(record, currentColumnName, currentColumnName);
      const matched = currentOp === "in" ? rawVals.includes(recVal) : !rawVals.includes(recVal);
      if (!matched) return false;
      currentColumnName = null;
      currentOp = "=";
      continue;
    }

    // If chunk is Param
    if (chunk.value !== undefined && currentColumnName) {
      const rightVal = chunk.value;
      const recVal = getFieldVal(record, currentColumnName, currentColumnName);
      
      let matched = false;
      if (currentOp === "=") {
        matched = (recVal == rightVal);
      } else if (currentOp === "!=" || currentOp === "<>") {
        matched = (recVal != rightVal);
      } else if (currentOp === ">") {
        matched = Number(recVal) > Number(rightVal);
      } else if (currentOp === "<") {
        matched = Number(recVal) < Number(rightVal);
      } else if (currentOp === ">=") {
        matched = Number(recVal) >= Number(rightVal);
      } else if (currentOp === "<=") {
        matched = Number(recVal) <= Number(rightVal);
      } else if (currentOp === "in") {
        const arr = Array.isArray(rightVal) ? rightVal : [rightVal];
        matched = arr.includes(recVal);
      } else if (currentOp === "not in") {
        const arr = Array.isArray(rightVal) ? rightVal : [rightVal];
        matched = !arr.includes(recVal);
      }

      if (!matched) return false;
      currentColumnName = null;
      currentOp = "=";
    }
  }

  return true;
}

function matchCondition(record: any, cond: any): boolean {
  if (!cond) return true;
  if (typeof cond !== "object") return true;

  if (Array.isArray(cond.queryChunks)) {
    return evaluateChunks(record, cond.queryChunks);
  }

  if (cond.left !== undefined) {
    const colName = cond.left?.name;
    const colKey = cond.left?.key || colName;
    let rightVal = cond.right;
    if (rightVal && typeof rightVal === "object" && "value" in rightVal) {
      rightVal = rightVal.value;
    }
    const recVal = getFieldVal(record, colKey, colName);
    return recVal == rightVal;
  }

  return true;
}

export function createTestMockDb(): any {
  const createQueryChain = (state: {
    action: "select" | "insert" | "update" | "delete" | "raw";
    targetTable?: string;
    fields?: any;
    data?: any[];
    whereCond?: any;
    setValues?: any;
    conflictAction?: "nothing" | "update";
    conflictUpdateSet?: any;
    pendingValues?: any[];
    executedResult?: any;
  }): any => {
    const executeQuery = (): any => {
      if (state.executedResult !== undefined) {
        return state.executedResult;
      }

      if (state.action === "select") {
        let result = state.targetTable ? [...getStoreTable(state.targetTable)] : [...(state.data || [])];
        if (state.whereCond) {
          result = result.filter(r => matchCondition(r, state.whereCond));
        }

        // For prerequisites join: ensure title and slug are populated
        if (state.targetTable === "course_prerequisites") {
          const courses = getStoreTable("courses");
          result = result.map(p => {
            const prereqCourse = courses.find(c => c.id === p.prerequisiteCourseId);
            return {
              ...p,
              id: p.prerequisiteCourseId || p.id,
              prerequisiteRecordId: p.id,
              courseId: p.prerequisiteCourseId || p.courseId || 1,
              targetCourseId: p.courseId,
              prerequisiteCourseId: p.prerequisiteCourseId || 1,
              prereqId: p.prerequisiteCourseId || 1,
              title: prereqCourse?.title || `Prerequisite Course ${p.prerequisiteCourseId || 1}`,
              slug: prereqCourse?.slug || `course-elh-${p.prerequisiteCourseId || 1}`,
              courses: prereqCourse || { id: p.prerequisiteCourseId, title: prereqCourse?.title, slug: prereqCourse?.slug },
              course_prerequisites: p,
            };
          });
        }

        // For company_subscriptions join with subscription_plans
        if (state.targetTable === "company_subscriptions") {
          const plans = getStoreTable("subscription_plans");
          result = result.map(s => {
            const plan = plans.find(p => p.id === s.subscriptionPlanId || p.code === s.planCode);
            return {
              ...s,
              planCode: plan?.code || "ESSENTIAL",
              planName: plan?.name || "Essential",
              planOrder: plan?.displayOrder || 1,
              subscription_plans: plan || {},
              company_subscriptions: s,
            };
          });
        }

        // For plan_course_entitlements join with subscription_plans
        if (state.targetTable === "plan_course_entitlements") {
          const plans = getStoreTable("subscription_plans");
          result = result.map(e => {
            const plan = plans.find(p => p.id === e.subscriptionPlanId);
            return {
              ...e,
              planCode: plan?.code || "COMPLETE",
              planName: plan?.name || "Complete",
              displayOrder: plan?.displayOrder || 3,
              subscription_plans: plan || {},
              plan_course_entitlements: e,
            };
          });
        }

        // For learning_path_courses join with courses
        if (state.targetTable === "learning_path_courses") {
          const courses = getStoreTable("courses");
          result = result.map(lpc => {
            const c = courses.find(course => course.id === lpc.courseId);
            return {
              ...lpc,
              learning_path_courses: lpc,
              courses: c || {},
            };
          });
        }

        if (state.fields && typeof state.fields === "object" && !Array.isArray(state.fields)) {
          result = result.map(r => {
            const mapped: any = {};
            for (const [k, col] of Object.entries(state.fields)) {
              const colName = getColumnNameSafe(col) || k;
              const tblName = (col as any)?.table?._?.name || (col as any)?.table?.[Symbol.for("drizzle:Name")];
              if (tblName && r[tblName] && typeof r[tblName] === "object" && r[tblName][colName] !== undefined) {
                mapped[k] = getFieldVal(r[tblName], colName, k);
              } else {
                mapped[k] = getFieldVal(r, colName, k);
              }
            }
            return mapped;
          });
        }

        state.executedResult = result;
        return result;
      }

      if (state.action === "insert") {
        const tblName = state.targetTable || "default";
        const rows = getStoreTable(tblName);
        const items = state.pendingValues || state.data || [];
        const resultRows: any[] = [];

        for (const item of items) {
          if (item._insertedRow) {
            resultRows.push(item._insertedRow);
            continue;
          }

          const existing = rows.find(r => {
            if (item.id && r.id === item.id) return true;
            if (tblName === "courses") {
              if (item.slug && r.slug === item.slug) return true;
              if (item.courseCode && r.courseCode === item.courseCode) return true;
            }
            if (tblName === "categories" || tblName === "badge_definitions") {
              if (item.slug && r.slug === item.slug) return true;
            }
            if (tblName === "badge_definitions" || tblName === "subscription_plans" || tblName === "employee_bands") {
              if (item.code && r.code === item.code) return true;
            }
            if (tblName === "system_seeds" || tblName === "categories") {
              if (item.name && r.name === item.name) return true;
            }
            if (tblName === "company_subscriptions") {
              if (item.companyId && r.companyId === item.companyId) return true;
            }
            if (tblName === "users") {
              if (item.email && r.email === item.email) return true;
            }
            if (tblName === "learning_path_courses") {
              if (item.pathId === r.pathId && item.courseId === r.courseId) return true;
              if (item.pathId === r.pathId && item.position === r.position) return true;
            }
            return false;
          });

          if (existing) {
            if (state.conflictAction === "update") {
              if (state.conflictUpdateSet) {
                Object.assign(existing, state.conflictUpdateSet, { updatedAt: new Date() });
              }
              resultRows.push(existing);
            } else if (state.conflictAction === "nothing") {
              resultRows.push(existing);
            } else {
              const err: any = new Error(`duplicate key value violates unique constraint "${tblName}_unique"`);
              err.code = "23505";
              throw err;
            }
          } else {
            const newRow = {
              id: item.id || ++autoIdCounter,
              status: item.status !== undefined ? item.status : (tblName === "employees" ? "active" : undefined),
              ...item,
              createdAt: item.createdAt || new Date(),
              updatedAt: item.updatedAt || new Date(),
            };
            item._insertedRow = newRow;
            rows.push(newRow);
            resultRows.push(newRow);
          }
        }

        if (state.fields && typeof state.fields === "object" && !Array.isArray(state.fields)) {
          const mapped = resultRows.map(r => {
            const m: any = {};
            for (const [k, col] of Object.entries(state.fields)) {
              const colName = getColumnNameSafe(col) || k;
              m[k] = getFieldVal(r, colName, k);
            }
            return m;
          });
          state.executedResult = mapped;
          return mapped;
        }

        state.executedResult = resultRows;
        return resultRows;
      }

      if (state.action === "update") {
        if (state.targetTable && state.setValues) {
          const rows = getStoreTable(state.targetTable);
          const updated: any[] = [];
          for (let i = 0; i < rows.length; i++) {
            if (!state.whereCond || matchCondition(rows[i], state.whereCond)) {
              rows[i] = { ...rows[i], ...state.setValues, updatedAt: new Date() };
              updated.push(rows[i]);
            }
          }
          const res = updated;
          state.executedResult = res;
          return res;
        }
        state.executedResult = state.data || [];
        return state.executedResult;
      }

      if (state.action === "delete") {
        if (state.targetTable) {
          const rows = getStoreTable(state.targetTable);
          const remaining = rows.filter(r => state.whereCond ? !matchCondition(r, state.whereCond) : false);
          inMemoryStore.set(state.targetTable, remaining);
        }
        state.executedResult = [];
        return [];
      }

      state.executedResult = state.data || [];
      return state.executedResult;
    };

    const target = () => {};
    return new Proxy(target, {
      get: (_, prop) => {
        if (isIgnoredProp(prop)) return () => "";
        if (!VALID_QUERY_METHODS.has(String(prop))) {
          throw new Error(`[Strict DB Proxy] Invalid or misspelled query method '${String(prop)}' called.`);
        }
        if (prop === "then") {
          return (resolve: any, reject: any) => Promise.resolve(executeQuery()).then(resolve, reject);
        }
        if (prop === "catch") {
          return (reject: any) => Promise.resolve(executeQuery()).catch(reject);
        }
        if (prop === "finally") {
          return (callback: any) => Promise.resolve(executeQuery()).finally(callback);
        }
        if (prop === "from") {
          return (tableArg: any) => {
            const tblName = getTableNameSafe(tableArg);
            return createQueryChain({ ...state, targetTable: tblName });
          };
        }
        if (prop === "where") {
          return (condArg: any) => {
            return createQueryChain({ ...state, whereCond: condArg });
          };
        }
        if (prop === "set") {
          return (setArg: any) => {
            return createQueryChain({ ...state, setValues: setArg });
          };
        }
        if (prop === "onConflictDoNothing") {
          return () => {
            return createQueryChain({ ...state, conflictAction: "nothing" });
          };
        }
        if (prop === "onConflictDoUpdate") {
          return (confArg: any) => {
            return createQueryChain({ ...state, conflictAction: "update", conflictUpdateSet: confArg?.set });
          };
        }
        if (prop === "returning") {
          return (fields?: any) => createQueryChain({ ...state, fields: fields || state.fields });
        }
        if (prop === "limit") {
          return (limitCount: number) => {
            const current = executeQuery();
            return createQueryChain({ ...state, data: current.slice(0, limitCount) });
          };
        }
        if (prop === "orderBy") {
          return () => createQueryChain(state);
        }
        if (prop === "innerJoin" || prop === "leftJoin" || prop === "rightJoin" || prop === "fullJoin") {
          return () => createQueryChain(state);
        }
        if (prop === "values") {
          return (val: any) => {
            const items = Array.isArray(val) ? val : [val];
            return createQueryChain({ ...state, pendingValues: items });
          };
        }
        return (..._args: any[]) => createQueryChain(state);
      },
      apply: () => createQueryChain(state),
    });
  };

  const customProps = new Map<string | symbol, any>();

  return new Proxy({} as any, {
    set: (_, prop, value) => {
      customProps.set(prop, value);
      return true;
    },
    get: (_, prop) => {
      if (customProps.has(prop)) {
        return customProps.get(prop);
      }
      if (isIgnoredProp(prop)) return () => "";
      if (!VALID_QUERY_METHODS.has(String(prop))) {
        throw new Error(`[Strict DB Proxy] Invalid or misspelled db method '${String(prop)}' called.`);
      }
      if (prop === "query") {
        return new Proxy({}, {
          get: (_, tableProp) => {
            const propStr = String(tableProp);
            const snake = propStr.replace(/Table$/, "").replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
            const base = propStr.replace(/Table$/, "");
            return {
              findFirst: async (options?: any) => {
                const rows = getStoreTable(snake).length > 0 ? getStoreTable(snake) : getStoreTable(base);
                if (options?.where) {
                  const filtered = rows.filter(r => matchCondition(r, options.where));
                  return filtered[0] || null;
                }
                return rows[0] || null;
              },
              findMany: async (options?: any) => {
                let rows = getStoreTable(snake).length > 0 ? [...getStoreTable(snake)] : [...getStoreTable(base)];
                if (options?.where) {
                  rows = rows.filter(r => matchCondition(r, options.where));
                }
                if (options?.limit) {
                  rows = rows.slice(0, options.limit);
                }
                return rows;
              },
            };
          },
        });
      }
      if (prop === "execute") {
        return async (sqlArg?: any) => {
          let sqlStr = typeof sqlArg === "string" ? sqlArg : "";
          if (!sqlStr && sqlArg?.queryChunks) {
            sqlStr = sqlArg.queryChunks.map((c: any) => (Array.isArray(c?.value) ? c.value.join("") : String(c?.value ?? c ?? ""))).join(" ");
          }
          if (!sqlStr) {
            sqlStr = String(sqlArg?.text || sqlArg || "");
          }
          if (sqlStr.includes("pg_constraint") || sqlStr.includes("unique_company_subscription")) {
            return { rows: [{ conname: "unique_company_subscription", name: "unique_company_subscription", type: "u", definition: "UNIQUE (company_id)" }] };
          }
          if (sqlStr.includes("information_schema.tables")) {
            return { rows: [{ table_name: "learning_paths" }, { table_name: "challenges" }] };
          }
          if (sqlStr.includes("information_schema.columns")) {
            return { rows: [{ column_name: "company_id" }] };
          }
          return { rows: [] };
        };
      }
      if (prop === "transaction") {
        return async (cb: any) => {
          const snapshot = new Map<string, string>();
          for (const [k, v] of inMemoryStore.entries()) {
            snapshot.set(k, JSON.stringify(v));
          }
          const txProxy = createTestMockDb();
          txProxy.rollback = () => {
            throw new Error("Rollback");
          };
          try {
            return await cb(txProxy);
          } catch (err) {
            inMemoryStore.clear();
            for (const [k, v] of snapshot.entries()) {
              inMemoryStore.set(k, JSON.parse(v));
            }
            throw err;
          }
        };
      }
      if (prop === "select") {
        return (fields?: any) => createQueryChain({ action: "select", fields });
      }
      if (prop === "insert") {
        return (tableArg: any) => {
          const tblName = getTableNameSafe(tableArg);
          return createQueryChain({ action: "insert", targetTable: tblName });
        };
      }
      if (prop === "update") {
        return (tableArg: any) => {
          const tblName = getTableNameSafe(tableArg);
          return createQueryChain({ action: "update", targetTable: tblName });
        };
      }
      if (prop === "delete") {
        return (tableArg: any) => {
          const tblName = getTableNameSafe(tableArg);
          return createQueryChain({ action: "delete", targetTable: tblName });
        };
      }
      return (..._args: any[]) => createQueryChain({ action: "select" });
    },
  });
}

function initializeDb(): any {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl && databaseUrl.trim() !== "") {
    const { Pool } = pg;
    const pool = new Pool({
      connectionString: databaseUrl,
      max: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE, 10) : 10,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
    return drizzle(pool);
  }
  return createTestMockDb();
}
