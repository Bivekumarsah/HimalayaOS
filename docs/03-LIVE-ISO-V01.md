# 03 — Build and test NepalOS v0.1 live ISO

## What was completed

A **bootable live ISO** based on Debian 13 / KDE Plasma was built with Debian `live-build`. The output was approximately 2.2 GB, loaded KDE and had working networking in `NepalOS-Testing`. **The Debian installer was disabled**, so v0.1 was a live prototype rather than an installable release.

## 1. The build configuration

Recorded build directory:

```text
/home/bivek/NepalOS/iso-build
└── config/
    └── package-lists/nepalos.list.chroot
```

Recorded settings: `trixie` distribution, `amd64` architecture, `iso-hybrid` binary format, installer `none`.

To inspect the existing settings (safe):

```bash
cd ~/NepalOS/iso-build
find config -maxdepth 3 -type f | sort
sed -n '1,160p' config/package-lists/nepalos.list.chroot
```

This lists the build configuration and prints its package selection. The recorded package list includes KDE desktop, NetworkManager, sudo, Git, curl, wget and Nepali fonts; the **precise content** must be read from the actual file before documenting a literal package lock list.

## 2. Equivalent configuration command (reference, do not rerun on the working build directory)

```bash
lb config \
  --distribution trixie \
  --architectures amd64 \
  --binary-images iso-hybrid \
  --debian-installer none
```

| Part | Meaning |
|---|---|
| `lb config` | generate/update live-build configuration |
| `--distribution trixie` | choose Debian 13 suite |
| `--architectures amd64` | 64-bit PC architecture |
| `--binary-images iso-hybrid` | ISO also usable with suitable USB imaging tools |
| `--debian-installer none` | do not include the Debian installer |

This reproduces the **recorded settings**. It is not verified as the exact original shell command. **Do not run it in the current v0.1 build tree just to test documentation.**

## 3. Build command (historical/reference)

```bash
cd ~/NepalOS/iso-build
set -o pipefail
sudo lb build 2>&1 | tee build.log
```

- `sudo lb build`: resolve packages and assemble the image with administrative privileges.
- `2>&1`: combine error output with standard output.
- `| tee build.log`: display and save the build log.
- `set -o pipefail`: fail the command pipeline when `lb build` fails; safer than silently using only `tee`'s exit status.

**DO NOT run this now in the current folder.** Build again only after preparing a separate v0.2 build directory and reviewing its configuration. Building may create large generated files and modify build-state directories.

## 4. Verify the produced ISO (known output)

```bash
cd ~/NepalOS/iso-build
ls -lh live-image-amd64.hybrid.iso
file live-image-amd64.hybrid.iso
sha256sum live-image-amd64.hybrid.iso
```

- `ls -lh`: human-readable image size.
- `file`: identify ISO9660/hybrid media format.
- `sha256sum`: hash for later corruption detection.

Recorded historical v0.1 SHA-256:

```text
3a39d532adaa3b4a36c90a985a0b9fef2cf3c81db1b6f2cd12dca2e6153c1590
```

**Important:** this identifies one particular v0.1 artifact. Never reuse it for a rebuilt ISO.

To generate an accompanying checksum file:

```bash
sha256sum live-image-amd64.hybrid.iso > SHA256SUMS
sha256sum -c SHA256SUMS
```

The first writes a checksum manifest for the image; the second validates that same file against it. Keep both in the external SSD release backup. Check where redirection writes before running.

## 5. Independent boot test (recorded successful)

1. Open VirtualBox, select `NepalOS-Testing`.
2. Attach `live-image-amd64.hybrid.iso` to the test VM's optical drive.
3. Start the VM and boot the live entry.
4. Confirm KDE desktop starts and network connectivity works.
5. Shut down; retain the image and checksum as the v0.1 baseline.

This test was reported successful. It does not prove installation, physical hardware, secure boot, or customized real SDDM login.

## 6. Source/history protection

v0.1 baseline Git commit `65af62c`, protected by `main` and tag `v0.1.0` (recorded locally). The development branding changes are on `feature/nepalos-branding`. Do not rewrite the baseline or commit ISO binaries by default.
