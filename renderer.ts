export interface RenderOptions {
  expanded: boolean;
  isPartial: boolean;
  argsComplete?: boolean;
  executionStarted?: boolean;
  renderContext?: Record<string, unknown>;
}

export interface RenderResult {
  content: Array<{ type: string; text?: string; data?: string; mimeType?: string }>;
  details?: unknown;
  isError?: boolean;
}

export function target(name: string, args: Record<string, unknown>): string {
  let value: unknown;
  switch (name) {
    case "edit":
      value = args.path || args.file_path || (typeof args.input === "string"
        ? /^\[([^\]#]+)(?:#[^\]]*)?\]/m.exec(args.input)?.[1]
          || /^\*\*\* (?:Update|Add|Delete) File: (.+)$/m.exec(args.input)?.[1] : undefined)
        || (Array.isArray(args.edits) ? args.edits.find(entry => entry && typeof entry.path === "string")?.path : undefined);
      break;
    case "eval": value = args.title || args.language; break;
    case "bash": value = args.command; break;
    case "ast_grep": value = [args.pat, args.path].filter(Boolean).join(" · "); break;
    case "ast_edit": value = Array.isArray(args.paths) ? args.paths.join(", ") : args.paths; break;
    case "find": case "web_search": case "recall": case "reflect":
      value = args.query || args.context; break;
    case "lsp": value = [args.action, args.file, args.symbol].filter(Boolean).join(" · "); break;
    case "github": value = [args.op, args.repo, args.path, args.run_id].filter(Boolean).join(" · "); break;
    case "todo": value = [args.op, args.phase].filter(Boolean).join(" · "); break;
    case "wait": value = args.i || "owned work"; break;
    case "ask":
      value = Array.isArray(args.questions) ? args.questions.map(q => q.header || q.question).join("; ") : undefined;
      break;
    case "debug": value = [args.action, args.session_id].filter(Boolean).join(" · "); break;
    case "checkpoint": value = args.goal; break;
    case "rewind": value = "session checkpoint"; break;
    case "context_notes": value = Object.hasOwn(args, "text") ? "save notebook" : "read notebook"; break;
    case "goal": case "memory_edit": case "manage_skill":
      value = [args.op || args.action, args.id || args.name].filter(Boolean).join(" · "); break;
    case "retain": value = Array.isArray(args.items) ? `${args.items.length} memories` : "memory"; break;
    case "learn": value = args.context || args.scope || "lesson"; break;
    default: value = args.path || args.file_path;
  }
  return singleLine(typeof value === "string" && value ? value : "target pending");
}

export function status(result: RenderResult | undefined, options: RenderOptions): string {
  if (!result) return options.executionStarted ? "running" : options.argsComplete ? "queued" : "preparing";
  const details = record(result.details);
  const asyncState = record(details?.async)?.state;
  const service = record(details?.service);
  if (details?.aborted || details?.cancelled || asyncState === "cancelled"
    || details?.status === "cancelled" || details?.interrupted
    || (result.isError && result.content.some(item => item.type === "text" && /^(?:Command aborted|\[Command cancelled\])\s*$/.test(item.text || "")))) return "cancelled";
  if (details?.timedOut || service?.timedOut) return "timed out";
  const phase = record(details?.operation)?.phase || details?.phase;
  if (result.isError || details?.error || details?.success === false || asyncState === "failed"
    || service?.state === "failed" || phase === "failed") return "error";
  if (details?.applied === false && (typeof details?.totalReplacements !== "number" || details.totalReplacements > 0)) return "proposed";
  if (details?.totalReplacements === 0) return "no matches";
  if (phase === "cancelled") return "cancelled";
  if (phase === "partial") return "partial";
  if (phase === "queued" || details?.status === "queued") return "accepted";
  if (["preparing", "reviewing", "running"].includes(String(phase))) return "running";
  if (asyncState === "queued" || asyncState === "pending") return "accepted";
  if (asyncState === "completed") return "done";
  if (asyncState === "running" || service?.state === "running" || service?.state === "starting"
    || options.isPartial) return "running";
  return "done";
}

export function rows(name: string, args: Record<string, unknown>, result: RenderResult | undefined, options: RenderOptions): string[] {
  const line = `${name} · ${target(name, args)} · ${status(result, options)}`;
  if (!options.expanded) return [line];
  const detail = result
    ? [result.content.filter(item => item.type === "text").map(item => item.text || "").join("\n"),
      result.details === undefined ? "" : JSON.stringify(result.details, null, 2)].filter(Boolean).join("\n")
    : JSON.stringify(args, null, 2);
  // Details are terminal text, not executable escapes. Preserve newlines only here.
  return [line, ...detail.split(/\r?\n/).map(text => singleLine(text))];
}

// Host-added images cannot be hidden through a custom transcript hook. Preserve
// the native presentation for these results, including nested xdev payloads.
export function hasMedia(result: RenderResult): boolean {
  if (result.content.some(item => item.type === "image")) return true;
  const details = record(result.details);
  const inner = record(record(details?.xdev)?.inner);
  return [details, inner].some(value => Array.isArray(value?.images) && value.images.length > 0);
}

function record(value: unknown): Record<string, any> | undefined {
  return value !== null && typeof value === "object" ? value as Record<string, any> : undefined;
}

function singleLine(text: string): string {
  return text.replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g, "")
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, "")
    .replace(/[\x00-\x1f\x7f-\x9f\u2028\u2029]/g, " ");
}
