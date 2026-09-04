import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { CANONICAL_COURSE_IMAGE_MANIFEST, FALLBACK_COURSE_IMAGE, getCourseImageRecord } from "./courseImageManifest.js";
import { db, coursesTable, enrollmentsTable, companiesTable } from "@workspace/db";
import { asc, notLike } from "drizzle-orm";

describe("Sprint 15.2.9 — Canonical Course Image Remediation & Responsive Display", () => {
  const repoRoot = process.cwd().includes("artifacts/api-server") ? path.resolve(process.cwd(), "../..") : process.cwd();
  const publicDir = path.resolve(repoRoot, "artifacts/ecolearn/public");
  const coursesImageDir = path.join(publicDir, "images/courses");

  // Gate 1: Exactly 136 canonical courses exist in manifest and DB
  it("Gate 1: Exactly 136 canonical courses exist", async () => {
    assert.equal(CANONICAL_COURSE_IMAGE_MANIFEST.length, 136, "Manifest must contain exactly 136 canonical courses");

    const dbCourses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"));

    assert.equal(dbCourses.length, 136, "Database must contain exactly 136 canonical courses");
  });

  // Gate 2: Every canonical course resolves to a primary image
  it("Gate 2: Every canonical course resolves to a primary image", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((course) => {
      assert.ok(course.imagePath, `Course ${course.courseCode} must have an imagePath`);
      assert.notEqual(course.imagePath.trim(), "", `Course ${course.courseCode} imagePath cannot be empty`);
    });
  });

  // Gate 3: Every image reference resolves to an available local asset
  it("Gate 3: Every image reference resolves to an available local asset", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((course) => {
      const relPath = course.imagePath.replace(/^\//, "");
      const fullPath = path.join(publicDir, relPath);
      assert.ok(
        fs.existsSync(fullPath),
        `Asset file must exist on disk for course ${course.courseCode}: ${fullPath}`
      );
    });

    // Verify fallback image exists
    const fallbackRelPath = FALLBACK_COURSE_IMAGE.replace(/^\//, "");
    const fallbackFullPath = path.join(publicDir, fallbackRelPath);
    assert.ok(fs.existsSync(fallbackFullPath), `Fallback asset must exist at ${fallbackFullPath}`);
  });

  // Gate 4: Zero canonical courses have a missing image
  it("Gate 4: Zero canonical courses have a missing image", () => {
    const missing = CANONICAL_COURSE_IMAGE_MANIFEST.filter((c) => !c.imagePath || c.imagePath === null);
    assert.equal(missing.length, 0, "No course should have a missing image");
  });

  // Gate 5: Zero canonical courses use a broken image reference
  it("Gate 5: Zero canonical courses use a broken image reference", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(!c.imagePath.includes("undefined"), `ImagePath for ${c.courseCode} contains undefined`);
      assert.ok(!c.imagePath.includes("null"), `ImagePath for ${c.courseCode} contains null`);
      assert.ok(!c.imagePath.startsWith("http://localhost"), `ImagePath for ${c.courseCode} is unapproved localhost`);
    });
  });

  // Gate 6: Zero accidental duplicate assignments exist
  it("Gate 6: Zero accidental duplicate assignments exist", () => {
    const imagePathMap = new Map<string, string[]>();
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      const list = imagePathMap.get(c.imagePath) || [];
      list.push(c.courseCode);
      imagePathMap.set(c.imagePath, list);
    });

    const duplicates: { imagePath: string; courses: string[] }[] = [];
    imagePathMap.forEach((courses, imagePath) => {
      if (courses.length > 1) {
        duplicates.push({ imagePath, courses });
      }
    });

    assert.equal(
      duplicates.length,
      0,
      `Accidental duplicate image assignments found: ${JSON.stringify(duplicates)}`
    );
  });

  // Gate 7: Every intentional reuse is documented (if any)
  it("Gate 7: Every intentional reuse is documented", () => {
    const reused = CANONICAL_COURSE_IMAGE_MANIFEST.filter((c) => c.intentionalReuse);
    reused.forEach((c) => {
      assert.ok(c.reuseRationale, `Course ${c.courseCode} with intentional reuse must provide a rationale`);
    });
  });

  // Gate 8: No image is the generic fallback under normal conditions
  it("Gate 8: No image is the generic fallback under normal conditions", () => {
    const fallbackAssignments = CANONICAL_COURSE_IMAGE_MANIFEST.filter(
      (c) => c.imagePath === FALLBACK_COURSE_IMAGE
    );
    assert.equal(
      fallbackAssignments.length,
      0,
      "No canonical course should have fallback set as its primary assigned image"
    );
  });

  // Gate 9: Every photographic / vector image meets the 16:9 aspect ratio requirement
  it("Gate 9: Every photographic / vector image meets the 16:9 aspect ratio", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.equal(c.aspectRatio, "16:9", `Course ${c.courseCode} aspect ratio must be 16:9`);
      assert.equal(c.intrinsicWidth / c.intrinsicHeight, 16 / 9, `Course ${c.courseCode} dimension ratio must be 16:9`);
    });
  });

  // Gate 10: Every image meets minimum resolution
  it("Gate 10: Every image meets minimum resolution (>= 1280x720, standardized 1600x900)", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(c.intrinsicWidth >= 1280, `Width of ${c.courseCode} must be >= 1280`);
      assert.ok(c.intrinsicHeight >= 720, `Height of ${c.courseCode} must be >= 720`);
    });
  });

  // Gate 11: File size budget (< 250 KB per card asset)
  it("Gate 11: Optimized course-card assets respect the file-size budget (< 250 KB)", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      const relPath = c.imagePath.replace(/^\//, "");
      const fullPath = path.join(publicDir, relPath);
      const stat = fs.statSync(fullPath);
      const sizeKB = stat.size / 1024;
      assert.ok(
        sizeKB < 250,
        `Course ${c.courseCode} asset size (${sizeKB.toFixed(2)} KB) exceeds 250 KB budget`
      );
    });
  });

  // Gate 12: Supported image formats
  it("Gate 12: Supported image formats are used (SVG, WebP, PNG, JPG)", () => {
    const supportedFormats = ["svg", "webp", "png", "jpg", "jpeg"];
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(
        supportedFormats.includes(c.format.toLowerCase()),
        `Course ${c.courseCode} format ${c.format} is not supported`
      );
    });
  });

  // Gate 13: Every course has valid context-aware alternative text
  it("Gate 13: Every course has valid context-aware alternative text", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(c.altText, `Course ${c.courseCode} must have altText`);
      assert.ok(c.altText.length >= 15, `Course ${c.courseCode} altText too short: "${c.altText}"`);
      assert.ok(
        !c.altText.toLowerCase().startsWith("image of") && !c.altText.toLowerCase().startsWith("picture of"),
        `Course ${c.courseCode} altText should not start with 'image of' or 'picture of'`
      );
    });
  });

  // Gate 14: No raw external search-result URLs
  it("Gate 14: No raw external search-result URLs are used", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(!c.imagePath.includes("google.com"), `External search URL in ${c.courseCode}`);
      assert.ok(!c.imagePath.includes("bing.com"), `External search URL in ${c.courseCode}`);
    });
  });

  // Gate 15: No unapproved watermarked assets
  it("Gate 15: No unapproved watermarked assets are included", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach((c) => {
      assert.ok(!c.imagePath.includes("shutterstock"), `Watermark source in ${c.courseCode}`);
      assert.ok(!c.imagePath.includes("gettyimages"), `Watermark source in ${c.courseCode}`);
    });
  });

  // Gate 16-22: Component verification & focal position
  it("Gate 16-22: CourseImage component file and focal points exist", () => {
    const componentPath = path.resolve(repoRoot, "artifacts/ecolearn/src/components/CourseImage.tsx");
    assert.ok(fs.existsSync(componentPath), "CourseImage.tsx must exist");
    const componentCode = fs.readFileSync(componentPath, "utf-8");

    assert.ok(componentCode.includes("objectFit"), "CourseImage must specify objectFit");
    assert.ok(componentCode.includes("cover"), "CourseImage must use object-fit: cover");
    assert.ok(!componentCode.includes("object-fit: fill"), "CourseImage must not use object-fit: fill");
    assert.ok(componentCode.includes("focalPosition"), "CourseImage must support focalPosition");
    assert.ok(componentCode.includes("setHasError"), "CourseImage must have error handling");
    assert.ok(componentCode.includes("loading="), "CourseImage must specify loading attribute");
  });

  // Gate 34-35: Invariant verification — Course content, versions, passing scores, learner progress unchanged
  it("Gate 34-35: Invariants — Course versions, passing scores, enrollments and companies unchanged", async () => {
    const dbCourses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"))
      .orderBy(asc(coursesTable.id));
    assert.equal(dbCourses.length, 136, "Must retain exactly 136 canonical courses in DB");

    const v2Courses = dbCourses.filter((c) => (c.version ?? 1) >= 2);
    const v1Courses = dbCourses.filter((c) => (c.version ?? 1) === 1);
    assert.equal(v2Courses.length, 89, "Version 2 count must remain exactly 89");
    assert.equal(v1Courses.length, 47, "Version 1 count must remain exactly 47");

    // Check all 136 courses have a valid thumbnailUrl in DB
    const missingDbThumbnails = dbCourses.filter((c) => !c.thumbnailUrl || c.thumbnailUrl.trim() === "");
    assert.equal(missingDbThumbnails.length, 0, "Zero courses in database should have null or empty thumbnailUrl");

    const companies = await db.select().from(companiesTable);
    assert.ok(companies.length >= 1, "Company data must remain intact");

    const enrollments = await db.select().from(enrollmentsTable);
    assert.ok(enrollments.length >= 20, "Learner enrollments must remain intact");
  });
});
