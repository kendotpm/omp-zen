# Standalone verification

## Local automated checks

- `npm ci --ignore-scripts --no-audit --no-fund` completed from the independent dependency lockfile.
- `npm test` passed **23 tests across 2 files** using the pinned host development dependencies.
- `npm run smoke` imported and initialized the extension through OMP's real module loader. It made no model request and did not exercise tool execution or UI.
- `npm run check:package` passed: **14 allowlisted files**, no bundled host dependencies or private/harness paths. The dry-run check wrote no archive.

These are local checks on macOS. The repository includes Linux GitHub Actions CI, but hosted CI has not run.

## OMP Zen brand cutover

The local repository directory and package are now `omp-zen`. After the rename, `npm run check` passed all 23 tests, the native loader smoke, and the 14-file package allowlist. The renamed `omp-zen-0.1.0.tgz` also imported successfully through OMP's real loader.

A fresh OMP 18.8.7 ANSI session loaded the renamed directory with `--extension`, showed `glob · *.ts · done`, and returned `OMP_ZEN_LOADED`. Ctrl+O revealed the native nine-file result tree. The controlled terminal was closed afterward. Harness distribution validation also passed; bundled harness launch paths were not renamed.

Only branding, packaging identity, and documentation changed. Earlier file/shell and packed-artifact observations below retain their original harmless test markers.

## Charm VHS recording

[`assets/omp-zen.gif`](../assets/omp-zen.gif) was rendered from [`demo/zen.tape`](../demo/zen.tape) using VHS 0.11.0 and real OMP 18.8.7. The revised animation is 1200 × 900, **7.64 seconds**, and approximately **497 KiB**. It uses short clips: expanded native checks → a one-second OMP Zen card → Ctrl+O → later live compact checks → a two-second tagline. Hidden cuts omit model/network waits, not tool execution. The previous continuous cut was 49.20 seconds.

The MP4 scene grid was visually inspected at half-second intervals, plus full-size expanded and title-card frames. Both terminal sections show actual tool progress rather than held completed results. The workload uses twelve harmless JavaScript modules and eight sequential shell batches; each batch runs six real Node syntax checks with a 150 ms presentation delay between checks. The recording-only overlay sets `theme.dark` and `theme.light` to OMP's native `dark-dracula`; VHS uses Dracula too. The generated overlay and rendered colors were inspected. No personal theme or permission settings were changed. Recorded scenes contain only public fixture paths, results, and editorial cards; no credentials, personal paths, customer content, or approval dialogs were visible. The dedicated tmux session remains live across the cuts and closes afterward.

VHS does not reliably follow overflowing terminal content without explicit scrolling; the tape uses real viewport scrolling and keeps the initial search small. A native app suspend/resume attempt produced unusable terminal output, so the final tape detaches/reattaches tmux instead of suspending OMP. npm also prepends the development SDK executable; the launcher now resolves the installed OMP CLI instead. Already committed expanded scrollback can remain visible above newly compact calls, as described in [coverage](COVERAGE.md).

`npm run check` passed 23 tests, native module loading, and the updated **17-file** package allowlist. Only the reviewed GIF, tape, launcher, code, and public Markdown are distributed; the MP4 and temporary capture files remain ignored.

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
