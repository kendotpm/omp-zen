# Public release and OMP submission

OMP Zen's public source is [kendotpm/omp-zen](https://github.com/kendotpm/omp-zen), released with the owner's explicit approval. GitHub is the initial distribution route; npm publication and an OMP featured listing are separate future decisions.

## Use OMP's native package model

The package declares its extension through `package.json`:

```json
{
  "omp": {
    "extensions": ["./index.ts"]
  }
}
```

OMP's plugin loader imports the declared extension entry. Public installation uses `omp plugin install github:kendotpm/omp-zen`; restart OMP afterward. Local linking is only a contributor alternative, not a prerequisite for users.

The official [marketplace documentation](https://github.com/can1357/oh-my-pi/blob/v18.8.7/docs/marketplace.md) describes catalog discovery and Git/local sources. The [installer plumbing documentation](https://github.com/can1357/oh-my-pi/blob/v18.8.7/docs/plugin-manager-installer-plumbing.md) describes native `omp.extensions` discovery, npm installs, and local links. These documents were also consulted through OMP's built-in documentation surfaces. Check the current upstream docs before release in case the submission process has changed.

A single plugin does **not** need its own self-hosted marketplace catalog. An existing marketplace maintainer can list an approved public Git source, pinned to a release revision. Current marketplace documentation says npm catalog sources are parsed but not installable; direct `omp plugin install` of an npm package is a separate route. Do not confuse those paths or generate a catalog merely to appear listed.

## Short listing text

> Give your OMP session a little breathing room. OMP Zen keeps eligible tool calls to a readable tool · target · status line, with native Ctrl+O expansion when you want the details. It runs as an opt-in extension in the main interactive TUI and delegates execution, permissions, output, cancellation, and jobs to OMP. Compatibility target: OMP 18.8.7, Bun >=1.3.14. Some tools and state-sensitive configurations deliberately retain native UI. MIT licensed.

Use this text only alongside the actual release artifact and [coverage limits](COVERAGE.md). Do not add “official,” “featured,” universally compatible, token-saving, or context-compression claims.

## Before another release

- Keep the public repository owner and maintainer metadata accurate.
- If adding npm distribution, check name availability and publishing authority first. `omp-zen` is not currently published or reserved on npm.
- Confirm permission to release all extracted code and dependencies. MIT was selected for this repository; license choice is not confirmation of third-party rights or access to a publishing account.
- Decide release/tag and npm account authority, credential handling, two-factor protection, and who can approve future releases. The MIT license permits reuse but does not appoint the official maintainer.
- Run `npm ci`, `npm test`, `npm run check:package`, and the integrated package smoke. Review the packed file list for accidental profiles, credentials, private configuration, logs, or customer evidence.
- Validate an actual OMP 18.8.7 main TUI session using the packed/installed artifact. Record version, surface, configuration, real outcomes, and exact limits; do not promote fixture tests into backend proof.
- After packaging smoke, capture a short **redacted real demo** showing collapsed calls, Ctrl+O details, and an honest native-preserved case. Use disposable fixtures, not customer or personal session data. An illustrative text sample is not a recording.
- Update changelog/coverage with observed evidence and make the release artifact reproducible before requesting review.

The initial GitHub repository and source push were explicitly approved. Further releases should keep the evidence and source in sync. npm publication and an OMP feature submission still need separate approval. An npm install command becomes valid only after that package actually exists:

```sh
# After publication under this exact name only:
omp plugin install omp-zen
```

If the published name changes, update commands and metadata before sharing them.

## Asking OMP maintainers to consider it

Identify the current official submission channel from OMP's public repository/documentation. Send the approved repository/release URL, truthful listing text, exact compatibility target, license, setup/uninstall instructions, smoke evidence, redacted demo, and native-limit summary. Ask whether an existing catalog/listing is appropriate rather than claiming acceptance.

No official “featured extension” eligibility rubric was found in the marketplace or installer documentation consulted. Listing and feature acceptance are controlled by OMP maintainers; packaging compliance does not guarantee either. Do not preannounce approval, fabricate a badge, or imply affiliation.

## README design references

The initial pass read popular Pi/multi-agent projects: [pi-autoresearch](https://github.com/davebcn87/pi-autoresearch), [pi-subagents](https://github.com/nicobailon/pi-subagents), [Plannotator](https://github.com/backnotprop/plannotator), and [Agent Stuff](https://github.com/mitsuhiko/agent-stuff). That was not a ranking of OMP extensions.

The OMP-specific pass used GitHub repository searches sorted by stars for `"oh my pi" extension in:description fork:false` and `omp extension in:description fork:false`, then read the returned READMEs. At inspection, [OmniRoute](https://github.com/md-riaz/omniroute-agent-extension) had 26 stars (cross-host OMP/Pi/Prime), [OMP Undo/Redo](https://github.com/Baylar55/omp-undo-redo) had 20 (OMP/Pi), and [GSD for OMP](https://github.com/tchivs/gsd-omp) had 18. These are leaders in those scoped results, not an exhaustive ecosystem leaderboard. [Skilld](https://github.com/Attacktive/omp-skilld) and [pedropb's OMP extensions](https://github.com/pedropb/pi-extensions) supplied additional native installation examples.

Useful patterns: state the host and benefit plainly; put requirements and the working install route before architecture; give a concrete first action and expected result; link optional setup and technical references separately. Several references remain long themselves; their length was not adopted. Prose, branding, screenshots, and endorsement are not copied.

The user's preferred reference is [dbachelder/pi-btw](https://github.com/dbachelder/pi-btw). Its README was read directly: small-extension introduction, screenshot, What it does, Install, Usage, then controls/configuration/behavior. OMP Zen follows the first five sections with a compact Configuration example, leaving detailed boundaries and removal instructions in linked docs. This is a Pi extension design reference, not an OMP compatibility claim.
