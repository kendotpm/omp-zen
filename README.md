# OMP Zen

> Give your OMP session a little breathing room.

An extension for [Oh My Pi](https://omp.sh), the coding agent that runs in your terminal. OMP Zen keeps tool calls on one quiet line. Press **Ctrl+O** when you want the details.

![OMP doing tool-heavy work with expanded output, then OMP Zen and Ctrl+O keep the same live work compact](assets/omp-zen.gif)

## Quickstart

### 1. Get OMP ready

Already using **OMP 18.8.7**? Skip to step 2.

Otherwise, install [Bun](https://bun.sh/docs/installation), open a new terminal, and run:

```sh
bun install --global @oh-my-pi/pi-coding-agent@18.8.7
omp --version
```

Bun must be **1.3.14 or newer**. OMP should report `18.8.7`; newer OMP versions haven't been verified yet. Run `omp login` and follow the prompts to connect your model provider. Your provider may require a paid account or API key.

### 2. Open the OMP Zen folder

Use the `omp-zen` folder you received; unzip it first if needed. **There isn't a public download or npm release yet.**

Open a terminal in that folder. You should see `README.md` and `index.ts` there. If your terminal is somewhere else, type `cd `, drag the folder into the terminal, and press Enter—or use your file manager's **Open in Terminal** action.

### 3. Start OMP with Zen

```sh
omp --extension .
```

The `.` means “this folder.” No build, `npm install`, or config editing needed. Zen loads for this session only.

### 4. Try it

Type this into OMP and press Enter:

```text
Use glob to list the TypeScript files in this folder. Don't change any files.
```

You'll see a compact tool line. Press **Ctrl+O** to reveal the file list; press it again to collapse it.

**Turn it off:** exit OMP with **Ctrl+D** when the input is empty, then start `omp` without `--extension .`.

## Good to know

Zen changes the main interactive terminal view—not tool permissions or what the agent receives. Some tools, images, and state-sensitive configurations keep their native view. [Full coverage](docs/COVERAGE.md).

[Use Zen in another project or keep it installed](docs/SETUP.md) · [Contribute or record the demo](CONTRIBUTING.md) · [Verification](docs/VERIFICATION.md) · [MIT license](LICENSE)
