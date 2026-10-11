# OMP Zen

> Give your OMP session a little breathing room.

A small [Oh My Pi](https://omp.sh) extension that quiets tool calls without hiding their details.

![OMP Zen demo](assets/omp-zen.gif)

## What it does

- Keeps supported tool calls on one line.
- Reveals native details with **Ctrl+O**.
- Leaves execution, permissions, and agent context unchanged.

## Install

Requires **OMP 18.8.7**; Pi isn't supported. New to OMP? [Start here](docs/SETUP.md).

Open a terminal in your `omp-zen` folder:

```sh
omp plugin link .
```

Keep the folder in place. Restart OMP. No build needed; not published yet.

## Usage

Run `omp` from your project. Zen loads automatically.

**Ctrl+O** toggles details. Some tools stay native: [coverage](docs/COVERAGE.md).

## Configuration

Alternatively, **instead of linking**, add your folder to `~/.omp/agent/config.yml`:

```yaml
extensions:
  - /full/path/to/omp-zen
```

Keep existing entries; restart OMP.

[Setup & removal](docs/SETUP.md) · [Contributing](CONTRIBUTING.md) · [MIT](LICENSE)
