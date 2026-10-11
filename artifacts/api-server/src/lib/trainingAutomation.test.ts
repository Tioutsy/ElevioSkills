import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getDefaultPolicy,
  validatePolicyInput,
  getCompanyAutomationPolicy,
  updateCompanyAutomationPolicy,
  pauseCompanyAutomation,
  resumeCompanyAutomation,
  generatePolicyPreviewText,
} from "./trainingAutomationPolicyService";
import {
  runAutomationCycleForCompany,
  getAutomationEffectivenessMetrics,
} from "./trainingAutomationService";
import { CompanyAccess } from "./access";

describe("Sprint 11C — Training Automation Policy & Governance Engine", () => {
  const mockAccessCompanyA: CompanyAccess = {
    companyId: 991,
    role: "company_admin",
    userId: "usr_admin_compA",
    email: "adminA@test.com",
    employee: null,
    isDemo: false,
  };

  const mockAccessCompanyB: CompanyAccess = {
    companyId: 992,
    role: "company_admin",
    userId: "usr_admin_compB",
    email: "adminB@test.com",
    employee: null,
    isDemo: false,
  };

  test("Default policy is OFF by default for new companies", async () => {
    const policy = getDefaultPolicy(991);
    assert.equal(policy.enabled, false, "Policy must be disabled by default until explicit opt-in");
    assert.equal(policy.paused, false);
    assert.equal(policy.preDueReminderDays, 3);
    assert.equal(policy.overdueReminderDays, 1);
    assert.equal(policy.secondOverdueReminderDays, 7);
    assert.equal(policy.adminEscalationDays, 14);
    assert.equal(policy.managerEscalationEnabled, false, "Manager escalation must be withheld if scope unconfigured");
  });

  test("Input validation rejects invalid days or timing sequence", () => {
    const errNegative = validatePolicyInput({ preDueReminderDays: -5 });
    assert.notEqual(errNegative, null, "Negative days must be rejected");

    const errHuge = validatePolicyInput({ adminEscalationDays: 500 });
    assert.notEqual(errHuge, null, "Excessive days must be rejected");

    const errSequence = validatePolicyInput({
      overdueReminderDays: 5,
      secondOverdueReminderDays: 3,
    });
    assert.notEqual(errSequence, null, "Second overdue reminder must follow first overdue reminder");

    const valid = validatePolicyInput({
      preDueReminderDays: 3,
      overdueReminderDays: 1,
      secondOverdueReminderDays: 7,
      adminEscalationDays: 14,
    });
    assert.equal(valid, null, "Valid configuration must pass validation");
  });

  test("Company policy retrieval and update", async () => {
    const initial = await getCompanyAutomationPolicy(mockAccessCompanyA);
    assert.equal(initial.enabled, false);

    const updated = await updateCompanyAutomationPolicy(
      mockAccessCompanyA,
      {
        enabled: true,
        preDueReminderDays: 2,
        weeklySummaryEnabled: true,
      },
      "usr_admin_compA"
    );

    assert.equal(updated.enabled, true);
    assert.equal(updated.preDueReminderDays, 2);
    assert.equal(updated.weeklySummaryEnabled, true);

    const fetchedAgain = await getCompanyAutomationPolicy(mockAccessCompanyA);
    assert.equal(fetchedAgain.preDueReminderDays, 2);
  });

  test("Pause and Resume policy execution", async () => {
    await updateCompanyAutomationPolicy(mockAccessCompanyA, { enabled: true }, "usr_admin_compA");

    const paused = await pauseCompanyAutomation(mockAccessCompanyA, "usr_admin_compA");
    assert.equal(paused.paused, true);
    assert.equal(paused.enabled, true, "Configuration remains preserved when paused");

    const resumed = await resumeCompanyAutomation(mockAccessCompanyA, "usr_admin_compA");
    assert.equal(resumed.paused, false);
    assert.equal(resumed.enabled, true);
  });

  test("Generate human-readable policy preview", async () => {
    const disabledPreview = generatePolicyPreviewText(getDefaultPolicy(991));
    assert.ok(disabledPreview[0].includes("disabled"));

    const activePolicy = {
      ...getDefaultPolicy(991),
      enabled: true,
      preDueReminderEnabled: true,
      preDueReminderDays: 3,
      overdueReminderEnabled: true,
      overdueReminderDays: 1,
      secondOverdueReminderEnabled: true,
      secondOverdueReminderDays: 7,
      adminEscalationEnabled: true,
      adminEscalationDays: 14,
    };

    const activePreview = generatePolicyPreviewText(activePolicy);
    assert.equal(activePreview.length, 4);
    assert.ok(activePreview[0].includes("3 day(s) before training is due"));
    assert.ok(activePreview[1].includes("1 day(s) after due date"));
    assert.ok(activePreview[2].includes("7 day(s)"));
    assert.ok(activePreview[3].includes("14 day(s)"));
  });

  test("Automation cycle skips when policy is disabled or paused", async () => {
    // Disabled policy
    await updateCompanyAutomationPolicy(mockAccessCompanyA, { enabled: false }, "usr_admin_compA");
    const disabledRun = await runAutomationCycleForCompany(mockAccessCompanyA);
    assert.equal(disabledRun.evaluatedCount, 0);

    // Paused policy
    await updateCompanyAutomationPolicy(mockAccessCompanyA, { enabled: true }, "usr_admin_compA");
    await pauseCompanyAutomation(mockAccessCompanyA, "usr_admin_compA");
    const pausedRun = await runAutomationCycleForCompany(mockAccessCompanyA);
    assert.equal(pausedRun.evaluatedCount, 0);
  });

  test("Tenant isolation — Company A evaluation does not process Company B data", async () => {
    await updateCompanyAutomationPolicy(mockAccessCompanyA, { enabled: true }, "usr_admin_compA");
    await updateCompanyAutomationPolicy(mockAccessCompanyB, { enabled: false }, "usr_admin_compB");

    const runA = await runAutomationCycleForCompany(mockAccessCompanyA);
    assert.equal(runA.companyId, 991);

    const runB = await runAutomationCycleForCompany(mockAccessCompanyB);
    assert.equal(runB.companyId, 992);
    assert.equal(runB.policyEnabled, false);
  });

  test("Automation effectiveness metrics calculation", async () => {
    const stats = await getAutomationEffectivenessMetrics(mockAccessCompanyA);
    assert.ok(typeof stats.totalRemindersSent === "number");
    assert.ok(typeof stats.completionsPostReminder === "number");
    assert.ok(typeof stats.completionRatePostReminder === "number");
  });
});
