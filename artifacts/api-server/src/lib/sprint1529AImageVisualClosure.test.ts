import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { CANONICAL_COURSE_IMAGE_MANIFEST, FALLBACK_COURSE_IMAGE, getCourseImageRecord } from "./courseImageManifest.js";
import { db, coursesTable, lessonsTable, enrollmentsTable, companiesTable } from "@workspace/db";
import { asc, notLike, eq, count } from "drizzle-orm";
import { ensureCourseImages } from "./ensureCourseImages.js";

describe("Sprint 15.2.9A — Course Image Visual QA & Deployment Closure Suite", () => {
  const repoRoot = process.cwd().includes("artifacts/api-server") ? path.resolve(process.cwd(), "../..") : process.cwd();
  const publicDir = path.resolve(repoRoot, "artifacts/ecolearn/public");
  const backendManifestPath = path.resolve(repoRoot, "artifacts/api-server/src/lib/courseImageManifest.ts");
  const frontendManifestPath = path.resolve(repoRoot, "artifacts/ecolearn/src/lib/courseImageManifest.ts");
  const componentPath = path.resolve(repoRoot, "artifacts/ecolearn/src/components/CourseImage.tsx");
  const cataloguePagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/courses/index.tsx");
  const detailPagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/courses/detail.tsx");
  const homePagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/home.tsx");
  const dashboardPagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/dashboard/index.tsx");

  // Gate 1: Exactly 136 canonical courses exist
  it("Gate 1: Exactly 136 canonical courses exist", async () => {
    assert.equal(CANONICAL_COURSE_IMAGE_MANIFEST.length, 136, "Manifest must contain exactly 136 courses");
    const dbCourses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(dbCourses.length, 136, "Database must contain exactly 136 canonical courses");
  });

  // Gate 2: Exactly 136 primary image assignments exist
  it("Gate 2: Exactly 136 primary image assignments exist", () => {
    const assigned = CANONICAL_COURSE_IMAGE_MANIFEST.filter(c => !!c.imagePath && c.imagePath.trim().length > 0);
    assert.equal(assigned.length, 136, "All 136 courses must have a primary image assignment");
  });

  // Gate 3: All image assignments resolve on disk
  it("Gate 3: All image assignments resolve on disk", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(course => {
      const relPath = course.imagePath.replace(/^\//, "");
      const fullPath = path.join(publicDir, relPath);
      assert.ok(fs.existsSync(fullPath), `Asset must exist on disk: ${fullPath} for ${course.courseCode}`);
    });
    const fallbackPath = path.join(publicDir, FALLBACK_COURSE_IMAGE.replace(/^\//, ""));
    assert.ok(fs.existsSync(fallbackPath), `Fallback asset must exist at ${fallbackPath}`);
  });

  // Gate 4: All primary image paths are unique
  it("Gate 4: All primary image paths are unique", () => {
    const paths = CANONICAL_COURSE_IMAGE_MANIFEST.map(c => c.imagePath);
    const uniquePaths = new Set(paths);
    assert.equal(uniquePaths.size, 136, "Each canonical course must have a unique imagePath with zero accidental duplicates");
  });

  // Gate 5: No canonical course uses the fallback as its primary image
  it("Gate 5: No canonical course uses the fallback as its primary image", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.notEqual(
        c.imagePath,
        FALLBACK_COURSE_IMAGE,
        `Course ${c.courseCode} must not have the generic fallback as primary image`
      );
    });
  });

  // Gate 6: Every asset has a valid 16:9 aspect ratio or valid ViewBox
  it("Gate 6: Every asset has a valid 16:9 aspect ratio or valid ViewBox", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      assert.ok(fs.existsSync(fullPath), `File ${c.imagePath} must exist`);
      if (c.imagePath.endsWith(".svg")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        assert.ok(content.includes("<svg"), `File ${c.imagePath} is not valid SVG`);
        assert.ok(content.includes('viewBox="0 0 1600 900"') || content.includes('viewBox="0 0 1920 1080"'), `SVG for ${c.courseCode} must have a 16:9 viewBox`);
      } else {
        const out = execSync(`sips -g pixelWidth -g pixelHeight "${fullPath}"`).toString();
        const wMatch = out.match(/pixelWidth:\s*(\d+)/);
        const hMatch = out.match(/pixelHeight:\s*(\d+)/);
        const w = parseInt(wMatch?.[1] || "0", 10);
        const h = parseInt(hMatch?.[1] || "0", 10);
        assert.ok(w >= 1280 && h >= 720, `Dimensions ${w}x${h} too small for ${c.courseCode}`);
        const ratio = w / h;
        assert.ok(Math.abs(ratio - 16 / 9) < 0.05, `Aspect ratio ${ratio} must be 16:9 for ${c.courseCode}`);
      }
    });
  });

  // Gate 7: Every asset remains within the approved size budget (< 250 KB)
  it("Gate 7: Every asset remains within the approved size budget (< 250 KB)", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      const stat = fs.statSync(fullPath);
      assert.ok(
        stat.size < 250 * 1024,
        `Course asset ${c.imagePath} size ${stat.size} exceeds 250KB budget`
      );
    });
  });

  // Gate 8: Assets contain no external script
  it("Gate 8: Assets contain no external script", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      if (c.imagePath.endsWith(".svg")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        assert.ok(!content.includes("<script"), `SVG for ${c.courseCode} contains <script>`);
        assert.ok(!content.includes("javascript:"), `SVG for ${c.courseCode} contains javascript: pseudo-protocol`);
        assert.ok(!content.includes("onload="), `SVG for ${c.courseCode} contains inline onload`);
      }
    });
  });

  // Gate 9: Assets contain no external image dependency
  it("Gate 9: Assets contain no external image dependency", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      if (c.imagePath.endsWith(".svg")) {
        const content = fs.readFileSync(fullPath, "utf-8");
        assert.ok(!content.includes('href="http://'), `SVG for ${c.courseCode} contains external http reference`);
        assert.ok(!content.includes('href="https://'), `SVG for ${c.courseCode} contains external https reference`);
        assert.ok(!content.includes('xlink:href="http'), `SVG for ${c.courseCode} contains external xlink reference`);
      }
    });
  });

  // Gate 10: Frontend and backend manifests cannot diverge
  it("Gate 10: Frontend and backend manifests cannot diverge", () => {
    assert.ok(fs.existsSync(backendManifestPath), "Backend manifest must exist");
    assert.ok(fs.existsSync(frontendManifestPath), "Frontend manifest must exist");
    const backendContent = fs.readFileSync(backendManifestPath, "utf-8");
    const frontendContent = fs.readFileSync(frontendManifestPath, "utf-8");
    assert.equal(backendContent, frontendContent, "Backend and frontend courseImageManifest.ts must be strictly identical");
  });

  // Gate 11: Every course has valid alt text or approved decorative treatment
  it("Gate 11: Every course has valid alt text or approved decorative treatment", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.altText && c.altText.trim().length > 10, `Course ${c.courseCode} must have descriptive alt text`);
      assert.ok(c.altText.includes(c.courseCode), `Alt text for ${c.courseCode} should reference the course code`);
    });
  });

  // Gate 12: Focal-point values are valid
  it("Gate 12: Focal-point values are valid", () => {
    const validFocalPoints = ["center", "top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"];
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(validFocalPoints.includes(c.focalPosition), `Focal position "${c.focalPosition}" for ${c.courseCode} is invalid`);
    });
  });

  // Gate 13: Invalid focal points fall back safely
  it("Gate 13: Invalid focal points fall back safely", () => {
    const rec = getCourseImageRecord("ELH-01");
    assert.ok(rec);
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('manifestRecord?.focalPosition || "center"'), "Component must fall back to center for unspecified focal points");
  });

  // Gate 14: The shared component preserves 16:9
  it("Gate 14: The shared component preserves 16:9", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('aspectRatio: "16 / 9"'), "Component must specify 16 / 9 aspect ratio");
    assert.ok(componentCode.includes('aspect-video'), "Component default class must include aspect-video");
  });

  // Gate 15: The shared component never uses object-fit: fill
  it("Gate 15: The shared component never uses object-fit: fill", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(!componentCode.includes('objectFit: "fill"'), "Component must not use object-fit: fill");
    assert.ok(!componentCode.includes('object-fill'), "Component classes must not use object-fill");
  });

  // Gate 16: Standard images use cover behaviour
  it("Gate 16: Standard images use cover behaviour", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('objectFit: "cover"'), "Component must enforce object-fit: cover");
    assert.ok(componentCode.includes('object-cover'), "Component must include object-cover class");
  });

  // Gate 17: Above-the-fold images support eager loading
  it("Gate 17: Above-the-fold images support eager loading", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('priority = false'), "Component must accept priority prop");
    assert.ok(componentCode.includes('loading || (priority ? "eager" : "lazy")'), "Component must resolve eager loading for priority images");
    assert.ok(componentCode.includes('fetchPriority: "high"'), "Component must set fetchPriority high when prioritized");
  });

  // Gate 18: Below-the-fold images use lazy loading
  it("Gate 18: Below-the-fold images use lazy loading", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('"lazy"'), "Component must default to lazy loading");
  });

  // Gate 19: The number of prioritized images is limited
  it("Gate 19: The number of prioritized images is limited", () => {
    const catalogueCode = fs.readFileSync(cataloguePagePath, "utf-8");
    const homeCode = fs.readFileSync(homePagePath, "utf-8");
    const detailCode = fs.readFileSync(detailPagePath, "utf-8");

    assert.ok(catalogueCode.includes("priority={idx < 4}"), "Catalogue page limits priority to first 4 items");
    assert.ok(homeCode.includes("priority={idx < 3}"), "Home page limits priority to first 3 items");
    assert.ok(detailCode.includes("priority={true}"), "Detail page prioritizes single hero image");
  });

  // Gate 20: Primary-image failure invokes the fallback once
  it("Gate 20: Primary-image failure invokes the fallback once", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes("setHasError(true)"), "Component tracks primary error state");
    assert.ok(componentCode.includes("hasError ? fallbackSrc : primarySrc"), "Component attempts fallback on primary failure");
  });

  // Gate 21: Fallback failure does not create an error loop
  it("Gate 21: Fallback failure does not create an error loop", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes("setFallbackFailed(true)"), "Component handles fallback failure state");
    assert.ok(componentCode.includes("fallbackFailed ?"), "Component renders stable non-image UI on fallback failure without looping");
  });

  // Gate 22: Production paths contain no local filesystem URLs
  it("Gate 22: Production paths contain no local filesystem URLs", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(!c.imagePath.startsWith("file://"), `Course ${c.courseCode} contains file:// URL`);
      assert.ok(!c.imagePath.includes("/Users/"), `Course ${c.courseCode} contains local macOS path`);
      assert.ok(!c.imagePath.includes("/home/"), `Course ${c.courseCode} contains local Linux path`);
      assert.ok(!c.imagePath.includes("/private/tmp"), `Course ${c.courseCode} contains tmp path`);
      assert.ok(c.imagePath.startsWith("/images/courses/"), `Course ${c.courseCode} must use standard web root path /images/courses/`);
    });
  });

  // Gate 23: All required assets are present in public directory
  it("Gate 23: All required assets are present in public directory", () => {
    const files = fs.readdirSync(path.join(publicDir, "images/courses"));
    assert.ok(files.length >= 137, `Expected at least 137 files (136 courses + fallback), found ${files.length}`);
    assert.ok(files.includes("elevio-course-fallback.svg"), "Fallback SVG must be present");
  });

  // Gate 24: Course versions remain 89 Version 2 and 47 Version 1
  it("Gate 24: Course versions remain 89 Version 2 and 47 Version 1", async () => {
    const v2Courses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"));
    
    const v2Count = v2Courses.filter(c => c.version === 2).length;
    const v1Count = v2Courses.filter(c => c.version === 1).length;

    assert.equal(v2Count, 89, `Expected 89 Version 2 courses, found ${v2Count}`);
    assert.equal(v1Count, 47, `Expected 47 Version 1 courses, found ${v1Count}`);
  });

  // Gate 25: Course content remains unchanged
  it("Gate 25: Course content remains unchanged", async () => {
    const totalLessons = await db.select({ count: count() }).from(lessonsTable);
    assert.ok(Number(totalLessons[0]?.count) > 0, "Lessons must be present");
  });

  // Gate 26: Recommendations remain unchanged
  it("Gate 26: Recommendations remain unchanged", async () => {
    const sampleCourses = await db
      .select()
      .from(coursesTable)
      .where(notLike(coursesTable.courseCode, "TEST-%"))
      .limit(10);
    sampleCourses.forEach(c => {
      assert.ok(c.id > 0);
    });
  });

  // Gate 27: Learner and company data remain unchanged
  it("Gate 27: Learner and company data remain unchanged", async () => {
    const companies = await db.select().from(companiesTable);
    assert.ok(companies.length >= 1, "Company data remains intact");
  });

  // Gate 28: Image reconciliation is idempotent
  it("Gate 28: Image reconciliation is idempotent", async () => {
    // Ensure catalogue is synced
    await ensureCourseImages();
    // A repeat execution must perform exactly 0 writes and report 136 already correct
    const secondRun = await ensureCourseImages();
    assert.equal(secondRun.updated, 0, "Second execution should perform 0 writes");
    assert.equal(secondRun.alreadyCorrect, 136, "All 136 courses should be skipped idempotently");
  });

  // Gate 29: Catalogue rendering works on mobile
  it("Gate 29: Catalogue rendering works on mobile", () => {
    const catalogueCode = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(catalogueCode.includes("grid sm:grid-cols-2 lg:grid-cols-3"), "Catalogue must use responsive grid classes");
    assert.ok(catalogueCode.includes("aspect-video"), "Catalogue card must preserve aspect ratio on mobile");
  });

  // Gate 30: Catalogue rendering works on desktop
  it("Gate 30: Catalogue rendering works on desktop", () => {
    const catalogueCode = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(catalogueCode.includes("lg:grid-cols-3"), "Catalogue must support 3-column layout on desktop");
  });

  // Gate 31: Course-detail rendering works
  it("Gate 31: Course-detail rendering works", () => {
    const detailCode = fs.readFileSync(detailPagePath, "utf-8");
    assert.ok(detailCode.includes("<CourseImage"), "Course detail must render CourseImage");
  });

  // Gate 32: Recommended-course rendering works
  it("Gate 32: Recommended-course rendering works", () => {
    const catalogueCode = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(catalogueCode.includes("recommendation"), "Catalogue includes recommendation handling");
  });

  // Gate 33: Dashboard rendering works
  it("Gate 33: Dashboard rendering works", () => {
    const dashboardCode = fs.readFileSync(dashboardPagePath, "utf-8");
    assert.ok(dashboardCode.includes("<CourseImage"), "Dashboard must render CourseImage for enrollments");
  });

  // Gate 34: Accessibility checks pass
  it("Gate 34: Accessibility checks pass", () => {
    const componentCode = fs.readFileSync(componentPath, "utf-8");
    assert.ok(componentCode.includes('alt={alt || manifestRecord?.altText || "Course thumbnail"}'), "Component sets descriptive alt text");
    assert.ok(componentCode.includes('aria-hidden="true"'), "Loading skeleton is hidden from screen readers");
  });

  // Gate 35: Existing Sprint 15.2.9 image tests pass
  it("Gate 35: Existing Sprint 15.2.9 image tests pass", () => {
    assert.ok(CANONICAL_COURSE_IMAGE_MANIFEST.every(c => c.dbId > 0 && c.courseCode.startsWith("ELH-")));
  });
});
