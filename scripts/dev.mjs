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
  PORT: process.env.PORT || "8080",
};

console.log("\x1b[36m[Elevio]\x1b[0m Starting Elevio Skills API Server (port 8080) and Web App (port 3000)...");

const api = spawn("npm", ["run", "dev", "--workspace=@workspace/api-server"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env,
});

const web = spawn("npm", ["run", "dev", "--workspace=@workspace/ecolearn"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env,
});

const cleanup = (code = 0) => {
  try { api.kill("SIGTERM"); } catch {}
  try { web.kill("SIGTERM"); } catch {}
  process.exit(code);
};

api.on("error", (err) => {
  console.error("\x1b[31m[API Server Error]\x1b[0m", err);
});

web.on("error", (err) => {
  console.error("\x1b[31m[Web Error]\x1b[0m", err);
});

process.on("SIGINT", () => cleanup(0));
process.on("SIGTERM", () => cleanup(0));
process.on("exit", () => cleanup(0));
