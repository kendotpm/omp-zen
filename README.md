# OMP Zen

Give your OMP session a little breathing room.

Busy agent sessions can turn into a wall of tool output. OMP Zen keeps eligible tool calls on one quiet line, so you can see **what ran, where, and whether it finished**. Press **Ctrl+O** whenever you want the full details.

[Get started](#try-it-in-your-next-session) · [Coverage](docs/COVERAGE.md) · [Contributing](CONTRIBUTING.md)

Here's a real session, with the results collapsed:

```text
glob · *.ts · done
bash · printf 'COMPACT_FIRST\nCOMPACT_SECOND\nCOMPACT_THIRD\n' · done
```

Press **Ctrl+O** and the file list and all three output lines come back in OMP's usual view. Press it again to tuck them away. Long targets shorten to fit your terminal; OMP still adds its normal blank spacing.

[See what we verified](docs/VERIFICATION.md).

## Try it in your next session

You'll need **OMP 18.8.7** and **Bun 1.3.14 or newer**. That's the exact compatibility target; newer OMP versions haven't been validated here.

From a local checkout, start OMP with its absolute path:

```sh
omp --extension /absolute/path/to/omp-zen
```

This loads the extension for that launch. It doesn't install a global plugin or change your permissions. To turn it off, start your next session without the flag.

**Try this first:** in a disposable project, ask OMP to list matching files with `glob`, then run a harmless command that prints a few lines. Watch the compact status, press **Ctrl+O** to inspect the full result, and collapse it again.

Want it available across your projects? You can optionally link the checkout:

```sh
omp plugin link /absolute/path/to/omp-zen
```

Linking is **user-scoped** and changes your user plugin state. Restart OMP after linking. To stop loading the linked plugin, disable or uninstall it and restart:

```sh
omp plugin disable omp-zen
# Or remove the link:
omp plugin uninstall omp-zen
```

<details>
<summary>Installing from npm</summary>

The package isn't published to npm yet. Once it is published under this name:

```sh
omp plugin install omp-zen
```

For now, use the local checkout above.

</details>

## What stays the same

You still get OMP's native execution, permissions, output, cancellation, progress, and background-job ownership. Ctrl+O reveals native rich results where available—including diffs and diagnostics—and generic disclosure keeps text and structured details accessible.

It's an extension, not a patched copy of OMP. It changes what you see—not what the agent receives. It doesn't save tokens or compress context. The [coverage guide](docs/COVERAGE.md#execution-and-registration-contract) explains how native delegation works and where the boundary is.

## A few things to expect

- It changes the **main interactive TUI only**. Child agents and print/JSON/RPC sessions stay native; disabled tools and other extensions' overrides are left alone.
- Some tools deliberately keep their native view, including grouped `read`, `task`, and `new_context`. Media and host-added diagnostics can also remain visible. Compact doesn't mean hiding useful information.
- xdev-enabled `write`, speculative `eval`, and streaming-abort `edit` also stay native. Those paths need more than a different renderer.

The [coverage guide](docs/COVERAGE.md) has the full tool inventory, backend prerequisites, and the reason for each boundary. Your existing providers, language servers, memory services, and other native dependencies are still required.

## If something feels off

Expand the result first, then try a fresh session without the extension. After changing tool selections or state-sensitive settings, reload/restart rather than assuming an already wrapped catalog will switch configurations in place. Old scrollback may keep its earlier expansion until OMP replays it.

A small redacted reproduction helps: include your exact OMP/Bun versions, terminal surface, tool, and relevant configuration. Please don't share private transcripts, credentials, or customer data. Sensitive findings belong in the [security reporting route](SECURITY.md).

## Help make it better

For contributor setup:

```sh
npm ci
npm test
npm run check:package
```

See [Contributing](CONTRIBUTING.md) for the development workflow and [Verification](docs/VERIFICATION.md) for the real-session checks. Found a case that feels noisy or loses useful detail? A small reproduction is a good place to start.

For maintainers, [release and listing notes](docs/FEATURE-SUBMISSION.md) cover packaging and asking OMP to consider the extension.

## License

[MIT](LICENSE), © 2026 OMP Zen contributors.
