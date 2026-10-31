# 06 — SDDM QML login theme (preview-tested)

## Architecture

SDDM is the display manager for graphical login. KDE Plasma controls the desktop. The **Plasma lock screen** is separate from the SDDM login greeter. Customizing one does not automatically customize the other.

Project-local theme path: `~/NepalOS/desktop/sddm/nepalos/`. The theme was created from KDE Breeze in a project-local copy, then modified.

Known files:

```text
Main.qml              Login.qml
Background.qml        KeyboardButton.qml
SessionButton.qml     NepalOSClock.qml
BSCalendar.js         theme.conf
metadata.desktop      assets/himalayan-sunrise.png
assets/nepalos-logo.svg
assets/nepalos-avatar.png
faces/.face.icon
```

Verify actual theme files and dependencies before packaging:

```bash
cd ~/NepalOS
find desktop/sddm/nepalos -type f | sort
grep -RIn 'nepalos-himalayan\|himalayan-sunrise\|/home/bivek' desktop/sddm/nepalos --include='*.qml' --include='*.conf'
```

Use relative URLs or installed paths that will exist in the live image; any hard-coded development-user paths must be corrected in a deliberate patch with a test.

## Observed theme behavior

- Himalayan wallpaper and translucent dark-indigo login panel.
- Logo, NepalOS title and account avatar.
- Username/password inputs, session/power/keyboard controls.
- Nepali (`नेपाली`) and English switcher.
- `Main.qml` uses `property bool nepaliMode: true` and passes this to login instances and custom clock.
- Switcher updates field placeholders, login labels, clock and BS vs Gregorian date and tagline.
- Some secondary control labels still need localization.

The existing login call is:

```qml
sddm.login(username, password, sessionButton.currentIndex)
```

A deprecated signal-handler form was corrected by explicitly declaring `username` and `password`. **Do not replace or bypass authentication logic** while making visual changes.

## Safe preview command (successfully used)

```bash
sddm-greeter-qt6 --test-mode \
  --theme ~/NepalOS/desktop/sddm/nepalos
```

`--test-mode` launches a greeter preview. **Successful drawing does not prove authentication; entering a password in test mode will not log into a Plasma session.** Close via Alt+F4. A warning such as `qt.text.font.db: OpenType support missing for "Noto Sans", script 11` was observed intermittently, without blocking visible Devanagari rendering.

## Fonts verified in the developer VM

- `fonts-noto-core`
- `fonts-noto-ui-core`
- `fonts-lohit-deva-nepali`

```bash
fc-match 'Noto Sans Devanagari:lang=ne'
fc-match ':lang=ne'
```

The commands show the matched fallback font; they do not guarantee that every QML component uses it. Font fallback remains worth auditing.

## Before activating on the real login screen

1. Package complete theme into `iso-build/config/includes.chroot/usr/share/sddm/themes/nepalos/` using **clean sources**, not temporary backups.
2. Confirm relative paths and runtime QML imports in a disposable VM.
3. Configure default theme via a **new project-owned configuration file** in the image, without changing host SDDM.
4. Keep Breeze installed and document a console recovery procedure.
5. Test a real login, logout, user switching and session restart in a disposable installation / test machine, not on the only development login.

No real-authentication success has yet been recorded for the customized theme.
