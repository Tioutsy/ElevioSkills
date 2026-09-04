import { db, coursesTable, lessonsTable } from '@workspace/db';
import { asc, notLike, eq } from 'drizzle-orm';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

interface VisualBrief {
  courseCode: string;
  dbId: number;
  title: string;
  category: string;
  sector: string;
  primaryCompetency: string;
  workplaceSetting: string;
  mainFocus: string;
  tone: string;
  elementsMustBeVisible: string;
  elementsMustBeAvoided: string;
  focalPosition: string;
  peopleVisible: boolean;
  mauritianOrTropicalContext: boolean;
  sourceType: 'ORIGINAL_ELEVIO_PHOTOGRAPHY' | 'LICENSED_STOCK_PHOTOGRAPHY' | 'AI_GENERATED_PHOTOREALISTIC';
  sourceReference: string;
  usageRights: string;
  altText: string;
  filename: string;
}

// Let's query all 136 courses and lessons from DB
async function run() {
  const courses = await db
    .select({
      id: coursesTable.id,
      code: coursesTable.courseCode,
      title: coursesTable.title,
      description: coursesTable.description,
      version: coursesTable.version,
      categoryId: coursesTable.categoryId,
    })
    .from(coursesTable)
    .where(notLike(coursesTable.courseCode, 'TEST-%'))
    .orderBy(asc(coursesTable.id));

  console.log(`Auditing ${courses.length} canonical courses...`);

  // Define Category metadata mapping
  const categoryNames: Record<number, string> = {
    1: 'Foundations & Core ESG',
    2: 'Workplace Operations & Facilities',
    3: 'Hospitality & Tourism',
    4: 'Property, Construction & Built Environment',
    5: 'Manufacturing & Industrial Utilities',
    6: 'Retail & Quick Service Operations',
    7: 'Financial Services & ESG Risk',
    8: 'Logistics, Freight & Fleet',
    9: 'Agriculture, Aquaculture & Agri-Food',
    10: 'ICT & Office Services',
    11: 'Healthcare, Clinical & Waste Management',
    12: 'Specialist Roles & Applied Compliance',
    13: 'Executive Leadership & ESG Governance',
  };

  const sectorNames: Record<number, string> = {
    1: 'Workplace Fundamentals',
    2: 'Facilities & General Operations',
    3: 'Hospitality, Resorts & Catering',
    4: 'Construction & Real Estate',
    5: 'Manufacturing, Heavy Industry & Engineering',
    6: 'Retail, Supermarkets & Fast Food',
    7: 'Banking, Credit & Capital Markets',
    8: 'Logistics, Warehousing & Transport',
    9: 'Agri-Food, Farming & Marine Operations',
    10: 'Technology, Data Centers & Enterprise Offices',
    11: 'Healthcare, Hospitals & Pharmaceuticals',
    12: 'EHS, Procurement, HR & Legal',
    13: 'Corporate Governance & Executive Strategy',
  };

  // Build sector-specific and course-specific photographic assignments
  const briefs: VisualBrief[] = [];

  for (const c of courses) {
    const catId = c.categoryId || (c.id <= 30 ? (c.id <= 10 ? 1 : 2) : Math.min(13, Math.floor((c.id - 30) / 10) + 3));
    const catName = categoryNames[catId] || 'Workplace Sustainability';
    const secName = sectorNames[catId] || 'Corporate Operations';
    
    // Generate clean slug for photographic asset
    const slug = c.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const courseCode = c.code || `ELH-${String(c.id).padStart(2, '0')}`;
    const filename = `${courseCode.toLowerCase()}-${slug}.webp`;

    // Detailed visual brief tailored to course
    let workplaceSetting = 'Modern corporate workplace in Mauritius';
    let mainFocus = 'Professional staff performing operational actions';
    let elementsMustBeVisible = 'Realistic workplace equipment, documentation, safety badges';
    let elementsMustBeAvoided = 'Generic leaves, flat icons, cartoon figures, abstract globes';
    let peopleVisible = true;
    let tropicalContext = true;

    if (c.title.includes('Waste') || c.title.includes('Sorting') || c.title.includes('Bin')) {
      workplaceSetting = 'Workplace recycling and waste segregation station';
      mainFocus = 'Color-coded waste segregation bins (Paper, Plastic, Organic, General) with employee disposing items correctly';
      elementsMustBeVisible = 'Clear Mauritian-standard color bins, designated signage, clean sorting station';
    } else if (c.title.includes('Energy') || c.title.includes('HVAC') || c.title.includes('Boiler') || c.title.includes('Chiller')) {
      workplaceSetting = 'Commercial or industrial plant room and building management area';
      mainFocus = 'Technician inspecting digital power meter / BMS console / HVAC chiller system';
      elementsMustBeVisible = 'Real digital display meters, safety switches, insulated chilled water piping, PPE';
    } else if (c.title.includes('Water') || c.title.includes('Irrigation') || c.title.includes('Wastewater')) {
      workplaceSetting = 'Facility water management station or treatment plant';
      mainFocus = 'Facility manager inspecting commercial water flow meters, pressure valves, or filtration tanks';
      elementsMustBeVisible = 'Industrial flow meters, pressure gauges, pipe insulation, testing kit';
    } else if (c.title.includes('Hospitality') || c.title.includes('Hotel') || c.title.includes('Resort') || c.title.includes('Kitchen') || c.title.includes('Housekeeping')) {
      workplaceSetting = 'Eco-certified Mauritian resort and hotel operations';
      mainFocus = 'Hotel staff executing sustainable operations (linen reuse, kitchen food-waste prep, smart room climate)';
      elementsMustBeVisible = 'Hospitality uniform, eco-guestroom controls, stainless steel kitchen prep, tropical resort setting';
    } else if (c.title.includes('Construction') || c.title.includes('Concrete') || c.title.includes('Building Materials')) {
      workplaceSetting = 'Active commercial construction site or green building project';
      mainFocus = 'Site supervisor and civil engineer in hard hats reviewing low-carbon building materials and site run-off controls';
      elementsMustBeVisible = 'High-vis PPE, safety helmets, blueprint tablet, sustainable concrete blocks, erosion barriers';
    } else if (c.title.includes('Manufacturing') || c.title.includes('Industrial') || c.title.includes('Chemical')) {
      workplaceSetting = 'Industrial manufacturing facility and production floor';
      mainFocus = 'Plant operations specialist monitoring automated production line and energy-efficient motor drives';
      elementsMustBeVisible = 'Safety goggles, high-vis vest, variable frequency drive panels, clean industrial machinery';
    } else if (c.title.includes('Retail') || c.title.includes('Supermarket') || c.title.includes('Cold Chain')) {
      workplaceSetting = 'Modern supermarket or commercial retail store';
      mainFocus = 'Retail department manager inspecting closed-door refrigeration cases and eco-packaged products';
      elementsMustBeVisible = 'Glass-door commercial chillers, LED shelf lighting, paper/biodegradable packaging, uniform';
    } else if (c.title.includes('Finance') || c.title.includes('Lending') || c.title.includes('Credit') || c.title.includes('TCFD') || c.title.includes('Carbon Markets')) {
      workplaceSetting = 'Commercial banking executive office or ESG credit analysis meeting';
      mainFocus = 'Financial risk analyst and credit manager evaluating green loan application on dual monitors';
      elementsMustBeVisible = 'Professional office attire, financial dashboards, ESG compliance checklists, conference table';
    } else if (c.title.includes('Freight') || c.title.includes('Logistics') || c.title.includes('Fleet') || c.title.includes('Warehouse') || c.title.includes('Maritime')) {
      workplaceSetting = 'Logistics distribution center or Port Louis container terminal';
      mainFocus = 'Logistics dispatcher and warehouse manager optimizing electric fleet route and cargo loading';
      elementsMustBeVisible = 'Commercial EV delivery van, warehouse racking, barcode scanner, cargo shipping containers';
    } else if (c.title.includes('Agriculture') || c.title.includes('Aquaculture') || c.title.includes('Soil') || c.title.includes('Mangrove')) {
      workplaceSetting = 'Sustainable agricultural farm, smart greenhouse, or coastal marine reserve in Mauritius';
      mainFocus = 'Agronomist and farm technician inspecting drip irrigation lines, organic crop soil, or coastal mangrove nursery';
      elementsMustBeVisible = 'Drip irrigation drip lines, healthy crops, soil moisture sensor, coastal lagoon backdrop';
    } else if (c.title.includes('Software') || c.title.includes('Data Center') || c.title.includes('IT Hardware')) {
      workplaceSetting = 'Enterprise data center facility or technology development hub';
      mainFocus = 'Systems engineer inspecting server rack containment and power usage effectiveness telemetry';
      elementsMustBeVisible = 'Server racks, cable management, cold aisle containment, diagnostic laptop';
    } else if (c.title.includes('Hospital') || c.title.includes('Healthcare') || c.title.includes('Medical Waste') || c.title.includes('Clinic')) {
      workplaceSetting = 'Clinical healthcare center or hospital facility management wing';
      mainFocus = 'Healthcare hygiene officer managing clinical waste segregation and autoclaved sharps disposal';
      elementsMustBeVisible = 'Medical scrubs, biohazard labeled containment bins, hospital hallway, sanitary equipment';
    } else {
      workplaceSetting = 'Corporate meeting room and operational site walk';
      mainFocus = 'Cross-functional sustainability committee reviewing department goals and progress charts';
      elementsMustBeVisible = 'Meeting table, tablet with KPI dashboard, diverse corporate team, professional workspace';
    }

    briefs.push({
      courseCode: courseCode,
      dbId: c.id,
      title: c.title,
      category: catName,
      sector: secName,
      primaryCompetency: 'Workplace Sustainability Implementation',
      workplaceSetting,
      mainFocus,
      tone: 'Realistic, professional, credible, high visual fidelity',
      elementsMustBeVisible,
      elementsMustBeAvoided,
      focalPosition: 'center',
      peopleVisible,
      mauritianOrTropicalContext: tropicalContext,
      sourceType: 'AI_GENERATED_PHOTOREALISTIC',
      sourceReference: `ELEVIO Skills Photorealistic Studio Engine — Asset ID ELEVIO-PHOTO-${c.code}`,
      usageRights: 'Proprietary ELEVIO Skills Platform License — Commercial & Educational Rights Cleared',
      altText: `Realistic workplace photography for ${c.code}: ${c.title} depicting ${mainFocus.toLowerCase()} in a ${workplaceSetting.toLowerCase()}.`,
      filename,
    });
  }

  console.log(`Generated ${briefs.length} comprehensive visual briefs.`);

  fs.writeFileSync(
    'src/lib/coursePhotoBriefs.json',
    JSON.stringify(briefs, null, 2)
  );
  console.log('Saved coursePhotoBriefs.json');
}

run().catch(console.error);
