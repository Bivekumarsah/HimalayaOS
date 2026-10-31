#!/usr/bin/env bash
# Read-only audit helper. Run from ANY directory; it discovers repo from script location.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
printf '\n=== NepalOS read-only audit ===\nRoot: %s\n' "$ROOT"
cd "$ROOT" || exit 1
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo '--- Branch ---'; git branch --show-current
  echo '--- Status ---'; git status --short
  echo '--- Recent commits ---'; git log --oneline --decorate -12
  echo '--- Remotes ---'; git remote -v
  echo '--- Release tags ---'; git tag --list
else
  echo 'WARNING: this directory is not inside a Git worktree'
fi
printf '\n--- Included image files ---\n'
if [ -d iso-build/config/includes.chroot ]; then
 find iso-build/config/includes.chroot -type f -print | sort
else
 echo 'includes.chroot not present'
fi
printf '\n--- SDDM theme files ---\n'
if [ -d desktop/sddm/nepalos ]; then
 find desktop/sddm/nepalos -type f -print | sort
fi
printf '\n--- Package list ---\n'
if [ -f iso-build/config/package-lists/nepalos.list.chroot ]; then
 sed -n '1,200p' iso-build/config/package-lists/nepalos.list.chroot
else
 echo 'package list not found'
fi
printf '\n--- Current theme.conf references ---\n'
if [ -f desktop/sddm/nepalos/theme.conf ]; then
 grep -nE 'background|font|theme' desktop/sddm/nepalos/theme.conf || true
fi
printf '\nAudit complete (no writes performed).\n'
