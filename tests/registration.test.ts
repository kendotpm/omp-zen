import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ flags: {} as Record<string, boolean>, pending: undefined as undefined | (() => Promise<void>) }));
vi.mock("@oh-my-pi/pi-coding-agent", () => ({
  BUILTIN_TOOLS: Object.fromEntries(["edit", "write", "bash", "eval", "glob", "grep"].map(name => [name, async (session: any) => {
    await state.pending?.();
    return {
      name, label: name, parameters: schema,
      get mode() { return session.settings.editMode; },
      approval: "read", strict: true,
    };
  }])),
}));
vi.mock("@oh-my-pi/pi-coding-agent/config/registry", () => ({ lookup: (key: string) => ({ get: () => state.flags[key] }) }));
vi.mock("@oh-my-pi/pi-coding-agent/config/model-resolver", () => ({ formatModelString: (model: any) => model.provider + "/" + model.id }));
vi.mock("@oh-my-pi/pi-tui/tools", () => ({ toolRenderers: {} }));
vi.mock("@oh-my-pi/pi-tui", () => ({
  visibleWidth: (value: string) => Array.from(value).length,
  truncateToWidth: (value: string, width: number) => Array.from(value).slice(0, width).join(""),
  wrapTextWithAnsi: (value: string, width: number) => [Array.from(value).slice(0, width).join("")],
}));
import compactToolCalls from "../index";

const schema = Object.assign((value: any) => value, { toJsonSchema: () => ({ type: "object" }) });
function harness(names = ["glob"]) {
  const handlers = new Map<string, any>();
  const definitions: any[] = [];
  const active = new Set(names);
  const infos = names.map(name => ({ name, parameters: schema, description: "native prompt", sourceInfo: { source: "builtin" } }));
  const api = {
    pi: { settings: { editMode: "hashline" } },
    on: (name: string, handler: any) => handlers.set(name, handler),
    getActiveTools: () => [...active],
    getAllTools: () => infos,
    registerTool: (definition: any) => {
      definitions.push(definition);
      infos.find(info => info.name === definition.name)!.sourceInfo.source = "extension";
    },
  };
  const ctx = { cwd: "/fixture", hasUI: true, mode: "tui", agent: { kind: "main" } };
  compactToolCalls(api as any);
  return { api, handlers, definitions, infos, active, ctx };
}

beforeEach(() => { state.flags = {}; state.pending = undefined; });
describe("compact registration boundaries", () => {
  it.each(["print", "json", "rpc"])("does not register in %s mode", async mode => {
    const h = harness();
    await h.handlers.get("session_start")({}, { ...h.ctx, mode });
    expect(h.definitions).toEqual([]);
  });

  it("leaves disabled, overridden and restricted tools untouched", async () => {
    const h = harness(["glob", "grep", "bash"]);
    h.active.delete("glob");
    h.infos[1].sourceInfo.source = "extension";
    await h.handlers.get("session_start")({}, { ...h.ctx, agent: { kind: "sub" } });
    expect(h.definitions).toEqual([]);
    await h.handlers.get("session_start")({}, h.ctx);
    expect(h.definitions.map(definition => definition.name)).toEqual(["bash"]);
    expect(h.active.has("glob")).toBe(false);
  });

  it.each(["new_context", "ida", "security_scan"])("keeps excluded %s native while compacting ordinary tools", async name => {
    const h = harness([name, "glob"]);
    await h.handlers.get("session_start")({}, h.ctx);
    expect(h.definitions.map(definition => definition.name)).toEqual(["glob"]);
    expect(h.active.has(name)).toBe(true);
    expect(h.infos[0].sourceInfo.source).toBe("builtin");
  });

  it("preserves native xdev/speculation/streaming-abort configurations", async () => {
    const h = harness(["write", "eval", "edit", "glob"]);
    state.flags = { "tools.xdev": true, "tools.speculativeExecution.enabled": true, "edit.streamingAbort": true };
    await h.handlers.get("session_start")({}, h.ctx);
    expect(h.definitions.map(definition => definition.name)).toEqual(["glob"]);
  });

  it("rechecks source ownership after async metadata construction", async () => {
    const h = harness();
    state.pending = async () => { h.infos[0].sourceInfo.source = "extension"; };
    await h.handlers.get("session_start")({}, h.ctx);
    expect(h.definitions).toEqual([]);
  });

  it("leaves incompatible schemas native", async () => {
    const h = harness();
    h.infos[0].parameters = Object.assign((value: any) => value, { toJsonSchema: () => ({ type: "string" }) });
    await h.handlers.get("session_start")({}, h.ctx);
    expect(h.definitions).toEqual([]);
  });



  it("keeps rendered targets in one narrow row and discloses text plus details", async () => {
    const h = harness();
    await h.handlers.get("session_start")({}, h.ctx);
    const definition = h.definitions[0];
    const args = { path: "long-多字-target\nnext" };
    const result = { content: [{ type: "text", text: "output marker" }], details: { diff: "diff marker" } };
    for (const width of [1, 8, 20, 80]) {
      const lines = definition.renderResult(result, { expanded: false, isPartial: false }, {}, args).render(width);
      expect(lines).toHaveLength(1);
      expect(Array.from(lines[0]).length).toBeLessThanOrEqual(width);
      expect(lines[0]).not.toContain("\n");
    }
    const view = definition.describeResult(result, { expanded: true, isPartial: false }, args);
    expect(JSON.stringify(view.body)).toContain("output marker");
    expect(JSON.stringify(view.body)).toContain("diff marker");
    expect(definition.describeResult(result, { expanded: false, isPartial: false }, args).body).toEqual([]);
  });
});
