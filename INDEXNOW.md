# IndexNow — Crawl-Notification Protocol (PR #59, hotfixed in PR #60)

**Last verified:** 2026-08-30, against `main` post-PR #59 merge
(`e43a82c58458679bb55c6793790582f395f0427f`).

## What this is (and is not)

[IndexNow](https://www.indexnow.org/) is a push protocol originally
co-developed by Microsoft Bing and Yandex that lets a website tell
participating search engines "this URL changed, please re-crawl it now"
instead of waiting for their normal crawl schedule.

**Participating engines (as of this writing):** Microsoft Bing, Yandex,
Naver, Seznam.cz, Yep.

**IndexNow is explicitly NOT:**
- Google's indexing API. Submitting to IndexNow has **no effect** on
  Google Search, Google AI Overviews, or Google AI Mode. Google does not
  participate in IndexNow.
- A direct notification to OpenAI/ChatGPT. ChatGPT Search's crawler is
  **OAI-SearchBot**, a fully independent mechanism from IndexNow (see
  the "OAI-SearchBot" section of the PR #59 return for the crawlability
  verdict). OpenAI does not consume IndexNow submissions.

**Why it's in scope for a 2026 AI-search brief anyway:** Bing's own index
is a documented upstream input to some AI answer surfaces (e.g. Microsoft
Copilot; historically also referenced as a partial data source for other
assistants). Faster Bing re-crawling is therefore a legitimate, narrow,
low-risk lever for AI-answer freshness — nothing more, nothing less. This
document and the implementation deliberately avoid overstating that
connection.

## Key file

- **File:** `/0241145aa37aab753ad44f042523ea8b.txt` (repo root, deployed
  verbatim to `https://novatitan.net/0241145aa37aab753ad44f042523ea8b.txt`)
- **Content:** exactly the 32-character lowercase-hex key
  `0241145aa37aab753ad44f042523ea8b`, nothing else.
- **Method:** this is IndexNow spec **Option 1** (the officially
  recommended method) — a plain-text file named `{key}.txt` at the site
  root, whose content is only the key. Bing verifies key ownership by
  fetching `https://<host>/<key>.txt` and checking it matches the key
  submitted in the API call.
- **Why this is safe to commit publicly:** the IndexNow key is a
  **verification token, not a secret**. It exists only to prove domain
  ownership to IndexNow's operators (the same way a DNS TXT record or an
  HTML meta tag proves ownership to Google Search Console). It grants no
  access to anything and cannot be used to submit URLs on Nova Titan's
  behalf from outside this repo without also controlling the domain.
  There is no equivalent of an API secret to protect here.
- **How it was generated:** a random 32-character lowercase-hex string,
  satisfying the spec's 8–128 character `[a-zA-Z0-9-]` requirement.
