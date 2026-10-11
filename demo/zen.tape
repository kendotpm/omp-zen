# Real OMP builds the app. Only recording setup and editorial cards are scripted.
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
Type `export PS1=''; clear; printf '\n\n  Native OMP\n\n  Noisy, fast-moving, and jarring height changes.\n\n'`
Enter
Sleep 100ms
Show
Sleep 6s
Hide
Type `tmux -L omp-zen-vhs new-session -d -s demo 'node demo/session.mjs'; tmux -L omp-zen-vhs set-option -g status off; tmux -L omp-zen-vhs attach-session -t demo`
Enter
Wait+Screen@120s /write ·/
Ctrl+o
ScrollDown 100
Sleep 250ms
Show
Sleep 1s
ScrollDown 8
Sleep 1s
ScrollDown 8
Sleep 1s

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
Sleep 2s
ScrollDown 8
Sleep 2s
ScrollDown 8
Sleep 2s
Hide
Ctrl+b
Type "d"
Sleep 100ms
Type `clear; printf '\n\n  Give your OMP session a little breathing room.\n\n  OMP Zen\n  Less noise. Same tools.\n\n'`
Enter
Sleep 100ms
Show
Sleep 5s
# OMP remains live in the dedicated tmux server for inspection after recording.
