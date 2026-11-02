/**
 * Morieva Skills — Commercial Funnel Analytics & Conversion Measurement
 * Vendor-neutral, typed, privacy-conscious event measurement module.
 * 
 * SPRINT 16.2
 */

// Canonical Funnel Events
export const CANONICAL_COMMERCIAL_EVENTS = [
  // Public Acquisition (Interaction Signals)
  "public_page_view",
  "pricing_viewed",

  // Experience Morieva Skills (Authoritative Flow & Interaction Signals)
  "experience_started",
  "experience_step_viewed",
  "experience_completed",
  "experience_pricing_clicked",
  "experience_catalogue_clicked",

  // Commercial Account Journey (Authoritative Milestones)
  "signup_started",
  "signup_completed",

  // Company Journey (Authoritative Milestones)
  "company_setup_started",
  "company_created",

  // Subscription Journey (Interaction Signals & Pre-Payment Boundary)
  "subscription_band_viewed",
  "subscription_band_selected",
  "subscription_checkout_reached",

  // Onboarding & Team Invitation (Authoritative Milestones & Interaction Signals)
  "onboarding_started",
  "employee_import_started",
  "employee_import_completed",
  "employee_invitation_sent",
  "first_employee_invited",

  // Learner Progress (Interaction Signal)
  "learner_course_started",
] as const;

export type CanonicalCommercialEvent = (typeof CANONICAL_COMMERCIAL_EVENTS)[number];

// Reserved Future Events (Must NEVER be emitted in current sprint)
export const RESERVED_FUTURE_PAYMENT_EVENTS = [
  "checkout_started",
  "payment_succeeded",
  "payment_failed",
  "subscription_activated",
  "first_learner_started_course", // Reserved until tenant-level company activation query is implemented on backend
] as const;

export type ReservedFuturePaymentEvent = (typeof RESERVED_FUTURE_PAYMENT_EVENTS)[number];

// Controlled Company Size Bands (Canonical Commercial Model)
export type CommercialCompanySizeBand =
  | "UP_TO_25"
  | "FROM_26_TO_50"
  | "FROM_51_TO_80"
  | "FROM_81_TO_120"
  | "OVER_120";

// Controlled Internal Journey Sources
export type InternalSource =
  | "homepage"
  | "experience"
  | "courses"
  | "navbar"
  | "footer"
  | "cta_banner"
  | "direct"
  | "onboarding";

// Controlled Billing Intervals
export type CommercialBillingCycle = "MONTHLY" | "ANNUAL" | "YEARLY";

// Typed & Deliberately Restricted Event Property Schema
export interface CommercialEventProperties {
  // Attribution Properties
  source?: InternalSource | string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  landingPath?: string;
  currentPath?: string;

  // Commercial / Tier Properties
  companySizeBand?: CommercialCompanySizeBand | string;
  billingCycle?: CommercialBillingCycle;
  planCode?: string;

  // Learning / Experience Properties
  experienceStep?: number | string;
  courseCode?: string;
  courseId?: number;

  // Aggregated / Operational Metric Properties (Strictly Non-PII)
  employeeCount?: number;
  importSuccessCount?: number;
  importSkippedCount?: number;
  totalSeats?: number;

  // Authentication State
  authenticatedState?: "anonymous" | "authenticated" | "company_admin" | "manager" | "employee";
}

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  internal_source?: string;
  landing_path?: string;
  first_seen_at?: string;
}

const ATTRIBUTION_STORAGE_KEY = "elevio_commercial_attribution_v1";
const DEDUPLICATION_SESSION_KEY = "elevio_commercial_dedup_events_v1";
const MAX_PARAM_LENGTH = 100;

/**
 * Sanitizes an input string to remove potential script injection or malformed characters.
 */
