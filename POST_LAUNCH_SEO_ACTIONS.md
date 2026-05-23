# POST_LAUNCH_SEO_ACTIONS.md
# Nova Titan Systems LLC — novatitan.net
# Post-Launch SEO Action Plan
# Last updated: 2026-05-23

---

## Overview

This document provides exact post-launch steps for Google Search Console, Google Business Profile, and local SEO acceleration after the field work gallery and service landing page changes are deployed.

This is the fastest legitimate path to indexing and local ranking improvement. It does not guarantee instant or specific rankings — search engines determine rankings independently.

---

## STEP 1 — Verify Google Search Console Property

**Do this first, before anything else.**

1. Go to: https://search.google.com/search-console/
2. Confirm the property `https://novatitan.net/` is verified.
   - If verified: proceed to Step 2.
   - If not verified: select "Add Property" → "URL prefix" → enter `https://novatitan.net/` → follow the verification steps (HTML file method or DNS TXT record recommended for GitHub Pages).
3. Make sure you are logged in with the Google account associated with the domain owner.

---

## STEP 2 — Submit the Sitemap

1. In Search Console, select the `novatitan.net` property.
2. In the left sidebar, click **Sitemaps**.
3. In the "Add a new sitemap" field, enter:
   ```
   sitemap.xml
   ```
4. Click **Submit**.
5. Confirm the sitemap shows "Success" status within a few minutes.

**Expected sitemap URL submitted:** `https://novatitan.net/sitemap.xml`

The sitemap now includes these new pages:
- `/field-work/`
- `/services/structured-cabling-lubbock-tx/`
- `/services/security-camera-infrastructure-lubbock-tx/`

---

## STEP 3 — Request Indexing for New Pages

For each new or updated page, use the URL Inspection tool:

1. In Search Console, click **URL Inspection** in the sidebar.
2. Enter each URL below and press Enter:

**New pages — request indexing for each:**
```
https://novatitan.net/field-work/
https://novatitan.net/services/structured-cabling-lubbock-tx/
https://novatitan.net/services/security-camera-infrastructure-lubbock-tx/
```

3. For each URL: if it shows "URL is not on Google" → click **Request Indexing**.
4. If it shows "URL is on Google" → click **Request Indexing** anyway to prompt a re-crawl.

**Wait 2–7 days for indexing to complete.** Search Console will update the status.

---

## STEP 4 — Request Indexing for Updated Pages

These pages were significantly updated and should also be re-submitted:

```
https://novatitan.net/
https://novatitan.net/case-studies/
https://novatitan.net/services/
```

Use the same URL Inspection → Request Indexing process for each.

---

## STEP 5 — Inspect the Field Work Gallery Page

1. URL Inspection → enter `https://novatitan.net/field-work/`
2. Confirm:
   - Page is indexable (no "noindex" directive)
   - Canonical URL is `https://novatitan.net/field-work/`
   - No redirect errors
   - Page is mobile-usable
3. Click **View Tested Page** → check that the rendered HTML includes:
   - The page title: "Field Work Gallery | Low-Voltage, Network, Wireless & Smart Hands Projects | Nova Titan Systems"
   - The photo grid with alt text
   - The breadcrumb

---

## STEP 6 — Monitor for Indexing Errors

After 7–14 days:

1. In Search Console, click **Pages** (or Coverage).
2. Check the **Excluded** tab for:
   - "Discovered – currently not indexed" (normal for new pages, resolves over time)
   - "Crawled – currently not indexed" (may need stronger internal linking or content improvement)
   - "Duplicate, Google chose different canonical" (investigate if any pages appear here unexpectedly)
3. Check the **Valid** tab to confirm all submitted pages are indexed.

---

## STEP 7 — Update Google Business Profile

1. Log in to Google Business Profile: https://business.google.com/
2. Find the Nova Titan Systems LLC listing.
3. Go to **Photos** tab.
4. Upload photos following the plan in `GBP_PHOTO_UPLOAD_PLAN.md`.
5. After uploading all 8 photos:
   - Set Photo 1 (commercial warehouse infrastructure) as the cover photo if permitted.
   - Verify all photos appear in the "Work" or "At Work" category.

**Also update GBP business description to match current positioning:**
> Nova Titan Systems LLC is a Lubbock-based Division 27/28 low-voltage subcontractor delivering structured cabling, network infrastructure, wireless access point deployment, security camera infrastructure, rack-and-stack, and smart hands field services across West Texas, Houston, and DFW. SAM.gov registered. CAGE: 170W6. UEI: CZ8BLZMSKZ66.

**Update GBP Services section:**
- Structured Cabling
- Commercial Network Cabling
- Network Infrastructure
- Wireless Access Point Deployment
- Security Camera Infrastructure (cabling & mounting)
- Rack-and-Stack
- Site Surveys
- Smart Hands Field Services
- Fire Alarm Rough-In Coordination (Division 28)
- Fortinet Firewall Deployment

