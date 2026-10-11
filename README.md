# OMP Zen

> Give your OMP session a little breathing room.

Quiet tool calls for [Oh My Pi](https://omp.sh). Same tools. Details one keypress away.

![OMP Zen demo](assets/omp-zen.gif)

## Quickstart

1. Install **OMP 18.8.7** and connect your model: [setup](docs/SETUP.md).
2. Open a terminal in the `omp-zen` folder you received.
3. Run:

```sh
omp plugin link .
```

Keep that folder in place. Restart OMP, then run `omp` from any project. Zen loads automatically.

Press **Ctrl+O** for details. No build or config editing. Not published yet.

## Configuration

Instead of linking, add this to `~/.omp/agent/config.yml` and restart OMP:

```yaml
extensions:
  - /full/path/to/omp-zen
```

Use your actual folder path. Keep any existing extension entries.

[Setup](docs/SETUP.md) · [Coverage](docs/COVERAGE.md) · [Contributing](CONTRIBUTING.md) · [MIT](LICENSE)
