import { ensureCohort15_2_10LRemediation } from "../lib/ensureCohort15_2_10LRemediation.js";

async function main() {
  console.log("Applying Sprint 15.2.10L Assessment Quality Remediation...");
  await ensureCohort15_2_10LRemediation();
  console.log("Sprint 15.2.10L Assessment Quality Remediation applied successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to apply Cohort 15.2.10L remediation:", err);
  process.exit(1);
});
