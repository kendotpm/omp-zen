# Public release and OMP submission

This is a release guide, not evidence of publication or a featured listing. OMP Zen is currently prepared as a local standalone extension. Public remote ownership, npm name availability, publishing authority, and any OMP submission are still pending decisions.

## Use OMP's native package model

The package declares its extension through `package.json`:

```json
{
  "omp": {
    "extensions": ["./index.ts"]
  }
}
```

OMP's plugin loader imports those declared extension entries. Local checkout loading needs no marketplace, global install, or private configuration. A user-scoped `omp plugin link /absolute/path/to/omp-zen` is optional and mutates the user's plugin state; restart to load the extension.

The official [marketplace documentation](https://github.com/can1357/oh-my-pi/blob/v18.8.7/docs/marketplace.md) describes catalog discovery and Git/local sources. The [installer plumbing documentation](https://github.com/can1357/oh-my-pi/blob/v18.8.7/docs/plugin-manager-installer-plumbing.md) describes native `omp.extensions` discovery, npm installs, and local links. These documents were also consulted through OMP's built-in documentation surfaces. Check the current upstream docs before release in case the submission process has changed.

A single plugin does **not** need its own self-hosted marketplace catalog. An existing marketplace maintainer can list an approved public Git source, pinned to a release revision. Current marketplace documentation says npm catalog sources are parsed but not installable; direct `omp plugin install` of an npm package is a separate route. Do not confuse those paths or generate a catalog merely to appear listed.

## Short listing text

> Give your OMP session a little breathing room. OMP Zen keeps eligible tool calls to a readable tool · target · status line, with native Ctrl+O expansion when you want the details. It runs as an opt-in extension in the main interactive TUI and delegates execution, permissions, output, cancellation, and jobs to OMP. Compatibility target: OMP 18.8.7, Bun >=1.3.14. Some tools and state-sensitive configurations deliberately retain native UI. MIT licensed.

Use this text only alongside the actual release artifact and [coverage limits](COVERAGE.md). Do not add “official,” “featured,” universally compatible, token-saving, or context-compression claims.

## Before making it public

- Confirm who owns the public remote and who maintains the project; do not invent a repository URL.
- Check npm name availability at release time. `omp-zen` is the local manifest name, not a reserved or published namespace.
- Confirm permission to release all extracted code and dependencies. MIT was selected for this repository; license choice is not confirmation of third-party rights or access to a publishing account.
- Decide release/tag and npm account authority, credential handling, two-factor protection, and who can approve future releases. The MIT license permits reuse but does not appoint the official maintainer.
- Run `npm ci`, `npm test`, `npm run check:package`, and the integrated package smoke. Review the packed file list for accidental profiles, credentials, private configuration, logs, or customer evidence.
- Validate an actual OMP 18.8.7 main TUI session using the packed/installed artifact. Record version, surface, configuration, real outcomes, and exact limits; do not promote fixture tests into backend proof.
- After packaging smoke, capture a short **redacted real demo** showing collapsed calls, Ctrl+O details, and an honest native-preserved case. Use disposable fixtures, not customer or personal session data. An illustrative text sample is not a recording.
- Update changelog/coverage with observed evidence and make the release artifact reproducible before requesting review.

These are release gates, not tasks already completed. No remote creation, push, npm publication, or feature submission is authorized by local preparation. Each public action needs explicit owner approval. npm install instructions become valid only after a release under the chosen available name is actually published:

```sh
# After publication under this exact name only:
omp plugin install omp-zen
```

If the published name changes, update commands and metadata before sharing them.

## Asking OMP maintainers to consider it

Identify the current official submission channel from OMP's public repository/documentation. Send the approved repository/release URL, truthful listing text, exact compatibility target, license, setup/uninstall instructions, smoke evidence, redacted demo, and native-limit summary. Ask whether an existing catalog/listing is appropriate rather than claiming acceptance.

No official “featured extension” eligibility rubric was found in the marketplace or installer documentation consulted. Listing and feature acceptance are controlled by OMP maintainers; packaging compliance does not guarantee either. Do not preannounce approval, fabricate a badge, or imply affiliation.

## README design references

Popular public extension projects offer useful document design, not compatibility or endorsement evidence: [pi-autoresearch](https://github.com/davebcn87/pi-autoresearch), [pi-subagents](https://github.com/nicobailon/pi-subagents), [Plannotator](https://github.com/backnotprop/plannotator), and [Agent Stuff](https://github.com/mitsuhiko/agent-stuff). Their benefit-led openings, early demos, direct quick starts, and separate detailed references informed this package's approachable README. The Agent Stuff README and repository API were read directly; its API reported 3,181 stars on 2026-10-10. This is a reference observation, not an exhaustive popularity ranking. Prose, branding, screenshots, and endorsement are not copied.
