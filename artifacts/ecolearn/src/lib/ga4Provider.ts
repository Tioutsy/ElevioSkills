/**
 * Morieva Skills — Google Analytics 4 (GA4) Provider Adapter
 * 
 * Adapts vendor-neutral CommercialAnalyticsProvider events to GA4.
 * SPRINT 16.3 / SPRINT 16.3A / SPRINT 16.3B (Standards & Privacy Alignment)
 */

import {
  CommercialAnalyticsProvider,
  CanonicalCommercialEvent,
  CommercialEventProperties,
} from "./commercialAnalytics";

export interface GA4ProviderOptions {
  measurementId?: string;
  debug?: boolean;
  disabled?: boolean;
  initialConsent?: "granted" | "denied";
}

/**
 * Maps approved ELEVIO commercial event properties to GA4-standard snake_case parameters.
 */
export function mapPropertiesToGA4(properties: CommercialEventProperties): Record<string, any> {
  const params: Record<string, any> = {};

  if (properties.source) params.source = properties.source;
  if (properties.medium) params.medium = properties.medium;
  if (properties.campaign) params.campaign = properties.campaign;
  if (properties.content) params.content = properties.content;
  if (properties.term) params.term = properties.term;
  if (properties.referrer) params.referrer = properties.referrer;
  if (properties.landingPath) params.landing_path = properties.landingPath;
  if (properties.currentPath) params.current_path = properties.currentPath;

  if (properties.companySizeBand) params.company_size_band = properties.companySizeBand;
  if (properties.billingCycle) params.billing_cycle = properties.billingCycle;
  if (properties.planCode) params.plan_code = properties.planCode;

  if (properties.experienceStep !== undefined) params.experience_step = properties.experienceStep;
  if (properties.courseCode) params.course_code = properties.courseCode;
  if (properties.courseId !== undefined) params.course_id = properties.courseId;

  if (properties.employeeCount !== undefined) params.employee_count = properties.employeeCount;
  if (properties.importSuccessCount !== undefined) params.import_success_count = properties.importSuccessCount;
  if (properties.importSkippedCount !== undefined) params.import_skipped_count = properties.importSkippedCount;
  if (properties.totalSeats !== undefined) params.total_seats = properties.totalSeats;

  if (properties.authenticatedState) params.authenticated_state = properties.authenticatedState;

  return params;
}

export class GoogleAnalytics4Provider implements CommercialAnalyticsProvider {
  public readonly name = "google_analytics_4";
  public measurementId?: string;
  public isInitialized = false;
  public consentState: "granted" | "denied" = "denied";
  public isDebug = false;