export function sanitizeAnalyticsString(input: string | null | undefined): string | undefined {
  if (!input || typeof input !== "string") return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  // Truncate to maximum length and strip unsafe HTML/control characters
  return trimmed
    .slice(0, MAX_PARAM_LENGTH)
    .replace(/[<>"'`\\]/g, "");
}

/**
 * Parses and returns UTM and internal source parameters from a URL search string or object.
 */
export function extractAttributionFromUrl(search: string = window.location.search, pathname: string = window.location.pathname): AttributionData {
  const params = new URLSearchParams(search);
  const data: AttributionData = {};

  const utmSource = sanitizeAnalyticsString(params.get("utm_source"));
  const utmMedium = sanitizeAnalyticsString(params.get("utm_medium"));
  const utmCampaign = sanitizeAnalyticsString(params.get("utm_campaign"));
  const utmContent = sanitizeAnalyticsString(params.get("utm_content"));
  const utmTerm = sanitizeAnalyticsString(params.get("utm_term"));
  const source = sanitizeAnalyticsString(params.get("source"));

  if (utmSource) data.utm_source = utmSource;
  if (utmMedium) data.utm_medium = utmMedium;
  if (utmCampaign) data.utm_campaign = utmCampaign;
  if (utmContent) data.utm_content = utmContent;
  if (utmTerm) data.utm_term = utmTerm;
  if (source) data.internal_source = source;

  data.landing_path = sanitizeAnalyticsString(pathname) || "/";
  data.first_seen_at = new Date().toISOString();

  return data;
}

/**
 * Retrieves persisted acquisition attribution from session storage.
 */
export function getPersistedAttribution(): AttributionData | null {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}

/**
 * Captures current page URL attribution and persists it for the duration of the session.
 */
export function captureAndPersistAttribution(): AttributionData {
  try {
    if (typeof window === "undefined") {
      return {};
    }

    const currentFromUrl = extractAttributionFromUrl();
    const hasAnyParam = !!(
      currentFromUrl.utm_source ||
      currentFromUrl.utm_medium ||
      currentFromUrl.utm_campaign ||
      currentFromUrl.utm_content ||
      currentFromUrl.utm_term ||
      currentFromUrl.internal_source
    );

    const existing = getPersistedAttribution();

    // If new UTM or source params are present in URL, update session storage
    if (hasAnyParam) {
      const merged: AttributionData = {
        ...existing,
        ...currentFromUrl,
      };
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
      }
      return merged;
    }

    // Otherwise maintain existing or create initial fallback
    if (existing) {
      return existing;
    }

    const initial: AttributionData = {
      landing_path: sanitizeAnalyticsString(window.location.pathname) || "/",
      first_seen_at: new Date().toISOString(),
    };
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(initial));
    }
    return initial;
  } catch {
    return {};
  }
}

// Memory deduplication cache for the runtime session
const inMemoryDeduplicationSet = new Set<string>();

/**
 * Checks if a one-shot milestone event has already been emitted in this session.
 */
function isEventDuplicate(dedupKey: string): boolean {
  if (inMemoryDeduplicationSet.has(dedupKey)) return true;

  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const raw = window.sessionStorage.getItem(DEDUPLICATION_SESSION_KEY);
      if (raw) {
        const storedKeys: string[] = JSON.parse(raw);
        if (storedKeys.includes(dedupKey)) {
          inMemoryDeduplicationSet.add(dedupKey);
          return true;
        }
      }
    }
  } catch {}

  return false;
}

/**
 * Records a one-shot milestone event in the deduplication cache.
 */
function markEventEmitted(dedupKey: string) {
  inMemoryDeduplicationSet.add(dedupKey);
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const raw = window.sessionStorage.getItem(DEDUPLICATION_SESSION_KEY);
      const storedKeys: string[] = raw ? JSON.parse(raw) : [];
      if (!storedKeys.includes(dedupKey)) {
        storedKeys.push(dedupKey);
        window.sessionStorage.setItem(DEDUPLICATION_SESSION_KEY, JSON.stringify(storedKeys));
      }
    }
  } catch {}
}

/**
 * Prohibited PII check: Ensures that no sensitive values are accidentally passed in properties.
 */
const PROHIBITED_KEYS = [
  "password",
  "token",
  "secret",
  "email",
  "firstName",
  "lastName",
  "fullName",
  "userName",
  "name",
  "phone",
  "phoneNumber",
  "creditCard",
  "cardNumber",
  "cvv",
  "answers",
  "assessmentAnswer",
  "certificateId",
];

export function scrubProhibitedProperties(props: Record<string, any>): Record<string, any> {
  const safe: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    const lowerKey = key.toLowerCase();
    const isProhibited = PROHIBITED_KEYS.some((pk) => lowerKey.includes(pk.toLowerCase()));
    if (!isProhibited) {
      safe[key] = value;
    }
  }
  return safe;
}

// Pluggable Analytics Provider Interface
export interface CommercialAnalyticsProvider {
  name: string;
  trackEvent: (event: CanonicalCommercialEvent, properties: CommercialEventProperties) => void;
  trackPageView?: (path: string, title?: string) => void;
}

// Default development / console provider
const defaultConsoleProvider: CommercialAnalyticsProvider = {
  name: "elevio_internal_logger",
  trackEvent: (event, properties) => {
    if (typeof window !== "undefined" && (window as any).__ELEVIO_ANALYTICS_DEBUG__) {
      console.log(`[ELEVIO Commercial Analytics] 🎯 ${event}`, properties);
    }
  },
  trackPageView: (path, title) => {
    if (typeof window !== "undefined" && (window as any).__ELEVIO_ANALYTICS_DEBUG__) {
      console.log(`[ELEVIO Commercial Analytics] 📄 page_view: ${path} (${title || 'No Title'})`);
    }
  },
};

