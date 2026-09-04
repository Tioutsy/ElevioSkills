import { db, coursesTable, enrollmentsTable, lessonProgressTable, quizAttemptsTable, certificatesTable, employeeBadgesTable, elevioScoreLedgerTable } from "@workspace/db";
import fs from "fs";
import { eq, inArray, notLike } from "drizzle-orm";

async function main() {
  const regPath = "/Users/sharonlennon/Desktop/Elearn-Hub copy/COURSE_REMEDIATION_REGISTER_15_2_2.md";
  const reg = fs.readFileSync(regPath, "utf8");
  const lines = reg.split("\n").filter(l => l.startsWith("| `ELH-"));
  
  const parsed = lines.map(l => {
    const parts = l.split("|").map(p => p.trim()).filter(Boolean);
    const code = parts[0].replace(/`/g, "");
    const title = parts[1];
    const level = parts[2];
    const score = parseInt(parts[3], 10);
    const classification = parts[4].replace(/\*/g, "");
    const priority = parts[5];
    const batch = parts[6];
    return { code, title, level, score, classification, priority, batch };
  });

  const b3 = parsed.filter(p => p.batch === "Batch 3");
  console.log("Total Batch 3 courses in 15.2.2 register:", b3.length);

  const allDb = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
  const b3WithId = b3.map(b => {
    const dbCourse = allDb.find(c => c.courseCode === b.code);
    return { id: dbCourse?.id, ...b };
  });

  console.log("Batch 3 courses with IDs count:", b3WithId.filter(b => b.id).length);

  // Range 75 to 116
  const rangeCodes: string[] = [];
  for (let i = 75; i <= 116; i++) {
    const code = "ELH-" + (i < 100 ? (i < 10 ? "0" + i : String(i)) : String(i));
    rangeCodes.push(code);
  }
  
  const rangeInParsed = parsed.filter(p => rangeCodes.includes(p.code));
  const rangeInB3 = rangeInParsed.filter(p => p.batch === "Batch 3");
  const rangeInOther = rangeInParsed.filter(p => p.batch !== "Batch 3");

  console.log("\n=== RANGE 75..116 ANALYSIS ===");
  console.log("Total possible numeric codes in 75..116 range:", rangeCodes.length);
  console.log("Total existing courses in 75..116 range in catalogue:", rangeInParsed.length);
  console.log("Courses in 75..116 assigned to Batch 3:", rangeInB3.length);
  console.log("Batch 3 codes in 75..116:", rangeInB3.map(c => c.code).join(", "));
  console.log("Courses in 75..116 assigned to OTHER batches:", rangeInOther.length);
  console.log("Other batch codes:", rangeInOther.map(c => `${c.code} (${c.batch}, ${c.level})`).join("; "));
  
  // Unused / skipped codes in 75..116
  const existingCodes = rangeInParsed.map(c => c.code);
  const unassignedCodes = rangeCodes.filter(c => !existingCodes.includes(c));
  console.log("Unallocated codes in catalogue in 75..116 range:", unassignedCodes.length, unassignedCodes.join(", "));

  // Output all 87 Batch 3 courses with exact data
  console.log("\n=== EXACT 87 BATCH 3 COURSES ===");
  const waveMap: Record<string, string> = {
    "ELH-13": "Wave 3A", "ELH-14": "Wave 3A", "ELH-15": "Wave 3A", "ELH-16": "Wave 3A",
    "ELH-21": "Wave 3A", "ELH-22": "Wave 3A", "ELH-117": "Wave 3A", "ELH-118": "Wave 3A",
    "ELH-121": "Wave 3A", "ELH-122": "Wave 3A", "ELH-128": "Wave 3A", "ELH-130": "Wave 3A"
  };

  const b3Full = b3WithId.map((b, idx) => {
    const wave = waveMap[b.code] || (idx < 24 ? "Wave 3B" : (idx < 48 ? "Wave 3C" : (idx < 68 ? "Wave 3D" : "Wave 3E")));
    return {
      id: b.id,
      code: b.code,
      title: b.title,
      level: b.level,
      sprint1522Score: b.score,
      classification: b.classification,
      priority: b.priority,
      dependencyStatus: wave === "Wave 3A" ? "Independent / Core Anchor" : "Downstream Dependent",
      waveAssignment: wave
    };
  });

  console.log(JSON.stringify(b3Full, null, 2));

  // Learner data metrics for 12 Wave 3A courses
  const WAVE_3A_CODES = [
    "ELH-13", "ELH-14", "ELH-15", "ELH-16",
    "ELH-21", "ELH-22", "ELH-117", "ELH-118",
    "ELH-121", "ELH-122", "ELH-128", "ELH-130"
  ];

  console.log("\n=== WAVE 3A DETAILED LEARNER DATA METRICS ===");
  for (const code of WAVE_3A_CODES) {
    const c = allDb.find(course => course.courseCode === code);
    if (!c) continue;

    const enrolments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.courseId, c.id));
    const v1Enrolments = enrolments.filter(e => e.enrolledVersion === 1 || !e.enrolledVersion);
    const v2Enrolments = enrolments.filter(e => e.enrolledVersion === 2);
    const progress = await db.select().from(lessonProgressTable).innerJoin(coursesTable, eq(coursesTable.id, c.id));
    const attempts = await db.select().from(quizAttemptsTable).where(eq(quizAttemptsTable.courseId, c.id));
    const completions = enrolments.filter(e => e.completedAt !== null);
    const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.courseId, c.id));
    const badges = await db.select().from(employeeBadgesTable);
    const gamification = await db.select().from(elevioScoreLedgerTable);

    console.log(JSON.stringify({
      code: c.courseCode,
      id: c.id,
      title: c.title,
      v1Enrolments: v1Enrolments.length,
      v2Enrolments: v2Enrolments.length,
      totalEnrolments: enrolments.length,
      lessonProgressRecords: progress.length,
      assessmentAttempts: attempts.length,
      completions: completions.length,
      certificates: certs.length,
      badges: badges.length,
      gamificationEvents: gamification.length
    }));
  }
}

main().then(() => process.exit(0));
