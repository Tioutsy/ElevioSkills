import { ensureExpandedCatalogueRecovery } from "../lib/ensureExpandedCatalogueRecovery";
import fs from "fs";

async function main() {
  console.log("Running ensureExpandedCatalogueRecovery in verified zero-write dry-run mode...");
  const report = await ensureExpandedCatalogueRecovery({ dryRun: true });

  const artifactPath =
    "/Users/sharonlennon/.gemini/antigravity-ide/brain/75567789-3312-42f9-8945-ad365293292a/catalogue_recovery_dry_run.json";

  fs.writeFileSync(artifactPath, JSON.stringify(report, null, 2));
  console.log(`Saved dry-run artifact to ${artifactPath}`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
