import { ensureCohort15_2_10FRemediation } from "../lib/ensureCohort15_2_10FRemediation";

async function main() {
  console.log("Starting Cohort 15.2.10F remediation runner...");
  await ensureCohort15_2_10FRemediation();
  console.log("Remediation execution complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error executing remediation:", err);
  process.exit(1);
});
