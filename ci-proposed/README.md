# Proposed CI change — REQUIRES MANUAL APPLY BY THE OWNER

**Status: proposed hardened workflow validated locally and staged for owner
installation.** It is NOT active on GitHub. The live
`.github/workflows/seo-qa.yml` is still the older, advisory-only workflow and
will remain so until the owner runs the copy command below.

`seo-qa.yml.proposed` is the hardened SEO QA gate from the 2026-08 audit,
as corrected in the 2026-08 correction pass (PR #45).

**It could not be committed to `.github/workflows/` by automation** — GitHub
rejected the push with:

> refusing to allow a GitHub App to create or update workflow
> `.github/workflows/seo-qa.yml` without `workflows` permission

## To apply — INSTALL BEFORE MERGING, not after

Install this on the **`genspark_ai_developer` branch** while PR #45 is still
open. The workflow triggers on `pull_request`, so committing it to the PR branch
makes the hardened gate run against the PR itself. That is the only way to get
real GitHub-side proof that these gates pass. Merging first would land the code
without the hardened gate ever having executed.

### Option A — GitHub web UI (no local clone needed)

1. Switch to the `genspark_ai_developer` branch.
2. Open `ci-proposed/seo-qa.yml.proposed` and copy the entire file.
3. Open `.github/workflows/seo-qa.yml` and click the pencil (Edit) button.
4. Replace the **entire** contents with what you copied.
5. Commit **to `genspark_ai_developer`** (not to `main`, and not as a new PR).
6. Wait for the "SEO QA" check on PR #45 to go green.
7. Merge PR #45.

### Option B — locally, 1 command

```bash
cp ci-proposed/seo-qa.yml.proposed .github/workflows/seo-qa.yml
git add .github/workflows/seo-qa.yml && git commit -m "ci: harden SEO QA gate" && git push
```

### Why automation cannot do this for you

Every push containing `.github/workflows/**` from this environment is rejected:

> refusing to allow a GitHub App to create or update workflow
> `.github/workflows/seo-qa.yml` without `workflows` permission

This was re-attempted during the correction pass and rejected again. It is a
GitHub App permission boundary, not a repo misconfiguration, and it is why the
file is staged here instead of installed. The currently visible green checks on
PR #45 are from the **older advisory-only** workflow and are **not** evidence
that the hardened gates pass.

## What it changes

The previous workflow's internal link check was **advisory only**
(`|| echo "::warning::"`), which is how the defects found in this audit survived
in production. Every check below now **FAILS the build**:

| Gate | Catches |
| --- | --- |
| Same-origin broken links | Dead internal links |
| Redirect regression (12 URLs) | A dropped `redirect_from` re-creating a Search Console 404 |
| Redirect chain / dead destination | Chained or dangling redirects |
| `REDIRECTS.md` drift | Redirect count changing without doc update |
| Money page integrity (16 pages) | Missing page, canonical != 1, H1 != 1, no meta description, **noindex on a money page**, absent from sitemap |
| Sitemap purity | Duplicate `<loc>`, 404s, redirect pages, noindex pages, missing assets |
| JSON-LD parsing | Any invalid schema block (106 blocks currently, 0 invalid) |
| Canonical host | Internal links using `http://`, `www.`, or `/index.html` |
| Retired positioning | Reappearance of `24/7 IT Support`, `Nationwide managed IT`, `href="/plans/"`, `CAGE: Pending` |
| Exactly one H1 **on canonical indexable content pages only** | The blog-post-with-zero-H1 defect — see "H1 gate correction" below |
| `tel:` E.164 | NAP inconsistency vs Organization JSON-LD |
| Analytics presence | Silent removal of the lead attribution layer |
| Empty metric cards | Blank stat values shipping to production |
| Duplicate site tree | `nova-titan-site/` ever being published |
| Capability-statement PDFs do not diverge | A stale/inaccurate revision being reachable at a historical URL |
| No HTML published at a `.pdf` path | The GitHub Pages MIME hazard — see "PDF strategy change" below |
| One capability-statement PDF in the sitemap | Duplicate content across the historical aliases |

Each new gate was **mutation-tested** (deliberately broken, confirmed to fail,
then restored). Full suite runs green locally: **0 failing steps.**

---

## H1 gate correction (2026-08 correction pass)

The first version of this gate was **defective**. It globbed every generated
HTML file and required `H1 == 1` on all of them:

```python
pages = {p: open(p).read() for p in glob.glob(site + '/**/*.html', recursive=True)}
for p, h in pages.items():
    if len(re.findall(r'<h1[\s>]', h)) != 1:
        fail.append(...)
```

That swept in 27 pages that owe no content-page H1 rule: 24
`jekyll-redirect-from` pages, `/404.html`, `/thank-you/`, `/apply-tech/`.

It did not merely over-reach — **it passed by coincidence.**
`jekyll-redirect-from` happens to emit exactly one
`<h1>Redirecting&hellip;</h1>`, so redirect pages satisfied `== 1` by luck. If
that plugin's markup ever changed, CI would have started hard-failing on pages
with no H1 requirement at all, blocking unrelated merges.

The corrected gate classifies each page first, via an explicit `h1_exempt()`
predicate, and prints the reason for every skip:

| Exemption | Detected by |
| --- | --- |
| `redirect` | `http-equiv="refresh"` present |
| `js-redirect` | `<script>location =` present |
| `noindex` | `robots` meta contains `noindex` |
| `404` | basename is `404.html` |
| `canonicalised-away` | `rel=canonical` points at a different URL than the page's own |

Suppression was **not** used anywhere — no `|| true`, no `|| echo warning`. The
gate still hard-fails for 0 or 2+ H1 on a real content page.

An anti-regression guard prevents the exemption logic from quietly swallowing
the whole site:

```python
if checked < 20:
    fail.append(f"H1 gate only evaluated {checked} pages — exemption "
                "logic is too broad or the build is incomplete")
```

Current build: **27 pages exempted (each with a printed reason), 35 canonical
indexable content pages enforced.**

### Mutation test results

| # | Scenario | Expected | Actual |
| --- | --- | --- | --- |
| 1 | Money page stripped to 0 H1 | FAIL | exit 1 ✓ |
| 2 | Restored | PASS | exit 0 ✓ |
| 3 | Money page given 2 H1 | FAIL | exit 1 ✓ |
| 4 | Restored | PASS | exit 0 ✓ |
| 5 | Redirect page stripped to 0 H1 | PASS (exempt) | exit 0 ✓ |
| 6 | `/thank-you/`, `/apply-tech/`, `/404.html` stripped | PASS (exempt) | exit 0 ✓ |
| 7 | 3 extra H1 on redirect + noindex pages | PASS (exempt) | exit 0 ✓ |

---

## PDF strategy change (2026-08 correction pass)

An earlier revision of this branch deleted the two obsolete indexed capability
statements and left **HTML meta-refresh tombstones at the `.pdf` URLs**. That
was wrong, and this README previously documented it as valid.

**GitHub Pages assigns `Content-Type` purely from the file extension.** An HTML
body served from a `*.pdf` path is delivered as `application/pdf`, so a crawler
or browser receives a **corrupt PDF**, not a redirect. GitHub Pages also cannot
issue a 301 or set custom headers for a static asset path.

Remediation (Option B): a real, accurate PDF is published at both historical
URLs, and the duplicate-content risk is handled in `_config.yml` via
`defaults:` → `sitemap: false`, so only the canonical copy is in the sitemap.

The old `Only ONE public capability statement PDF may exist` invariant became
stale as a result (3 aliases now exist by design) and was replaced by the three
gates listed in the table above, which enforce the invariant that actually
matters: **one piece of CONTENT, byte-identical at every historical URL, real
PDF magic bytes, one sitemap entry.**
