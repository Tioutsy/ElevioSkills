/**
 * Morieva Skills — Server-Side Commercial Funnel Constants & Helpers
 * SPRINT 16.2
 */

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

export const RESERVED_FUTURE_PAYMENT_EVENTS = [
  "checkout_started",
  "payment_succeeded",
  "payment_failed",
  "subscription_activated",
  "first_learner_started_course",
] as const;

export type ReservedFuturePaymentEvent = (typeof RESERVED_FUTURE_PAYMENT_EVENTS)[number];

export type CommercialCompanySizeBand =
  | "UP_TO_25"
  | "FROM_26_TO_50"
  | "FROM_51_TO_80"
  | "FROM_81_TO_120"
  | "OVER_120";

export type InternalSource =
  | "homepage"
  | "experience"
  | "courses"
  | "navbar"
  | "footer"
  | "cta_banner"
  | "direct"
  | "onboarding";

export type CommercialBillingCycle = "MONTHLY" | "ANNUAL" | "YEARLY";

export interface CommercialEventProperties {
  source?: InternalSource | string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  landingPath?: string;
  currentPath?: string;
  companySizeBand?: CommercialCompanySizeBand | string;
  billingCycle?: CommercialBillingCycle;
  planCode?: string;
  experienceStep?: number | string;
  courseCode?: string;
  courseId?: number;
  employeeCount?: number;
  importSuccessCount?: number;
  importSkippedCount?: number;
  totalSeats?: number;
  authenticatedState?: "anonymous" | "authenticated" | "company_admin" | "manager" | "employee";
}

export interface CommercialAnalyticsProvider {
  name: string;
  trackEvent: (event: CanonicalCommercialEvent, properties: CommercialEventProperties) => void;
  trackPageView?: (path: string, title?: string) => void;
}

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

export function isProhibitedProperty(key: string): boolean {
  const lowerKey = key.toLowerCase();
  return PROHIBITED_KEYS.some((pk) => lowerKey.includes(pk.toLowerCase()));
}

export function scrubProhibitedProperties(props: Record<string, any>): Record<string, any> {
  const safe: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!isProhibitedProperty(key)) {
      safe[key] = value;
    }
  }
  return safe;
}

export function sanitizeAnalyticsString(input: string | null | undefined, maxLen = 100): string | undefined {
  if (!input || typeof input !== "string") return undefined;
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLen).replace(/[<>"'`\\]/g, "");
}

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

