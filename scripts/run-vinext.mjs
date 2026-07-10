import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const command = process.argv[2];
const allowedCommands = new Set(["dev", "build", "start"]);

if (!allowedCommands.has(command)) {
  console.error("Usage: node scripts/run-vinext.mjs <dev|build|start>");
  process.exit(1);
}

process.env.WRANGLER_LOG_PATH ??= ".wrangler/wrangler.log";

const cliPath = fileURLToPath(new URL("../node_modules/vinext/dist/cli.js", import.meta.url));
const child = spawn(process.execPath, [cliPath, command], {
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});
