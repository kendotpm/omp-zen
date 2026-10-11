import {
  AskTool, AstEditTool, AstGrepTool, DebugTool, FindTool, GithubTool,
  LspTool, TodoTool, WaitTool, WebSearchTool,
  type ToolSession,
} from "@oh-my-pi/pi-coding-agent";
import { nativeDefinition } from "./contracts";

export type OrdinaryMetadataSession = Pick<ToolSession, "cwd" | "settings" | "hasUI" | "isToolActive">;

// Audited public constructors at OMP 18.8.7 / f261ed9faf16b61880b544f599876bface4ded0d:
// packages/coding-agent/src/{tools/{wait,todo,ast-grep,ast-edit,ask,gh,debug}.ts,
// tools/jfind/index.ts,web/search/index.ts,lsp/tool.ts}.
// They only store the receiver and initialize static metadata/prompts. In particular,
// do not call createIf: availability and backend ownership belong to the live builtin.
// Parent must require an active builtin with same-name native delegation, and overlay
// its current ToolInfo parameters/description/promptGuidelines on this metadata.
export function ordinaryMetadata(name: string, session: OrdinaryMetadataSession): Record<string, any> | undefined {
  // This cast is constructor-only: no invented ownership callbacks, session IDs,
  // provider registries, queues or backend activation. Never execute this receiver.
  const receiver = session as ToolSession;
  let native: object;
  switch (name) {
    case "wait": native = new WaitTool(receiver); break;
    case "todo": native = new TodoTool(receiver); break;
    case "ast_grep": native = new AstGrepTool(receiver); break;
    case "ast_edit": native = new AstEditTool(receiver); break;
    case "ask": native = new AskTool(receiver); break;
    case "find": native = new FindTool(receiver); break;
    case "web_search": native = new WebSearchTool(receiver); break;
    case "github": native = new GithubTool(receiver); break;
    case "lsp": native = new LspTool(receiver); break;
    case "debug": native = new DebugTool(receiver); break;
    default: return undefined;
  }
  // The audited whitelist keeps native approval/formatters, strictness, scheduler,
  // todo leniency, wait interruption/intent and AST deferral without touching any
  // description/schema getter or exposing execute, reset, stream or speculation.
  // Native approval closures retain router/action discrimination, not copied lists.
  // Image-bearing GitHub presentation remains the parent's native host fallback.
  return nativeDefinition(native);
}