import { getOrCreateGA4Provider } from "./ga4Provider";

let activeProviders: CommercialAnalyticsProvider[] = [
  defaultConsoleProvider,
  getOrCreateGA4Provider(),
];

/**
 * Register an external analytics provider (e.g., PostHog, GTM, Plausible) when configured.
 */
export function registerCommercialAnalyticsProvider(provider: CommercialAnalyticsProvider) {
  activeProviders.push(provider);
}

/**
 * Tracks SPA page views across all active analytics providers without duplicate counts.
 */
export function trackCommercialPageView(path: string, title?: string) {
  try {
    const cleanPath = sanitizeAnalyticsString(path) || "/";
    const cleanTitle = sanitizeAnalyticsString(title);

    for (const provider of activeProviders) {
      try {
        if (provider.trackPageView) {
          provider.trackPageView(cleanPath, cleanTitle);
        }
      } catch (err) {
        console.warn(`[ELEVIO Commercial Analytics] Provider ${provider.name} failed on trackPageView:`, err);
      }
    }
  } catch {}
}

/**
 * Core commercial event tracking function.
 * Vendor-neutral, safe from exceptions, strictly typed.
 */
export function trackCommercialEvent(
  event: CanonicalCommercialEvent,
  properties: CommercialEventProperties = {},
  options?: {
    dedupKey?: string;
  }
): boolean {
  const isDebug =
    typeof window !== "undefined" &&
    (!!(window as any).__ELEVIO_ANALYTICS_DEBUG__ ||
      window.location.search.includes("debug_mode=true") ||
      window.location.search.includes("analytics_debug=1"));

  try {
    // 1. Enforce canonical event constraint
    if (!CANONICAL_COMMERCIAL_EVENTS.includes(event)) {
      if (isDebug) {
        console.warn(`[ELEVIO Commercial Analytics] ⚠️ Suppressed non-canonical event: "${event}"`);
      }
      return false;
    }

    // 2. Prevent emission of reserved payment events in this sprint
    if ((RESERVED_FUTURE_PAYMENT_EVENTS as readonly string[]).includes(event)) {
      if (isDebug) {
        console.warn(`[ELEVIO Commercial Analytics] 🛑 Reserved payment event "${event}" suppressed.`);
      }
      return false;
    }

    // 3. Check deduplication if a deduplication key is provided
    if (options?.dedupKey) {
      if (isEventDuplicate(options.dedupKey)) {
        if (isDebug) {
          console.log(`[ELEVIO Commercial Analytics] ⏭️ Suppressed duplicate milestone event "${event}" (Key: ${options.dedupKey})`);
        }
        return false;
      }
      markEventEmitted(options.dedupKey);
    }

    // 4. Merge persistent acquisition attribution
    const attribution = getPersistedAttribution() || captureAndPersistAttribution();
    const currentPath = typeof window !== "undefined" ? window.location.pathname : undefined;
    const referrer = typeof document !== "undefined" ? document.referrer : undefined;

    const mergedProperties: CommercialEventProperties = {
      source: properties.source || attribution.internal_source || attribution.utm_source || "direct",
      medium: properties.medium || attribution.utm_medium,
      campaign: properties.campaign || attribution.utm_campaign,
      content: properties.content || attribution.utm_content,
      term: properties.term || attribution.utm_term,
      landingPath: attribution.landing_path,
      currentPath: properties.currentPath || currentPath,
      referrer: properties.referrer || (referrer ? sanitizeAnalyticsString(referrer) : undefined),
      ...properties,
    };

    // 5. Scrub any accidental PII
    const cleanProperties = scrubProhibitedProperties(mergedProperties) as CommercialEventProperties;

    if (isDebug) {
      console.log(`[ELEVIO Commercial Analytics] 📥 Processed & Scrubbed Event: "${event}"`, cleanProperties);
    }

    // 6. Emit to all registered providers with safe error boundaries
    for (const provider of activeProviders) {
      try {
        provider.trackEvent(event, cleanProperties);
      } catch (err) {
        console.warn(`[ELEVIO Commercial Analytics] Provider ${provider.name} failed:`, err);
      }
    }

    // 7. Dispatch a standard custom DOM event for testing / local integrations
    if (typeof window !== "undefined") {
      try {
        const domEvent = new CustomEvent("elevio:commercial_event", {
          detail: { event, properties: cleanProperties, timestamp: new Date().toISOString() },
        });
        window.dispatchEvent(domEvent);
      } catch {}
    }

    return true;
  } catch (err) {
    // Analytics failure must NEVER break user experience or application logic
    console.warn("[ELEVIO Commercial Analytics] Track execution caught exception:", err);
    return false;
  }
}

