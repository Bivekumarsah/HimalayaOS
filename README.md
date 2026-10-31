# HimalayaOS — Nepal-origin Linux development project

> **Documentation staging repository.** This GitHub repository currently contains the historical documentation prepared for the ongoing **NepalOS** prototype. The GitHub repository name is **HimalayaOS**; the product rename and source-code migration are **not yet finalized**. The existing local Debian repository remains authoritative.

## Project

We are developing a Nepali-first Debian 13 (Trixie) / KDE Plasma Linux distribution, focused on Nepali language support, Bikram Sambat dates, accessibility, privacy and a Himalayan-inspired desktop.

**v0.1:** bootable Debian/KDE live ISO tested in VirtualBox; **not installable** (Debian installer disabled). **v0.2:** custom SDDM theme and BS calendar tested in greeter preview; packaging into a live ISO remains pending.

## Developer documentation

Start with **[Full documentation index](docs/README.md)**, then follow the numbered chapters for installing Debian, setting up VirtualBox, building the live ISO, creating artwork, working with QML, testing the BS calendar, and preparing the v0.2 release.

## Important note about source history

The verified source code and Git branches currently exist at `/home/bivek/NepalOS` inside the Debian development VM, including `main`, tag `v0.1.0`, and `feature/nepalos-branding`. **This repository is not yet a copy of that local source tree.** Do not download this documentation-only repository expecting a bootable OS source build. See [safe source-history integration](docs/10-GITHUB-PUBLISHING.md) before pushing local branches; no force push is required.

We do not claim to be an official Nepal government project or the first Nepal-origin Linux distribution. Branding, third-party licenses and redistribution permissions are to be reviewed before public release.
