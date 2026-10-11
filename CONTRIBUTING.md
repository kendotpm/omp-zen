# Contributing

Thanks for helping make busy OMP sessions easier to follow. Small, focused changes are welcome—especially clear reproductions of a rendering problem.

## Work locally

Use OMP **18.8.7**, Bun **1.3.14 or newer**, and npm for the contributor dependency workflow. This exact host version is the compatibility target, not a promise about newer OMP releases.

From the checkout:

```sh
npm ci
npm test
npm run smoke
npm run check:package
```

These commands cover regression tests, real OMP module loading, and the package contract. The loader smoke makes no model request and does not execute tools; it is not a substitute for seeing the extension in a real interactive session. Launch without changing your installed plugins:

```sh
omp --extension /absolute/path/to/omp-zen
```

Use a disposable project and isolated settings/journal for experiments. Do not change personal permissions, enable paid services, or write to shared resources just to make a test pass. See [coverage and validation boundaries](docs/COVERAGE.md) before choosing a tool to exercise.

## Record the demo

The README animation is a real OMP session recorded with [Charm VHS](https://github.com/charmbracelet/vhs). Install `vhs`, `ttyd`, `ffmpeg`, and `tmux`, plus the JetBrainsMono Nerd Font Mono used by the tape. OMP 18.8.7 and Node must be on PATH; OMP also needs an already configured model provider.

From the repository root:

```sh
npm run demo
# Optional: select an already configured model for this run.
OMP_ZEN_DEMO_MODEL=provider/model npm run demo
```

The launcher skips npm's local development-SDK executable when resolving `omp`, so recording uses your installed OMP application. If needed, set `OMP_ZEN_DEMO_OMP` to that executable's absolute path. The tape uses a dedicated `omp-zen-vhs` tmux server in a POSIX environment; this is not a native Windows recording recipe. Don't run two copies of this tape concurrently.

[`demo/zen.tape`](demo/zen.tape) contains the timing and keypresses; [`demo/session.mjs`](demo/session.mjs) launches real OMP with native glob, grep, and bash. It creates harmless files in ignored `.local/demo-workspace`, sets OMP's `theme.dark` and `theme.light` to `dark-dracula` in a recording-only overlay, and never copies credentials. VHS also uses Dracula. No personal settings or global plugin registrations are changed. The configured provider may receive the demo prompt and public fixture contents and charge for the turn.

The tape uses 1–3 second editorial clips: expanded live checks → OMP Zen card → reattach and Ctrl+O → later live compact checks → tagline. Setup and model/network waits are omitted with VHS Hide/Show; terminal footage remains real, not replayed or synthesized output. A dedicated tmux session keeps OMP running across cuts and closes after the checks. If recording is interrupted, close only that server with `tmux -L omp-zen-vhs kill-server`. The finished GIF is `assets/omp-zen.gif`; the MP4 stays under ignored `.local/` for frame inspection. Review every scene and transition for private paths, credentials, customer content, and unexpected dialogs before committing a new recording. Never run `vhs publish` without explicit publication approval.

## Keep the change small

- Keep native execution behind `ctx.invokeTool(args)`. Permissions, results, cancellation, progress, kernels, and background jobs belong to OMP.
- Do not wrap a disabled tool or replace another extension's override. Preserve unsupported configurations rather than forcing compact output.
- Test collapsed status and expanded disclosure together. Error, running, partial, and accepted work must not look like completed success.
- Preserve native text, structured details, diffs, diagnostics, artifacts, and media. This is presentation, not token or context compression.
- Update the changelog and coverage documentation when user-visible behavior or a support boundary changes.

For a bug report, include the OMP/Bun versions, terminal surface (ANSI or Tern), enabled tool/configuration, reproduction steps, and what you expected to see. A short redacted example is usually more useful than an entire transcript. Do not include credentials, customer data, private paths, or authentication profiles.

## Before a release

A maintainer should run the integrated checks once, then exercise visible collapsed/expanded behavior, native approval and cancellation, extension-off behavior, and package loading. Record what actually ran, including blockers; passing fixture tests does not prove real backend behavior. [Release and submission guidance](docs/FEATURE-SUBMISSION.md) separates local preparation from public actions requiring approval.

Contributions are distributed under the [MIT license](LICENSE). That license does not appoint a release maintainer or grant access to publishing accounts. See [security reporting](SECURITY.md) for sensitive findings.
