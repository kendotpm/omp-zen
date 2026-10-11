# Coverage and native boundaries

OMP Zen targets **OMP 18.8.7** and **Bun >=1.3.14**. It is opt-in presentation for the **main interactive TUI only**. Child agents, print, JSON, RPC, and no-UI sessions retain native behavior. No later host version has been validated here.

“Supported” below means implemented compact registration for an eligible active, builtin-owned, schema-compatible tool—not proof that every backend and configuration has been exercised. Unsupported means **native UI**, never a disabled tool. Provider/plugin-added tools and competing extension overrides are left alone.

## Implemented tools

This inventory follows `index.ts`, not a wishlist.

| Tool | Compact boundary / prerequisite |
| --- | --- |
| `bash` | Native foreground/background execution and job ownership |
| `glob`, `grep` | Native search results; `search` is the `grep` alias |
| `write` | Native UI while `tools.xdev` is enabled |
| `edit` | Effective native mode/schema; native UI when `edit.streamingAbort` is enabled |
| `eval` | Native UI when speculative execution is enabled |
| `wait`, `todo` | Native owned completion/interruption and HUD/journal behavior |
| `ast_grep`, `ast_edit` | Native grammar/backend required; no implicit installation or download; proposal/resolve/reject remain native |
| `ask` | Compact transcript only; native human dialog remains visible |
| `find` | Requires the configured native judge |
| `web_search` | Requires a configured native search provider; citations retained |
| `github` | Requires native access/auth as applicable; historical validation covered immutable reads, not all write/approval paths |
| `lsp` | Requires a configured language server; historical live validation covered C/clangd navigation and rename, not JS/TS servers |
| `debug` | Metadata adapter and compact presentation implemented; successful real DAP launch remains unverified |
| `checkpoint`, `rewind`, `context_notes` | Native context journal/report/revision behavior; not filesystem rollback |
| `goal` | Hidden/discoverable native tool must already be active in an appropriate goal mode; native lifecycle/footer retained |
| `memory_edit`, `retain`, `recall`, `reflect` | Requires configured native memory backend; historical isolated Mnemopi workflows exercised, Hindsight service not live-verified; reflect is not a promise of new synthesis |
| `learn`, `manage_skill` | Native isolated lesson/skill storage and discovery prerequisites; no shared-resource writes implied |

The adapter does not supply any provider, credentials, language server, memory service, DAP adapter, grammar download, or judge. An outer supported `eval` call can be compact while browser/computer APIs run inside it; this does not change their separate windows.

## Deliberately native

| Tool or result | Why it stays native |
| --- | --- |
| `read` | Host read-group rendering bypasses extension hooks |
| `new_context` | Explicit rollover intentionally remains conspicuous; compaction settings are unchanged |
| `task`, hidden `yield` | Required live parent-policy/stream/reset/child UI seams are unavailable to this wrapper |
| Hidden `think` | Native inline thinking has no ordinary result card |
| `vibe_spawn`, `vibe_send`, `vibe_wait`, `vibe_kill`, `vibe_list` | Mode-created live resolver is unavailable |
| Optional `generate_image`, `tts` | Optional SDK same-name resolver is unavailable |
| `ida`, `security_scan` | Not in the supported registration list; no compact coverage or backend validation claimed |
| `xd://` calls | Argument-dependent native approval needs live session state unavailable to the wrapper |
| Images/media | Host appends media outside custom render hooks; results remain native-accessible |

Tern can append late diagnostics and force live edit/write bodies open. Those configurations may not be fully compact even when the extension body is collapsed. Existing committed scrollback can retain its old expansion until OMP replays it. The extension does not hide media, delete diagnostics, or patch the host to claim one-line coverage.

## Execution and registration contract

Eligible collapsed text calls show **tool · target · status** on one visible content line; OMP can add fixed blank padding. Native Ctrl+O expansion reveals rich results where a native renderer exists, including diffs and diagnostics; generic disclosure retains text and structured details.

Execution uses native same-name `ctx.invokeTool(args)`. Permissions, output, progress, cancellation, provider context, kernels, and background jobs remain native-owned. **Registration provenance becomes extension-owned.** Native descriptions and callable schemas are retained within the reviewed metadata contract; the adapter does not invent a live native session owner.

The delegated native call has a different call ID. Full argument-stream or speculative identity parity is not claimed. Detached `openArgStream`, speculation, reset, and execute receivers are not installed. This is why xdev write, speculative eval, and streaming-abort edit remain native. Ordinary edit sends the completed effective payload through the native parser.

Lifecycle events refresh cwd/model metadata and permit wrapping a rebuilt native catalog without recursively wrapping extension-owned tools. After changing tool selections, xdev, speculation, or stream/configuration settings, reload/restart so the native catalog is rebuilt. Do not expect runtime settings alone to import an unloaded extension.

There is **no core patch**, custom job manager, output stripping, security redesign, token saving, or context-compression claim.

## Evidence and provenance

The runtime was extracted from the existing optional capability's live worktree. The host metadata audit targets [OMP v18.8.7](https://github.com/can1357/oh-my-pi/tree/v18.8.7), pinned to upstream commit [`f261ed9faf16b61880b544f599876bface4ded0d`](https://github.com/can1357/oh-my-pi/commit/f261ed9faf16b61880b544f599876bface4ded0d). Relevant upstream references are the [native registry](https://github.com/can1357/oh-my-pi/blob/v18.8.7/packages/coding-agent/src/tools/index.ts), [native names](https://github.com/can1357/oh-my-pi/blob/v18.8.7/packages/coding-agent/src/tools/builtin-names.ts), [invocation runner](https://github.com/can1357/oh-my-pi/blob/v18.8.7/packages/coding-agent/src/extensibility/extensions/runner.ts), and [result framing](https://github.com/can1357/oh-my-pi/blob/v18.8.7/packages/tui/src/chat/tool-execution.ts).

The source documentation records real OMP 18.8.7 workflows and human compact/expanded UAT: file round trips and anchored edits, native denial without marker side effects, shell multiline/error/timeout/owned completion, JS evaluation, searches, AST proposal/application, immutable GitHub reads, judge find, web citations, C/clangd refactor, isolated Mnemopi/lesson/skill workflows, context journals, ask dialog, and goal lifecycle. These are **historical source-worktree observations**, not fresh verification of this standalone package. Raw private logs/screenshots are intentionally not imported.

Debug session-list presentation was human-accepted, but DAP launches timed out/closed on the attempted installed lldb-dap paths. That is a blocker, not a passing debugger integration. IDA/security scans, Hindsight, and JS/TS LSP are not covered by those observations.

Fresh standalone checks and the actual ANSI terminal workflow are recorded in [Verification](VERIFICATION.md). Fixture tests exercise rendering, metadata, and registration boundaries; they cannot prove native approval, Unicode terminal behavior, kernel/job ownership, external backends, or a real interactive outcome.

## A useful validation session

Use a disposable working directory and isolated profile/journal. Keep backend credentials out of committed artifacts. Exercise eligible collapsed text at normal and narrow widths, Ctrl+O disclosure, errors, cancellation, native approval denial, artifact links, reload/resume, extension-off behavior, disabled tools, and competing overrides. Check real file/journal/job outcomes independently of the UI status. Include a benign media result and all three guarded configurations as native-preserved cases. Record ANSI and Tern separately; a hidden child or synthetic delegate is not visible TUI proof.
