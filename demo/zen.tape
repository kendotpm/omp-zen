# Real OMP/native tools throughout. Only setup and editorial cards are hidden.
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
Set Theme "Catppuccin Mocha"
Set Framerate 20
Set TypingSpeed 25ms
Set CursorBlink false

Hide
Type `export PS1=''; clear`
Enter
Type `tmux -L omp-zen-vhs new-session -d -s demo 'node demo/session.mjs'; tmux -L omp-zen-vhs set-option -g status off; tmux -L omp-zen-vhs attach-session -t demo`
Enter
Wait+Screen@120s /glob ·/
Ctrl+o
ScrollDown 100
Sleep 800ms
ScrollDown 100
Wait+Screen@60s /node check\.mjs 01/
Show
# Actual shell progress scrolls through several sequential tool calls.
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10
Sleep 2s
ScrollDown 10

# Detach from the SAME still-running OMP session for an editorial title card.
Hide
Ctrl+b
Type "d"
Sleep 300ms
Type `clear; printf '\n\n  OMP Zen\n\n  Ctrl+O\n  Keep the work. Quiet the output.\n\n'`
Enter
Sleep 300ms
Show
Sleep 3s

Hide
Type "tmux -L omp-zen-vhs attach-session -t demo"
Enter
Sleep 300ms
ScrollDown 100
Show
# The native keypress collapses the same busy session, not a second fake view.
Ctrl+o
Wait+Screen /Tool output expansion: disabled/
# More real native calls continue: running -> done -> next queued/running row.
Wait+Screen@120s /All eight batches checked\./
Hide
Ctrl+b
Type "d"
Sleep 300ms
Type "tmux -L omp-zen-vhs kill-server"
Enter
Sleep 300ms
Type `clear; printf '\n\n  Give your OMP session a little breathing room.\n\n  OMP Zen\n  Less noise. Same tools.\n\n  omp --extension /path/to/omp-zen\n\n'`
Enter
Sleep 300ms
Show
Sleep 4s
