# 01 — Download Debian and install the development VM

**Type:** reproduction guide informed by the recorded setup. Exact historical installer clicks were not captured, so this is a recommended repeatable procedure, not an executed command log.

## Why Debian 13?

Debian is an established free/open-source GNU/Linux distribution that supplies package repositories, the Linux kernel, system packages and security maintenance. We use it as the foundation instead of rebuilding the entire OS from scratch. **KDE Plasma** supplies desktop UI; **SDDM** supplies graphical login. `live-build` later creates a redistributable live ISO.

## 1. Obtain the official installation image

- Official Debian download: https://www.debian.org/download.en.html
- Debian 13 installer and instructions: https://www.debian.org/releases/trixie/amd64/
- Architecture: **amd64 (64-bit x86 PCs)**.
- Format: **netinst ISO**, e.g. `debian-13.7.0-amd64-netinst.iso` at the recorded checkpoint.
- Use an **official Debian mirror**; do not download a third-party 'NepalOS source ISO'.

`netinst` contains an installer and downloads additional packages over the Internet. The download filename and point-release number can change; always verify the desired Debian major version and architecture.

**Integrity verification (Windows PowerShell; replace file path):**

```powershell
Get-FileHash 'E:\Downloads\debian-13.7.0-amd64-netinst.iso' -Algorithm SHA256
```

Meaning: computes the download's SHA-256 digest. Compare it with a checksum published for **the same exact ISO filename** by the official mirror. For stronger authenticity checking, validate Debian's signed checksum file as explained in its ISO verification guidance. The actual historical Debian-download hash was not preserved.

## 2. Install VirtualBox

Download Oracle VirtualBox from https://www.virtualbox.org/wiki/Downloads . The recorded Windows installation used **VirtualBox 7.2.8**. The host has 24 GB RAM and uses an external 512 GB project SSD.

## 3. Create the development VM

Use VirtualBox GUI → **New**; select the downloaded Debian ISO and configure:

| Setting | Recorded working VM |
|---|---|
| Name | `NepalOS-Development` |
| OS type | Debian GNU/Linux (64-bit) |
| Memory | 8192 MB (8 GB) |
| Processor | 4 vCPUs |
| Virtual disk | 150 GB (dynamically allocated is suitable) |
| Network | NAT is a suitable initial configuration |

If offered unattended installation, either configure it deliberately or disable it and use Debian's interactive installer. Avoid formatting the Windows host drive; all installer partitions must target the **virtual disk**.

## 4. Install Debian 13 + KDE Plasma

Recommended reproducible installer sequence:

1. Start the VM from the Debian netinst ISO and select **Graphical install**.
2. Choose preferred installation language, keyboard, and region (the recorded development VM uses the KDE desktop; exact installer choices were not preserved).
3. Set hostname `nepalos-dev` and create local user `bivek`.
4. For the *virtual disk only*, select guided partitioning and check the disk identity carefully before confirming writes.
5. Select Debian desktop environment with **KDE Plasma** (and standard system utilities). Avoid selecting multiple desktop environments unless intended.
6. Install GRUB to the VM's virtual disk and reboot, ejecting the installer ISO if necessary.
7. Verify KDE desktop and networking.

**Useful verification commands in Debian Konsole:**

```bash
cat /etc/os-release
uname -m
hostnamectl
printf 'User: '; whoami
```

- `cat /etc/os-release`: Debian distribution and version.
- `uname -m`: confirms architecture (usually `x86_64`).
- `hostnamectl`: hostname and OS metadata.
- `whoami`: current logged-in user.

**Recorded result:** Debian GNU/Linux 13.7 Trixie installed in the development VM with KDE Plasma; username `bivek`, hostname `nepalos-dev`.

## 5. Create the independent testing VM

Record: `NepalOS-Testing` with ~6 GB RAM and 2 CPU cores. Attach the **newly built live image** as virtual optical media, then boot it. This VM must remain separate from the development system so experiments cannot corrupt the development installation.

The v0.1 live image was successfully boot-tested in this VM; it did **not** run a NepalOS graphical installer.
