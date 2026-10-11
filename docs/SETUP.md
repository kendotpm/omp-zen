# OMP Zen setup

The [README installation](../README.md#install) is the short version. Start here if you're new to OMP or terminal extensions.

## First time

1. Install [Bun](https://bun.sh/docs/installation), then open a new terminal. Bun must be 1.3.14 or newer.
2. Install the verified OMP version and check it:

```sh
bun install --global @oh-my-pi/pi-coding-agent@18.8.7
omp --version
```

OMP should report 18.8.7. Run `omp login` and follow the prompts to connect your model provider; you may need a paid account or API key. Newer OMP versions haven't been verified with Zen yet.

3. Install OMP Zen directly from GitHub:

```sh
omp plugin install github:kendotpm/omp-zen
```

OMP downloads and registers the extension for your user account. No manual checkout, build, `npm install`, or configuration editing is needed. Keep your existing project folder as-is.

4. Close any open OMP sessions. Open a terminal in your project folder and run:

```sh
omp
```

Zen now loads automatically. Press **Ctrl+O** whenever you want to expand or collapse tool details. Installation doesn't grant additional tool permissions.

## Check the installation

Run these in a terminal:

```sh
omp plugin list
omp plugin doctor
```

The list should include `omp-zen`. Restart OMP after installing; an already-open session won't import the new extension. Don't also load a bundled harness copy or add a second `--extension` argument.

## Disable or remove Zen

To stop loading it, then restart OMP:

```sh
omp plugin disable omp-zen
```

To remove its registration:

```sh
omp plugin uninstall omp-zen
```

Disabling or uninstalling removes only OMP's plugin activation or installed copy; your project files are unchanged.

## Update

```sh
omp plugin upgrade omp-zen
```

Restart OMP after upgrading.

## Local development

If you want to edit the extension itself:

```sh
git clone https://github.com/kendotpm/omp-zen.git
cd omp-zen
omp plugin link .
```

This registers a link to your checkout instead of a downloaded copy. Keep the checkout in place, restart OMP, and do not also install the GitHub copy. [Contributor guide](../CONTRIBUTING.md).

## If the view doesn't change

- Use OMP **18.8.7** in an interactive terminal; print, JSON, RPC, and child sessions stay native.
- Start a fresh session after linking or changing extension configuration.
- Try native `glob`: grouped `read`, images, and some other tools intentionally retain their normal view.
- See [coverage](COVERAGE.md) for xdev writes, speculative eval, streaming-abort edit, and other native-preserved cases.

For a report, include the OMP version, terminal, tool, relevant configuration, and a small redacted reproduction. Don't attach credentials or private transcripts. Use the [security guidance](../SECURITY.md) for sensitive findings.

## Public installation

Source is hosted at [kendotpm/omp-zen](https://github.com/kendotpm/omp-zen). Install it through OMP with `omp plugin install github:kendotpm/omp-zen`; no separate package-manager installation is needed.
