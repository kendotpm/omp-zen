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
4. Launch Zen:

```sh
omp --extension .
```

The `.` means “this folder.” No build, `npm install`, or configuration editing is needed.

5. Type this into OMP and press Enter:

```text
Use glob to list the TypeScript files in this folder. Don't change any files.
```

A compact tool line appears. Press **Ctrl+O** to reveal the native file list; press it again to collapse it.

To turn Zen off, exit OMP with **Ctrl+D** when the input is empty, then start `omp` without the extension argument.

## Use it in another project

Open a terminal in the project you want OMP to work on. Start OMP with the full path to your Zen folder:

```sh
omp --extension "/full/path/to/omp-zen"
```

Replace `/full/path/to/omp-zen` with your folder's actual location. Quotes keep paths containing spaces together. The extension path controls what loads; the terminal's current folder controls where OMP works.

On macOS, you can type `omp --extension ` and drag the Zen folder into the terminal to insert its path. Then press Enter.

Omit the extension argument on the next launch to return to the native view. Don't load both the standalone package and a bundled harness copy in the same session.

## Keep Zen available across projects

From the Zen folder:

```sh
omp plugin link .
```

This creates a user-scoped link to that folder—it doesn't copy it. Keep the folder in place. Close OMP and start it again in your project with `omp`; installed extensions are discovered at startup.

Check the registration:

```sh
omp plugin list
omp plugin doctor
```

To stop loading it, then restart OMP:

```sh
omp plugin disable omp-zen
```

To remove its registration:

```sh
omp plugin uninstall omp-zen
```

Linking changes your user plugin state. It doesn't grant additional tool permissions.

## If the view doesn't change

- Use OMP **18.8.7** in an interactive terminal; print, JSON, RPC, and child sessions stay native.
- Start a fresh session after linking or changing extension configuration.
- Try native `glob`: grouped `read`, images, and some other tools intentionally retain their normal view.
- See [coverage](COVERAGE.md) for xdev writes, speculative eval, streaming-abort edit, and other native-preserved cases.

For a report, include the OMP version, terminal, tool, relevant configuration, and a small redacted reproduction. Don't attach credentials or private transcripts. Use the [security guidance](../SECURITY.md) for sensitive findings.

## Public installation

OMP Zen isn't publicly hosted or published to npm yet. There is no clone/download URL or working registry install command to share. [Release notes for maintainers](FEATURE-SUBMISSION.md) cover those separate steps.
