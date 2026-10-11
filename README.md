# OMP Zen

> Give your OMP session a little breathing room.

A small [Oh My Pi](https://omp.sh) extension that quiets tool calls without hiding their details.

![OMP Zen demo](assets/omp-zen.gif)

## What it does

- Keeps supported tool calls on one line.
- Reveals native details with **Ctrl+O**.
- Leaves execution, permissions, and agent context unchanged.

## Install

Requires **OMP 18.8.7**. New to OMP? [Start here](docs/SETUP.md).

Run this in your terminal:

```sh
omp plugin install github:kendotpm/omp-zen
```

Restart OMP. No cloning, build, or config editing needed.

## Usage

Run `omp` from your project. Zen loads automatically.

**Ctrl+O** toggles details. Some tools stay native: [coverage](docs/COVERAGE.md).

[Setup & removal](docs/SETUP.md) · [Contributing](CONTRIBUTING.md) · [MIT](LICENSE)
