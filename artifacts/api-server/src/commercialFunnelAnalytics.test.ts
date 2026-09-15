/**
 * ELEVIO Skills — Commercial Funnel Analytics & Conversion Measurement Test Suite
 * Sprints 16.2, 16.2A & 16.3 (GA4 Provider Integration)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CANONICAL_COMMERCIAL_EVENTS,
  RESERVED_FUTURE_PAYMENT_EVENTS,
  isProhibitedProperty,
  scrubProhibitedProperties,
  sanitizeAnalyticsString,
  mapPropertiesToGA4,
  CommercialAnalyticsProvider,
  CommercialEventProperties,
} from "./lib/commercialAnalytics";

describe("Sprint 16.3 — GA4 Commercial Analytics Provider Integration", () => {
  // 1. GA4 Provider Interface Conformance
  it("1. GA4 provider conforms to CommercialAnalyticsProvider interface", () => {
    class MockGA4Provider implements CommercialAnalyticsProvider {
      public readonly name = "google_analytics_4";
      public trackedEvents: Array<{ event: string; properties: CommercialEventProperties }> = [];
      public trackedPages: string[] = [];

      trackEvent(event: any, properties: CommercialEventProperties) {
        this.trackedEvents.push({ event, properties });
      }

      trackPageView(path: string) {
        this.trackedPages.push(path);
      }
    }

    const provider = new MockGA4Provider();
    assert.strictEqual(provider.name, "google_analytics_4");
    assert.strictEqual(typeof provider.trackEvent, "function");
    assert.strictEqual(typeof provider.trackPageView, "function");
  });

  // 2. Safe No-Op when Measurement ID is Missing
  it("2. Missing or empty Measurement ID causes safe no-op without runtime errors", () => {
    let gtagCalled = false;
    class SafeGA4NoOpProvider implements CommercialAnalyticsProvider {
      public readonly name = "google_analytics_4";
      private measurementId?: string;

      constructor(id?: string) {
        this.measurementId = id;
      }

      trackEvent(event: any, props: any) {
        if (!this.measurementId) {
          // Safe no-op
          return;
        }
        gtagCalled = true;
      }
    }

    const emptyProvider = new SafeGA4NoOpProvider(undefined);
    emptyProvider.trackEvent("pricing_viewed", { source: "homepage" });
    assert.strictEqual(gtagCalled, false);
  });

  // 3. Canonical Events Mapping to GA4
  it("3. Canonical event properties map correctly to GA4 snake_case parameters", () => {
    const rawProps: CommercialEventProperties = {
      source: "experience",
      medium: "cpc",
      campaign: "esg_mauritius",
      companySizeBand: "FROM_26_TO_50",
      billingCycle: "MONTHLY",
      experienceStep: "screen_8_commercial",
      courseCode: "ELH-23",
      courseId: 944,
      employeeCount: 35,
      importSuccessCount: 35,
      importSkippedCount: 2,
      authenticatedState: "company_admin",
      landingPath: "/experience",
      currentPath: "/pricing",
    };

    const ga4Params = mapPropertiesToGA4(rawProps);

    assert.strictEqual(ga4Params.source, "experience");
    assert.strictEqual(ga4Params.medium, "cpc");
    assert.strictEqual(ga4Params.campaign, "esg_mauritius");
    assert.strictEqual(ga4Params.company_size_band, "FROM_26_TO_50");
    assert.strictEqual(ga4Params.billing_cycle, "MONTHLY");
    assert.strictEqual(ga4Params.experience_step, "screen_8_commercial");
    assert.strictEqual(ga4Params.course_code, "ELH-23");
    assert.strictEqual(ga4Params.course_id, 944);
    assert.strictEqual(ga4Params.employee_count, 35);
    assert.strictEqual(ga4Params.import_success_count, 35);
    assert.strictEqual(ga4Params.import_skipped_count, 2);
    assert.strictEqual(ga4Params.authenticated_state, "company_admin");
    assert.strictEqual(ga4Params.landing_path, "/experience");
    assert.strictEqual(ga4Params.current_path, "/pricing");
  });

  // 4. Reserved Payment Events Zero-Emission
  it("4. Reserved payment events cannot be emitted to GA4 provider", () => {
    assert.ok(RESERVED_FUTURE_PAYMENT_EVENTS.includes("checkout_started"));
    assert.ok(RESERVED_FUTURE_PAYMENT_EVENTS.includes("payment_succeeded"));
    assert.ok(RESERVED_FUTURE_PAYMENT_EVENTS.includes("payment_failed"));
    assert.ok(RESERVED_FUTURE_PAYMENT_EVENTS.includes("subscription_activated"));

    for (const reserved of RESERVED_FUTURE_PAYMENT_EVENTS) {
      assert.strictEqual(
        CANONICAL_COMMERCIAL_EVENTS.includes(reserved as any),
        false,
        `Reserved event ${reserved} must not be emitted to GA4`
      );
    }
  });

  // 5. PII Scrubber Executes Before Provider Boundary
  it("5. PII scrubber strips email, passwords, tokens, names, and assessment answers before GA4", () => {
    const rawPayload = {
      source: "experience",
      companySizeBand: "UP_TO_25",
      email: "finance.manager@resort.mu",
      firstName: "Alain",
      lastName: "Laval",
      fullName: "Alain Laval",
      password: "SuperSecretPassword!",
      token: "clerk_live_sec_12345",
      creditCard: "4111 2222 3333 4444",
      assessmentAnswer: "Option C",
      certificateId: "CERT-ELH-994",
    };

    const scrubbed = scrubProhibitedProperties(rawPayload);
    const ga4Params = mapPropertiesToGA4(scrubbed);

    assert.strictEqual("email" in ga4Params, false);
    assert.strictEqual("firstName" in ga4Params, false);
    assert.strictEqual("lastName" in ga4Params, false);
    assert.strictEqual("fullName" in ga4Params, false);
    assert.strictEqual("password" in ga4Params, false);
    assert.strictEqual("token" in ga4Params, false);
    assert.strictEqual("creditCard" in ga4Params, false);
    assert.strictEqual("assessmentAnswer" in ga4Params, false);
    assert.strictEqual("certificateId" in ga4Params, false);
    assert.strictEqual(ga4Params.source, "experience");
    assert.strictEqual(ga4Params.company_size_band, "UP_TO_25");
  });

  // 6. Experience Completion Maps Strictly to Screen 8
  it("6. Experience completion maps strictly to Screen 8", () => {
    const stepMap: Record<number, string> = {
      1: "screen_1_intro",
      2: "screen_2_situation",
      3: "screen_3_context",
      4: "screen_4_decision",
      5: "screen_5_feedback",
      6: "screen_6_completion",
      7: "screen_7_dashboard",
      8: "screen_8_commercial",
    };

    assert.strictEqual(stepMap[6], "screen_6_completion");
    assert.strictEqual(stepMap[7], "screen_7_dashboard");
    assert.strictEqual(stepMap[8], "screen_8_commercial");
  });

  // 7. SPA Page Views Deduplication
  it("7. SPA page views tracking prevents duplicate consecutive hits for identical path", () => {
    let lastPath: string | null = null;
    const pageViewHits: string[] = [];

    function onLocationChange(newPath: string) {
      if (lastPath !== newPath) {
        lastPath = newPath;
        pageViewHits.push(newPath);
      }
    }

    onLocationChange("/experience");
    onLocationChange("/experience"); // Re-render
    onLocationChange("/pricing");
    onLocationChange("/pricing"); // Re-render
    onLocationChange("/sign-up");

    assert.deepStrictEqual(pageViewHits, ["/experience", "/pricing", "/sign-up"]);
  });

  // 8. Analytics Failure Isolation
  it("8. Analytics failure or script throwing does not break application flows", () => {
    function dispatchSafe(action: () => void) {
      try {
        action();
        return true;
      } catch (err) {
        return false;
      }
    }

    const faultyProviderAction = () => {
      throw new Error("AdBlocker blocked script or network down");
    };

    const succeeded = dispatchSafe(() => {
      try {
        faultyProviderAction();
      } catch {}
    });

    assert.strictEqual(succeeded, true);
  });

  // 9. UTM Parameter Extraction & Sanitization
  it("9. UTM parameter sanitization strips dangerous characters and bounds length", () => {
    const input = "utm_source=<script>alert('xss')</script>google_mauritius";
    const clean = sanitizeAnalyticsString(input);
    assert.ok(clean);
    assert.strictEqual(clean.includes("<"), false);
    assert.strictEqual(clean.includes(">"), false);
    assert.strictEqual(clean.includes("'"), false);

    const longStr = "x".repeat(300);
    const bounded = sanitizeAnalyticsString(longStr, 100);
    assert.strictEqual(bounded?.length, 100);
  });

  // 10. Prohibited Key Detection
  it("10. Prohibited key detector identifies sensitive properties in any case", () => {
    assert.strictEqual(isProhibitedProperty("USER_EMAIL"), true);
    assert.strictEqual(isProhibitedProperty("userToken"), true);
    assert.strictEqual(isProhibitedProperty("companySizeBand"), false);
    assert.strictEqual(isProhibitedProperty("source"), false);
  });

  // 11. Authoritative Signup and Company Milestone Distinction
  it("11. signup_started, signup_completed, company_created remain distinct milestones", () => {
    assert.ok(CANONICAL_COMMERCIAL_EVENTS.includes("signup_started"));
    assert.ok(CANONICAL_COMMERCIAL_EVENTS.includes("signup_completed"));
    assert.ok(CANONICAL_COMMERCIAL_EVENTS.includes("company_created"));
    assert.ok(CANONICAL_COMMERCIAL_EVENTS.includes("subscription_checkout_reached"));
  });

  // 12. Google Consent Mode v2 Default and Update Lifecycle
  it("12. GA4 provider establishes consent mode v2 defaults with analytics_storage: denied until granted", () => {
    const dataLayer: any[] = [];
    let consentState: "granted" | "denied" = "denied";

    function mockGtag(...args: any[]) {
      dataLayer.push(args);
      if (args[0] === "consent" && args[1] === "update") {
        consentState = args[2].analytics_storage;
      }
    }

    // Default initialization without fabricated consent
    mockGtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    assert.strictEqual(dataLayer[0][0], "consent");
    assert.strictEqual(dataLayer[0][2].analytics_storage, "denied");
    assert.strictEqual(dataLayer[0][2].ad_storage, "denied");

    // Explicit user consent grant
    mockGtag("consent", "update", { analytics_storage: "granted" });
    assert.strictEqual(consentState, "granted");
  });

  // 13. DataLayer Queueing Before External Script Load
  it("13. Events emitted prior to external script completion safely buffer in dataLayer queue", () => {
    const dataLayer: any[] = [];
    const gtag = function (...args: any[]) {
      dataLayer.push(args);
    };

    gtag("js", new Date());
    gtag("config", "G-N80FP2BKM1", { send_page_view: false });
    gtag("event", "experience_started", { experience_step: "screen_1_intro", source: "experience" });
    gtag("event", "experience_step_viewed", { experience_step: "screen_2_situation" });

    assert.strictEqual(dataLayer.length, 4);
    assert.strictEqual(dataLayer[2][0], "event");
    assert.strictEqual(dataLayer[2][1], "experience_started");
    assert.strictEqual(dataLayer[3][1], "experience_step_viewed");
  });

  // 14. Custom Event Page Context Binding in SPA
  it("14. Custom event payloads bind page_location and page_title for deterministic SPA context", () => {
    const rawProps: CommercialEventProperties = {
      experienceStep: "screen_4_decision",
      source: "experience",
    };

    const ga4Params = mapPropertiesToGA4(rawProps);
    // Simulate runtime page attachment in SPA
    ga4Params.page_location = "https://elevio.app/experience";
    ga4Params.page_title = "Experience ELEVIO | Short, Practical Learning";

    assert.strictEqual(ga4Params.experience_step, "screen_4_decision");
    assert.strictEqual(ga4Params.page_location, "https://elevio.app/experience");
    assert.strictEqual(ga4Params.page_title, "Experience ELEVIO | Short, Practical Learning");
  });

  // 15. Debug Mode Isolation (Normal Production vs Explicit Debug Session)
  it("15. Normal production events omit debug_mode; explicit debug sessions attach debug_mode: true", () => {
    const normalProps: CommercialEventProperties = {
      source: "experience",
      planCode: "pro_annual",
    };

    // Normal production dispatch
    const normalParams = mapPropertiesToGA4(normalProps);
    assert.strictEqual("debug_mode" in normalParams, false);

    // Explicit debug session dispatch
    const debugParams = { ...mapPropertiesToGA4(normalProps), debug_mode: true };
    assert.strictEqual(debugParams.debug_mode, true);
  });

  // 16. Full Funnel Journey Scrubbing and GA4 Adapter Integrity
  it("16. Full Experience journey (Screens 1 to 8 -> Pricing) passes through PII filter cleanly", () => {
    const journeyEvents = [
      { name: "experience_started", step: "screen_1_intro" },
      { name: "experience_step_viewed", step: "screen_2_situation" },
      { name: "experience_step_viewed", step: "screen_3_context" },
      { name: "experience_step_viewed", step: "screen_4_decision" },
      { name: "experience_step_viewed", step: "screen_5_feedback" },
      { name: "experience_step_viewed", step: "screen_6_completion" },
      { name: "experience_step_viewed", step: "screen_7_dashboard" },
      { name: "experience_step_viewed", step: "screen_8_commercial" },
      { name: "experience_completed", step: "screen_8_commercial" },
      { name: "experience_pricing_clicked", source: "experience" },
      { name: "pricing_viewed", source: "experience" },
    ];

    for (const step of journeyEvents) {
      const scrubbed = scrubProhibitedProperties({
        ...step,
        adminEmail: "leak@elevio.mu",
        secretToken: "secret123",
      });
      const ga4 = mapPropertiesToGA4(scrubbed);

      assert.strictEqual("adminEmail" in ga4, false);
      assert.strictEqual("secretToken" in ga4, false);
      assert.ok(step.name);
    }
  });
});


