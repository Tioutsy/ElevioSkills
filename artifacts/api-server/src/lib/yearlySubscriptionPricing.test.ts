import assert from "node:assert/strict";
import test, { describe } from "node:test";
import {
  calculateSubscriptionPricing,
  calculateAuthoritativePricing,
  normalizeBillingInterval,
  normalizePlanCode,
} from "./subscriptionPricingService";

describe("Sprint 16.0A — Subscription Payment Options & Authoritative Pricing Suite", () => {
  describe("1. Standard Bands (1–120 Employees) Pricing & 10% Yearly Discount", () => {
    test("Monthly prices remain authoritative for 1–120 employees", () => {
      const band25Monthly = calculateSubscriptionPricing(3000, "MONTHLY");
      assert.equal(band25Monthly.finalAmount, 3000);
      assert.equal(band25Monthly.discountPercentage, 0);
      assert.equal(band25Monthly.discountAmount, 0);
      assert.equal(band25Monthly.currency, "MUR");

      const band50Monthly = calculateSubscriptionPricing(4500, "MONTHLY");
      assert.equal(band50Monthly.finalAmount, 4500);

      const band80Monthly = calculateSubscriptionPricing(5000, "MONTHLY");
      assert.equal(band80Monthly.finalAmount, 5000);

      const band120Monthly = calculateSubscriptionPricing(6250, "MONTHLY");
      assert.equal(band120Monthly.finalAmount, 6250);
    });

    test("Yearly prices for 1–120 employees consistently follow exact 10% discount", () => {
      // 1-25: 3,000 * 12 = 36,000 - 3,600 = 32,400
      const b25 = calculateSubscriptionPricing(3000, "YEARLY");
      assert.equal(b25.finalAmount, 32400);
      assert.equal(b25.annualSavings, 3600);

      // 26-50: 4,500 * 12 = 54,000 - 5,400 = 48,600
      const b50 = calculateSubscriptionPricing(4500, "YEARLY");
      assert.equal(b50.finalAmount, 48600);
      assert.equal(b50.annualSavings, 5400);

      // 51-80: 5,000 * 12 = 60,000 - 6,000 = 54,000
      const b80 = calculateSubscriptionPricing(5000, "YEARLY");
      assert.equal(b80.finalAmount, 54000);
      assert.equal(b80.annualSavings, 6000);

      // 81-120: 6,250 * 12 = 75,000 - 7,500 = 67,500
      const b120 = calculateSubscriptionPricing(6250, "YEARLY");
      assert.equal(b120.finalAmount, 67500);
      assert.equal(b120.annualSavings, 7500);
    });
  });

  describe("2. Authoritative Company Headcount Pricing Resolution", () => {
    test("Authoritative calculations across all headcounts", () => {
      // 20 employees -> Band 1 (3,000/mo, 32,400/yr)
      const r20m = calculateAuthoritativePricing({ employeeCount: 20, billingInterval: "MONTHLY" });
      assert.equal(r20m.finalMonthlyAmount, 3000);
      const r20y = calculateAuthoritativePricing({ employeeCount: 20, billingInterval: "YEARLY" });
      assert.equal(r20y.finalYearlyAmount, 32400);
      assert.equal(r20y.annualSavings, 3600);

      // 45 employees -> Band 2 (4,500/mo, 48,600/yr)
      const r45m = calculateAuthoritativePricing({ employeeCount: 45, billingInterval: "MONTHLY" });
      assert.equal(r45m.finalMonthlyAmount, 4500);
      const r45y = calculateAuthoritativePricing({ employeeCount: 45, billingInterval: "YEARLY" });
      assert.equal(r45y.finalYearlyAmount, 48600);

      // 70 employees -> Band 3 (5,000/mo, 54,000/yr)
      const r70m = calculateAuthoritativePricing({ employeeCount: 70, billingInterval: "MONTHLY" });
      assert.equal(r70m.finalMonthlyAmount, 5000);
      const r70y = calculateAuthoritativePricing({ employeeCount: 70, billingInterval: "YEARLY" });
      assert.equal(r70y.finalYearlyAmount, 54000);

      // 100 employees -> Band 4 (6,250/mo, 67,500/yr)
      const r100m = calculateAuthoritativePricing({ employeeCount: 100, billingInterval: "MONTHLY" });
      assert.equal(r100m.finalMonthlyAmount, 6250);
      const r100y = calculateAuthoritativePricing({ employeeCount: 100, billingInterval: "YEARLY" });
      assert.equal(r100y.finalYearlyAmount, 67500);

      // 121 employees -> Custom tailored quote (no calculated dynamic pricing)
      const r121 = calculateAuthoritativePricing({ employeeCount: 121, billingInterval: "MONTHLY" });
      assert.equal(r121.isTailoredQuote, true);
      assert.equal(r121.finalMonthlyAmount, 0);

      // 500 employees -> Custom tailored quote (no calculated dynamic pricing)
      const r500 = calculateAuthoritativePricing({ employeeCount: 500, billingInterval: "MONTHLY" });
      assert.equal(r500.isTailoredQuote, true);
      assert.equal(r500.finalMonthlyAmount, 0);
    });
  });

  describe("3. Input Validation & Error Handling", () => {
    test("Normalizes plan codes and billing intervals safely", () => {
      assert.equal(normalizePlanCode("essential"), "ESSENTIAL");
      assert.equal(normalizePlanCode("PROFESSIONAL"), "PROFESSIONAL");
      assert.equal(normalizePlanCode("complete"), "COMPLETE");
      assert.equal(normalizePlanCode("STANDARD"), "COMPLETE"); // Standard maps to COMPLETE
      assert.equal(normalizePlanCode(null), "COMPLETE");

      assert.equal(normalizeBillingInterval("monthly"), "MONTHLY");
      assert.equal(normalizeBillingInterval("YEARLY"), "YEARLY");
      assert.equal(normalizeBillingInterval("annual"), "YEARLY");
      assert.throws(() => normalizeBillingInterval("QUARTERLY"), /Invalid billing interval/);
    });
  });
});
