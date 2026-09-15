import { ensureCohort15_2_10JRemediation } from "../lib/ensureCohort15_2_10JRemediation.js";

async function main() {
  console.log("Starting Cohort 15.2.10J remediation runner...");
  await ensureCohort15_2_10JRemediation();
  console.log("Remediation execution complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error executing remediation:", err);
  process.exit(1);
});
