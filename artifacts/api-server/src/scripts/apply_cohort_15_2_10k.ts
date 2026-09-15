import { ensureCohort15_2_10KRemediation } from "../lib/ensureCohort15_2_10KRemediation.js";

async function main() {
  console.log("Starting Cohort 15.2.10K remediation runner...");
  await ensureCohort15_2_10KRemediation();
  console.log("Remediation execution complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error running Cohort 15.2.10K remediation:", err);
  process.exit(1);
});