  constructor(options?: GA4ProviderOptions) {
    const envMeasurementId =
      typeof import.meta !== "undefined" && import.meta.env
        ? (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)
        : undefined;

    const windowMeasurementId =
      typeof window !== "undefined"
        ? (window as any).__ELEVIO_GA_MEASUREMENT_ID__
        : undefined;

    this.measurementId = options?.measurementId || envMeasurementId || windowMeasurementId;

    const isUrlDebug =
      typeof window !== "undefined" &&
      (window.location.search.includes("debug_mode=true") ||
        window.location.search.includes("analytics_debug=1") ||
        window.location.search.includes("elevio_debug=1"));

    this.isDebug =
      options?.debug ??
      (typeof window !== "undefined" && (!!(window as any).__ELEVIO_ANALYTICS_DEBUG__ || isUrlDebug));

    // Determine initial consent state: default to 'denied' unless explicit consent exists
    let determinedConsent: "granted" | "denied" = "denied";
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage?.getItem("elevio_consent_analytics");
        const windowFlag = (window as any).__ELEVIO_ANALYTICS_CONSENT__;
        const urlConsent =
          window.location.search.includes("consent=granted") ||
          window.location.search.includes("analytics_consent=true");

        if (stored === "granted" || windowFlag === true || windowFlag === "granted" || urlConsent) {
          determinedConsent = "granted";
        } else if (stored === "denied" || windowFlag === false || windowFlag === "denied") {
          determinedConsent = "denied";
        }
      }
    } catch {}

    this.consentState = options?.initialConsent || determinedConsent;

    if (!options?.disabled) {
      this.init();
    }

    // Expose diagnostics helper on window in browser environments
    if (typeof window !== "undefined") {
      (window as any).__ELEVIO_ANALYTICS_DIAGNOSTICS__ = () => this.getDiagnostics();
    }
  }

  public init() {
    if (typeof window === "undefined") return;

    if (!this.measurementId) {
      if (this.isDebug) {
        console.log(
          "%c[GA4 Provider]%c No Measurement ID configured (VITE_GA_MEASUREMENT_ID is empty). Operating in safe no-op mode.",
          "color: #f59e0b; font-weight: bold;",
          "color: inherit;"
        );
      }
      return;
    }

    try {
      // 1. Set up global dataLayer & gtag function if not already present
      (window as any).dataLayer = (window as any).dataLayer || [];
      if (!(window as any).gtag) {
        (window as any).gtag = function () {
          (window as any).dataLayer.push(arguments);
        };
      }

      const gtag = (window as any).gtag;

      // 2. Configure Google Consent Mode v2 Defaults
      // Default: analytics_storage reflects determined consent state ('denied' by default).
      // Ad/Marketing storage is unconditionally 'denied'.
      gtag("consent", "default", {
        analytics_storage: this.consentState,
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });

      // 3. Establish timestamp & configuration
      gtag("js", new Date());

      const configParams: Record<string, any> = {
        send_page_view: false, // SPA manual page_view control
      };

      // Only attach debug_mode when explicitly activated for development/debugging
      if (this.isDebug) {
        configParams.debug_mode = true;
      }

      gtag("config", this.measurementId, configParams);

      // 4. Inject gtag script asynchronously if not already present
      const scriptId = `ga4-gtag-script-${this.measurementId}`;
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        script.onerror = () => {
          console.warn(
            "[GA4 Provider] Failed to load external gtag.js script (likely blocked by ad-blocker or network policy). Silently continuing."
          );
        };
        document.head.appendChild(script);
      }

      this.isInitialized = true;
      if (this.isDebug) {
        console.log(
          `%c[GA4 Provider]%c Initialized with ID: %c${this.measurementId}%c | Consent: %c${this.consentState}%c | DebugMode: %c${this.isDebug}`,
          "color: #10b981; font-weight: bold;",
          "color: inherit;",
          "color: #2563eb; font-weight: bold;",
          "color: inherit;",
          "color: #10b981; font-weight: bold;",
          "color: inherit;",
          "color: #9333ea; font-weight: bold;"
        );
      }
    } catch (err) {
      console.warn("[GA4 Provider] Initialization error caught safely:", err);
    }
  }

  public setConsent(granted: boolean): void {
    this.consentState = granted ? "granted" : "denied";
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage) {
        window.localStorage.setItem("elevio_consent_analytics", this.consentState);
      }
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("consent", "update", {
          analytics_storage: this.consentState,
        });
        if (this.isDebug) {
          console.log(
            `%c[GA4 Provider Consent]%c Updated analytics_storage to: %c${this.consentState}`,
            "color: #f59e0b; font-weight: bold;",
            "color: inherit;",
            "color: #10b981; font-weight: bold;"
          );
        }
      }
    } catch (err) {
      console.warn("[GA4 Provider] Failed to update consent:", err);
    }
  }

  public trackEvent(
    event: CanonicalCommercialEvent,
    properties: CommercialEventProperties
  ): void {
    if (!this.isInitialized || !this.measurementId) {
      if (this.isDebug) {
        console.log(
          `%c[GA4 Provider (No-Op)]%c Event "%c${event}%c" suppressed (Measurement ID missing or uninitialized).`,
          "color: #f59e0b; font-weight: bold;",
          "color: inherit;",
          "color: #ef4444; font-weight: bold;",
          "color: inherit;",
          properties
        );
      }
      return;
    }

    if (this.consentState === "denied") {
      if (this.isDebug) {
        console.log(
          `%c[GA4 Provider (Consent Denied)]%c Event "%c${event}%c" suppressed due to analytics_storage: denied.`,
          "color: #f59e0b; font-weight: bold;",
          "color: inherit;",
          "color: #ef4444; font-weight: bold;",
          "color: inherit;"
        );
      }
      return;
    }

    try {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        const ga4Params = mapPropertiesToGA4(properties);

        // Bind standard SPA page context for deterministic measurement
        if (typeof window !== "undefined") {
          ga4Params.page_location = window.location.href;
          if (document.title) {
            ga4Params.page_title = document.title;
          }
        }

        // Attach debug_mode ONLY when debug is explicitly active
        if (this.isDebug) {
          ga4Params.debug_mode = true;
        }

        gtag("event", event, ga4Params);

        if (this.isDebug) {
          console.log(
            `%c[GA4 Provider Dispatched]%c 🚀 %c${event}`,
            "color: #10b981; font-weight: bold;",
            "color: inherit;",
            "color: #2563eb; font-weight: bold;",
            ga4Params
          );
        }
      }
    } catch (err) {
      console.warn(`[GA4 Provider] Failed to dispatch event "${event}":`, err);
    }
  }

  public trackPageView(path: string, title?: string): void {
    if (!this.isInitialized || !this.measurementId) {
      if (this.isDebug) {
        console.log(
          `%c[GA4 Provider (No-Op)]%c Page view suppressed for "%c${path}%c" (Measurement ID missing or uninitialized).`,
          "color: #f59e0b; font-weight: bold;",
          "color: inherit;",
          "color: #ef4444; font-weight: bold;",
          "color: inherit;"
        );
      }
      return;
    }

    if (this.consentState === "denied") return;

    try {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        const fullLocation =
          typeof window !== "undefined"
            ? `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
            : path;
        const pageTitle =
          title || (typeof document !== "undefined" ? document.title : "Morieva Skills");

        const pageParams: Record<string, any> = {
          page_path: path,
          page_location: fullLocation,
          page_title: pageTitle,
        };

        // Attach debug_mode ONLY when debug is explicitly active
        if (this.isDebug) {
          pageParams.debug_mode = true;
        }

        gtag("event", "page_view", pageParams);

        if (this.isDebug) {
          console.log(
            `%c[GA4 Provider Dispatched]%c 📄 %cpage_view`,
            "color: #10b981; font-weight: bold;",
            "color: inherit;",
            "color: #2563eb; font-weight: bold;",
            pageParams
          );
        }
      }
    } catch (err) {
      console.warn("[GA4 Provider] Failed to dispatch page_view:", err);
    }
  }

  public getDiagnostics() {
    const hasScript =
      typeof document !== "undefined" &&
      !!document.getElementById(`ga4-gtag-script-${this.measurementId}`);
    const dataLayer = typeof window !== "undefined" ? (window as any).dataLayer : [];
    const hasGtag = typeof window !== "undefined" && typeof (window as any).gtag === "function";

    const report = {
      provider: this.name,
      measurementId: this.measurementId || "NOT_CONFIGURED",
      isInitialized: this.isInitialized,
      consentState: this.consentState,
      isDebug: this.isDebug,
      scriptInjected: hasScript,
      gtagFunctionReady: hasGtag,
      dataLayerLength: Array.isArray(dataLayer) ? dataLayer.length : 0,
      dataLayerQueue: Array.isArray(dataLayer) ? dataLayer.slice(-10) : [],
    };

    console.table(report);
    return report;
  }
}

// Automatically instantiate and register GA4 provider if Measurement ID is present
let defaultGA4ProviderInstance: GoogleAnalytics4Provider | null = null;

export function getOrCreateGA4Provider(options?: GA4ProviderOptions): GoogleAnalytics4Provider {
  if (!defaultGA4ProviderInstance) {
    defaultGA4ProviderInstance = new GoogleAnalytics4Provider(options);
  }
  return defaultGA4ProviderInstance;
}


