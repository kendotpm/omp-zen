# Standalone verification

## Local automated checks

- `npm ci --ignore-scripts --no-audit --no-fund` completed from the independent dependency lockfile.
- `npm test` passed **23 tests across 2 files** using the pinned host development dependencies.
- `npm run smoke` imported and initialized the extension through OMP's real module loader. It made no model request and did not exercise tool execution or UI.
- `npm run check:package` passed: **14 allowlisted files**, no bundled host dependencies or private/harness paths. The dry-run check wrote no archive.

These are local checks on macOS. The repository includes Linux GitHub Actions CI, but hosted CI has not run.

## Beginner README quickstart

The concise README quickstart was exercised in a real OMP 18.8.7 ANSI session from the extension folder using the literal `omp --extension .` command. Its read-only glob prompt produced the compact tool line and nine TypeScript matches. Ctrl+O revealed the native file tree; collapse and Ctrl+D exit were exercised. The user-facing install/login syntax was checked against OMP help and upstream installation/provider documentation; no additional global installation or login was performed for this documentation change.

README and optional setup links resolve locally. `npm run check` passed 23 tests, native loading, and the **18-file** package allowlist. The approved GIF's SHA-256 stayed `ca481dc02d611fc3be012de8366e5aee65a7f3597615e0b8d8d0f15fe4338c81`; it was not regenerated or modified.

## Installation-first quickstart

The current quickstart uses `omp plugin link .`, not a one-session demo launch. That exact native command succeeded with plugin state redirected to an ignored disposable home. `omp plugin list` reported enabled `omp-zen`; `omp plugin doctor` reported the plugin healthy, with a benign “package manifest not created yet” warning for a link-only root. Native explicit-home discovery resolved its manifest entry and the real OMP loader imported it without an explicit extension argument. The disposable registration was disabled afterward; personal plugin state was not changed.

The generic discovery helper also observed a personal plugin despite the HOME override, so the smoke used OMP's explicit-home discovery API instead; no unrelated extension was imported. Current README/setup links and the 18-file package allowlist passed; the approved GIF hash remained unchanged.

## OMP Zen brand cutover

The local repository directory and package are now `omp-zen`. After the rename, `npm run check` passed all 23 tests, the native loader smoke, and the 14-file package allowlist. The renamed `omp-zen-0.1.0.tgz` also imported successfully through OMP's real loader.

A fresh OMP 18.8.7 ANSI session loaded the renamed directory with `--extension`, showed `glob · *.ts · done`, and returned `OMP_ZEN_LOADED`. Ctrl+O revealed the native nine-file result tree. The controlled terminal was closed afterward. Harness distribution validation also passed; bundled harness launch paths were not renamed.

Only branding, packaging identity, and documentation changed. Earlier file/shell and packed-artifact observations below retain their original harmless test markers.

## Charm VHS recording

[`assets/omp-zen.gif`](../assets/omp-zen.gif) was rendered from [`demo/zen.tape`](../demo/zen.tape) using VHS 0.11.0 and real OMP 18.8.7. The animation is 1200 × 900, **24.68 seconds**, and approximately **3.62 MiB**. Intro copy is exactly “Native OMP” / “Noisy, fast-moving, and jarring height changes.” The intro holds six seconds; expanded app-building footage is three seconds; the OMP Zen card holds five seconds; compact app-building footage is six seconds; the closing tagline holds five seconds. Small rendering/key-input transitions account for the remaining duration.

The agent was asked only “Build a todo list app.” in a fresh disposable workspace. No app code was seeded and no coding steps or tool order were prescribed. The agent independently planned and wrote a real app; the expanded clip shows its streamed markup payload, while the compact clip retains one write status line and live native progress. The one-second scene grid and full-size 7-/16-second frames were inspected. No private paths, credentials, customer data, or approval dialogs were visible. Generated app files and the live session were inspected separately; app completion or browser behavior is not claimed by this recording.

Dracula is applied to VHS and the recording-only OMP overlay. xdev, speculation, and streaming-abort edit are disabled only for that launch so writes use supported compact rendering; the first xdev-on attempt correctly retained native noisy write output and was not used. Personal configuration and permissions remain unchanged. The same tmux session stays active across title cards; startup latency is omitted. Native HUD/progress and committed scrollback can remain visible, as described in [coverage](COVERAGE.md).

Tape syntax and launcher syntax were validated; package checks cover code, public docs, the reviewed GIF, tape, and launcher. Scratch MP4, generated app files, and recording state remain ignored.

The README's `extensions:` YAML example was parsed and exercised through a temporary `--config` overlay using the actual checkout path. Real OMP displayed a compact glob result and `CONFIG_LOADED` without an explicit `--extension` argument. The scratch session was closed; personal `config.yml` was not edited. All 23 tests, native loader smoke, and the 18-file package allowlist passed.

## Fresh terminal workflow

The standalone checkout was loaded by the real **OMP 18.8.7** CLI in an ANSI terminal. Ambient extensions, skills, rules, and LSP were disabled for this run; the standalone directory was explicitly enabled with `--extension`. The session was ephemeral (`--no-session`, `--no-title`), with only native `glob` and `bash` available. No personal settings or plugin registration were changed.

A real model turn requested a TypeScript file listing, followed by native shell output containing three harmless markers. These are observed terminal results, not a mocked extension API or an illustrative product demo.

| Scenario | Observed result |
| --- | --- |
| Standalone directory loading | OMP launched without extension import errors |
| Collapsed native glob | `glob · *.ts · done` on one content row |
| Collapsed native bash | Tool, printf target, and `done` on one content row |
| Ctrl+O expansion | Native glob tree and native shell result box appeared |
| Shell result disclosure | All three markers, wall time, and native timeout visible |
| Ctrl+O collapse | Both tools returned to one content row |
| Resize from 100 to 52 columns | Shell target truncated with an ellipsis; status stayed on the same row |
| Completion | Model returned `COMPACT_SMOKE_COMPLETE`; controlled terminal server closed |

OMP still adds its normal blank padding. “One row” describes the extension's content, not the entire space between messages.

## Packed artifact workflow

An npm tarball was created locally, extracted into ignored scratch space, and imported successfully through the real OMP loader. A second real OMP 18.8.7 ANSI session loaded that **extracted package directory**, not the source checkout: native glob and a two-line shell command both appeared as compact completed rows, followed by `PACKED_SMOKE_COMPLETE`. Ctrl+O revealed the native file tree and both shell markers in the native result box. The controlled terminal was then closed.

The publish allowlist includes the runtime and all linked Markdown documentation, but excludes tests, contributor scripts, dependency trees, local configuration, and raw evidence. No registry upload occurred.

## Limits of this verification

This fresh workflow covers **ANSI**, native directory loading, glob, shell execution, disclosure, collapse, and narrow width. It does not revalidate Tern, debugger launch, language servers, memory backends, native approval denial, cancellation, background jobs, iframe/browser behavior, or every configured edit mode. Historical source observations and native-preserved configurations are distinguished in [coverage](COVERAGE.md).

No raw authenticated transcript, browser evidence, credentials, profile, customer data, or private path is included. No public Git remote, npm release, or OMP feature listing was created.
