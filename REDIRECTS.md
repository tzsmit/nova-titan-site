# Redirect Map — Single Source of Truth

**Last verified:** 2026-08-27 (against a real `bundle exec jekyll build`)
**Mechanism:** `jekyll-redirect-from` (0.16.0)
**Enforced by:** `.github/workflows/seo-qa.yml` → *Redirect regression (Search Console legacy URLs)*

---

## 1. How redirects work on this site — read this before adding one

This site is **Jekyll on GitHub Pages**. There is **no server, no reverse proxy, no
Netlify, no `_redirects` file, and no `netlify.toml`.** GitHub Pages cannot issue a
301.

Every redirect on this site is a **generated HTML page containing a
`<meta http-equiv="refresh">` plus a `rel="canonical"`** pointing at the
destination. Google treats this pattern as equivalent to a permanent redirect.

### The one and only way to declare a redirect

Add `redirect_from:` to the front matter of the **DESTINATION** page — the page
you want visitors to end up on. Never on the old page (the old page must not exist).

```yaml
---
layout: default
title: Services
permalink: /services/
redirect_from:
  - /old/path/
  - /another/old/path/
---
```

At build time `jekyll-redirect-from` creates `_site/old/path/index.html` for each
entry. Those generated files are **automatically excluded from `sitemap.xml`**.

### Rules

| Rule | Why |
| --- | --- |
| `redirect_from:` lives on the destination page only. | It is the only mechanism that actually functions on GitHub Pages. |
| Redirect to the **closest semantic equivalent**, never a blanket homepage redirect. | Google treats mass redirect-to-homepage as a soft 404 and drops the signal entirely. |
| Never invent a destination page just to preserve a legacy URL. | That produces thin/doorway pages. If no honest equivalent exists, point at the nearest real hub. |
| Never add a `redirect_from` entry for a URL that is currently a **live, indexable page**. | Jekyll will refuse to build (destination conflict) or silently shadow a real page. |
| Add the paired assertion to `seo-qa.yml` in the same commit. | A future redesign dropping a `redirect_from` line is exactly how these became 404s originally. |
| Do **not** re-add a `redirects:` key to `_config.yml`. | See §4 below. |

---

## 2. Active redirect map (24 entries, extracted from the build)

### 2a. Reported as **404 (Not found)** in Search Console — repaired

| Legacy URL | Destination | Declared in | Rationale |
| --- | --- | --- | --- |
| `/home/` | `/` | `index.html` | Old nav route for the homepage. The homepage is the exact semantic replacement. |
| `/plans/` | `/quote/` | `quote/index.html` | Retired managed-IT pricing-plan page. Nova Titan no longer sells plans; scoped quoting replaces it. |
| `/portfolio/` | `/services/` | `services/index.html` | Old work-samples index. Superseded by `/case-studies/`, but `/services/` carries the scope taxonomy the URL implied. |
| `/services/west-texas-locations/` | `/services/` | `services/index.html` | Market-hub index. `/services/` holds the Service Coverage section listing every current TX market page. |
| `/divisions/systems/` | `/services/` | `services/index.html` | Retired "divisions" taxonomy — this was the low-voltage/infrastructure division index. |
| `/divisions/intelligence/` | `/services/` | `services/index.html` | Old cybersecurity-branded division. **We deliberately did NOT invent a `/cybersecurity/` route** to preserve it — Nova Titan no longer sells a standalone cybersecurity line. |
| `/services/lubbock/commercial-it/` | `/services/low-voltage-subcontractor-lubbock-tx/` | market page | Old Lubbock commercial-IT page → current Lubbock money page. |

### 2b. Retired cybersecurity/cloud service lines (§7 repositioning)

| Legacy URL | Destination | Declared in |
| --- | --- | --- |
| `/cybersecurity/basic-security-assessment/` | `/services/` | `services/index.html` |
| `/cybersecurity/compliance-readiness-review/` | `/services/` | `services/index.html` |
| `/cybersecurity/security-awareness-training/` | `/services/` | `services/index.html` |
| `/services/cloud-security/` | `/services/` | `services/index.html` |
| `/services/lubbock/cybersecurity/` | `/services/` | `services/index.html` |
| `/services/government-it-contractor-texas/` | `/services/` | `services/index.html` |
| `/services/infrastructure/` | `/services/` | `services/index.html` |
| `/services/all-services/` | `/services/` | `services/index.html` |

> These all point at `/services/` rather than a fabricated cybersecurity page.
> Redirecting a retired service line to a page that still sells it would be a
> false claim; redirecting to the real scope hub is honest and preserves the link.

### 2c. Legacy Lubbock service URLs → consolidated Lubbock money page

| Legacy URL | Destination |
| --- | --- |
| `/services/lubbock/low-voltage/` | `/services/low-voltage-subcontractor-lubbock-tx/` |
| `/services/lubbock/managed-it/` | `/services/low-voltage-subcontractor-lubbock-tx/` |
| `/services/lubbock/network-installation/` | `/services/low-voltage-subcontractor-lubbock-tx/` |
| `/services/lubbock/security-systems/` | `/services/low-voltage-subcontractor-lubbock-tx/` |

