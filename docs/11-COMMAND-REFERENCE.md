# 11 — Command reference for beginners

| Command | Explanation | Safety |
|---|---|---|
| `pwd` | Prints current folder | read-only |
| `cd ~/NepalOS` | Changes to project folder; `~` = current user's home | read-only |
| `ls -lah` | Lists including hidden files and readable sizes | read-only |
| `find DIR -type f` | Lists files under DIR | read-only |
| `cat FILE` | Prints text file contents | read-only |
| `sed -n '1,100p' FILE` | Prints lines 1 through 100 | read-only |
| `grep -n PATTERN FILE` | Finds matching text and line numbers | read-only |
| `file FILE` | Identifies a file's format | read-only |
| `df -h` | Displays free disk space | read-only |
| `sha256sum ISO` | Computes file fingerprint | read-only |
| `sha256sum -c SHA256SUMS` | Checks listed files against digest manifest | read-only |
| `fc-match '...:lang=ne'` | Identifies matching font | read-only |
| `git status --short` | Short status for tracked/untracked files | read-only |
| `git log --oneline --decorate` | Compact Git history | read-only |
| `git show --stat SHA` | Commit summary | read-only |
| `git diff --check` | Check whitespace in unstaged tracked edits | read-only |
| `git add path` | Stage explicit path for a commit | modifies Git index |
| `git diff --cached` | Review staged changes | read-only |
| `git commit -m '...'` | Save staged snapshot in local Git | adds history |
| `git push` | Send local commits to remote | modifies remote |
| `sudo apt update` | Refresh package catalogs | changes apt metadata |
| `sudo apt upgrade` | Upgrade installed packages | changes OS packages |
| `sudo apt install ...` | Install selected packages | changes OS packages |
| `lb config ...` | Generate/update live-build configuration | changes project files |
| `sudo lb build` | Build live image | intensive, writes generated files |
| `tee build.log` | Show and write command output | writes log file |
| `unzip -l ZIP` | List archive members | read-only |
| `unzip -n ZIP -d DIR` | Extract ZIP, **skip** existing files | writes new files |
| `sddm-greeter-qt6 --test-mode --theme ...` | Launch SDDM **preview**, not real login | visual test only |

## Shell symbols

- `\` at a shell line ending: continue the same command on the next line.
- `|`: pipe one program's standard output into another.
- `>`: overwrite/create output file; **be careful**.
- `>>`: append to output file.
- `2>&1`: redirect error messages to standard output.
- `&&`: run next command only if previous succeeded.
- `|| true`: suppress nonzero status; use only when the failure is explicitly expected.
- `sudo`: higher privilege; verify full command before pressing Enter.
- `#`: comment in a shell script.

## Terms

- **OS**: kernel + system software + tools and UI forming a usable computer environment.
- **Distribution (distro)**: packaged Linux operating system built from upstream components.
- **ISO / ISO-hybrid**: bootable image file, often usable as optical media or imaged to removable drive.
- **Live image**: boots an OS without necessarily installing it to disk.
- **Installer**: software that writes/configures the OS on target storage; currently disabled in NepalOS v0.1.
- **KDE Plasma**: desktop shell/environment; **SDDM**: login/display manager.
- **QML**: Qt declarative interface language.
- **Bikram Sambat (BS)**: calendar convention used in Nepal; **AD**: Gregorian dates in these docs.
- **Branch**: line of development in Git; **tag**: named release checkpoint; **remote**: hosted Git repository address.
