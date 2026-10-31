# 02 — Set up Debian development tools and shared storage

**Status:** these tool categories and local paths were verified, but the exact chronological installation command history is incomplete. Commands below are reproducible equivalents.

## 1. Update package metadata and installed packages

```bash
sudo apt update
sudo apt upgrade
```

- `sudo`: run an administrative command (authentication may be requested).
- `apt update`: refresh list of available packages; does **not** upgrade them.
- `apt upgrade`: install eligible upgrades. Review proposed actions before accepting.

## 2. Install development dependencies

```bash
sudo apt install -y \
  git curl wget build-essential python3 \
  live-build debootstrap xorriso squashfs-tools \
  qemu-system-x86 qemu-utils
```

- `git`: version control of build configuration and QML sources.
- `curl` / `wget`: HTTP downloads and diagnostics.
- `build-essential`: compiler/build tools.
- `python3`: scripts, including BS calendar generation.
- `live-build`: composes the Debian live image.
- `debootstrap`: initializes a Debian filesystem from packages.
- `xorriso`: ISO9660/hybrid image construction.
- `squashfs-tools`: compact read-only live root filesystem.
- `qemu-system-x86`, `qemu-utils`: optional image-testing utilities (VirtualBox was used for actual boot verification).

The recorded environment additionally includes Nepali fonts (`fonts-noto-core`, `fonts-noto-ui-core`, `fonts-lohit-deva-nepali`), KDE and SDDM. To inspect exactly what is installed:

```bash
dpkg-query -W -f='${binary:Package} ${Version}\n' \
  live-build debootstrap xorriso squashfs-tools \
  fonts-noto-core fonts-noto-ui-core fonts-lohit-deva-nepali
```

## 3. Project directory

**Recorded local path:**

```bash
cd /home/bivek/NepalOS
pwd
git status --short
```

Do not run `git init` a second time; the source directory **already is a Git repository**. `git status --short` exposes modified/untracked files before any staging. At the last verified checkpoint the directory `iso-build/config/includes.chroot/` was untracked: inspect it instead of automatically adding it.

## 4. VirtualBox shared folder

Recorded mappings:

| Side | Location |
|---|---|
| Windows | `E:\NepalOS-Project` |
| Debian guest | `/media/sf_NepalOS-Project` |

VirtualBox Guest Additions 7.2.8 and the shared folder were already configured. A safe read check:

```bash
ls -lah /media/sf_NepalOS-Project
id -nG
```

- `ls -lah`: lists files with readable sizes, without changing anything.
- `id -nG`: shows Unix group memberships. VirtualBox shared-folder access commonly uses `vboxsf` group.

If permissions fail, first inspect whether the folder is mounted and whether the user belongs to `vboxsf`. Do **not** blindly alter permissions on the Windows drive or guest filesystem.

## 5. Backups and disk usage

```bash
df -h ~/NepalOS
find ~/NepalOS/iso-build -maxdepth 1 -type f -printf '%f %s bytes\n'
```

- `df -h`: shows available filesystem space.
- `find ...`: lists top-level build files. It is read-only.

Preserve the v0.1 ISO and `SHA256SUMS` outside the active build directory before experimenting with a v0.2 build. Large ISOs, temporary chroots and caches should not be committed to Git.
