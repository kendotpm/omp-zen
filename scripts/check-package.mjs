import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const runtime = [
  "index.ts",
  "contracts.ts",
  "renderer.ts",
  "ordinary-adapters.ts",
  "lifecycle-adapters.ts",
];
const required = [...runtime, "package.json", "README.md", "LICENSE", "CHANGELOG.md", "CONTRIBUTING.md", "SECURITY.md"];
const allowed = new Set(required);

assert.equal(manifest.name, "omp-compact-tool-calls");
assert.match(manifest.version, /^\d+\.\d+\.\d+(?:-[\da-z.-]+)?(?:\+[\da-z.-]+)?$/i, "A release needs a semantic version");
assert.notEqual(manifest.private, true);
assert.equal(manifest.type, "module");
assert.equal(manifest.license, "MIT");
assert.equal(manifest.engines?.bun, ">=1.3.14");
assert.deepEqual(manifest.omp?.extensions, ["./index.ts"]);
assert.equal(manifest.main, "./index.ts");
assert.deepEqual(manifest.exports, { ".": "./index.ts" });
assert.deepEqual(manifest.files, [
  ...runtime, "README.md", "LICENSE", "CHANGELOG.md", "CONTRIBUTING.md", "SECURITY.md", "docs/**/*.md",
]);
assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0, "Host packages must not be runtime dependencies");
assert.equal((manifest.bundledDependencies ?? manifest.bundleDependencies ?? []).length, 0, "Dependencies must not be bundled");
for (const name of ["@oh-my-pi/pi-coding-agent", "@oh-my-pi/pi-tui"]) {
  assert.equal(manifest.peerDependencies?.[name], "18.8.7", `${name} peer version must match the audited host`);
  assert.equal(manifest.peerDependenciesMeta?.[name]?.optional, true, `${name} must be host-provided`);
  assert.equal(manifest.devDependencies?.[name], "18.8.7", `${name} test version must match the audited host`);
}
for (const hook of ["preinstall", "install", "postinstall", "prepare", "prepublish", "prepublishOnly", "prepack", "postpack", "publish", "postpublish"]) {
  assert.equal(manifest.scripts?.[hook], undefined, `Automatic ${hook} hooks are not allowed`);
}

const output = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: root,
  encoding: "utf8",
});
const reports = JSON.parse(output);
assert.ok(Array.isArray(reports) && reports.length === 1, "Expected exactly one npm pack report");
const report = reports[0];
assert.equal(report.name, manifest.name);
assert.equal(report.version, manifest.version);
assert.ok(Array.isArray(report.files), "npm pack report must list archive files");
assert.equal((report.bundled ?? []).length, 0, "Archive must not contain bundled dependencies");

const packed = new Set();
const forbiddenPaths = /\/Users\/|\/home\/[^/]+\/|[A-Z]:[\\/]Users[\\/]|harness-dev|\.omp[\\/]harness|capabilities[\\/]compact-tool-calls/i;
for (const file of report.files) {
  const relative = file.path;
  assert.equal(typeof relative, "string", "Archive paths must be strings");
  assert.equal(posix.normalize(relative), relative, `Non-normalized archive path: ${relative}`);
  assert.ok(!posix.isAbsolute(relative) && !relative.split("/").some(part => part === ".." || part.startsWith(".")), `Unsafe archive path: ${relative}`);
  assert.ok(allowed.has(relative) || /^docs\/(?:[^/]+\/)*[^/]+\.md$/.test(relative), `Unexpected archive file: ${relative}`);
  assert.ok(!packed.has(relative), `Duplicate archive file: ${relative}`);
  packed.add(relative);
  const absolute = join(root, relative);
  assert.ok(lstatSync(absolute).isFile(), `Archive entries must be regular files: ${relative}`);
  assert.ok(!forbiddenPaths.test(readFileSync(absolute, "utf8")), `Local or harness path in archive file: ${relative}`);
}
for (const relative of required) {
  assert.ok(packed.has(relative), `Missing required archive file: ${relative}`);
}
for (const entry of [manifest.main, ...manifest.omp.extensions, ...Object.values(manifest.exports)]) {
  assert.ok(packed.has(entry.replace(/^\.\//, "")), `Entrypoint absent from archive: ${entry}`);
}
console.log(`Package check passed: ${report.name}@${report.version}, ${packed.size} allowlisted files; no archive written.`);
