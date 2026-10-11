import test from "node:test";
import assert from "node:assert/strict";
import { ensureExpandedCatalogueRecovery } from "./ensureExpandedCatalogueRecovery";

test("Ensure Expanded Catalogue Recovery Adapter Suite", async (t) => {
  await t.test("1. Dry-run mode produces a full reconciliation report without mutating DB", async () => {
    const report = await ensureExpandedCatalogueRecovery({ dryRun: true });

    assert.equal(report.mode, "DRY_RUN");
    assert.equal(report.totalCatalogueTarget, 136);
    assert.ok(report.existingCourseCount >= 0);
    assert.ok(Array.isArray(report.missingCourses));
    assert.equal(report.executedSteps.length, 0, "No steps should be executed during dry-run");
    assert.equal(report.safetyGuardStatus.neverDeleteRows, true);
    assert.equal(report.safetyGuardStatus.nonDestructiveMatch, true);
  });

  await t.test("2. Execution without ENABLE_CATALOGUE_RECOVERY throws safety violation", async () => {
    delete process.env.ENABLE_CATALOGUE_RECOVERY;
    await assert.rejects(
      async () => {
        await ensureExpandedCatalogueRecovery({ dryRun: false });
      },
      /SAFETY HALT: ENABLE_CATALOGUE_RECOVERY=true must be explicitly set/
    );
  });
});
