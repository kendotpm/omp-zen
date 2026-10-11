# Security

Compact Tool Calls runs as trusted code inside OMP, not in a sandbox. Only load a checkout or package you trust. The compatibility target is OMP **18.8.7** with Bun **>=1.3.14**; there is no separate long-term support policy or guarantee for future host versions.

## What this extension changes

The extension changes how eligible tool calls appear in the main interactive TUI. It delegates execution to OMP through `ctx.invokeTool(args)`, retaining native permission decisions, output, cancellation, and job ownership. Runtime registration provenance is extension-owned even though execution is native. It is not a security boundary, permission bypass, output sanitizer, or replacement for OMP's policies.

If something looks wrong, stop the session and relaunch without the `--extension` flag. If linked as a plugin, use `omp plugin disable omp-compact-tool-calls` or `omp plugin uninstall omp-compact-tool-calls`, then restart. Do not treat a compact status line as proof of an operation's safety; expand and inspect the native result.

## Report a sensitive finding

A public repository and private reporting channel have not yet been established. Until they are, contact the person who supplied your checkout through an existing private channel. Do not put secrets or exploit details into a public issue to obtain contact information. After a public remote exists, use its private vulnerability reporting feature if the maintainer has enabled it; otherwise ask for a private reporting route without exposing the finding.

Include the exact versions, affected configuration, minimal reproduction, impact, and whether the issue also occurs with the extension omitted. Share only redacted evidence and use disposable fixtures. Never attach tokens, credentials, customer information, browser profiles, or complete private session logs.

No response-time commitment, bounty program, security audit, or upstream endorsement is claimed. Native OMP vulnerabilities should also be reported through OMP's current security reporting process.
