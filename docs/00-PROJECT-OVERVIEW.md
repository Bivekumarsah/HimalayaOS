# 00 — Project overview

## Vision

NepalOS is an independently developed, Nepali-first Debian 13 (Trixie) Linux distribution using KDE Plasma and SDDM. Target audiences include individuals, schools, businesses and—subject to independent evaluation—public institutions in Nepal. Goals: privacy, stable security updates, accessibility, Nepali-first UI with English switch, BS-first calendar with AD alternative, and Himalayan visual identity. An AI assistant is a **future proposal**, not implemented.

**Base distinction:** The project customizes and redistributes upstream open-source components. It has **not** written a new Linux kernel or its own security infrastructure. It must comply with licenses of Debian/KDE/Qt and artwork.

## Recorded local environment

| Component | Recorded state |
|---|---|
| Windows host | 24 GB RAM; external 512 GB SSD, project drive `E:\NepalOS-Project` |
| VirtualBox | 7.2.8 |
| Development VM | `NepalOS-Development`, Debian GNU/Linux 13.7, KDE Plasma, 8 GB RAM, 4 vCPUs, 150 GB virtual disk |
| Linux login | user `bivek`, host `nepalos-dev` |
| Test VM | `NepalOS-Testing`, ~6 GB RAM, 2 vCPUs |
| Linux source root | `/home/bivek/NepalOS` |
| Shared folder | `NepalOS-Project` mapped at `/media/sf_NepalOS-Project` |
| ISO build tree | `/home/bivek/NepalOS/iso-build` |

## Release status

### v0.1.0 — stable checkpoint (built and tested)

- Debian 13 / KDE Plasma live ISO created with `live-build`.
- `amd64`, `trixie`, `iso-hybrid`, **Debian installer disabled**.
- Output: `iso-build/live-image-amd64.hybrid.iso` (~2.2 GB).
- Booted successfully in `NepalOS-Testing`; KDE and networking worked.
- Git branch `main`, tag `v0.1.0`; base commit `65af62c`.

### v0.2 — ongoing work

- Original Himalayan wallpaper appears in development KDE and SDDM preview.
- Custom SDDM QML greeter preview, glass panel, Nepali/English switching.
- Offline BS date conversion data for 2079–2100 BS; last boundary fixed and committed.
- **Not yet verified:** default theme and wallpaper inside a booted v0.2 ISO, real authentication with the new theme, KDE lock screen customization, standalone JS end-boundary test, or a graphical installer.

## Design philosophy

1. **Upstream first:** Debian packages/security updates whenever possible.
2. **Incremental releases:** keep a tested baseline and work on feature branches.
3. **User-safe customization:** do not replace existing user avatars or personal files.
4. **Honest verification:** greeter preview is not an authentication test; bootable live != installable distribution.
5. **Maintainability:** version source, document provenance and avoid unowned generated files.

## Next objective

Audit `iso-build/config/includes.chroot/`, package the tested SDDM theme without backup files, configure safe Breeze fallback and live-user wallpaper, then build a **separate** v0.2 ISO only after configuration review.
