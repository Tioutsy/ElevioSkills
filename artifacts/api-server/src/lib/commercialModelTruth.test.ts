import assert from "node:assert/strict";
import test, { describe } from "node:test";
import {
  calculateAuthoritativePricing,
  calculateSubscriptionPricing,
  APPROVED_BAND_PRICING,
  STANDARD_BAND_PRICING,
} from "./subscriptionPricingService";
import {
  ensureHybridSubscriptions,
  resolveBandCodeFromEmployeeCount,
  BANDS_CONFIG,
  PRICING_MATRIX,
} from "./ensureHybridSubscriptions";
import { getBandMaxSeats } from "./seatEnforcementService";
import { evaluateCourseAccess } from "./courseAccessService";
import { db, companiesTable, companySubscriptionsTable, subscriptionPlansTable, employeeBandsTable, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

describe("Sprint 16.0A — Authoritative Commercial Model Truth Verification", () => {
  describe("1. Authoritative Band Pricing Verification (Section 14 Tests 1–10)", () => {
    test("1. 1 employee → MUR 3,000/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 1, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 3000);
      assert.equal(res.bandCode, "UP_TO_25");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 25);
    });

    test("2. 25 employees → MUR 3,000/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 25, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 3000);
      assert.equal(res.bandCode, "UP_TO_25");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 25);
    });

    test("3. 26 employees → MUR 4,500/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 26, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 4500);
      assert.equal(res.bandCode, "FROM_26_TO_50");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 50);
    });

    test("4. 50 employees → MUR 4,500/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 50, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 4500);
      assert.equal(res.bandCode, "FROM_26_TO_50");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 50);
    });

    test("5. 51 employees → MUR 5,000/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 51, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 5000);
      assert.equal(res.bandCode, "FROM_51_TO_80");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 80);
    });

    test("6. 80 employees → MUR 5,000/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 80, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 5000);
      assert.equal(res.bandCode, "FROM_51_TO_80");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 80);
    });

    test("7. 81 employees → MUR 6,250/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 81, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 6250);
      assert.equal(res.bandCode, "FROM_81_TO_120");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 120);
    });

    test("8. 120 employees → MUR 6,250/month", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 120, billingInterval: "MONTHLY" });
      assert.equal(res.finalMonthlyAmount, 6250);
      assert.equal(res.bandCode, "FROM_81_TO_120");
      assert.equal(res.isTailoredQuote, false);
      assert.equal(res.includedMaxEmployees, 120);
    });

    test("9. 121 employees → CUSTOM / Contact us (no calculated public price)", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 121, billingInterval: "MONTHLY" });
      assert.equal(res.isTailoredQuote, true);
      assert.equal(res.finalMonthlyAmount, 0);
      assert.equal(res.finalYearlyAmount, 0);
      assert.equal(res.bandCode, "OVER_120");
      assert.match(res.tailoredQuoteMessage || "", /Contact us for a tailored quote/);
    });

    test("10. 500 employees → CUSTOM / Contact us, NOT calculated dynamic pricing", () => {
      const res = calculateAuthoritativePricing({ employeeCount: 500, billingInterval: "MONTHLY" });
      assert.equal(res.isTailoredQuote, true);
      assert.equal(res.finalMonthlyAmount, 0);
      assert.equal(res.finalYearlyAmount, 0);
      assert.equal(res.bandCode, "OVER_120");
      // Must not generate arbitrary 12,500 or 20,000 dynamic pricing
      assert.notEqual(res.finalMonthlyAmount, 12500);
      assert.notEqual(res.finalMonthlyAmount, 20000);
    });
  });

  describe("2. Server-Authoritative Calculation & Tamper Resistance (Test 11)", () => {
    test("11. Client cannot override server-authoritative price", () => {
      // Regardless of plan code provided (legacy ESSENTIAL, PROFESSIONAL, COMPLETE, or STANDARD),
      // the authoritative monthly amounts for standard bands are identical and strictly governed by employee count
      for (const planCode of ["ESSENTIAL", "PROFESSIONAL", "COMPLETE", "STANDARD"]) {
        const p25 = calculateAuthoritativePricing({ planCode, employeeCount: 20 });
        assert.equal(p25.finalMonthlyAmount, 3000);

        const p50 = calculateAuthoritativePricing({ planCode, employeeCount: 40 });
        assert.equal(p50.finalMonthlyAmount, 4500);

        const p80 = calculateAuthoritativePricing({ planCode, employeeCount: 75 });
        assert.equal(p80.finalMonthlyAmount, 5000);

        const p120 = calculateAuthoritativePricing({ planCode, employeeCount: 110 });
        assert.equal(p120.finalMonthlyAmount, 6250);

        const pCustom = calculateAuthoritativePricing({ planCode, employeeCount: 150 });
        assert.equal(pCustom.isTailoredQuote, true);
        assert.equal(pCustom.finalMonthlyAmount, 0);
      }
    });
  });

  describe("3. Seat Limits & Band Enforcement (Test 12)", () => {
    test("12. Seat limits correspond to selected band", () => {
      assert.equal(getBandMaxSeats("UP_TO_25"), 25);
      assert.equal(getBandMaxSeats("FROM_26_TO_50"), 50);
      assert.equal(getBandMaxSeats("FROM_51_TO_80"), 80);
      assert.equal(getBandMaxSeats("FROM_81_TO_120"), 120);
      // OVER_120 without custom contract defaults safely to 120 (no invented 250 seat default)
      assert.equal(getBandMaxSeats("OVER_120"), 120);
      assert.equal(getBandMaxSeats("OVER_120", 300), 300);
    });
  });

  describe("4. Commercial Structure & Tier Unification (Test 13)", () => {
    test("13. Authoritative matrix contains uniform pricing across all legacy plan codes", () => {
      assert.equal(APPROVED_BAND_PRICING.UP_TO_25, 3000);
      assert.equal(APPROVED_BAND_PRICING.FROM_26_TO_50, 4500);
      assert.equal(APPROVED_BAND_PRICING.FROM_51_TO_80, 5000);
      assert.equal(APPROVED_BAND_PRICING.FROM_81_TO_120, 6250);
      assert.equal(APPROVED_BAND_PRICING.OVER_120, null);

      for (const plan of ["ESSENTIAL", "PROFESSIONAL", "COMPLETE"] as const) {
        assert.equal(STANDARD_BAND_PRICING[plan].UP_TO_25, 3000);
        assert.equal(STANDARD_BAND_PRICING[plan].FROM_26_TO_50, 4500);
        assert.equal(STANDARD_BAND_PRICING[plan].FROM_51_TO_80, 5000);
        assert.equal(STANDARD_BAND_PRICING[plan].FROM_81_TO_120, 6250);
        assert.equal(STANDARD_BAND_PRICING[plan].OVER_120, null);
      }
    });
  });

  describe("5. Course Access & Entitlements (Tests 14–17)", () => {
    test("14. Canonical band configs match authoritative specifications", () => {
      const b25 = BANDS_CONFIG.find(b => b.code === "UP_TO_25");
      assert.equal(b25?.maximumEmployees, 25);
      assert.equal(b25?.requiresTailoredQuote, false);

      const b50 = BANDS_CONFIG.find(b => b.code === "FROM_26_TO_50");
      assert.equal(b50?.maximumEmployees, 50);
      assert.equal(b50?.requiresTailoredQuote, false);

      const b80 = BANDS_CONFIG.find(b => b.code === "FROM_51_TO_80");
      assert.equal(b80?.maximumEmployees, 80);
      assert.equal(b80?.requiresTailoredQuote, false);

      const b120 = BANDS_CONFIG.find(b => b.code === "FROM_81_TO_120");
      assert.equal(b120?.maximumEmployees, 120);
      assert.equal(b120?.requiresTailoredQuote, false);

      const bCustom = BANDS_CONFIG.find(b => b.code === "OVER_120");
      assert.equal(bCustom?.maximumEmployees, null);
      assert.equal(bCustom?.requiresTailoredQuote, true);
    });

    test("15. Canonical pricing matrix enforces authoritative band pricing and null for 121+", () => {
      for (const plan of ["ESSENTIAL", "PROFESSIONAL", "COMPLETE"] as const) {
        assert.equal(PRICING_MATRIX[plan].UP_TO_25, 3000);
        assert.equal(PRICING_MATRIX[plan].FROM_26_TO_50, 4500);
        assert.equal(PRICING_MATRIX[plan].FROM_51_TO_80, 5000);
        assert.equal(PRICING_MATRIX[plan].FROM_81_TO_120, 6250);
        assert.equal(PRICING_MATRIX[plan].OVER_120, null);
      }
    });

    test("16. Headcount boundary mapping is robust", () => {
      assert.equal(resolveBandCodeFromEmployeeCount(1), "UP_TO_25");
      assert.equal(resolveBandCodeFromEmployeeCount(25), "UP_TO_25");
      assert.equal(resolveBandCodeFromEmployeeCount(26), "FROM_26_TO_50");
      assert.equal(resolveBandCodeFromEmployeeCount(50), "FROM_26_TO_50");
      assert.equal(resolveBandCodeFromEmployeeCount(51), "FROM_51_TO_80");
      assert.equal(resolveBandCodeFromEmployeeCount(80), "FROM_51_TO_80");
      assert.equal(resolveBandCodeFromEmployeeCount(81), "FROM_81_TO_120");
      assert.equal(resolveBandCodeFromEmployeeCount(120), "FROM_81_TO_120");
      assert.equal(resolveBandCodeFromEmployeeCount(121), "OVER_120");
      assert.equal(resolveBandCodeFromEmployeeCount(500), "OVER_120");
    });

    test("17. Course evaluation grants full access to canonical courses for active administrators", async () => {
      const access = await evaluateCourseAccess(1, {
        role: "platform_admin",
        companyId: 1,
        userId: "admin_test",
        email: "admin@elevio.mu",
        employee: null,
        isDemo: false,
      });
      assert.equal(access.allowed, true);
      assert.equal(access.reason, "INCLUDED_IN_PLAN");
    });
  });

  describe("6. Annual Billing Discount Consistency (Test 18)", () => {
    test("18. Annual pricing consistently follows exact 10% discount rule", () => {
      // Band 1: 3,000 * 12 = 36,000 -> less 10% (3,600) = 32,400 (MUR 2,700/mo equiv)
      const b25 = calculateAuthoritativePricing({ employeeCount: 25, billingInterval: "YEARLY" });
      assert.equal(b25.finalYearlyAmount, 32400);
      assert.equal(b25.annualSavingsMUR, 3600);
      assert.equal(b25.discountPercentage, 10);
      assert.equal(b25.equivalentMonthlyMUR, 2700);

      // Band 2: 4,500 * 12 = 54,000 -> less 10% (5,400) = 48,600 (MUR 4,050/mo equiv)
      const b50 = calculateAuthoritativePricing({ employeeCount: 50, billingInterval: "YEARLY" });
      assert.equal(b50.finalYearlyAmount, 48600);
      assert.equal(b50.annualSavingsMUR, 5400);
      assert.equal(b50.discountPercentage, 10);
      assert.equal(b50.equivalentMonthlyMUR, 4050);

      // Band 3: 5,000 * 12 = 60,000 -> less 10% (6,000) = 54,000 (MUR 4,500/mo equiv)
      const b80 = calculateAuthoritativePricing({ employeeCount: 80, billingInterval: "YEARLY" });
      assert.equal(b80.finalYearlyAmount, 54000);
      assert.equal(b80.annualSavingsMUR, 6000);
      assert.equal(b80.discountPercentage, 10);
      assert.equal(b80.equivalentMonthlyMUR, 4500);

      // Band 4: 6,250 * 12 = 75,000 -> less 10% (7,500) = 67,500 (MUR 5,625/mo equiv)
      const b120 = calculateAuthoritativePricing({ employeeCount: 120, billingInterval: "YEARLY" });
      assert.equal(b120.finalYearlyAmount, 67500);
      assert.equal(b120.annualSavingsMUR, 7500);
      assert.equal(b120.discountPercentage, 10);
      assert.equal(b120.equivalentMonthlyMUR, 5625);

      // Band 5: >120 -> 0 yearly amount, tailored quote
      const bCustom = calculateAuthoritativePricing({ employeeCount: 150, billingInterval: "YEARLY" });
      assert.equal(bCustom.isTailoredQuote, true);
      assert.equal(bCustom.finalYearlyAmount, 0);
      assert.equal(bCustom.annualSavingsMUR, 0);
    });
  });
});
