# Real OMP/native tools. Editorial cuts omit setup and model latency.
# Run from the repository root: npm run demo
Require node
Require omp
Require tmux

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
Set Theme "Dracula"
Set Framerate 20
Set TypingSpeed 1ms
Set CursorBlink false

Hide
Type `export PS1=''; clear; printf '\n\n  Normal OMP\n\n  Tool calls expanded.\n  Every search result and command output, as the work happens.\n\n'`
Enter
Sleep 100ms
Show
Sleep 6s
Hide
Type `tmux -L omp-zen-vhs new-session -d -s demo 'node demo/session.mjs'; tmux -L omp-zen-vhs set-option -g status off; tmux -L omp-zen-vhs attach-session -t demo`
Enter
Wait+Screen@120s /glob ·/
Ctrl+o
ScrollDown 100
Wait+Screen@60s /node check\.mjs 01/
Show
Sleep 1500ms
ScrollDown 12
Sleep 500ms

# Readable editorial card; the same OMP session continues running detached.
Hide
Ctrl+b
Type "d"
Sleep 100ms
Type `clear; printf '\n\n  OMP Zen\n\n  Ctrl+O\n\n'`
Enter
Sleep 100ms
Show
Sleep 5s

Hide
Type "tmux -L omp-zen-vhs attach-session -t demo"
Enter
Sleep 150ms
ScrollDown 100
Show
Ctrl+o
Sleep 750ms
Hide
# Cut to later live calls instead of showing model/network waits.
Wait+Screen@120s /node check\.mjs 06/
Show
Sleep 2s
Hide
Wait+Screen@120s /All eight batches checked\./
Ctrl+b
Type "d"
Sleep 100ms
Type "tmux -L omp-zen-vhs kill-server"
Enter
Sleep 100ms
Type `clear; printf '\n\n  Give your OMP session a little breathing room.\n\n  OMP Zen\n  Less noise. Same tools.\n\n'`
Enter
Sleep 100ms
Show
Sleep 5s
