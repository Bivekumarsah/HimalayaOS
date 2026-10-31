# 12 — Naming decision and redistribution responsibilities

## NepalOS vs HimalayaOS

**NepalOS** is the currently verified project/repository directory name and v0.1 branding. **HimalayaOS** (singular *Himalaya*, not *Himalayas*) is a grammatically reasonable proposed product name, with an internationally familiar geographical reference. It is not necessarily unique or legally available. **HimalayaOS** is more nature/region-oriented; **NepalOS** more explicitly identifies Nepal as a country.

**Recommendation:** preserve the working NepalOS technical paths and history while deciding the product name. A later deliberate rebrand can change visible UI, OS-release/package metadata, documentation, artwork and repository name under a dedicated feature branch, with compatibility and migration checks. Do not rename current files or `main` simply to reflect a conversation preference.

Before public announcement: search software/company trademarks, applicable national/IP registries, GitHub name/organization availability and domain availability. No completed legal clearance is claimed here. Avoid representing an independent OS as officially government-sponsored.

## Legal and release documentation checklist

- Record exact upstream distribution/package licenses (Debian, KDE, Qt/SDDM, theme components).
- Keep corresponding license notices for copied/modified KDE Breeze/QML where required.
- Verify redistribution permissions for every image/font/logo; identify original authorship or source.
- Maintain a `COPYING` / `LICENSES` / `NOTICE` structure suitable for actual packaged assets and redistributed source code.
- Do not choose a blanket license for upstream code that conflicts with its original license.
- Check Debian trademark guidance before using Debian branding as your own.
- Do not claim upstream Debian security guarantees for modified/unmaintained packages without a maintenance policy.

This document is guidance, not legal advice.
