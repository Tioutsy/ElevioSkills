export type BillingInterval = "MONTHLY" | "YEARLY";
export type PlanCode = "ESSENTIAL" | "PROFESSIONAL" | "COMPLETE";

export interface EnterprisePricingBreakdown {
  packageIdentifier: PlanCode;
  employeeCount: number;
  baseEmployeeCapacity: number;
  additionalEmployeeCount: number;
  additionalBlockSize: number;
  additionalBlocks: number;
  baseMonthlyPrice: number | null;
  pricePerAdditionalBlock: number;
  additionalMonthlyAmount: number;
  finalMonthlyAmount: number;
  undiscountedAnnualTotal: number;
  discountPercentage: number;
  discountAmount: number;
  finalYearlyAmount: number;
  billingInterval: BillingInterval;
  finalAmountDue: number;
  currency: string;
  includedMaxEmployees: number;
  annualSavings: number;
  annualSavingsMUR: number;
  equivalentMonthlyAmount: number;
  equivalentMonthlyMUR: number;
  bandCode: string;
  isTailoredQuote?: boolean;
  requiresTailoredQuote?: boolean;
  tailoredQuoteMessage?: string;
}

export interface PricingCalculationResult {
  monthlyBasePrice: number | null;
  billingInterval: BillingInterval;
  undiscountedTotal: number | null;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number | null;
  annualSavings: number;
  equivalentMonthlyAmount: number | null;
  currency: string;
  isTailoredQuote: boolean;
  includedMaxEmployees?: number;
}

export const APPROVED_BAND_PRICING: Record<string, number | null> = {
  UP_TO_25: 3000,
  FROM_26_TO_50: 4500,
  FROM_51_TO_80: 5000,
  FROM_81_TO_120: 6250,
  OVER_120: null,
};

export const STANDARD_BAND_PRICING: Record<PlanCode, Record<string, number | null>> = {
  ESSENTIAL: {
    UP_TO_25: 3000,
    FROM_26_TO_50: 4500,
    FROM_51_TO_80: 5000,
    FROM_81_TO_120: 6250,
    OVER_120: null,
  },
  PROFESSIONAL: {
    UP_TO_25: 3000,
    FROM_26_TO_50: 4500,
    FROM_51_TO_80: 5000,
    FROM_81_TO_120: 6250,
    OVER_120: null,
  },
  COMPLETE: {
    UP_TO_25: 3000,
    FROM_26_TO_50: 4500,
    FROM_51_TO_80: 5000,
    FROM_81_TO_120: 6250,
    OVER_120: null,
  },
};

export const BAND_CAPACITY_LIMITS: Record<string, number> = {
  UP_TO_25: 25,
  FROM_26_TO_50: 50,
  FROM_51_TO_80: 80,
  FROM_81_TO_120: 120,
  OVER_120: 120,
};

export function normalizeBillingInterval(rawInterval?: string | null): BillingInterval {
  if (!rawInterval) return "MONTHLY";
  const normalized = rawInterval.trim().toUpperCase();
  if (normalized === "MONTHLY" || normalized === "MONTH") {
    return "MONTHLY";
  }
  if (normalized === "YEARLY" || normalized === "ANNUAL" || normalized === "YEAR") {
    return "YEARLY";
  }
  throw new Error(`Invalid billing interval: "${rawInterval}". Supported values are "MONTHLY" and "YEARLY".`);
}

export function normalizePlanCode(rawPlanCode?: string | null): PlanCode {
  if (!rawPlanCode) return "COMPLETE";
  const normalized = rawPlanCode.trim().toUpperCase() as PlanCode;
  if (normalized === "ESSENTIAL" || normalized === "PROFESSIONAL" || normalized === "COMPLETE") {
    return normalized;
  }
  return "COMPLETE";
}

/**
 * Universal Authoritative Pricing Resolver based on Employee Headcount & Band.
 * Standard monthly pricing:
 * - Up to 25 employees: MUR 3,000/month (MUR 32,400/year)
 * - 26–50 employees: MUR 4,500/month (MUR 48,600/year)
 * - 51–80 employees: MUR 5,000/month (MUR 54,000/year)
 * - 81–120 employees: MUR 6,250/month (MUR 67,500/year)
 * - 121+ employees: Contact us for a tailored quote (no calculated public formula).
 */
