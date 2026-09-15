import { ensureCohort15_2_10GRemediation } from "../lib/ensureCohort15_2_10GRemediation";

async function main() {
  console.log("Starting Cohort 15.2.10G remediation runner...");
  await ensureCohort15_2_10GRemediation();
  console.log("Remediation execution complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error executing remediation:", err);
  process.exit(1);
});
