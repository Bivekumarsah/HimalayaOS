# 08 — Test matrix and known limitations

| Area | What was observed | Status |
|---|---|---|
| Debian development installation | Debian 13.7 KDE running in VM | PASS |
| v0.1 ISO creation | ~2.2 GB hybrid ISO generated | PASS |
| v0.1 boot | KDE reached in `NepalOS-Testing` | PASS |
| Networking in v0.1 | Connectivity reported working | PASS |
| SHA-256 for v0.1 | historical digest recorded | RECORDED; recheck if file moved |
| Wallpaper on dev KDE | displays correctly | PASS |
| Wallpaper in SDDM preview | displays correctly | PASS |
| NepalOS SDDM QML preview | glass panel, logo, input controls | PASS (visual only) |
| Nepali/English switch | observed in QML greeter preview | PASS (preview) |
| Devanagari text | renders in preview; font warnings intermittent | PASS with warning |
| BS month start table | 264 entries; 0 boundary errors against source library | PASS (same-library check) |
| BS 2100 last-month logic | `days >= 30`, commit `faa6da0` | PASS (source + Python check) |
| JS edge tests | new Node test supplied | NOT YET RUN on development VM |
| Real SDDM login using custom theme | preview can't authenticate | NOT TESTED |
| NepalOS lock-screen styling | distinct Plasma component | NOT IMPLEMENTED / VERIFIED |
| v0.2 live ISO | no booted v0.2 artifact verified | NOT BUILT |
| v0.1 graphical installer | disabled in build config | NOT PROVIDED |
| Hardware/UEFI/Secure Boot matrix | no recorded measurements | NOT TESTED |
| Offline upgrades/security response | no distribution-specific pipeline | NOT TESTED |

## Suggested release gate before v0.2

- [ ] Run `scripts/audit-project.sh`, review file list and suspicious paths.
- [ ] Inspect every file under untracked `config/includes.chroot`.
- [ ] Validate SDDM configuration fallback paths.
- [ ] Ensure no `*.bak`, `*.orig`, credentials or private user material in ISO source.
- [ ] Package all themes/assets in the build tree using clear licensing metadata.
- [ ] Run QML preview and calendar edge tests.
- [ ] Build new ISO without overwriting v0.1.
- [ ] Boot in separate testing VM and test intended live-user defaults.
- [ ] Preserve new checksum, logs and a clear pass/fail checklist.

**Never state "released" or "installable" on the strength of a greeter preview alone.**
