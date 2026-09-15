export interface EmployeeBandConfig {
  code: string;
  label: string;
  minEmployees: number;
  maxEmployees: number | null;
  monthlyPriceMUR: number | null;
  yearlyPriceMUR: number | null;
  requiresTailoredQuote: boolean;
  indicativePerEmployeeCopy: string;
}

export type PlanCode = "ESSENTIAL" | "PROFESSIONAL" | "COMPLETE";
export type BillingInterval = "MONTHLY" | "YEARLY";

export const CANONICAL_EMPLOYEE_BANDS: EmployeeBandConfig[] = [
  {
    code: "UP_TO_25",
    label: "Up to 25 employees",
    minEmployees: 1,
    maxEmployees: 25,
    monthlyPriceMUR: 3000,
    yearlyPriceMUR: 32400,
    requiresTailoredQuote: false,
    indicativePerEmployeeCopy: "From MUR 120 per employee/month",
  },
  {
    code: "FROM_26_TO_50",
    label: "26–50 employees",
    minEmployees: 26,
    maxEmployees: 50,
    monthlyPriceMUR: 4500,
    yearlyPriceMUR: 48600,
    requiresTailoredQuote: false,
    indicativePerEmployeeCopy: "From MUR 90 per employee/month",
  },
  {
    code: "FROM_51_TO_80",
    label: "51–80 employees",
    minEmployees: 51,
    maxEmployees: 80,
    monthlyPriceMUR: 5000,
    yearlyPriceMUR: 54000,
    requiresTailoredQuote: false,
    indicativePerEmployeeCopy: "From MUR 62.50 per employee/month",
  },
  {
    code: "FROM_81_TO_120",
    label: "81–120 employees",
    minEmployees: 81,
    maxEmployees: 120,
    monthlyPriceMUR: 6250,
    yearlyPriceMUR: 67500,
    requiresTailoredQuote: false,
    indicativePerEmployeeCopy: "From MUR 52.08 per employee/month",
  },
  {
    code: "OVER_120",
    label: "More than 120 employees",
    minEmployees: 121,
    maxEmployees: null,
    monthlyPriceMUR: null,
    yearlyPriceMUR: null,
    requiresTailoredQuote: true,
    indicativePerEmployeeCopy: "Contact us for a tailored quote",
  },
];

export const PER_EMPLOYEE_COST_MAP: Record<string, string> = {
  UP_TO_25: "From MUR 120 per employee/month",
  FROM_26_TO_50: "From MUR 90 per employee/month",
  FROM_51_TO_80: "From MUR 62.50 per employee/month",
  FROM_81_TO_120: "From MUR 52.08 per employee/month",
  OVER_120: "Contact us for a tailored quote",
};

export const INDICATIVE_CALCULATION_NOTE =
  "Indicative per-employee amounts are calculated using the maximum number of employees included in each band. Your company subscription is billed as a transparent fixed fee based on your employee category.";

export interface CalculatedPricing {
  baseMonthly: number;
  additionalBlocks: number;
  additionalMonthly: number;
  finalMonthly: number;
  undiscountedYearly: number;
  yearlyDiscount: number;
  finalYearly: number;
  equivalentMonthlyYearly: number;
  includedCapacity: number;
  isQuote?: boolean;
}

export function calculateDynamicPricing(
  _planCode: PlanCode | string,
  employeeCount: number,
  standardBaseMonthly?: number
): CalculatedPricing {
  const count = Math.max(1, Math.round(employeeCount));

  if (count > 120) {
    return {
      baseMonthly: 0,
      additionalBlocks: 0,
      additionalMonthly: 0,
      finalMonthly: 0,
      undiscountedYearly: 0,
      yearlyDiscount: 0,
      finalYearly: 0,
      equivalentMonthlyYearly: 0,
      includedCapacity: 120,
      isQuote: true,
    };
  }

  let baseMonthly = 3000;
  let includedCapacity = 25;

  if (standardBaseMonthly !== undefined && standardBaseMonthly > 0) {
    baseMonthly = standardBaseMonthly;
    includedCapacity = count <= 25 ? 25 : count <= 50 ? 50 : count <= 80 ? 80 : 120;
  } else if (count <= 25) {
    baseMonthly = 3000;
    includedCapacity = 25;
  } else if (count <= 50) {
    baseMonthly = 4500;
    includedCapacity = 50;
  } else if (count <= 80) {
    baseMonthly = 5000;
    includedCapacity = 80;
  } else {
    baseMonthly = 6250;
    includedCapacity = 120;
  }

  const undiscountedYearly = baseMonthly * 12;
  const yearlyDiscount = Math.round(undiscountedYearly * 0.10);
  const finalYearly = undiscountedYearly - yearlyDiscount;
  const equivalentMonthlyYearly = Math.round((finalYearly / 12) * 100) / 100;

  return {
    baseMonthly,
    additionalBlocks: 0,
    additionalMonthly: 0,
    finalMonthly: baseMonthly,
    undiscountedYearly,
    yearlyDiscount,
    finalYearly,
    equivalentMonthlyYearly,
    includedCapacity,
    isQuote: false,
  };
}

export function calculateYearlyPricing(monthlyPriceMUR: number | null): {
  yearlyPriceMUR: number | null;
  undiscountedTotalMUR: number | null;
  savingsMUR: number;
  equivalentMonthlyMUR: number | null;
} {
  if (!monthlyPriceMUR || monthlyPriceMUR <= 0) {
    return { yearlyPriceMUR: null, undiscountedTotalMUR: null, savingsMUR: 0, equivalentMonthlyMUR: null };
  }
  const undiscounted = monthlyPriceMUR * 12;
  const savings = Math.round(undiscounted * 0.10);
  const yearlyPrice = undiscounted - savings;
  const equivalentMonthly = Math.round((yearlyPrice / 12) * 100) / 100;
  return {
    yearlyPriceMUR: yearlyPrice,
    undiscountedTotalMUR: undiscounted,
    savingsMUR: savings,
    equivalentMonthlyMUR: equivalentMonthly,
  };
}

