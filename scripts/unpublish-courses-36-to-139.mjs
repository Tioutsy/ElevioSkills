import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const nodeBinDir = "/Users/sharonlennon/Library/pnpm/nodejs/20.20.2/bin";
const pnpmDir = "/Users/sharonlennon/Library/pnpm";
const currentPath = process.env.PATH || "";
const envPath = currentPath.includes(nodeBinDir)
  ? currentPath
  : `${nodeBinDir}:${pnpmDir}:${currentPath}`;

const env = {
  ...process.env,
  PATH: envPath,
};

const tsxPath = path.resolve(root, "artifacts/api-server/node_modules/.bin/tsx");
const scriptPath = path.resolve(root, "artifacts/api-server/src/scripts/unpublishCourses36to139.ts");

const proc = spawn(tsxPath, [scriptPath], {
  cwd: root,
  stdio: "inherit",
  env,
});

proc.on("exit", (code) => {
  process.exit(code || 0);
});
