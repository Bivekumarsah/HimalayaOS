# 10 — Publish the original local Git history into this GitHub repository

## Verified hosting state (31 October 2026)

The GitHub repository **`Bivekumarsah/HimalayaOS`** was created empty and received this **documentation-only** initial history. **The local NepalOS source tree in the development VM is the source of truth.** It has an existing, separately initialized Git history. This guide preserves both histories without rewriting the stable v0.1 tag or merging unfinished v0.2 branding into `main`.

- Local source root: `/home/bivek/NepalOS`.
- Verified local stable branch: `main`, tag `v0.1.0`, historical base commit `65af62c`.
- Verified local working branch: `feature/nepalos-branding`, last known commit `faa6da0`.
- Remote repository (docs staging): https://github.com/Bivekumarsah/HimalayaOS

## 1. Examine the local working tree before anything else

```bash
cd ~/NepalOS
git branch --show-current
git status --short
git remote -v
git log --oneline --decorate -8
git tag --list
```

Confirm that important changes are committed or safely backed up. At last checkpoint `iso-build/config/includes.chroot/` was untracked; **do not stage or delete it accidentally**. This guide does not assume the documentation ZIP was already extracted locally.

## 2. Connect to GitHub only if needed

First inspect `git remote -v`. If there is **no existing `origin`**, use the **verified** URL:

```bash
git remote add origin https://github.com/Bivekumarsah/HimalayaOS.git
```

If `origin` already exists, **do not overwrite it without checking**. It may point to an entirely different repository. Never use `git push --force` or `git push --mirror` here.

## 3. Fetch remote docs into a separate remote-tracking ref

```bash
git fetch origin
git log --oneline --decorate origin/main -5
```

This fetch is read-only with respect to local working files. It downloads remote commits without overwriting your source tree.

## 4. Integrate the documentation into the stable branch

Only when the local worktree is clean enough to switch branches safely and **docs files are not sitting in the worktree as conflicting untracked files**:

```bash
git switch main
git merge --allow-unrelated-histories origin/main   -m "docs: integrate hosted documentation without changing v0.1 tag"
```

Why this extra merge? The local Git repo and the GitHub docs-only repo were initialized separately. `--allow-unrelated-histories` tells Git to combine the two legitimate starting histories **without force pushing or dropping source commits**. The v0.1 tag still points to its original historical commit. Review any conflict and resolve it manually; never blindly overwrite source. This operation is **not yet executed** in the Debian VM.

After reviewing:

```bash
git status --short
git log --oneline --decorate --graph -10
git push -u origin main
```

The push succeeds when local `main` includes the prior remote docs commits. The `main` branch will then contain the v0.1 source and documentation, but not unfinished v0.2 branding.

## 5. Publish the ongoing feature branch and historical tag

Once local/remote alignment is verified:

```bash
git switch feature/nepalos-branding
git push -u origin feature/nepalos-branding
git push origin v0.1.0
```

This preserves the complete local branch history. It does **not** merge unfinished changes into `main`.

## 6. Other safety and release checks

- Before merging, check for conflicting `docs/`, `scripts/`, `tests/` files, especially if you previously extracted the ZIP into the local worktree. Move/commit/back up deliberately before merging.
- Check `git status --short` and `git diff --check` before commits.
- Review old history for secrets and enormous binaries before publishing to a public repository.
- Do not push VM disks, ISO build caches, personal avatars, private keys or passwords.
- ISO binaries and their independent SHA-256 checksums belong in proper release artifacts, not ordinary source commits.
- Keep v0.2 development independent until the SDDM integration and real login tests pass.
- If errors or merge conflicts appear, stop and inspect their output before proceeding.