### 2d. Old short market slugs → current market money pages

| Legacy URL | Destination | Search Console status before fix |
| --- | --- | --- |
| `/services/amarillo/` | `/services/low-voltage-subcontractor-amarillo-tx/` | Excluded by noindex tag |
| `/services/midland/` | `/services/low-voltage-subcontractor-midland-odessa-tx/` | — |
| `/services/odessa/` | `/services/low-voltage-subcontractor-midland-odessa-tx/` | Crawled – currently not indexed |
| `/services/commercial/` | `/services/` | Crawled – currently not indexed |

> `/services/commercial/` and `/services/odessa/` are **correctly redirecting.**
> Do **not** attempt to get these re-indexed — they are obsolete URLs whose
> equity has been consolidated. In Search Console they should be left alone.

### 2e. Booking

| Legacy URL | Destination |
| --- | --- |
| `/book-now/` | `/quote/` |

---

## 3. Asset tombstones (PDF URLs that must never 404)

Two PDFs were **deleted** in the 2026-08 audit but had already been indexed by
Google. Deleting an indexed asset produces a hard 404. Instead each old URL now
serves a small HTML redirect published at the *exact* old `.pdf` path via a
Jekyll `permalink:`, so the URL keeps responding.

| Old asset URL | Now serves | Source file | Why the original was removed |
| --- | --- | --- | --- |
| `/assets/capability-statement/novatitan-capability-statement.pdf` | redirect → `/capability-statement/` | `assets/capability-statement/index.html` | Obsolete. Carried retired cybersecurity/cloud-security positioning, an unverifiable "certified self-identified minority-owned" claim, and `CAGE: Pending Assignment` (real CAGE is `170W6`). |
| `/assets/docs/nova-titan-systems-capability-statement-hubzone-2026.pdf` | redirect → `/assets/docs/nova-titan-systems-capability-statement-2026.pdf` | `assets/docs/hubzone-duplicate-tombstone.html` | Byte-identical duplicate (same md5) of the current 2026 statement, orphaned, and polluting the sitemap with a second capability-statement URL. |

Both tombstones carry `sitemap: false` and `noindex, follow`.
Archived originals live in `assets/docs/_archive/`, which Jekyll **never publishes**
(underscore-prefixed directories are auto-excluded from `_site`).

CI asserts only **one** real capability-statement PDF (>5 KB) exists in `_site`.

---

## 4. Removed: the inert `_config.yml` `redirects:` registry

Before this audit, `_config.yml` contained a ~50-line Netlify-style block:

```yaml
redirects:
  - from: /plans/
    to: /contact/
  ...
```

**This did nothing.** No plugin consumed it. Jekyll ignored the key entirely. It
was a decorative list that had silently **drifted away from reality**:

| Registry claimed | Build actually produced | Verdict |
| --- | --- | --- |
| `/plans/ → /contact/` | `/plans/ → /quote/` | Registry was **wrong** |
| `/case-studies/ → /services/` | `/case-studies/` is a **live, indexable page** | Registry would have destroyed a working page if anyone had implemented it |

Because it looked authoritative, it was actively dangerous: a future maintainer
could have "implemented" it and broken live pages. It was deleted and replaced
with a pointer to this file.

**Do not re-introduce a `redirects:` key.** If you need a redirect, use
`redirect_from:` per §1.

---

## 5. Redirect chains

There are **zero redirect chains**. Every legacy URL points directly at a live
200 destination — never at another redirect.

Verify before merging:

```bash
bundle exec jekyll build
python3 - <<'PY'
import glob,re,os
red={}
for p in glob.glob('_site/**/*.html',recursive=True):
    h=open(p,encoding='utf-8',errors='ignore').read()
    if 'http-equiv="refresh"' not in h: continue
    src='/'+os.path.relpath(p,'_site').replace('index.html','')
    red[src]=re.search(r'url=([^"\']+)',h).group(1).replace('https://novatitan.net','')
chains=[(s,d) for s,d in red.items() if d in red]
print("CHAINS:",chains or "none")
PY
```

---

## 6. Regenerating this table

```bash
bundle exec jekyll build
python3 - <<'PY'
import glob,re,os
rows=[]
for p in glob.glob('_site/**/*.html',recursive=True):
    h=open(p,encoding='utf-8',errors='ignore').read()
    if 'http-equiv="refresh"' not in h: continue
    src='/'+os.path.relpath(p,'_site')
    src=src[:-10] if src.endswith('index.html') else src
    rows.append((src,re.search(r'url=([^"\']+)',h).group(1)))
for s,d in sorted(rows): print(f"| `{s}` | `{d}` |")
print("TOTAL:",len(rows))
PY
```

If the count changes, **update this file and `seo-qa.yml` in the same commit.**
