# NepalOS engineering documentation

> **Project working name: NepalOS**. **HimalayaOS** is the name of the new GitHub documentation repository; a finished product rename has not been approved or implemented in the local source tree. This documentation deliberately preserves working Git paths, QML names, branch names, and existing releases.
>
> **Checkpoint:** 31 October 2026. Debian 13 (Trixie), KDE Plasma; v0.1 ISO built and boot-tested; v0.2 branding in progress.

## Start here

| Read order | Guide | Purpose |
|---|---|---|
| 1 | [Project overview](00-PROJECT-OVERVIEW.md) | Vision, architecture, current readiness |
| 2 | [Get Debian and prepare VMs](01-DEBIAN-AND-VIRTUALBOX.md) | Where open-source base comes from, install/verify |
| 3 | [Development environment](02-DEV-ENVIRONMENT.md) | Linux dependencies, project and shared folders |
| 4 | [Build the first live ISO](03-LIVE-ISO-V01.md) | live-build, ISO, checksums, testing |
| 5 | [Git history and safe work](04-GIT-WORKFLOW.md) | Real commits, safety and branching |
| 6 | [Wallpaper and visual identity](05-WALLPAPER-AND-ASSETS.md) | Artwork, paths, licensing checks |
| 7 | [SDDM login theme](06-SDDM-THEME.md) | QML architecture, bilingual controls, preview |
| 8 | [Bikram Sambat calendar](07-BS-CALENDAR.md) | Converter, validations, final-range fix |
| 9 | [Validation and known limits](08-VALIDATION.md) | What passed and what remains untested |
| 10 | [v0.2 integration plan](09-V02-PLAN.md) | Safe staging and build process |
| 11 | [GitHub publishing](10-GITHUB-PUBLISHING.md) | Connect the local Git repo safely |
| 12 | [Commands explained](11-COMMAND-REFERENCE.md) | What each shell command means |
| 13 | [Naming and attribution](12-NAMING-AND-LICENSES.md) | NepalOS vs HimalayaOS, distribution obligations |
| 14 | [Evidence and unknowns](13-EVIDENCE-REGISTER.md) | Separates observed facts from suggested steps |

## Scope of this package

- **Observed/completed:** facts supported by project terminal output and prior development notes.
- **Reproduction guidance:** practical steps to recreate the environment. These are not an assertion that every command was used verbatim in October 2026.
- **Planned:** actions still requiring inspection/testing before the v0.2 ISO.

This is a **Git-ready documentation overlay**, not a replacement repository or a new operating-system image. It contains **no copied Debian/KDE source code, no release ISO, no actual wallpaper binaries**. Do not use a historical checksum for an ISO that has been rebuilt.

## Project layout (known portions)

```text
NepalOS/
├── desktop/sddm/nepalos/           # custom project-local SDDM theme
│   ├── Main.qml
│   ├── NepalOSClock.qml
│   ├── BSCalendar.js
│   ├── theme.conf
│   └── assets/
├── iso-build/
│   ├── config/package-lists/nepalos.list.chroot
│   ├── config/includes.chroot/     # currently UNTRACKED: audit first
│   └── live-image-amd64.hybrid.iso # local v0.1 build artifact; not for Git
├── docs/                            # THIS DOCUMENTATION
├── scripts/audit-project.sh         # read-only audit helper
└── tests/bs-calendar-boundary.js    # optional Node.js regression test
```

The paths above describe known files only, not the complete repository tree. Source code in the local Debian VM is the authoritative version.

## Safety commitments

Never overwrite the v0.1 ISO, force-push Git history, stage an entire build directory indiscriminately, or enable an untested SDDM theme on the host. The live Debian ISO is **not yet an installable NepalOS release**: the Debian installer is disabled in v0.1.