export function calculateAuthoritativePricing(opts: {
  planCode?: string;
  employeeCount?: number;
  bandCode?: string;
  billingInterval?: string | null;
}): EnterprisePricingBreakdown {
  const planCode = normalizePlanCode(opts.planCode);
  const billingInterval = normalizeBillingInterval(opts.billingInterval);
  let count = opts.employeeCount;

  if (count === undefined || count === null || isNaN(count)) {
    if (opts.bandCode === "UP_TO_25") count = 25;
    else if (opts.bandCode === "FROM_26_TO_50") count = 50;
    else if (opts.bandCode === "FROM_51_TO_80") count = 80;
    else if (opts.bandCode === "FROM_81_TO_120") count = 120;
    else if (opts.bandCode === "OVER_120") count = 121;
    else count = 25;
  }

  // 121+ employees: Tailored Quote Required (No generated public formula)
  if (count > 120 || opts.bandCode === "OVER_120") {
    return {
      packageIdentifier: planCode,
      employeeCount: count,
      baseEmployeeCapacity: 120,
      additionalEmployeeCount: 0,
      additionalBlockSize: 0,
      additionalBlocks: 0,
      baseMonthlyPrice: null,
      pricePerAdditionalBlock: 0,
      additionalMonthlyAmount: 0,
      finalMonthlyAmount: 0,
      undiscountedAnnualTotal: 0,
      discountPercentage: 0,
      discountAmount: 0,
      finalYearlyAmount: 0,
      billingInterval,
      finalAmountDue: 0,
      currency: "MUR",
      includedMaxEmployees: 120,
      annualSavings: 0,
      annualSavingsMUR: 0,
      equivalentMonthlyAmount: 0,
      equivalentMonthlyMUR: 0,
      bandCode: "OVER_120",
      isTailoredQuote: true,
      requiresTailoredQuote: true,
      tailoredQuoteMessage: "Contact us for a tailored quote",
    };
  }

  let standardMonthly = 3000;
  let includedMax = 25;
  let bandCode = "UP_TO_25";

  if (count <= 25) {
    standardMonthly = APPROVED_BAND_PRICING.UP_TO_25 || 3000;
    includedMax = 25;
    bandCode = "UP_TO_25";
  } else if (count <= 50) {
    standardMonthly = APPROVED_BAND_PRICING.FROM_26_TO_50 || 4500;
    includedMax = 50;
    bandCode = "FROM_26_TO_50";
  } else if (count <= 80) {
    standardMonthly = APPROVED_BAND_PRICING.FROM_51_TO_80 || 5000;
    includedMax = 80;
    bandCode = "FROM_51_TO_80";
  } else {
    standardMonthly = APPROVED_BAND_PRICING.FROM_81_TO_120 || 6250;
    includedMax = 120;
    bandCode = "FROM_81_TO_120";
  }

  const undiscountedAnnualTotal = standardMonthly * 12;
  const discountAmount = Math.round(undiscountedAnnualTotal * 0.10);
  const finalYearlyAmount = undiscountedAnnualTotal - discountAmount;
  const finalAmountDue = billingInterval === "YEARLY" ? finalYearlyAmount : standardMonthly;

  return {
    packageIdentifier: planCode,
    employeeCount: count,
    baseEmployeeCapacity: includedMax,
    additionalEmployeeCount: 0,
    additionalBlockSize: 0,
    additionalBlocks: 0,
    baseMonthlyPrice: standardMonthly,
    pricePerAdditionalBlock: 0,
    additionalMonthlyAmount: 0,
    finalMonthlyAmount: standardMonthly,
    undiscountedAnnualTotal,
    discountPercentage: billingInterval === "YEARLY" ? 10 : 0,
    discountAmount: billingInterval === "YEARLY" ? discountAmount : 0,
    finalYearlyAmount,
    billingInterval,
    finalAmountDue,
    currency: "MUR",
    includedMaxEmployees: includedMax,
    annualSavings: discountAmount,
    annualSavingsMUR: discountAmount,
    equivalentMonthlyAmount: Math.round((finalYearlyAmount / 12) * 100) / 100,
    equivalentMonthlyMUR: Math.round((finalYearlyAmount / 12) * 100) / 100,
    bandCode,
    isTailoredQuote: false,
    requiresTailoredQuote: false,
  };
}

/**
 * Standard calculation helper for fixed monthly base amounts.
 */
export function calculateSubscriptionPricing(
  monthlyBasePrice: number | null | undefined,
  rawInterval?: string | null,
  requiresTailoredQuote: boolean = false
): PricingCalculationResult {
  const billingInterval = normalizeBillingInterval(rawInterval);

  if (requiresTailoredQuote || monthlyBasePrice === null || monthlyBasePrice === undefined || monthlyBasePrice <= 0) {
    return {
      monthlyBasePrice: null,
      billingInterval,
      undiscountedTotal: null,
      discountPercentage: 0,
      discountAmount: 0,
      finalAmount: null,
      annualSavings: 0,
      equivalentMonthlyAmount: null,
      currency: "MUR",
      isTailoredQuote: true,
    };
  }

  const basePrice = Math.round(monthlyBasePrice);

  if (billingInterval === "MONTHLY") {
    return {
      monthlyBasePrice: basePrice,
      billingInterval: "MONTHLY",
      undiscountedTotal: basePrice,
      discountPercentage: 0,
      discountAmount: 0,
      finalAmount: basePrice,
      annualSavings: 0,
      equivalentMonthlyAmount: basePrice,
      currency: "MUR",
      isTailoredQuote: false,
    };
  }

  // YEARLY billing: Exactly 10% discount on equivalent 12-month total
  const undiscountedTotal = basePrice * 12;
  const discountPercentage = 10;
  const discountAmount = Math.round(undiscountedTotal * 0.10);
  const finalAmount = undiscountedTotal - discountAmount;
  const annualSavings = discountAmount;
  const equivalentMonthlyAmount = Math.round((finalAmount / 12) * 100) / 100;

  return {
    monthlyBasePrice: basePrice,
    billingInterval: "YEARLY",
    undiscountedTotal,
    discountPercentage,
    discountAmount,
    finalAmount,
    annualSavings,
    equivalentMonthlyAmount,
    currency: "MUR",
    isTailoredQuote: false,
  };
}

