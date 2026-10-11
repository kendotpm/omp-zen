import {
  CheckpointTool,
  ContextNotesTool,
  GoalTool,
  LearnTool,
  ManageSkillTool,
  MemoryEditTool,
  MemoryRecallTool,
  MemoryReflectTool,
  MemoryRetainTool,
  RewindTool,
  type ToolSession,
} from "@oh-my-pi/pi-coding-agent";
import { nativeDefinition } from "./contracts";

// Audited at OMP 18.8.7, f261ed9faf16b61880b544f599876bface4ded0d:
// public constructors store the receiver without reading lifecycle/backend owners.
// https://github.com/can1357/oh-my-pi/tree/f261ed9faf16b61880b544f599876bface4ded0d/packages/coding-agent/src/tools
// Only learn's approval reads this receiver: the real current settings, not a
// reconstructed backend or scope policy. Live ToolInfo supplies schema/prompt.
export function lifecycleMetadata(
  name: string,
  session: Pick<ToolSession, "settings">,
): Record<string, any> | undefined {
  const receiver = session as ToolSession;
  let native: object;
  switch (name) {
    case "checkpoint":
      native = new CheckpointTool(receiver);
      break;
    case "rewind":
      native = new RewindTool(receiver);
      break;
    case "context_notes":
      // createIf needs the actual journal owner; construction does not.
      native = new ContextNotesTool(receiver);
      break;
    case "goal":
      // The class omits loadMode; native adapter default is discoverable.
      native = new GoalTool(receiver);
      break;
    case "recall":
      native = new MemoryRecallTool(receiver);
      break;
    case "reflect":
      native = new MemoryReflectTool(receiver);
      break;
    case "memory_edit":
      native = new MemoryEditTool(receiver);
      break;
    case "retain":
      // Native approval is args-only: any global item is write, else read.
      native = new MemoryRetainTool(receiver);
      break;
    case "learn":
      // Preserve native skill/global/local-write versus backend-project-read.
      native = new LearnTool(receiver);
      break;
    case "manage_skill":
      // No substitute refresh callback: only native delegated execute refreshes.
      native = new ManageSkillTool();
      break;
    default:
      // task's instance-only formatter consults private parent policy even for
      // lenient invalid batch args when task.batch=false. Leave it native, along
      // with yield/think/Vibe and SDK tools lacking the required public seams.
      return undefined;
  }
  // Excludes parameters/description, execute, speculation and resets. Never read
  // detached memory prompt/scope getters or transfer lifecycle ownership.
  return nativeDefinition(native);
}
