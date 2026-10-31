# 13 — Evidence register: verified vs reconstructed vs planned

## Verified by project terminal output / recorded screenshots

- `NepalOS-Development` runs Debian 13.7 Trixie KDE; `bivek@nepalos-dev`.
- `/home/bivek/NepalOS` exists as local Git repository.
- v0.1 `live-image-amd64.hybrid.iso` built (~2.2 GB), `file` identified image; it booted KDE and network in `NepalOS-Testing`.
- Historical v0.1 SHA-256: `3a39d532adaa3b4a36c90a985a0b9fef2cf3c81db1b6f2cd12dca2e6153c1590`.
- Git `main` / `v0.1.0` baseline `65af62c`, branding branch and documented commits through `faa6da0`.
- SDDM `--test-mode` rendering, Himalayan wallpaper, avatar, language switch, clock and offline BS converter.
- `BSCalendar.js`: 264 starts; Python-library comparison 0 month boundary errors.
- BS 2100 Chaitra 30-day maximum; Apr 12, 2044 valid, Apr 13, 2044 unsupported; source uses `days >= 30` and commit `faa6da0`.
- Latest `git status --short` shows `?? iso-build/config/includes.chroot/`.

## Reconstructed/recommended (not claimed to be exact historical commands)

- Debian installer click sequence and checksum-verification command.
- Complete `apt install` command (packages recorded, exact command sequence not always captured).
- `lb config` option syntax equivalent to recorded settings.
- Full boot-test procedure.
- GitHub remote setup and documentation import workflow.
- Optional Node JS regression test included in this package.

## Unknown/not verified from accessible records

- Actual GitHub remote of `/home/bivek/NepalOS` (`git remote -v` not yet supplied).
- Exact full contents of `nepalos.list.chroot` and untracked `includes.chroot/`.
- Current exact QML imports, theme.conf wallpaper value and the full build hook tree.
- End-to-end reproducibility of v0.1 by a second machine.
- A real authentication session using custom NepalOS SDDM.
- Installed NepalOS release, secure-boot behavior, physical laptop hardware coverage.
- Final licensing, trademarks and public-release identity.

## Source references for reproduction

- Debian official download: https://www.debian.org/download.en.html
- Debian 13 installation guide: https://www.debian.org/releases/trixie/amd64/
- Debian live manual: https://live-team.pages.debian.net/live-manual/html/live-manual/index.en.html
- VirtualBox: https://www.virtualbox.org/wiki/Downloads
- Original project's Git history and terminal output are the authority for NepalOS-specific implementation details.

**Maintain this file as more terminal evidence arrives.** Never change `Unknown` to `Verified` without a test, source inspection or result.
