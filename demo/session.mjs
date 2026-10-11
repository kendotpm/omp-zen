import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Real OMP, real built-in tools, disposable public fixtures. Never copy auth.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workspace = join(root, ".local", "demo-workspace");
mkdirSync(join(workspace, "src"), { recursive: true });
for (const [name, content] of Object.entries({
  "hello.js": 'export const greeting = "Hello, world.";\n',
  "format.js": 'export function format(greeting) { return greeting.trim(); }\n',
  "index.js": 'import { greeting } from "./hello.js";\nimport { format } from "./format.js";\nconsole.log(format(greeting));\n',
})) writeFileSync(join(workspace, "src", name), content);
writeFileSync(join(workspace, "package.json"), '{"type":"module"}\n');
writeFileSync(join(workspace, "check.sh"), 'set -eu\nfor file in src/*.js; do node --check "$file"; done\nprintf "3 files checked.\\nNo syntax errors.\\nReady to keep working.\\n"\n');
const config = join(workspace, "recording.yml");
writeFileSync(config, `startup:\n  quiet: true\n  checkUpdate: false\n  setupWizard: false\nautoResume: false\nmarketplace:\n  autoUpdate: off\nstatusLine:\n  preset: custom\n  leftSegments: []\n  rightSegments: []\n  showHookStatus: false\nsymbolPreset: unicode\n`);
const system = "This is a public terminal demo with disposable fixtures. Run exactly these native tools in order: glob for *.js in src; grep for Hello, world in src; bash with command bash check.sh. Do not read or write other files, do not use other tools, and do not add planning commentary. After all three results, reply exactly: All clear. Details are a keypress away. Then stop.";
const args = ["--cwd", workspace, "--config", config, "--no-extensions", "--extension", root,
  "--no-session", "--no-title", "--no-skills", "--no-rules", "--no-lsp", "--hide-thinking",
  "--tools", "glob,grep,bash", "--system-prompt", system, "Check the demo files. Keep the report short."];
if (process.env.OMP_ZEN_DEMO_MODEL) args.unshift("--model", process.env.OMP_ZEN_DEMO_MODEL);
const child = spawnSync("omp", args, { cwd: workspace, stdio: "inherit" });
if (child.error) throw child.error;
process.exitCode = child.status ?? 1;
