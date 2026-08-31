const canonicalBuckets = {
  UNIVERSAL_CORE: [
    "ELH-01", "ELH-02", "ELH-03", "ELH-04", "ELH-34"
  ],
  CROSS_SECTOR_CORE: [
    "ELH-05", "ELH-06", "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11", "ELH-30", "ELH-31", "ELH-32"
  ],
  SECTOR_SPECIFIC: [
    // Hospitality & Tourism (12)
    "ELH-35", "ELH-36", "ELH-37", "ELH-38", "ELH-39", "ELH-40", "ELH-41", "ELH-42", "ELH-43", "ELH-44", "ELH-45", "ELH-46",
    // Property & Real Estate / Construction (8)
    "ELH-47", "ELH-48", "ELH-49", "ELH-50", "ELH-51", "ELH-53", "ELH-54", "ELH-55",
    // Manufacturing & Industrial (10)
    "ELH-57", "ELH-58", "ELH-59", "ELH-60", "ELH-61", "ELH-62", "ELH-63", "ELH-64", "ELH-65", "ELH-66",
    // Retail & Food Services (8)
    "ELH-67", "ELH-68", "ELH-69", "ELH-70", "ELH-71", "ELH-72", "ELH-73", "ELH-74",
    // Financial Services & Banking (6)
    "ELH-75", "ELH-76", "ELH-79", "ELH-80", "ELH-81", "ELH-82",
    // Logistics & Transportation (6)
    "ELH-83", "ELH-84", "ELH-85", "ELH-86", "ELH-87", "ELH-89",
    // Professional Services & ICT (4)
    "ELH-96", "ELH-99", "ELH-100", "ELH-101",
    // Agriculture, Agribusiness & Blue Economy (8)
    "ELH-103", "ELH-104", "ELH-105", "ELH-106", "ELH-107", "ELH-108", "ELH-109", "ELH-110",
    // Healthcare & Clinical Operations (6)
    "ELH-111", "ELH-112", "ELH-113", "ELH-114", "ELH-115", "ELH-116"
  ],
  DEPARTMENT_SPECIFIC: [
    "ELH-18", "ELH-24", "ELH-25", "ELH-27", "ELH-28", "ELH-33", "ELH-97", "ELH-98"
  ],
  ROLE_SPECIALIST: [
    "ELH-26", "ELH-29", "ELH-52", "ELH-88", "ELH-90", "ELH-95",
    "ELH-125", "ELH-126", "ELH-127", "ELH-128", "ELH-129", "ELH-130"
  ],
  MANAGEMENT_LEADERSHIP: [
    "ELH-13", "ELH-14", "ELH-15", "ELH-16", "ELH-17", "ELH-19", "ELH-20", "ELH-21", "ELH-22", "ELH-23",
    "ELH-117", "ELH-118", "ELH-119", "ELH-120", "ELH-121", "ELH-122", "ELH-123", "ELH-124"
  ],
  ADVANCED_ESG_PROFESSIONAL: [
    "ELH-56", "ELH-77", "ELH-78", "ELH-91", "ELH-92", "ELH-93", "ELH-94", "ELH-102",
    "ELH-131", "ELH-132", "ELH-133", "ELH-134", "ELH-135", "ELH-136"
  ],
  CAPSTONE_CERTIFICATION: [
    "ELH-12"
  ]
};

console.log("Bucket lengths:");
let total = 0;
const allCodes = new Set();
const duplicates = [];

for (const [k, v] of Object.entries(canonicalBuckets)) {
  console.log(`${k}: ${v.length}`);
  total += v.length;
  for (const c of v) {
    if (allCodes.has(c)) duplicates.push(c);
    allCodes.add(c);
  }
}

console.log("Total accounted for:", total);
console.log("Unique codes:", allCodes.size);
console.log("Duplicates:", duplicates);

// Check missing numbers from 1 to 136
const missing = [];
for (let i = 1; i <= 136; i++) {
  const code = `ELH-${i.toString().padStart(2, "0")}`;
  if (!allCodes.has(code)) missing.push(code);
}
console.log("Missing codes from 1..136:", missing);