- **Jekyll build hygiene (PR #59 review follow-up, 2026-08):** this file has
  no YAML front matter, so Jekyll treats it as a plain **static file** and
  copies it into `_site/` verbatim (this is required -- the key must stay
  publicly reachable at the site root). Without further configuration,
  `jekyll-sitemap` would ALSO include static files in `sitemap.xml` by
  default, and `tools/indexnow_lib.py`'s changed-file mapper has a direct
  file→URL matching path (`"/" + f` against sitemap membership) -- so an
  unguarded key file could theoretically cause the tool to submit its own
  verification-key URL to IndexNow. `_config.yml`'s `defaults:` block sets
  `sitemap: false` scoped exactly to this filename (the same mechanism
  already used for the three historical capability-statement PDF aliases,
  since static files cannot carry their own front matter). The key file
  therefore remains at HTTP 200 for Bing's ownership check, but is never a
  `sitemap.xml` entry and can never be selected for submission.
  `.github/workflows/seo-qa.yml`'s "IndexNow — key file hygiene" step
  hard-gates all three invariants: the key file is deployed, its URL is
  absent from `sitemap.xml`, and this document itself (`INDEXNOW.md`,
  internal developer documentation, listed under `_config.yml`'s
  `exclude:`) never appears in `_site/`.
- **How it's managed going forward:** the key is a single source of
  truth read by three places, which must always agree:
  1. the file itself (`{key}.txt` at repo root),
  2. `tools/submit_indexnow.py` (`find_key_file()` derives the key from
     the filename it finds at repo root — there is no hardcoded key
     string anywhere in code),
  3. this document.
  Rotating the key means: delete the old `{key}.txt`, add a new
  `{new-key}.txt` containing the new key, commit both changes together.
  Nothing else needs to change — the submission script has no hardcoded
  key.

## Architecture

```
push to main
   │
   ▼
GitHub Pages workflow "pages build and deployment" (existing, unmodified)
   │  (this is GitHub's own managed workflow — not a file in this repo;
   │   API path: dynamic/pages/pages-build-deployment -- see the
   │   "Workflow DEFINITION name vs. RUN-RECORD display name" note below
   │   the "Why a workflow_run trigger" heading)
   ▼
   success ──────────────────────────────────────────────┐
   │                                                       │
   ▼ (independently, unaffected by the above)              ▼
.github/workflows/seo-qa.yml                    .github/workflows/indexnow.yml
  hard-gate CI, blocks bad merges                 (workflow_run trigger, fires
  (unchanged behavior; two NEW hard-gate           AFTER Pages reports success)
  steps added: IndexNow unit tests +                  │
  key-file hygiene check)                             ▼
                                                 job: continue-on-error: true
                                                    │
                                                    ▼
                                     checkout EXACT deployed SHA†, jekyll build
                                                    │
                                                    ▼
                                                 tools/submit_indexnow.py
                                                    │  (also continue-on-error:
                                                    │   true at the step level,
                                                    │   AND internally never
                                                    │   exits non-zero except
                                                    │   for local misconfig)
                                                    ▼
                                                 git diff (before..after SHA)
                                                    │
                                                    ▼
                                                 tools/indexnow_lib.py
                                                 select_paths_to_submit()
                                                    │  bounded by sitemap.xml
                                                    │  membership + denylist
                                                    ▼
                                                 POST https://api.indexnow.org/indexnow
                                                    │  {host, key, keyLocation, urlList}
                                                    ▼
                                                 log result, exit 0 regardless
```

† **Checkout ref (PR #59 review follow-up, 2026-08):** for the `workflow_run`
trigger, the checkout step pins `ref:` to
`github.event.workflow_run.head_sha` -- the exact commit the triggering Pages
deployment built -- NOT the `main` branch tip. Checking out `main` here was a
race condition: if a newer commit landed on `main` between the deploy
completing and this job starting, the job would build `sitemap.xml` from the
newer commit while still diffing from the older, already-deployed SHA,
producing a changed-URL set that didn't correspond to what was actually just
deployed. `workflow_dispatch` (manual runs) has no specific deployment to pin
to, so it continues to use the current `main` tip. `fetch-depth: 2` is
unchanged and remains sufficient: checking out a specific SHA at depth 2
still fetches that commit's immediate parent, which is what the "Determine
before/after commits" step needs to resolve `${AFTER}~1`.

### Why a `workflow_run` trigger on the GitHub Pages workflow

GitHub Pages for this repo uses the **legacy** build type (`gh api
repos/tzsmit/nova-titan-site/pages` → `"build_type": "legacy"`), so
deployment is driven by GitHub's own managed Pages workflow — there is no
`deploy` job in this repository's own workflow files to hook a `needs:`
dependency onto. `workflow_run` is the documented mechanism for triggering
a workflow in a **different** workflow file after another one completes.

**Workflow DEFINITION name vs. RUN-RECORD display name (PR #60 hotfix,
2026-08 -- supersedes the PR #59 round-2 interpretation below, which was
live-production-DISPROVEN):**

`workflow_run.workflows` in `.github/workflows/indexnow.yml` filters by a
workflow's **registered definition name** — the `name` field returned by
the GitHub Actions **workflow-definition** endpoint
(`GET /repos/{owner}/{repo}/actions/workflows`) — **not** by the cosmetic
display label shown on individual **run records** (`GET
/repos/{owner}/{repo}/actions/runs`, or the run-scoped variant
`.../actions/workflows/{id}/runs`). For GitHub's own managed Pages
workflow in this repo, those two endpoints report **two different values**
for the identical workflow (`workflow_id: 179842344`, `path:
dynamic/pages/pages-build-deployment`):

| Endpoint | Field returned | Value |
| --- | --- | --- |
| Workflow **definition** (`.../actions/workflows`) — **what `workflow_run.workflows` must match** | `name` | `pages-build-deployment` |
| Individual **run record** (`.../actions/runs`) — cosmetic UI label only, NOT a match target | `name` | `pages build and deployment` |
| Both endpoints (unambiguous, unaffected by this issue) | `path` | `dynamic/pages/pages-build-deployment` |

**PR #59 round 2 got this backwards.** It queried the run-listing endpoint
on a real deployment, saw `name: "pages build and deployment"`, concluded
that was "the actual workflow name," and changed the trigger from
`workflows: ["pages-build-deployment"]` to `workflows: ["pages build and
deployment"]` — reasoning that the hyphenated form was merely "the path
basename" and could never match. That reasoning was itself independently
verified (27/27 tests, Jekyll build, SEO-QA replication) and approved, and
PR #59 was merged on that basis.

**Live production then disproved it.** After PR #59 merged
(`e43a82c58458679bb55c6793790582f395f0427f`) and the real Pages deployment
completed successfully (run `33325949629`, `conclusion: success`,
`2026-08-30T17:41:59Z`), the IndexNow workflow recorded **zero**
`workflow_run`-triggered runs after 20+ minutes of polling — exactly the
failure mode round 2 was supposed to prevent. Re-querying the
workflow-**definition** endpoint (as opposed to the run-listing endpoint)
showed the registered `name` for that workflow is `pages-build-deployment`
(hyphenated) — the value round 2 removed. This is also corroborated by a
currently-maintained, purpose-built third-party GitHub Action for this
exact integration pattern (GitHub Pages → IndexNow via `workflow_run`),
[`jakob-bagterp/index-now-submit-sitemap-urls-action`](https://jakob-bagterp.github.io/index-now-for-python/user-guide/github-actions/automated-workflows/#github-pages),
whose documented working example uses:
```yaml
on:
  workflow_run:
    workflows: [pages-build-deployment]
    types: [completed]
```

**Resolution (PR #60):** the trigger is restored to
`workflows: ["pages-build-deployment"]` — the registered workflow-definition
name. The `branches: [main]` filter under `workflow_run` (added in round 2
as defense-in-depth) is unchanged and retained, alongside the existing
job-level `head_branch == 'main'` / `conclusion == 'success'` gate (also
unchanged, and still the primary production-safety condition). No other
part of this workflow — the exact-deployed-SHA checkout, `fetch-depth: 2`,
`continue-on-error` failure isolation, or `workflow_dispatch` — was touched
by this hotfix.

**Real end-to-end acceptance test for this fix:** unlike round 2 (which
could only be verified by reasoning about the live API, since
`workflow_run`-triggered jobs cannot execute during a PR's own CI), this
fix's true test is the next successful Pages deployment on `main` *after
this hotfix itself merges* — i.e., the merge of PR #60 is the real trigger
event. A manual `workflow_dispatch` run is **not** a valid test of this
fix: it exercises the Python submission plumbing but bypasses the
`workflow_run.workflows` filter entirely, so it would tell us nothing about
whether the automatic Pages→IndexNow handoff actually works.

### Why URL selection is git-diff-driven, not "resubmit the whole sitemap every time"

IndexNow's own operator guidance warns against submitting a full sitemap on
every trivial commit — excessive submissions can be seen as noisy/abusive
by the receiving engines. `tools/indexnow_lib.py` instead:

1. Takes the git diff between the previous and current commit on `main`.
2. Maps changed **source** files to the corresponding **public URL
   path(s)** they produce (e.g. `services/.../index.html` →
   `/services/.../`; `_data/case_studies.yml` → every currently-published
   case-study URL; `_posts/*.md` → the blog index + that post).
3. Intersects that mapped set with `_site/sitemap.xml` — the site's own
   already-hard-gated list of canonical, indexable, non-noindex URLs. A
   URL that isn't in the sitemap can never be selected, full stop.
4. Applies a second, defense-in-depth denylist
   (`DENYLIST_PATH_SUBSTRINGS`) that explicitly blocks `/thank-you/`,
   `/apply-tech/`, `/amazon-security/`, `/va-healthcare/`, `/dyess-afb/`,
   and the IndexNow key-verification file's own URL (PR #59 review
   follow-up, 2026-08) even in the hypothetical case of a future
   sitemap-generation regression.
5. Only when a change touches a shared template/layout/config file
   (`_includes/`, `_layouts/`, `assets/css/`, `_config.yml`) — **or one of
   three explicitly-verified sitewide `_data/*.yml` files** (PR #59 review
   follow-up, 2026-08): `_data/nav.yml` (consumed by `_includes/header.html`
   on every page), `_data/testimonials.yml` and
   `_data/testimonials_stats.yml` (both consumed by `_includes/head.html`'s
   AggregateRating/Review JSON-LD on every page) — does it fall back to the
   full (currently ~35-URL) sitemap, because in either case every page's
   rendered output could plausibly have changed, and that is an
   officially-justified exception, not routine noise. This is an explicit,
   individually-verified allowlist, **not** a blanket "treat all `_data/*`
   as global" rule: `_data/home.yml` is confirmed dormant (nothing in the
   repo references `site.data.home`) and deliberately does NOT trigger this
   path; `_data/case_studies.yml` keeps its own narrower, more precise
   mapping (to `/case-studies/*` only) rather than being added here.

This is verified by 27 deterministic, network-free unit tests (20 original +
7 added in the 2026-08 review follow-up, covering the sitewide `_data/*.yml`
triggers, the `_data/home.yml` negative case, and the key-file denylist
entry) in `tools/test_indexnow_lib.py` (run via `python3 -m pytest
tools/test_indexnow_lib.py -v`, wired into `seo-qa.yml` as a hard gate).

### Failure isolation (non-negotiable per the governing brief)

IndexNow failure can **never** fail the site deployment:

- The IndexNow workflow is a completely separate file
  (`.github/workflows/indexnow.yml`) from both `seo-qa.yml` and the
  GitHub-managed `pages build and deployment` workflow (API path:
  `dynamic/pages/pages-build-deployment`). It has no `needs:` relationship
  that could block either.
- It only *starts* after Pages reports `conclusion == 'success'` — a
  failed Pages build never even triggers it, so there's no risk of it
  racing a broken deploy.
- The job itself is marked `continue-on-error: true`.
- The network-calling step is *also* marked `continue-on-error: true`
  (belt-and-suspenders on top of the job-level setting).
- Inside `tools/submit_indexnow.py`, every HTTP/network exception is
  caught and logged; the script exits `0` in all cases except a genuine
  local misconfiguration it has no safe way to proceed from (the key file
  is missing, malformed, or ambiguous) — and even that only fails *this*
  standalone workflow run, never the deployment or the SEO QA gate.
- The `seo-qa.yml` hard gate (which DOES block merges) only checks that
  the key file exists, is well-formed, and lands in `_site/` — it never
  calls the real IndexNow endpoint, so a live IndexNow outage cannot
  block a PR either.

### IndexNow response codes (for interpreting workflow logs)

| Code | Meaning |
| --- | --- |
| 200 | OK — URL submitted successfully |
| 202 | Accepted — key validation pending |
| 400 | Bad request (invalid format) |
| 403 | Forbidden (key not valid / key mismatch) |
| 422 | Unprocessable (URL doesn't belong to host, or host not verified) |
| 429 | Too many requests |

## Deleted URL handling

IndexNow deletion notifications are deliberately not supported in v1.

The v1 selector is bounded by the current production sitemap. A URL that has
been removed from the current sitemap cannot be selected for IndexNow
submission. This preserves the stronger safety guarantee that only current,
public, canonical, sitemap-eligible URLs can be submitted.

Do not weaken the current sitemap-membership gate to add deletion support.

A future v2 may support deletion notifications by comparing the previous
deployment's sitemap with the current sitemap and explicitly testing URLs that
were present before but are absent now.

## Manual Bing-side verification steps (not automatable, documented per
brief §24)

1. Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters) with
   the account that manages `novatitan.net`.
2. Under **IndexNow**, confirm the key
   `0241145aa37aab753ad44f042523ea8b` shows as verified (Bing performs the
   same `{key}.txt` fetch the protocol describes).
3. Optionally cross-check submitted URLs under **IndexNow Insights** to
   confirm submissions are being received (no code change required for
   this — it's a dashboard, not part of this repo).

## Explicitly out of scope / not done

- No `llms.txt`, no AI-specific schema, no hidden content — see the
  governing brief §9 and the PR #59 return for why.
- No change to `robots.txt` for OAI-SearchBot — see the "OAI-SearchBot"
  section of the PR #59 return.
- No full-sitemap submission on every commit — see "Why URL selection is
  git-diff-driven" above.
