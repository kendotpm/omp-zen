import type { ExtensionAPI, ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import { BUILTIN_TOOLS } from "@oh-my-pi/pi-coding-agent";
import { lookup } from "@oh-my-pi/pi-coding-agent/config/registry";
import { formatModelString } from "@oh-my-pi/pi-coding-agent/config/model-resolver";
import { truncateToWidth, visibleWidth, wrapTextWithAnsi } from "@oh-my-pi/pi-tui";
import { toolRenderers, type NativeToolView } from "@oh-my-pi/pi-tui/tools";
import { nativeDefinition } from "./contracts";
import { ordinaryMetadata } from "./ordinary-adapters";
import { lifecycleMetadata } from "./lifecycle-adapters";
import { rows, target, status, hasMedia, type RenderOptions, type RenderResult } from "./renderer";

// Only public metadata routes; mode-created/state-sensitive tools remain native.
const existing = ["edit", "write", "bash", "eval", "glob", "grep"] as const;
const supported = [
  ...existing, "wait", "todo", "ast_grep", "ast_edit", "ask", "find",
  "web_search", "github", "lsp", "debug", "checkpoint",
  "rewind", "context_notes", "goal", "recall", "reflect",
  "memory_edit", "retain", "learn", "manage_skill",
] as const;

export default function ompZen(pi: ExtensionAPI): void {
  let current: ExtensionContext;
  // Metadata only: getters follow the active lifecycle context, not a stale cwd/model.
  const session = {
    get cwd() { return current.cwd; },
    get settings() { return pi.pi.settings; },
    get hasUI() { return current.hasUI; },
    getActiveModel: () => current.model,
    getActiveModelString: () => current.model ? formatModelString(current.model) : undefined,
    isToolActive: (name: string) => pi.getActiveTools().includes(name),
  };
  async function refresh(_event: unknown, ctx: ExtensionContext) {
    if (ctx.mode !== "tui" || !ctx.hasUI || ctx.agent.kind !== "main") return;
    current = ctx;
    const active = new Set(pi.getActiveTools());
    for (const name of supported) {
      const info = pi.getAllTools().find(tool => tool.name === name);
      if (!active.has(name) || !info || info.sourceInfo.source !== "builtin") continue;
      // Detached metadata cannot recover device policies or speculative ownership.
      if (name === "write" && lookup("tools.xdev")?.get(pi.pi.settings)) continue;
      if (name === "eval" && lookup("tools.speculativeExecution.enabled")?.get(pi.pi.settings)) continue;
      // Streaming-abort configurations need the live native stream receiver.
      if (name === "edit" && lookup("edit.streamingAbort")?.get(pi.pi.settings)) continue;
      const isExisting = existing.includes(name as typeof existing[number]);
      const native = isExisting ? await BUILTIN_TOOLS[name](session as never) : undefined;
      const definition = native ? nativeDefinition(native)
        : ordinaryMetadata(name, session as never) ?? lifecycleMetadata(name, session as never);
      if (!definition) continue;
      if (native && JSON.stringify(native.parameters.toJsonSchema()) !== JSON.stringify(info.parameters.toJsonSchema())) continue;
      // Recheck ownership after the asynchronous factory; never reclaim an override.
      const latest = pi.getAllTools().find(tool => tool.name === name);
      if (latest?.sourceInfo.source !== "builtin" || !pi.getActiveTools().includes(name)) continue;
      if (native && JSON.stringify(native.parameters.toJsonSchema()) !== JSON.stringify(latest.parameters.toJsonSchema())) continue;
      const catalog = { parameters: latest.parameters, description: latest.description };
      if (name === "goal" && definition.loadMode === undefined) definition.loadMode = "discoverable";
      Object.defineProperties(definition, {
        name: { enumerable: true, value: name },
        promptGuidelines: { enumerable: true, value: latest.promptGuidelines },
        // Keep the actual callable catalog schema. No detached prompt-owner guesses.
        parameters: { enumerable: true, get: () => {
          if (!native) return catalog.parameters;
          const parameters = native.parameters;
          return JSON.stringify(parameters.toJsonSchema()) === JSON.stringify(catalog.parameters.toJsonSchema())
            ? catalog.parameters : parameters;
        } },
        // Only edit's description depends on metadata available through this
        // public receiver; eval/search prompt owners remain the native catalog.
        description: { enumerable: true, get: () => name === "edit" && native ? native.description : catalog.description },
      });
      definition.execute = async (_id: string, args: Record<string, unknown>, _signal: unknown, _update: unknown, context: ExtensionContext) => {
        if (!context.invokeTool) throw new Error(`Native ${name} delegation unavailable`);
        // Native adapter inherits cancellation, progress and provider call context.
        // Its delegated ID differs: do not attach detached streams/resets here.
        return context.invokeTool(args);
      };
      definition.mergeCallAndResult = true;
      definition.renderCall = (args: Record<string, unknown>, options: RenderOptions) => component(name, args, undefined, options);
      definition.renderResult = (result: RenderResult, options: RenderOptions, theme: any, args: Record<string, unknown> = {}) => {
        const renderer = toolRenderers[name];
        // The host appends images outside custom hooks. Preserve their native view.
        if (options.expanded || hasMedia(result)) {
          const view = renderer?.renderResult(result, options, theme, args);
          if (view) return view;
        }
        return component(name, args, result, options);
      };
      definition.describeCall = (args: Record<string, unknown>, options: RenderOptions) => nativeView(name, args, undefined, options);
      definition.describeResult = (result: RenderResult, options: RenderOptions, args: Record<string, unknown> = {}) => {
        const view = options.expanded || hasMedia(result)
          ? toolRenderers[name]?.describeResult?.(result, options, args) : undefined;
        if (hasMedia(result) && view) return view;
        return nativeView(name, args, result, options, view);
      };
      pi.registerTool(definition as never);
    }
  }
  // Native reload rebuilds the catalog; branch/resume events update the receiver.
  pi.on("session_start", refresh);
  pi.on("session_switch", refresh);
  pi.on("session_branch", refresh);
  pi.on("session_tree", refresh);
  pi.on("before_agent_start", refresh);
}

// Stateful openArgStream/speculation/reset hooks deliberately remain native-owned.

function component(name: string, args: Record<string, unknown>, result: RenderResult | undefined, options: RenderOptions) {
  const lines = rows(name, args, result, options);
  let cachedWidth = -1;
  let cached: readonly string[] = [];
  return {
    render(width: number): readonly string[] {
      if (width !== cachedWidth) {
        const suffix = ` · ${status(result, options)}`;
        const prefix = `${name} · `;
        const space = width - visibleWidth(prefix + suffix);
        const header = space > 0
          ? prefix + truncateToWidth(target(name, args), space) + suffix
          : truncateToWidth(`${name}${suffix}`, Math.max(0, width));
        cached = [header, ...lines.slice(1).flatMap(line => wrapTextWithAnsi(line, Math.max(1, width)))];
        cachedWidth = width;
      }
      return cached;
    },
  };
}

function nativeView(name: string, args: Record<string, unknown>, result: RenderResult | undefined, options: RenderOptions, expandedView?: NativeToolView): NativeToolView {
  return {
    tool: { title: name, target: target(name, args), note: status(result, options) },
    body: options.expanded
      ? expandedView?.body ?? rows(name, args, result, options).slice(1).map(text => ({ k: "text", p: { text } }))
      : [],
    tools: expandedView?.tools,
    preview: "none",
    inline: true,
  };
}
