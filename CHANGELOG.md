# Changelog

Notable user-visible changes are recorded here. A prepared package version is not a published release.

## 0.1.0 — Unreleased

- Extracted the compact-tool presentation capability into OMP Zen, a standalone, opt-in extension with local-checkout loading and native `omp.extensions` discovery.
- Retained tool/target/status presentation, native Ctrl+O disclosure, and native execution delegation for eligible tools in the main interactive TUI.
- Retained native UI for unsupported tools, media results, and state-sensitive configurations; no core patch or token/context-compression behavior added.
- Set the compatibility target to OMP 18.8.7 and Bun >=1.3.14.
- Added standalone setup, contribution, security, coverage, and public-release guidance under the MIT license.
- Added independent regression tests, native-loader smoke, package allowlist checks, a dependency lockfile, and read-only Linux CI.
- Recorded real OMP ANSI checkout and packed-artifact workflows in [Verification](docs/VERIFICATION.md), including Ctrl+O disclosure and narrow-terminal behavior.
- Named the repository and package `omp-zen`, with the README opening “Give your OMP session a little breathing room.” No tool behavior changed.

Runtime and regression tests were extracted from the existing optional capability's live worktree, audited against OMP 18.8.7. Historical source-worktree observations are summarized in [coverage](docs/COVERAGE.md); they do not establish standalone package verification. Public remote creation, npm publication, and OMP listing/feature acceptance have not occurred as part of this preparation.
