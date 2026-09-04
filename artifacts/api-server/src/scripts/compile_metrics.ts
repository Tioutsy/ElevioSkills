import { db, coursesTable, enrollmentsTable, quizAttemptsTable, certificatesTable } from "@workspace/db";
import { eq, inArray, notLike } from "drizzle-orm";
import crypto from "crypto";
import fs from "fs";
import path from "path";

async function main() {
  const WAVE_3A_CODES = [
    "ELH-13", "ELH-14", "ELH-15", "ELH-16",
    "ELH-21", "ELH-22", "ELH-117", "ELH-118",
    "ELH-121", "ELH-122", "ELH-128", "ELH-130"
  ];

  const BATCH_1_CODES = [
    "ELH-01", "ELH-02", "ELH-07", "ELH-08", "ELH-09", "ELH-10", "ELH-11",
    "ELH-31", "ELH-32", "ELH-33", "ELH-34"
  ];

  const BATCH_2_CODES = [
    "ELH-03", "ELH-04", "ELH-05", "ELH-06",
    "ELH-18", "ELH-24", "ELH-25", "ELH-26",
    "ELH-27", "ELH-28", "ELH-29", "ELH-30"
  ];

  const snapshotPath = path.resolve(process.cwd(), "src/lib/preRemediationSnapshotBatch3A.json");
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

  const courses = await db.select().from(coursesTable).where(inArray(coursesTable.courseCode, WAVE_3A_CODES));
  
  console.log("=== DATA PRESERVATION METRICS FOR WAVE 3A COURSES ===");
  for (const c of courses) {
    const snap = snapshot.wave3ACourses[c.courseCode || ""];
    const enrolments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.courseId, c.id));
    const v1Enrolments = enrolments.filter(e => e.enrolledVersion === 1 || !e.enrolledVersion);
    const v2Enrolments = enrolments.filter(e => e.enrolledVersion === 2);
    const attempts = await db.select().from(quizAttemptsTable).where(eq(quizAttemptsTable.courseId, c.id));
    const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.courseId, c.id));

    console.log(JSON.stringify({
      code: c.courseCode,
      id: c.id,
      title: c.title,
      version: c.version,
      preEnrolments: snap?.enrolmentCount || 0,
      postEnrolmentsTotal: enrolments.length,
      postEnrolmentsV1: v1Enrolments.length,
      postEnrolmentsV2: v2Enrolments.length,
      preCertificates: snap?.certificateCount || 0,
      postCertificates: certs.length,
      postAttempts: attempts.length
    }));
  }

  // Checksums verification
  const allCanonical = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
  const b1b2 = allCanonical.filter(c => c.courseCode && (BATCH_1_CODES.includes(c.courseCode) || BATCH_2_CODES.includes(c.courseCode)));
  const other101 = allCanonical.filter(c => c.courseCode && !BATCH_1_CODES.includes(c.courseCode) && !BATCH_2_CODES.includes(c.courseCode) && !WAVE_3A_CODES.includes(c.courseCode));

  console.log("\n=== CATALOGUE SUMMARY ===");
  console.log("Batch 1 + Batch 2 Courses Count:", b1b2.length);
  console.log("Other Canonical (Batches 3B-5) Count:", other101.length);
  console.log("Wave 3A Courses Count:", courses.length);
  console.log("Total Canonical Catalogue Count:", allCanonical.length);

  // Compute composite SHA256 of 23 B1/B2 courses
  const b1b2Digest = crypto.createHash("sha256").update(JSON.stringify(b1b2.map(c => ({ code: c.courseCode, v: c.version, title: c.title, passing: c.passingScore })))).digest("hex");
  console.log("B1+B2 Composite SHA-256 Checksum:", b1b2Digest);

  // Compute composite SHA256 of 101 other canonical courses
  const other101Digest = crypto.createHash("sha256").update(JSON.stringify(other101.map(c => ({ code: c.courseCode, v: c.version, title: c.title, passing: c.passingScore })))).digest("hex");
  console.log("101 Other Canonical Composite SHA-256 Checksum:", other101Digest);
}
main().then(() => process.exit(0));
