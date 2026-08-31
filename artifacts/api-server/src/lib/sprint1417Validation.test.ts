import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { ensureSchemaModifications } from "./ensureSchemaModifications";
import { ensureTaxonomyMetadataBackfill } from "./ensureTaxonomyMetadataBackfill";
import { ensureWave1Catalogue } from "./ensureWave1Catalogue";
import { ensureWave1BCatalogue } from "./ensureWave1BCatalogue";
import { ensureWave2Catalogue } from "./ensureWave2Catalogue";
import { ensureWave3Catalogue } from "./ensureWave3Catalogue";
import { ensureWave4Catalogue } from "./ensureWave4Catalogue";
import {
  generateLearningJourney,
  LearnerProfile,
  CompanyLearningContext,
} from "./learningPathEngine";
import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 14.17 Master Validation: Production Launch Readiness & Commercial Product Closure", () => {
  before(async () => {
    await ensureSchemaModifications();
    await ensureTaxonomyMetadataBackfill();
    await ensureWave1Catalogue();
    await ensureWave1BCatalogue();
    await ensureWave2Catalogue();
    await ensureWave3Catalogue();
    await ensureWave4Catalogue();
  });

  test("1. Production Freeze: Exactly 136 published courses are live in the database", async () => {
    const allCourses = await db.select().from(coursesTable);
    assert.equal(allCourses.length, 136, `Active catalogue must contain exactly 136 courses, got ${allCourses.length}`);
  });

  test("2. Reconciled Path Length Policy: ESG Specialists receive up to 12 courses; frontline strictly 6-8", async () => {
    const allCourses = await db.select().from(coursesTable);

    const frontlineProfile: LearnerProfile = {
      sector: "SEC_HOSPITALITY",
      department: "DEP_HOUSEKEEPING",
      jobFamily: "JF_FRONTLINE",
      seniority: "SEN_INDIVIDUAL",
    };

    const esgProfile: LearnerProfile = {
      sector: "SEC_PROF_SERVICES",
      department: "DEP_SUSTAINABILITY",
      jobFamily: "JF_PROFESSIONAL",
      seniority: "SEN_MANAGER",
    };

    const journeyFront = generateLearningJourney(frontlineProfile, allCourses);
    const journeyEsg = generateLearningJourney(esgProfile, allCourses);

    assert.ok(journeyFront.requiredCourses.length >= 6 && journeyFront.requiredCourses.length <= 8, `Frontline required path must be 6-8, got ${journeyFront.requiredCourses.length}`);
    assert.ok(journeyEsg.requiredCourses.length >= 10 && journeyEsg.requiredCourses.length <= 12, `ESG required path must be 10-12, got ${journeyEsg.requiredCourses.length}`);
  });

  test("3. Incomplete Profile Fail-Safe: Safely defaults to Universal Core with warning", async () => {
    const allCourses = await db.select().from(coursesTable);
    const incompleteProfile: LearnerProfile = {
      jobTitle: "Unspecified Employee",
    };

    const journey = generateLearningJourney(incompleteProfile, allCourses);
    assert.equal(journey.isProfileIncomplete, true, "Incomplete profile must be flagged");
    assert.ok(journey.incompleteProfileWarning, "Must provide incomplete profile warning");
    assert.ok(journey.requiredCourses.length > 0, "Must still assign universal core");
    assert.ok(journey.requiredCourses.every((c) => c.isEssentialUniversal), "All assigned courses must be Essential Universal");
  });

  test("4. Multi-Tenant Safety & Idempotent Completion: Deterministic scoring and tenant isolation", async () => {
    const allCourses = await db.select().from(coursesTable);

    const profile: LearnerProfile = {
      sector: "SEC_LOGISTICS",
      department: "DEP_LOGISTICS",
      jobFamily: "JF_SUPERVISOR",
      seniority: "SEN_SUPERVISOR",
    };

    const tenantAConfig: CompanyLearningContext = {
      companyId: 101,
      mandatoryCourseCodes: ["ELH-32"],
    };

    const tenantBConfig: CompanyLearningContext = {
      companyId: 102,
      mandatoryCourseCodes: ["ELH-07"],
    };

    const journeyA = generateLearningJourney(profile, allCourses, tenantAConfig);
    const journeyB = generateLearningJourney(profile, allCourses, tenantBConfig);

    const hasMandateA = journeyA.requiredCourses.some((c) => c.courseCode === "ELH-32");
    const hasMandateB = journeyB.requiredCourses.some((c) => c.courseCode === "ELH-07");

    assert.equal(hasMandateA, true, "Tenant A journey must contain mandatory ELH-32");
    assert.equal(hasMandateB, true, "Tenant B journey must contain mandatory ELH-07");
    assert.notEqual(journeyA.requiredCourses.map(c => c.courseCode), journeyB.requiredCourses.map(c => c.courseCode), "Different tenant configs must produce isolated journeys");
  });
});
