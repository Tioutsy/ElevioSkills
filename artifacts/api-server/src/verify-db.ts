import { verifyDatabaseIntegrity } from "./lib/verifyDatabaseIntegrity.js";
import { ensureSchemaModifications } from "./lib/ensureSchemaModifications.js";

async function main() {
  console.log("Ensuring schema modifications...");
  await ensureSchemaModifications();

  console.log("Running database integrity verification...");
  const result = await verifyDatabaseIntegrity();
  console.log(JSON.stringify(result, null, 2));

  if (!result.valid) {
    console.error("Database integrity check failed!");
    process.exit(1);
  }

  console.log("Database integrity verified successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error during database verification:", err);
  process.exit(1);
});
