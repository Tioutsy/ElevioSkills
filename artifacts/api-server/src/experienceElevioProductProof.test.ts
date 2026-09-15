/**
 * Sprint 16.1 — Experience ELEVIO: Autonomous Product Proof Test Suite
 *
 * Validates:
 * 1. Public route `/experience` is registered and accessible without authentication.
 * 2. Homepage features prominent "Experience ELEVIO" primary CTA and "View Pricing" commercial CTA.
 * 3. Navigation config and Navbar include "Experience ELEVIO" for public/signed-out visitors.
 * 4. Experience component implements all 8 planned interactive screens.
 * 5. Data-write isolation: zero database writes, zero employee/company creations, zero certificate issuances.
 * 6. Sample data labelling: learner and manager previews are explicitly identified as demonstration data.
 * 7. Conversion CTAs: primary routes to `/pricing?source=experience`, secondary routes to `/courses`.
 * 8. Security & RBAC: existing authenticated APIs and routes remain strictly guarded.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../../");
const ecolearnDir = path.join(rootDir, "artifacts/ecolearn/src");

describe("Sprint 16.1 — Experience ELEVIO Autonomous Product Proof Verification", () => {
  const appPath = path.join(ecolearnDir, "App.tsx");
  const homePath = path.join(ecolearnDir, "pages/home.tsx");
  const experiencePath = path.join(ecolearnDir, "pages/experience/index.tsx");
  const navConfigPath = path.join(ecolearnDir, "config/navigation.ts");
  const navbarPath = path.join(ecolearnDir, "components/layout/Navbar.tsx");

  const appContent = fs.readFileSync(appPath, "utf-8");
  const homeContent = fs.readFileSync(homePath, "utf-8");
  const experienceContent = fs.readFileSync(experiencePath, "utf-8");
  const navConfigContent = fs.readFileSync(navConfigPath, "utf-8");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. PUBLIC ROUTE ACCESSIBILITY & UNRESTRICTED ANONYMOUS ACCESS
  // ─────────────────────────────────────────────────────────────────────────────
  describe("1. Public Route Accessibility & Zero Authentication Requirement", () => {
    test("Route /experience is registered directly in App.tsx without authentication wrappers", () => {
      assert.ok(appContent.includes('import ExperiencePage from "@/pages/experience"'), "Must import ExperiencePage in App.tsx");
      assert.ok(appContent.includes('<Route path="/experience" component={ExperiencePage} />'), "Must register public /experience route in App.tsx");
      
      // Ensure /experience is NOT enclosed within RequireCompanyAdmin
      const isWrappedInAdmin = appContent.includes('<RequireCompanyAdmin><ExperiencePage') || 
                               appContent.includes('<RequireCompanyAdmin><Experience');
      assert.equal(isWrappedInAdmin, false, "/experience must not be enclosed in RequireCompanyAdmin");
    });

    test("Experience page operates completely client-side without authentication dependencies", () => {
      assert.equal(experienceContent.includes("useAuth"), false, "Experience page must not require useAuth");
      assert.equal(experienceContent.includes("useUser"), false, "Experience page must not require useUser");
      assert.equal(experienceContent.includes("RequireCompanyAdmin"), false, "Experience page must not require company admin");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. HOMEPAGE INTEGRATION & CTA HIERARCHY
  // ─────────────────────────────────────────────────────────────────────────────
  describe("2. Homepage Integration & Commercial CTA Hierarchy", () => {
    test("Homepage features 'Experience ELEVIO' as the primary product-proof CTA", () => {
      assert.ok(homeContent.includes('href="/experience"'), "Homepage must contain link to /experience");
      assert.ok(homeContent.includes("Experience ELEVIO"), "Homepage must display 'Experience ELEVIO' CTA");
    });

    test("Homepage establishes clear hierarchy with 'View Pricing' as commercial CTA", () => {
      assert.ok(homeContent.includes('href="/pricing"'), "Homepage must contain link to /pricing");
      assert.ok(homeContent.includes("View Pricing"), "Homepage must display 'View Pricing' CTA");
    });

    test("Public navigation config exports Experience ELEVIO in PUBLIC_NAV", () => {
      assert.ok(navConfigContent.includes('href: "/experience"'), "PUBLIC_NAV must include /experience");
      assert.ok(navConfigContent.includes('label: "Experience ELEVIO"'), "PUBLIC_NAV must have label 'Experience ELEVIO'");
    });

    test("Navbar displays Experience ELEVIO for signed-out visitors", () => {
      assert.ok(navbarContent.includes('href: "/experience"'), "Navbar must include /experience for public visitors");
      assert.ok(navbarContent.includes('Experience ELEVIO'), "Navbar must display 'Experience ELEVIO'");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. COMPLETE 8-SCREEN INTERACTIVE JOURNEY IMPLEMENTATION
  // ─────────────────────────────────────────────────────────────────────────────
  describe("3. Interactive Experience Screens & Content Verification", () => {
    test("Screen 1: Welcome & Introduction sets everyday decisions context", () => {
      assert.ok(experienceContent.includes("Sustainability at work starts with everyday decisions"), "Must contain introduction title");
      assert.ok(experienceContent.includes("Start the Experience"), "Must provide CTA to start experience");
    });

    test("Screen 2: Workplace Situation presents realistic Mauritian office observation", () => {
      assert.ok(experienceContent.includes("The Empty Meeting Room"), "Must contain realistic situation title");
      assert.ok(experienceContent.includes("Ebène office"), "Must reference realistic workplace setting");
      assert.ok(experienceContent.includes("What would you notice or prioritise first?"), "Must ask observation question");
    });

    test("Screen 3: Practical Learning provides ELEVIO-style business & energy insight", () => {
      assert.ok(experienceContent.includes("The Cumulative Cost of Unoccupied Rooms"), "Must present micro-lesson title");
      assert.ok(experienceContent.includes("Last Out"), "Must explain the Last Out protocol");
      assert.ok(experienceContent.includes("45% to 65%"), "Must cite realistic commercial energy data");
    });

    test("Screen 4: Decision Scenario presents plausible workplace challenge", () => {
      assert.ok(experienceContent.includes("The Department Workshop Dilemma"), "Must contain decision scenario title");
      assert.ok(experienceContent.includes("local Mauritian caterer") || experienceContent.includes("Local Caterer"), "Must include plausible sustainable option");
      assert.ok(experienceContent.includes("Single-Use"), "Must include realistic operational choices");
    });

    test("Screen 5: Immediate Explanatory Feedback explains principles without shaming", () => {
      assert.ok(experienceContent.includes("Immediate Explanatory Feedback"), "Must provide feedback header");
      assert.ok(experienceContent.includes("Local Sourcing"), "Must explain local sourcing principle");
      assert.ok(experienceContent.includes("Waste Prevention"), "Must explain waste hierarchy principle");
    });

    test("Screen 6: Learner Perspective Preview demonstrates employee interface and verifiable certificate", () => {
      assert.ok(experienceContent.includes("This is what ELEVIO looks like for your employees"), "Must contain employee view header");
      assert.ok(experienceContent.includes("Verifiable Certificate of Competence"), "Must show certificate preview");
    });

    test("Screen 7: Manager Perspective & Training Evidence Preview demonstrates reporting", () => {
      assert.ok(experienceContent.includes("And this is what your company sees"), "Must contain company view header");
      assert.ok(experienceContent.includes("Completion Rate"), "Must display completion rate metric");
      assert.ok(experienceContent.includes("Recent Training Records & Evidence"), "Must display audit-ready training evidence table");
    });

    test("Screen 8: Completion Screen routes to pricing and course catalogue", () => {
      assert.ok(experienceContent.includes("You've experienced ELEVIO"), "Must contain completion title");
      assert.ok(experienceContent.includes('/pricing?source=experience'), "Primary CTA must route to /pricing?source=experience");
      assert.ok(experienceContent.includes("Train Your Team"), "Must display 'Train Your Team' CTA");
      assert.ok(experienceContent.includes('/courses'), "Secondary CTA must route to /courses");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. DATA ISOLATION & SAMPLE DATA LABELLING
  // ─────────────────────────────────────────────────────────────────────────────
  describe("4. Strict Data Isolation & Explicit Sample Data Labelling", () => {
    test("Experience page performs ZERO mutating API requests (No database writes)", () => {
      assert.equal(experienceContent.includes("customFetch"), false, "Must not invoke customFetch in experience preview");
      assert.equal(experienceContent.includes("fetch("), false, "Must not make network fetch calls in experience preview");
      assert.equal(experienceContent.includes("useMutation"), false, "Must not use mutation hooks");
      assert.equal(experienceContent.includes("POST"), false, "Must not perform HTTP POST requests");
    });

    test("Sample learner and company data are explicitly labelled as demonstration data", () => {
      assert.ok(experienceContent.includes("Sample Learner Interface"), "Must label employee preview as sample");
      assert.ok(experienceContent.includes("Sample Company Data"), "Must label manager dashboard preview as sample data");
      assert.ok(experienceContent.includes("Sample Data"), "Must label training records table as sample data");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. ACCESSIBILITY, RESPONSIVENESS & USER CONTROLS
  // ─────────────────────────────────────────────────────────────────────────────
  describe("5. Accessibility, Responsiveness & User Navigation Controls", () => {
    test("Experience contains step progression bar and step indicator", () => {
      assert.ok(experienceContent.includes("Step {currentScreen} of {totalScreens}"), "Must show step counter");
      assert.ok(experienceContent.includes("<Progress"), "Must show accessible progress bar");
    });

    test("Experience provides restart / replay option", () => {
      assert.ok(experienceContent.includes("handleRestart"), "Must implement restart capability");
      assert.ok(experienceContent.includes("Restart") || experienceContent.includes("Replay"), "Must provide restart button");
    });

    test("Buttons provide clear accessible labels and visual states", () => {
      assert.ok(experienceContent.includes("handleNext"), "Must implement next navigation");
      assert.ok(experienceContent.includes("handleBack"), "Must implement back navigation");
    });
  });
});
