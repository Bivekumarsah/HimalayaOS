# 07 — Offline Bikram Sambat conversion and bilingual clock

## Implemented files

```text
desktop/sddm/nepalos/NepalOSClock.qml
desktop/sddm/nepalos/BSCalendar.js
```

`NepalOSClock.qml` displays Nepali weekday/Devanagari time/BS date when Nepali mode is enabled, and English weekday/time/AD date when English mode is enabled. `BSCalendar.js` stores an offline conversion table generated from the Python **`nepali-datetime`** library. Its dataset consists of **264 month starts**, covering BS years **2079–2100**. Virtual environment: `~/nepalos-calendar-venv/`.

## How conversion works

Each table entry is `[AD year, AD month, AD day, BS year, BS month]` for a BS month's first date. `convert(adDate)`:

1. Converts the input local calendar date into an unambiguous UTC midnight day number (`Date.UTC` using year/month/day components).
2. Searches backwards for the latest matching recorded BS month start.
3. Computes integer day offset and returns BS year/month/day.
4. Returns `null` before the first supported date or after the final supported day.

**Important:** local calendar dates are not UTC instants; UTC is only used to make day differences stable across daylight-saving offsets.

## Validated results (from actual terminal output)

```text
Calendar entries: 264
Boundary errors: 0
PASS: All checked BS month boundaries match.
```

The validation compared generated table boundaries with the same Python library; it is **not** independent historical reference verification.

An example shown in SDDM preview was **2026-10-31 AD = 2083 Kartik 14 BS**.

## Final boundary defect and correction

Previously the last month limit had an approximate check (`days > 31`). The final year is BS 2100 and last supported month is Chaitra. Using the installed Python library, these actual results were observed:

```text
VALID: 2100-12-28 -> 2044-04-10
VALID: 2100-12-29 -> 2044-04-11
VALID: 2100-12-30 -> 2044-04-12
INVALID: 2100-12-31: day must be in 1..30
INVALID: 2100-12-32: day must be in 1..30
```

The source now contains:

```javascript
if (i === monthStarts.length - 1 && days >= 30)
    return null;
```

Because the first day has offset `0`, the 30th day has offset `29` (valid) and the following day has offset `30` (invalid). This fix was committed on `feature/nepalos-branding` as **`faa6da0`**.

## Read-only source inspection

```bash
cd ~/NepalOS
grep -n -A 12 'monthStarts.length - 1' desktop/sddm/nepalos/BSCalendar.js
git show --stat faa6da0
```

## Reproduce Python-end verification

```bash
~/nepalos-calendar-venv/bin/python - <<'PY'
import nepali_datetime as nd
for d in range(28, 33):
    try:
        b = nd.date(2100, 12, d)
        print('VALID', b, '->', b.to_datetime_date())
    except (ValueError, OverflowError) as e:
        print('INVALID', d, str(e))
PY
```

This is a **verification command**; the outputs above were observed on the developer VM.

## Independent JavaScript regression test (supplied with documentation)

If Node.js is installed, run from project root:

```bash
node tests/bs-calendar-boundary.js
```

This checks conversion outputs at the end of support and a known reference date. If Node is absent, the QML preview can still be used, and the test can be run later in a separate test environment. This JS test was **not previously recorded as executed** on the Debian VM. Calendar support beyond 2100 BS needs updated verified source data and new release testing.
