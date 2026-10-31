# 05 — Himalayan wallpaper, logo and avatar

## Design that was approved and tested

An original Nepal-inspired artwork was selected with Himalayan sunrise, mountain peaks, Nepalese pagodas and temples, red rhododendrons, mandala-style details and indigo/gold/crimson colors. It displays on the **development KDE desktop** and in the **SDDM greeter preview**.

## Known paths

```text
desktop/sddm/nepalos/assets/himalayan-sunrise.png
/usr/share/backgrounds/nepalos/himalayan-sunrise.png
desktop/sddm/nepalos/assets/nepalos-logo.svg
desktop/sddm/nepalos/assets/nepalos-avatar.png
desktop/sddm/nepalos/faces/.face.icon
```

These are existing/stated paths; there may also be staged copies in `iso-build/config/includes.chroot/` that must be inspected.

**Inspect assets without changing them:**

```bash
cd ~/NepalOS
find desktop/sddm/nepalos/assets -maxdepth 1 -type f -printf '%f %s bytes\n'
file desktop/sddm/nepalos/assets/*
grep -n 'background' desktop/sddm/nepalos/theme.conf
```

The original notes mention both `assets/himalayan-sunrise.png` and an earlier value `assets/nepalos-himalayan-sunrise.png` in theme configuration. The *current* files must be checked; do not assume those filenames match without evidence.

## What was done with account avatar

The Debian-swirl avatar came from `/home/bivek/.face` (and `.face.icon` symlink). A backup was made and the **development account only** was changed to the NepalOS mountain avatar, resulting in the correct preview image.

**Release rule:** do not overwrite existing users' avatar/photos. A system-default avatar should apply only where no personal photo is set. Test defaults using a fresh temporary user before distributing.

## Still pending

- Place all required artwork in a reproducible build source tree and install into final ISO paths.
- Make wallpaper the default for a live session **and** newly created users, without overriding existing user preferences.
- Record artwork author/source and redistribution permissions in a release asset manifest.
- Test light/dark readability and screens of differing aspect ratios.
- KDE **lock screen** uses a different component from the SDDM login screen; custom lock screen remains pending.
