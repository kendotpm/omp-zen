import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Real OMP, real built-in tools, disposable public fixtures. Never copy auth.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workspace = join(root, ".local", "demo-workspace");
mkdirSync(join(workspace, "src"), { recursive: true });
for (let index = 1; index <= 12; index++) {
  const name = `module-${String(index).padStart(2, "0")}.js`;
  writeFileSync(join(workspace, "src", name), `export const moduleId = ${index};\nexport const greeting = "Hello from module ${index}";\nexport function format(value) { return value.trim(); }\n`);
}
writeFileSync(join(workspace, "package.json"), '{"type":"module"}\n');
writeFileSync(join(workspace, "check.mjs"), `import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout } from "node:timers/promises";
const batch = Number(process.argv[2]);
for (let step = 0; step < 6; step++) {
  const index = ((batch - 1) * 3 + step) % 12 + 1;
  const file = "src/module-" + String(index).padStart(2, "0") + ".js";
  const checked = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (checked.status !== 0) { process.stderr.write(checked.stderr); process.exit(1); }
  const source = readFileSync(file, "utf8");
  console.log("Batch " + process.argv[2] + " | " + file + " | syntax OK | " + Buffer.byteLength(source) + " bytes");
  await setTimeout(650);
}
console.log("Batch " + process.argv[2] + " complete: 6 syntax checks passed.");
`);
const config = join(workspace, "recording.yml");
writeFileSync(config, `startup:\n  quiet: true\n  checkUpdate: false\n  setupWizard: false\nautoResume: false\nmarketplace:\n  autoUpdate: off\nstatusLine:\n  preset: custom\n  leftSegments: []\n  rightSegments: []\n  showHookStatus: false\nsymbolPreset: unicode\n`);
const system = "This is a public terminal demo with disposable fixtures. Use only native glob, grep, and bash. First glob for module-0[1-3].js in src, then grep for moduleId = 1; in src. Then execute node check.mjs 01, node check.mjs 02, node check.mjs 03, node check.mjs 04, node check.mjs 05, node check.mjs 06, node check.mjs 07, node check.mjs 08 in that exact order, one bash call at a time, waiting for each to finish. Do not combine commands or skip calls. Do not read/write other files or add commentary. At the end reply exactly: All eight batches checked. Then stop.";
const args = ["--cwd", workspace, "--config", config, "--no-extensions", "--extension", root,
  "--no-session", "--no-title", "--no-skills", "--no-rules", "--no-lsp", "--hide-thinking", "--thinking", "off",
  "--tools", "glob,grep,bash", "--system-prompt", system, "Check all twelve modules, then run the eight validation batches."];
if (process.env.OMP_ZEN_DEMO_MODEL) args.unshift("--model", process.env.OMP_ZEN_DEMO_MODEL);
// npm prepends the development SDK's bin directory; record the installed OMP CLI,
// not a second host launched through the contributor's possibly older Bun.
const cliPath = (process.env.PATH || "").split(":").filter(entry => entry !== join(root, "node_modules", ".bin")).join(":");
const child = spawnSync(process.env.OMP_ZEN_DEMO_OMP || "omp", args, {
  cwd: workspace, stdio: "inherit", env: { ...process.env, PATH: cliPath },
});
if (child.error) throw child.error;
process.exitCode = child.status ?? 1;
