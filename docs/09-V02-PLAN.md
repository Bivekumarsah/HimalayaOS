# 09 — v0.2: integration plan (DO NOT RUN BUILD YET)

## Goal

Package tested Himalayan branding into the next **separate** live ISO. Preserve `v0.1.0`, the existing v0.1 ISO, `main`, and a Breeze fallback.

## Step 1 — inspect Git and untracked includes

```bash
cd ~/NepalOS
git branch --show-current
git status --short
find iso-build/config/includes.chroot -type f -printf '%p\n' | sort
```

Read-only commands. No `git add`, no delete, no move. Inspect output for unexpected files before choosing a staging approach. If the directory does not exist in a new checkout, `find` will simply report that.

## Step 2 — review package list and theme contents

```bash
sed -n '1,200p' iso-build/config/package-lists/nepalos.list.chroot
find desktop/sddm/nepalos -type f | sort
grep -RIn '/home/bivek' desktop/sddm/nepalos --include='*.qml' --include='*.conf' || true
```

Before packaging, verify all QML imports, images, fonts, assets, and source licenses. Verify asset names actually match `theme.conf`.

## Step 3 — planned live-image target (not yet populated/verified)

```text
iso-build/config/includes.chroot/
└── usr/
    ├── share/sddm/themes/nepalos/  # tested project-local theme + assets
    └── share/backgrounds/nepalos/   # wallpaper
```

**Do not blindly `cp -a` the entire developer theme.** Exclude scratch files, backups and any machine-specific files. Keep project source and image install paths separate.

## Step 4 — planned default configuration and fallback

Use image-specific configuration under `includes.chroot/etc/` only after inspecting Debian/SDDM version requirements. The selected default must refer to installed `nepalos` theme; `breeze` must remain installed. Document a rollback path available from a virtual console. Do not overwrite the development VM's working login configuration to 'test' this.

## Step 5 — planned KDE wallpaper defaults

Test both the live user and a newly created user. Avoid changing user-specific existing settings. SDDM theme setup alone does not configure Plasma wallpaper or lock screen.

## Step 6 — new ISO and validation

1. Make a verified backup of v0.1 ISO + checksum on the external SSD.
2. Freeze a source Git checkpoint.
3. Use a separate/reproducible build directory or unique output path.
4. Execute and log `lb build` only after source and staging review.
5. Generate **new** checksums for **new** ISO.
6. Test in `NepalOS-Testing`: boot, network, greeter, BS/AD switch, wallpaper, user login only in a safe target.
7. Record test environment and screenshots. Do not tag a release until tests meet acceptance criteria.

This is an **engineering plan**, not a claim that v0.2 has been built.
