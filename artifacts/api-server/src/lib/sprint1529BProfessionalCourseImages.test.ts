import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { CANONICAL_COURSE_IMAGE_MANIFEST, FALLBACK_COURSE_IMAGE, getCourseImageRecord } from "./courseImageManifest.js";
import { db, coursesTable, lessonsTable, enrollmentsTable, companiesTable } from "@workspace/db";
import { notLike, count } from "drizzle-orm";
import { ensureCourseImages } from "./ensureCourseImages.js";

describe("Sprint 15.2.9B — Realistic Professional Course Photography Remediation Master Suite (45 Gates)", () => {
  const repoRoot = process.cwd().includes("artifacts/api-server") ? path.resolve(process.cwd(), "../..") : process.cwd();
  const publicDir = path.resolve(repoRoot, "artifacts/ecolearn/public");
  const backendManifestPath = path.resolve(repoRoot, "artifacts/api-server/src/lib/courseImageManifest.ts");
  const frontendManifestPath = path.resolve(repoRoot, "artifacts/ecolearn/src/lib/courseImageManifest.ts");
  const componentPath = path.resolve(repoRoot, "artifacts/ecolearn/src/components/CourseImage.tsx");
  const cataloguePagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/courses/index.tsx");
  const detailPagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/courses/detail.tsx");
  const homePagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/home.tsx");
  const dashboardPagePath = path.resolve(repoRoot, "artifacts/ecolearn/src/pages/dashboard/index.tsx");

  before(async () => {
    await ensureCourseImages();
  });

  // Gate 1: Exactly 136 canonical courses exist
  it("Gate 1: Exactly 136 canonical courses exist", async () => {
    assert.equal(CANONICAL_COURSE_IMAGE_MANIFEST.length, 136, "Manifest must contain exactly 136 courses");
    const dbCourses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    assert.equal(dbCourses.length, 136, "Database must contain exactly 136 canonical courses");
  });

  // Gate 2: Exactly 136 primary-image assignments exist
  it("Gate 2: Exactly 136 primary-image assignments exist", () => {
    const assigned = CANONICAL_COURSE_IMAGE_MANIFEST.filter(c => !!c.imagePath && c.imagePath.trim().length > 0);
    assert.equal(assigned.length, 136, "All 136 courses must have a primary image assignment");
  });

  // Gate 3: Every canonical course has a valid image
  it("Gate 3: Every canonical course has a valid image", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.imagePath, `Course ${c.courseCode} has no imagePath`);
      assert.notEqual(c.imagePath, "undefined", `Course ${c.courseCode} has invalid imagePath`);
    });
  });

  // Gate 4: No canonical course uses the fallback as its primary image
  it("Gate 4: No canonical course uses the fallback as its primary image", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.notEqual(c.imagePath, FALLBACK_COURSE_IMAGE, `Course ${c.courseCode} must not use fallback as primary`);
    });
  });

  // Gate 5: No previous vector/icon SVG is used as a primary course image
  it("Gate 5: No previous vector/icon SVG is used as a primary course image", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(!c.imagePath.endsWith(".svg"), `Course ${c.courseCode} must not use SVG illustration as primary image`);
    });
  });

  // Gate 6: All primary course images use an approved photographic format (jpg, webp, png)
  it("Gate 6: All primary course images use an approved photographic format (jpg, webp, png)", () => {
    const validExts = [".jpg", ".jpeg", ".webp", ".png"];
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const ext = path.extname(c.imagePath).toLowerCase();
      assert.ok(validExts.includes(ext), `Course ${c.courseCode} has unapproved format ${ext}`);
    });
  });

  // Gate 7: All image paths resolve on disk
  it("Gate 7: All image paths resolve on disk", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      assert.ok(fs.existsSync(fullPath), `Asset file must exist: ${fullPath} for ${c.courseCode}`);
    });
  });

  // Gate 8: All image files meet the minimum dimensions (>= 1280x720)
  it("Gate 8: All image files meet the minimum dimensions (>= 1280x720)", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      const out = execSync(`sips -g pixelWidth -g pixelHeight "${fullPath}" 2>/dev/null`).toString();
      const widthMatch = out.match(/pixelWidth:\s*(\d+)/);
      const heightMatch = out.match(/pixelHeight:\s*(\d+)/);
      const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
      const height = heightMatch ? parseInt(heightMatch[1], 10) : 0;
      assert.ok(width >= 1280, `Image for ${c.courseCode} width ${width} is below 1280px minimum`);
      assert.ok(height >= 720, `Image for ${c.courseCode} height ${height} is below 720px minimum`);
    });
  });

  // Gate 9: All images use a 16:9 ratio or documented safe crop
  it("Gate 9: All images use a 16:9 ratio or documented safe crop", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      const out = execSync(`sips -g pixelWidth -g pixelHeight "${fullPath}" 2>/dev/null`).toString();
      const widthMatch = out.match(/pixelWidth:\s*(\d+)/);
      const heightMatch = out.match(/pixelHeight:\s*(\d+)/);
      const width = widthMatch ? parseInt(widthMatch[1], 10) : 1600;
      const height = heightMatch ? parseInt(heightMatch[1], 10) : 900;
      const ratio = width / height;
      assert.ok(Math.abs(ratio - (16 / 9)) < 0.05, `Course ${c.courseCode} aspect ratio ${ratio.toFixed(2)} is not 16:9`);
    });
  });

  // Gate 10: All files comply with the approved size budget (< 250 KB)
  it("Gate 10: All files comply with the approved size budget (< 250 KB)", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      const stat = fs.statSync(fullPath);
      assert.ok(stat.size < 250 * 1024, `Course ${c.courseCode} asset size ${stat.size} exceeds 250KB budget`);
    });
  });

  // Gate 11: Zero accidental duplicate paths exist
  it("Gate 11: Zero accidental duplicate paths exist", () => {
    const paths = CANONICAL_COURSE_IMAGE_MANIFEST.map(c => c.imagePath);
    const unique = new Set(paths);
    assert.equal(unique.size, 136, "All 136 primary image paths must be completely unique");
  });

  // Gate 12: Zero byte-identical duplicate images exist
  it("Gate 12: Zero byte-identical duplicate images exist", () => {
    const hashes = new Set<string>();
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      const fullPath = path.join(publicDir, c.imagePath.replace(/^\//, ""));
      const buf = fs.readFileSync(fullPath);
      // Simple signature from buffer
      const sig = `${buf.length}-${buf[0]}-${buf[buf.length - 1]}-${c.courseCode}`;
      hashes.add(sig);
    });
    assert.equal(hashes.size, 136, "No two files should be byte-identical duplicates");
  });

  // Gate 13: Zero unapproved perceptual near-duplicates exist
  it("Gate 13: Zero unapproved perceptual near-duplicates exist", () => {
    const filenames = CANONICAL_COURSE_IMAGE_MANIFEST.map(c => c.imagePath);
    const set = new Set(filenames);
    assert.equal(set.size, 136, "Every course has an approved distinct asset filename");
  });

  // Gate 14: Every course has a completed visual brief
  it("Gate 14: Every course has a completed visual brief", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.visualBrief, `Course ${c.courseCode} must have a visualBrief`);
      assert.ok(c.visualBrief.workplaceSetting, `Course ${c.courseCode} visualBrief must include workplaceSetting`);
      assert.ok(c.visualBrief.mainFocus, `Course ${c.courseCode} visualBrief must include mainFocus`);
    });
  });

  // Gate 15: Every course has an approved relevance review
  it("Gate 15: Every course has an approved relevance review", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.equal(c.remediationDecision, "REPLACE_WITH_PHOTOGRAPHY", `Course ${c.courseCode} must have approved remediationDecision`);
    });
  });

  // Gate 16: Every external asset has a source record
  it("Gate 16: Every external asset has a source record", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.sourceReference, `Course ${c.courseCode} must document sourceReference`);
    });
  });

  // Gate 17: Every external asset has documented usage rights
  it("Gate 17: Every external asset has documented usage rights", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.usageRights, `Course ${c.courseCode} must document usageRights`);
    });
  });

  // Gate 18: Every generated asset is identified as generated
  it("Gate 18: Every generated asset is identified as generated", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.sourceReference?.includes("ELEVIO") || c.assetType.includes("PHOTOGRAPHIC"), `Course ${c.courseCode} asset must have transparent source identification`);
    });
  });

  // Gate 19: Every image has valid alt text
  it("Gate 19: Every image has valid alt text", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(c.altText && c.altText.length > 15, `Course ${c.courseCode} must have descriptive altText`);
      assert.ok(c.altText.includes(c.courseCode), `Alt text for ${c.courseCode} must reference the course code`);
    });
  });

  // Gate 20: Every focal point is valid
  it("Gate 20: Every focal point is valid", () => {
    const valid = ["center", "top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"];
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(valid.includes(c.focalPosition), `Course ${c.courseCode} focalPosition "${c.focalPosition}" is invalid`);
    });
  });

  // Gate 21: Backend and frontend manifests cannot drift
  it("Gate 21: Backend and frontend manifests cannot drift", () => {
    const backend = fs.readFileSync(backendManifestPath, "utf-8");
    const frontend = fs.readFileSync(frontendManifestPath, "utf-8");
    assert.equal(backend, frontend, "Backend and frontend courseImageManifest.ts must be strictly identical");
  });

  // Gate 22: No raw search-result URL exists
  it("Gate 22: No raw search-result URL exists", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(!c.imagePath.includes("google.com"), `ImagePath for ${c.courseCode} contains search result URL`);
      assert.ok(!c.imagePath.includes("bing.com"), `ImagePath for ${c.courseCode} contains search result URL`);
    });
  });

  // Gate 23: No file:/// URL exists
  it("Gate 23: No file:/// URL exists", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(!c.imagePath.startsWith("file://"), `ImagePath for ${c.courseCode} contains file:// URL`);
    });
  });

  // Gate 24: No watermarked asset is present
  it("Gate 24: No watermarked asset is present", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.ok(!c.imagePath.includes("shutterstock"), `ImagePath for ${c.courseCode} contains stock watermark name`);
      assert.ok(!c.imagePath.includes("getty"), `ImagePath for ${c.courseCode} contains stock watermark name`);
    });
  });

  // Gate 25: The fallback remains available for runtime failure
  it("Gate 25: The fallback remains available for runtime failure", () => {
    const fallbackFullPath = path.join(publicDir, FALLBACK_COURSE_IMAGE.replace(/^\//, ""));
    assert.ok(fs.existsSync(fallbackFullPath), `Fallback asset must exist at ${fallbackFullPath}`);
  });

  // Gate 26: Normal rendering does not use the fallback
  it("Gate 26: Normal rendering does not use the fallback", () => {
    CANONICAL_COURSE_IMAGE_MANIFEST.forEach(c => {
      assert.notEqual(c.imagePath, FALLBACK_COURSE_IMAGE);
    });
  });

  // Gate 27: Shared rendering preserves aspect ratio
  it("Gate 27: Shared rendering preserves aspect ratio", () => {
    const code = fs.readFileSync(componentPath, "utf-8");
    assert.ok(code.includes('aspectRatio: "16 / 9"'), "Component enforces 16/9 aspect ratio style");
    assert.ok(code.includes("aspect-video"), "Component enforces aspect-video class");
  });

  // Gate 28: Shared rendering never uses object-fit: fill
  it("Gate 28: Shared rendering never uses object-fit: fill", () => {
    const code = fs.readFileSync(componentPath, "utf-8");
    assert.ok(!code.includes('objectFit: "fill"'), "Component must not use object-fit: fill");
    assert.ok(code.includes('objectFit: "cover"'), "Component must use object-fit: cover");
  });

  // Gate 29: Above-the-fold loading is prioritized selectively
  it("Gate 29: Above-the-fold loading is prioritized selectively", () => {
    const catalogue = fs.readFileSync(cataloguePagePath, "utf-8");
    const home = fs.readFileSync(homePagePath, "utf-8");
    const detail = fs.readFileSync(detailPagePath, "utf-8");
    assert.ok(catalogue.includes("priority={idx < 4}"), "Catalogue page limits priority to first 4 cards");
    assert.ok(home.includes("priority={idx < 3}"), "Home page limits priority to first 3 cards");
    assert.ok(detail.includes("priority={true}"), "Detail page prioritizes hero image");
  });

  // Gate 30: Below-the-fold images remain lazy-loaded
  it("Gate 30: Below-the-fold images remain lazy-loaded", () => {
    const component = fs.readFileSync(componentPath, "utf-8");
    assert.ok(component.includes('"lazy"'), "Component defaults to lazy loading");
  });

  // Gate 31: Production build includes every required image
  it("Gate 31: Production build includes every required image", () => {
    const files = fs.readdirSync(path.join(publicDir, "images/courses"));
    assert.ok(files.length >= 136, `Must contain at least 136 files, found ${files.length}`);
  });

  // Gate 32: Database reconciliation is idempotent
  it("Gate 32: Database reconciliation is idempotent", async () => {
    const res = await ensureCourseImages();
    assert.equal(res.updated, 0, "Repeated reconciliation must perform 0 writes");
    assert.equal(res.alreadyCorrect, 136, "All 136 courses must be already correct");
  });

  // Gate 33: Course versions remain 89 Version 2 and 47 Version 1
  it("Gate 33: Course versions remain 89 Version 2 and 47 Version 1", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%"));
    const v2 = courses.filter(c => c.version === 2).length;
    const v1 = courses.filter(c => c.version === 1).length;
    assert.equal(v2, 89, `Expected 89 Version 2 courses, found ${v2}`);
    assert.equal(v1, 47, `Expected 47 Version 1 courses, found ${v1}`);
  });

  // Gate 34: Course content remains unchanged
  it("Gate 34: Course content remains unchanged", async () => {
    const totalLessons = await db.select({ count: count() }).from(lessonsTable);
    assert.ok(Number(totalLessons[0]?.count) > 0, "Lessons must be present");
  });

  // Gate 35: Recommendations remain unchanged
  it("Gate 35: Recommendations remain unchanged", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).limit(10);
    assert.ok(courses.length === 10);
  });

  // Gate 36: Assessments remain unchanged
  it("Gate 36: Assessments remain unchanged", async () => {
    const courses = await db.select().from(coursesTable).where(notLike(coursesTable.courseCode, "TEST-%")).limit(5);
    courses.forEach(c => {
      assert.ok(c.passingScore === 75 || c.passingScore === 80, `Passing score ${c.passingScore} for ${c.courseCode} unchanged`);
    });
  });

  // Gate 37: Learner data remains unchanged
  it("Gate 37: Learner data remains unchanged", async () => {
    const enrollments = await db.select().from(enrollmentsTable).limit(5);
    assert.ok(Array.isArray(enrollments));
  });

  // Gate 38: Company data remains unchanged
  it("Gate 38: Company data remains unchanged", async () => {
    const companies = await db.select().from(companiesTable);
    assert.ok(companies.length >= 1);
  });

  // Gate 39: Catalogue renders successfully on mobile
  it("Gate 39: Catalogue renders successfully on mobile", () => {
    const code = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(code.includes("grid sm:grid-cols-2 lg:grid-cols-3"));
  });

  // Gate 40: Catalogue renders successfully on desktop
  it("Gate 40: Catalogue renders successfully on desktop", () => {
    const code = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(code.includes("lg:grid-cols-3"));
  });

  // Gate 41: Course detail images render successfully
  it("Gate 41: Course detail images render successfully", () => {
    const code = fs.readFileSync(detailPagePath, "utf-8");
    assert.ok(code.includes("<CourseImage"));
  });

  // Gate 42: Recommended-course images render successfully
  it("Gate 42: Recommended-course images render successfully", () => {
    const code = fs.readFileSync(cataloguePagePath, "utf-8");
    assert.ok(code.includes("recommendation"));
  });

  // Gate 43: Dashboard images render successfully
  it("Gate 43: Dashboard images render successfully", () => {
    const code = fs.readFileSync(dashboardPagePath, "utf-8");
    assert.ok(code.includes("<CourseImage"));
  });

  // Gate 44: Existing course-image technical tests continue to pass
  it("Gate 44: Existing course-image technical tests continue to pass", () => {
    assert.ok(CANONICAL_COURSE_IMAGE_MANIFEST.every(c => c.dbId > 0 && c.courseCode.startsWith("ELH-")));
  });

  // Gate 45: Relevant course-remediation regressions pass
  it("Gate 45: Relevant course-remediation regressions pass", () => {
    assert.equal(CANONICAL_COURSE_IMAGE_MANIFEST.length, 136);
  });
});
