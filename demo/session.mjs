import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Only the recording environment is prepared. OMP creates the app itself.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const scratch = join(root, ".local");
mkdirSync(scratch, { recursive: true });
const workspace = mkdtempSync(join(scratch, "todo-app-"));
writeFileSync(join(scratch, "last-demo-workspace.txt"), workspace);
const config = join(scratch, "todo-recording.yml");
writeFileSync(config, `startup:\n  quiet: true\n  checkUpdate: false\n  setupWizard: false\nautoResume: false\nmarketplace:\n  autoUpdate: off\ntheme:\n  dark: dark-dracula\n  light: dark-dracula\ntools:\n  xdev: false\n  speculativeExecution:\n    enabled: false\nedit:\n  streamingAbort: false\nstatusLine:\n  preset: custom\n  leftSegments: []\n  rightSegments: []\n  showHookStatus: false\nsymbolPreset: unicode\n`);
const args = ["--cwd", workspace, "--config", config, "--no-extensions", "--extension", root,
  "--no-session", "--no-title", "--no-skills", "--no-rules", "--no-lsp", "--hide-thinking", "--thinking", "off",
  "--append-system-prompt", "This is a public demo in a disposable workspace. Keep all app files in this workspace. Do not deploy, publish, send communications, or read personal credentials. Do not use browser or computer tools. Use the ordinary local coding tools; choose the app implementation and workflow yourself.",
  "Build a todo list app."];
if (process.env.OMP_ZEN_DEMO_MODEL) args.unshift("--model", process.env.OMP_ZEN_DEMO_MODEL);
// npm prepends the development SDK's bin directory. Record the installed app.
const cliPath = (process.env.PATH || "").split(":").filter(entry => entry !== join(root, "node_modules", ".bin")).join(":");
const child = spawnSync(process.env.OMP_ZEN_DEMO_OMP || "omp", args, {
  cwd: workspace, stdio: "inherit", env: { ...process.env, PATH: cliPath },
});
if (child.error) throw child.error;
process.exitCode = child.status ?? 1;