**Confirm GBP primary category:** Electrical Contractor (NAICS 238210 aligns here)

---

## STEP 8 — Post-Completion Review Requests

After completing field service jobs, send a review request to the client contact:

> "Thanks for the opportunity to support your project. If you have a moment, an honest Google review would really help our local presence. Here's our direct review link: [your GBP review link]"

**How to get your review link:**
1. Google your business name on Google Maps.
2. Click your listing.
3. Scroll to the Reviews section → click "Get more reviews."
4. Copy the short URL Google provides.
5. Use that URL in follow-up emails.

Do not offer incentives for reviews. Request only after genuine project completion.

---

## STEP 9 — 7-Day Check

7 days after deployment:

- [ ] Log into Search Console
- [ ] Confirm `/field-work/` appears in the Coverage → Valid tab
- [ ] Confirm both service landing pages are indexed
- [ ] Check Performance tab → Queries for any early impressions
- [ ] Check for any Coverage errors or warnings

---

## STEP 10 — 14-Day Check

14 days after deployment:

- [ ] Log into Search Console → Performance → Pages
- [ ] Filter to: `/field-work/`, `/services/structured-cabling-lubbock-tx/`, `/services/security-camera-infrastructure-lubbock-tx/`
- [ ] Note any impressions or clicks (may be zero or very low at this stage — normal)
- [ ] Check if GBP photos have received any views in GBP Insights
- [ ] Confirm no 404s or broken links in Search Console

---

## STEP 11 — 30-Day Check

30 days after deployment:

- [ ] Log into Search Console → Performance → Queries
- [ ] Filter to date range: last 28 days
- [ ] Look for these search terms and note their status:

| Target Term | Expected Range |
|---|---|
| nova titan systems | Should appear with impressions |
| low voltage contractor Lubbock TX | Watch for early impressions |
| structured cabling Lubbock | Watch for early impressions |
| security camera installation Lubbock | Watch for early impressions |
| commercial network cabling Lubbock | Watch for early impressions |
| smart hands technician Texas | Watch for impressions |
| network rack installation Texas | Watch for impressions |
| wireless access point installation Texas | Watch for impressions |
| field services West Texas | Watch for impressions |

- [ ] If no impressions on local terms after 30 days, consider adding 1–2 blog posts targeting these terms with real project write-ups.
- [ ] If any terms are getting impressions but low clicks, review and improve the meta description for that page.

---

## STEP 12 — Image Search Monitoring

After 30–60 days:

1. On Google, search: `site:novatitan.net/assets/images/work/`
2. Or search Google Images for: "nova titan systems low voltage"
3. If images are appearing: this confirms Google has crawled and indexed the field work images.
4. If images are not appearing after 60 days: verify `robots.txt` is not blocking `/assets/` and that image paths in the HTML are correct.

---

## STEP 13 — robots.txt Check

Confirm `robots.txt` at `https://novatitan.net/robots.txt` does NOT block:
- `/assets/`
- `/assets/images/`
- `/field-work/`
- `/services/`

It should allow Googlebot access to all of these.

---

## STEP 14 — Ongoing Maintenance (90-Day Cadence)

Every 90 days:

1. **Add 1–2 new field work photos** to `/assets/images/work/`, update `_data/work_gallery.yml`, add to field-work gallery page.
2. **Update sitemap lastmod** for modified pages to `YYYY-MM-DD`.
3. **Check GBP** for new questions, reviews, or photo removals.
4. **Review Search Console** for new queries — add service or location pages if consistent impressions appear for a term you're not targeting.
5. **Consider blog posts** — a 400–600 word post describing a real recent project (without sensitive details) is the single fastest way to gain new long-tail search traffic.

---

## Quick Reference: Key URLs

| Resource | URL |
|---|---|
| Live site | https://novatitan.net/ |
| Field Work Gallery | https://novatitan.net/field-work/ |
| Structured Cabling Lubbock | https://novatitan.net/services/structured-cabling-lubbock-tx/ |
| Security Camera Lubbock | https://novatitan.net/services/security-camera-infrastructure-lubbock-tx/ |
| Services | https://novatitan.net/services/ |
| Case Studies | https://novatitan.net/case-studies/ |
| Sitemap | https://novatitan.net/sitemap.xml |
| Google Search Console | https://search.google.com/search-console/ |
| Google Business Profile | https://business.google.com/ |

---

## Quick Reference: Key Credentials

| Item | Value |
|---|---|
| SAM.gov | Active |
| UEI | CZ8BLZMSKZ66 |
| CAGE | 170W6 |
| NAICS Primary | 238210 |
| Phone | (806) 370-0624 |
| Email | traivonesmith@novatitan.net |
| Calendly | https://calendly.com/traivonesmith-novatitan/free-15-minute-consultation-nova-titan-systems |

---

*For photo upload details see: `GBP_PHOTO_UPLOAD_PLAN.md`*
*For rejected photo records see: `rejected_photos_notes.md`*
*For gallery data see: `_data/work_gallery.yml`*
