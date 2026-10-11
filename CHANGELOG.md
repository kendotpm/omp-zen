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
- Added a real terminal demo recorded with Charm VHS, with a portable tape, disposable fixture launcher, and `npm run demo` regeneration command.
- Reordered the demo to expanded live tool-heavy work → OMP Zen card → Ctrl+O → continued compact work → tagline, using real sequential validation batches instead of held completion screens.
- Tightened the demo into short live clips and applied Dracula to both the recording frame and recording-only OMP instance; personal theme settings are unchanged.
- Added a six-second opening explanation of normal expanded OMP and five-second OMP Zen/tagline cards, while retaining short live work clips.
- Slimmed the README to the demo and a beginner quickstart; moved optional installation and troubleshooting to `docs/SETUP.md`. Preserved the approved GIF unchanged.
- Reduced the front-page README to a minimal quickstart; retained complete beginner instructions in the linked setup guide.
- Made quickstart install the extension with `omp plugin link .`, followed by restart and plain `omp`; moved demonstration-only launch instructions out of the installation path.
- Replaced scripted validation footage with a real todo-list app build, using the requested Native OMP intro and three-/six-second work clips.
- Added a concise native `config.yml` example as an alternative to plugin linking.

Runtime and regression tests were extracted from the existing optional capability's live worktree, audited against OMP 18.8.7. Historical source-worktree observations are summarized in [coverage](docs/COVERAGE.md); they do not establish standalone package verification. Public remote creation, npm publication, and OMP listing/feature acceptance have not occurred as part of this preparation.
