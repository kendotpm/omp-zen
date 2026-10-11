import { describe, expect, it } from "vitest";
import { rows, target, status, hasMedia, type RenderOptions } from "../renderer";

const collapsed: RenderOptions = { expanded: false, isPartial: true };

describe("compact tool presentation", () => {
  it("keeps one status line as arguments and results arrive", () => {
    const phases = [
      rows("write", {}, undefined, collapsed),
      rows("write", { path: "file.ts", content: "a\nb\nc" }, undefined, { ...collapsed, argsComplete: true }),
      rows("write", { path: "file.ts" }, undefined, { ...collapsed, executionStarted: true }),
      rows("write", { path: "file.ts" }, { content: [{ type: "text", text: "partial\noutput" }] }, collapsed),
      rows("write", { path: "file.ts" }, { content: [{ type: "text", text: "finished\noutput" }] }, { expanded: false, isPartial: false }),
      rows("write", { path: "file.ts" }, { content: [{ type: "text", text: "failure\nreason" }], isError: true }, { expanded: false, isPartial: false }),
    ];
    expect(phases.every(lines => lines.length === 1)).toBe(true);
    expect(phases.slice(0, 4).every(lines => !lines[0].includes("output"))).toBe(true);
    expect(phases[4][0]).toContain("done");
    expect(phases[5][0]).toContain("error");
  });

  it("reveals output only when explicitly expanded", () => {
    const args = { path: "file.ts" };
    const result = { content: [{ type: "text", text: "alpha\nbeta" }] };
    expect(rows("write", args, result, { expanded: false, isPartial: false })).toEqual(["write · file.ts · done"]);
    expect(rows("write", args, result, { expanded: true, isPartial: false })).toEqual(["write · file.ts · done", "alpha", "beta"]);
  });

  it("cannot turn hostile or multiline targets into extra terminal rows", () => {
    const line = rows("bash", { command: "echo x\n\x1b[2J\t\u2028next" }, undefined, collapsed);
    expect(line).toEqual(["bash · echo x   next · preparing"]);
    expect(target("edit", { input: "[src/file.ts#ABCD]\nPUT >1:\n+preview" })).toBe("src/file.ts");
  });

  it("does not label background work or cancelled work done", () => {
    expect(status({ content: [], details: { async: { state: "running" } } }, { expanded: false, isPartial: false })).toBe("running");
    expect(status({ content: [], details: { aborted: true } }, collapsed)).toBe("cancelled");
    expect(status({ content: [{ type: "text", text: "Command aborted" }], isError: true }, { expanded: false, isPartial: false })).toBe("cancelled");
    expect(status({ content: [{ type: "text", text: "[Command cancelled]\n" }], isError: true }, { expanded: false, isPartial: false })).toBe("cancelled");
  });

  it("distinguishes accepted work from terminal async outcomes", () => {
    const options = { expanded: false, isPartial: true };
    expect(status({ content: [], details: { async: { state: "queued" } } }, options)).toBe("accepted");
    expect(status({ content: [], details: { async: { state: "completed" } } }, options)).toBe("done");
    expect(status({ content: [], details: { async: { state: "failed" } } }, options)).toBe("error");
    expect(status({ content: [], details: { async: { state: "cancelled" } } }, options)).toBe("cancelled");
    expect(status({ content: [], details: { applied: false } }, { ...options, isPartial: false })).toBe("proposed");
  });

  it("does not mistake service readiness for completion", () => {
    const options = { expanded: false, isPartial: false };
    expect(status({ content: [], details: { service: { state: "running", ready: true } } }, options)).toBe("running");
    expect(status({ content: [], details: { service: { state: "starting", timedOut: true } } }, options)).toBe("timed out");
    expect(status({ content: [], details: { service: { state: "failed" } } }, options)).toBe("error");
  });

  it("reveals structured diffs and artifact links even alongside result text", () => {
    const result = {
      content: [{ type: "text", text: "Applied change" }],
      details: { diff: "-beta\n+BETA", diagnostics: { messages: ["type mismatch"] }, artifact: "artifact://42" },
    };
    const hidden = rows("edit", { path: "a.txt" }, result, { expanded: false, isPartial: false });
    expect(hidden).toHaveLength(1);
    expect(hidden.join("\n")).not.toMatch(/BETA|type mismatch|artifact:\/\/42/);
    const expanded = rows("edit", { path: "a.txt" }, result, { expanded: true, isPartial: false }).join("\n");
    expect(expanded).toContain("Applied change");
    expect(expanded).toContain("BETA");
    expect(expanded).toContain("type mismatch");
    expect(expanded).toContain("artifact://42");
  });

  it("retains error precedence during progress and malformed detail payloads", () => {
    expect(status({ content: [], isError: true, details: { async: { state: "running" } } }, collapsed)).toBe("error");
    expect(status({ content: [], details: { success: false } }, collapsed)).toBe("error");
    expect(status({ content: [], details: null }, { expanded: false, isPartial: false })).toBe("done");
  });

  it("keeps no-match proposals distinct from pending changes", () => {
    const options = { expanded: false, isPartial: false };
    expect(status({ content: [], details: { applied: false, totalReplacements: 0 } }, options)).toBe("no matches");
    expect(status({ content: [], details: { applied: false, totalReplacements: 2 } }, options)).toBe("proposed");
    expect(status({ content: [], details: { applied: true, totalReplacements: 2 } }, options)).toBe("done");
    expect(status({ content: [], isError: true, details: { applied: true, totalReplacements: 2 } }, options)).toBe("error");
  });

  it("preserves coordinator phases instead of reporting accepted work complete", () => {
    const options = { expanded: false, isPartial: false };
    expect(status({ content: [], details: { operation: { phase: "queued" } } }, options)).toBe("accepted");
    expect(status({ content: [], details: { operation: { phase: "reviewing" } } }, options)).toBe("running");
    expect(status({ content: [], details: { operation: { phase: "partial" } } }, options)).toBe("partial");
    expect(status({ content: [], details: { operation: { phase: "failed" } } }, options)).toBe("error");
    expect(status({ content: [], details: { error: "provider unavailable" } }, options)).toBe("error");
    expect(status({ content: [], details: { operation: { phase: "completed" } } }, options)).toBe("done");
  });

  it("recognizes media without treating ordinary output as an image", () => {
    expect(hasMedia({ content: [{ type: "image", data: "png", mimeType: "image/png" }] })).toBe(true);
    expect(hasMedia({ content: [], details: { images: [{ data: "png" }] } })).toBe(true);
    expect(hasMedia({ content: [], details: { xdev: { inner: { images: [{ data: "png" }] } } } })).toBe(true);
    expect(hasMedia({ content: [{ type: "text", text: "image" }], details: { images: [] } })).toBe(false);
  });

  it("finds paths in custom and batch edit payloads", () => {
    expect(target("edit", { input: "*** Begin Patch\n*** Update File: src/a.ts\n@@" })).toBe("src/a.ts");
    expect(target("edit", { edits: [{ path: "src/a.ts", oldText: "a", newText: "b" }] })).toBe("src/a.ts");
  });
});
