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
