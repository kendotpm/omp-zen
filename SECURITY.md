# Security

OMP Zen runs as trusted code inside OMP, not in a sandbox. Only load a checkout or package you trust. The compatibility target is OMP **18.8.7** with Bun **>=1.3.14**; there is no separate long-term support policy or guarantee for future host versions.

## What this extension changes

The extension changes how eligible tool calls appear in the main interactive TUI. It delegates execution to OMP through `ctx.invokeTool(args)`, retaining native permission decisions, output, cancellation, and job ownership. Runtime registration provenance is extension-owned even though execution is native. It is not a security boundary, permission bypass, output sanitizer, or replacement for OMP's policies.

If something looks wrong, stop the session and relaunch without the `--extension` flag. If linked as a plugin, use `omp plugin disable omp-zen` or `omp plugin uninstall omp-zen`, then restart. Do not treat a compact status line as proof of an operation's safety; expand and inspect the native result.

## Report a sensitive finding

Use [GitHub's private vulnerability reporting](https://github.com/kendotpm/omp-zen/security/advisories/new). Do not post secrets or exploit details in a public issue. If private reporting is unavailable, ask the maintainer for a private route without disclosing the finding publicly.

Include the exact versions, affected configuration, minimal reproduction, impact, and whether the issue also occurs with the extension omitted. Share only redacted evidence and use disposable fixtures. Never attach tokens, credentials, customer information, browser profiles, or complete private session logs.

No response-time commitment, bounty program, security audit, or upstream endorsement is claimed. Native OMP vulnerabilities should also be reported through OMP's current security reporting process.
