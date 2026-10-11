# Standalone verification

## Local automated checks

- `npm ci --ignore-scripts --no-audit --no-fund` completed from the independent dependency lockfile.
- `npm test` passed **23 tests across 2 files** using the pinned host development dependencies.
- `npm run smoke` imported and initialized the extension through OMP's real module loader. It made no model request and did not exercise tool execution or UI.
- `npm run check:package` passed: **14 allowlisted files**, no bundled host dependencies or private/harness paths. The dry-run check wrote no archive.

These are local checks on macOS. The repository includes Linux GitHub Actions CI, but hosted CI has not run.

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
