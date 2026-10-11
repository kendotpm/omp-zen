# OMP Zen setup

The [README quickstart](../README.md#quickstart) is the short version. Start here if you're new to OMP or terminal extensions.

## First time

1. Install [Bun](https://bun.sh/docs/installation), then open a new terminal. Bun must be 1.3.14 or newer.
2. Install the verified OMP version and check it:

```sh
bun install --global @oh-my-pi/pi-coding-agent@18.8.7
omp --version
```

OMP should report 18.8.7. Run `omp login` and follow the prompts to connect your model provider; you may need a paid account or API key. Newer OMP versions haven't been verified with Zen yet.

3. Unzip the `omp-zen` folder you received if needed. There's no public download yet. Open a terminal in that folder: use your file manager's **Open in Terminal**, or type `cd `, drag the folder into the terminal, and press Enter. You should see `README.md` and `index.ts`.
4. Install the local extension:

```sh
omp plugin link .
```

The `.` means “this folder.” OMP registers a user-scoped link to it, so keep the folder in place. No build, `npm install`, or configuration editing is needed.

5. Close any open OMP sessions. Open a terminal in your project folder and run:

```sh
omp
```

Zen now loads automatically. Press **Ctrl+O** whenever you want to expand or collapse tool details. Linking doesn't grant additional tool permissions.

## Check the installation

Run these in a terminal:

```sh
omp plugin list
omp plugin doctor
```

The list should include `omp-zen`. Restart OMP after installing; an already-open session won't import the newly linked extension. Don't also load a bundled harness copy or add a second `--extension` argument.

## Disable or remove Zen


To stop loading it, then restart OMP:

```sh
omp plugin disable omp-zen
```

To remove its registration:

```sh
omp plugin uninstall omp-zen
```

Disabling or uninstalling changes only the plugin registration; the extension folder and your project files remain in place.

## If the view doesn't change

- Use OMP **18.8.7** in an interactive terminal; print, JSON, RPC, and child sessions stay native.
- Start a fresh session after linking or changing extension configuration.
- Try native `glob`: grouped `read`, images, and some other tools intentionally retain their normal view.
- See [coverage](COVERAGE.md) for xdev writes, speculative eval, streaming-abort edit, and other native-preserved cases.

For a report, include the OMP version, terminal, tool, relevant configuration, and a small redacted reproduction. Don't attach credentials or private transcripts. Use the [security guidance](../SECURITY.md) for sensitive findings.

## Public installation

OMP Zen isn't publicly hosted or published to npm yet. There is no clone/download URL or working registry install command to share. [Release notes for maintainers](FEATURE-SUBMISSION.md) cover those separate steps.
