# Real OMP UI. No fabricated tool cards or replayed fixture transcript.
# Run from the repository root: vhs demo/zen.tape
Require node
Require omp

Output assets/omp-zen.gif
Output .local/omp-zen.mp4

Set Shell "bash"
Set FontFamily "JetBrainsMono Nerd Font Mono"
Set FontSize 18
Set Width 1200
Set Height 900
Set Padding 28
Set Margin 16
Set BorderRadius 12
Set WindowBar Rings
Set Theme "Catppuccin Mocha"
Set Framerate 20
Set TypingSpeed 35ms
Set CursorBlink false

Hide
Type `export PS1=''; clear; printf '\n  OMP Zen\n\n  Give your OMP session a little breathing room.\n\n'`
Enter
Sleep 500ms
Show
Sleep 3s

Hide
Type "node demo/session.mjs"
Enter
Wait+Screen@120s /All clear\. Details are a keypress away\./
Sleep 800ms
Show
Sleep 5s

Ctrl+o
Wait+Screen /3 files checked\./
Sleep 6s

Ctrl+o
Wait+Screen /Tool output expansion: disabled/
Sleep 5s

Hide
Ctrl+c
Ctrl+c
Sleep 1s
Type `clear; printf '\n  Less noise. Same tools.\n\n  OMP Zen\n  omp --extension /path/to/omp-zen\n\n'`
Enter
Sleep 500ms
Show
Sleep 4s
