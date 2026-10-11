import assert from "node:assert/strict";
import { resolve } from "node:path";
import { loadExtensions } from "@oh-my-pi/pi-coding-agent/extensibility/extensions";

// Use the real OMP loader and host imports, without model requests or user config.
// Interactive compact rendering needs the separate terminal workflow in CONTRIBUTING.md.
const root = resolve(import.meta.dir, "..");
const entry = process.argv[2] ? resolve(process.argv[2]) : resolve(root, "index.ts");
const loaded = await loadExtensions([entry], root);
assert.deepEqual(loaded.errors, [], "The extension must import and initialize in OMP");
assert.equal(loaded.extensions.length, 1, "OMP must load the standalone entrypoint");
console.log("PASS: native OMP loader imported and initialized Compact Tool Calls.");
console.log("No model, approvals, tool execution, or interactive UI was exercised by this check.");