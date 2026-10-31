# 04 — Git history, checkpoints and safe changes

## Verified local history

Repository: `/home/bivek/NepalOS`.

| Commit | Recorded work |
|---|---|
| `65af62c` | live-build v0.1 baseline, tag `v0.1.0` |
| `1b1e1b6` | SDDM theme and Nepali fonts |
| `eb1b6c0` | bundled login wallpaper |
| `fc8a621` | translucent glass panel |
| `6fa56ea` | login clock positioning |
| `d633880` | Nepali/English language selector |
| `1f22ffc` | bilingual clock + BS conversion |
| `faa6da0` | last BS 2100 Chaitra boundary check |

At the latest verified `git status --short`:

```text
Branch: feature/nepalos-branding
?? iso-build/config/includes.chroot/
```

That folder contains **untracked staging work** whose contents have not yet been audited. It must not be removed or blindly committed.

## Read-only inspection commands

```bash
cd ~/NepalOS
git branch --show-current
git status --short
git log --oneline --decorate -12
git tag --list
git remote -v
```

- `branch --show-current`: current branch.
- `status --short`: changed/untracked files.
- `log ...`: recent commit subjects and tags.
- `tag --list`: release tag inventory.
- `remote -v`: configured Git hosting remotes (none has been verified for this project).

## Safe documentation commit

Run only **after** copying this documentation into the existing repo and reviewing `git status --short`:

```bash
cd ~/NepalOS
git branch --show-current   # Confirm it says feature/nepalos-branding; STOP manually if not.
git add docs/ scripts/audit-project.sh tests/bs-calendar-boundary.js
git diff --cached --stat
git diff --cached --check
git commit -m "docs: document NepalOS development from Debian setup through v0.2 planning"
```

**STOP if the branch is not `feature/nepalos-branding`.** Never stage `iso-build/config/includes.chroot/` until its contents have been checked.

## Branch policy

- `main`: preserve the known working v0.1 baseline until planned release integration is tested.
- `feature/nepalos-branding`: current development branch.
- New features: dedicated feature branches and clear commits.
- No forced pushes, history rewrites, or automatic merges of unfinished QML changes into `main`.

## Debug before a commit

```bash
git diff --check
git diff --stat
git status --short
```

`git diff --check` detects whitespace problems in *unstaged* tracked changes; `--stat` shows changed file counts. Review staged changes separately with `git diff --cached`.
