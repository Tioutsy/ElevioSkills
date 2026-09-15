import { ensureCohort15_2_10ERemediation } from "../lib/ensureCohort15_2_10ERemediation";

async function main() {
  console.log("Starting Cohort 15.2.10E remediation runner...");
  await ensureCohort15_2_10ERemediation();
  console.log("Remediation execution complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error executing remediation:", err);
  process.exit(1);
});
