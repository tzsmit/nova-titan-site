#!/usr/bin/env python3
"""
Deterministic tests for tools/indexnow_lib.py (PR #59).

Run: python3 -m pytest tools/test_indexnow_lib.py -v
Wired into .github/workflows/seo-qa.yml as a hard gate.

No network calls are made anywhere in this file -- these tests only exercise
the pure URL-selection logic, never tools/submit_indexnow.py's HTTP path.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from indexnow_lib import (  # noqa: E402
    apply_denylist,
    is_global_template_change,
    map_changed_files_to_paths,
    paths_to_absolute_urls,
    select_paths_to_submit,
    sitemap_paths_from_urls,
    validate_key_file,
)

SAMPLE_SITEMAP_URLS = [
    "https://novatitan.net/",
    "https://novatitan.net/about/",
    "https://novatitan.net/case-studies/",
    "https://novatitan.net/case-studies/7brew-multi-site/",
    "https://novatitan.net/case-studies/abc-supply-migration/",
    "https://novatitan.net/blog/",
    "https://novatitan.net/blog/wifi-security/",
    "https://novatitan.net/services/structured-cabling-lubbock-tx/",
    "https://novatitan.net/quote/",
    "https://novatitan.net/assets/docs/nova-titan-systems-capability-statement-2026.pdf",
]


def test_sitemap_paths_from_urls():
    paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    assert "/" in paths
    assert "/case-studies/7brew-multi-site/" in paths
    assert "/assets/docs/nova-titan-systems-capability-statement-2026.pdf" in paths
    assert len(paths) == len(SAMPLE_SITEMAP_URLS)


def test_global_template_change_detected():
    assert is_global_template_change(["_includes/head.html"])
    assert is_global_template_change(["_layouts/case-study.html"])
    assert is_global_template_change(["_config.yml"])
    assert is_global_template_change(["assets/css/main.css"])
    assert not is_global_template_change(["services/index.html"])
    assert not is_global_template_change(["README.md"])


# --- PR #59 review follow-up (Finding 2): sitewide _data/*.yml triggers ----

def test_nav_data_change_is_global():
    # _data/nav.yml is consumed by _includes/header.html (site nav, every
    # page) -- a change here can affect every rendered page's nav.
    assert is_global_template_change(["_data/nav.yml"])


def test_testimonials_data_change_is_global():
    # _data/testimonials.yml is consumed by _includes/head.html
    # (AggregateRating/Review JSON-LD emitted on every page).
    assert is_global_template_change(["_data/testimonials.yml"])


def test_testimonials_stats_data_change_is_global():
    # _data/testimonials_stats.yml is consumed by _includes/head.html
    # alongside _data/testimonials.yml (same include, same JSON-LD block).
    assert is_global_template_change(["_data/testimonials_stats.yml"])


def test_home_data_change_is_not_global():
    # _data/home.yml is verified dormant -- nothing in the repo references
    # `site.data.home`. It must NOT trigger global resubmission just because
    # it lives in _data/ alongside the three sitewide files above.
    assert not is_global_template_change(["_data/home.yml"])


def test_sitewide_data_change_selects_full_sitemap_end_to_end():
    # End-to-end: a change to one of the three verified sitewide data files
    # must select the full (small) sitemap via select_paths_to_submit, the
    # same path as an _includes/ or _config.yml change -- otherwise a real
    # sitewide content change (e.g. editing site nav) would currently select
    # ZERO URLs, a silent under-notification bug.
    selected = select_paths_to_submit(["_data/nav.yml"], SAMPLE_SITEMAP_URLS)
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    assert selected == sitemap_paths


def test_home_data_change_selects_nothing_end_to_end():
    # Negative counterpart: _data/home.yml is dormant, so a change to it
    # alone (no other changed files) must select nothing at all.
    selected = select_paths_to_submit(["_data/home.yml"], SAMPLE_SITEMAP_URLS)
    assert selected == set()


def test_direct_html_file_maps_to_pretty_path():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(
        ["services/structured-cabling-lubbock-tx/index.html"], sitemap_paths
    )
    assert selected == {"/services/structured-cabling-lubbock-tx/"}


def test_root_index_maps_to_slash():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(["index.html"], sitemap_paths)
    assert selected == {"/"}


def test_case_studies_data_change_maps_to_all_published_case_study_pages():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(
        ["_data/case_studies.yml"], sitemap_paths
    )
    assert selected == {
        "/case-studies/",
        "/case-studies/7brew-multi-site/",
        "/case-studies/abc-supply-migration/",
    }


def test_post_change_maps_to_blog_pages():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(
        ["_posts/2025-08-07-wifi-security.markdown"], sitemap_paths
    )
    assert selected == {"/blog/", "/blog/wifi-security/"}


def test_unrelated_file_change_selects_nothing():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(
        ["README.md", "GBP_PHOTO_UPLOAD_PLAN.md", "tools/generate_capability_statement_pdf.py"],
        sitemap_paths,
    )
    assert selected == set()


def test_pdf_asset_change_maps_directly():
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    selected = map_changed_files_to_paths(
        ["assets/docs/nova-titan-systems-capability-statement-2026.pdf"],
        sitemap_paths,
    )
    assert selected == {
        "/assets/docs/nova-titan-systems-capability-statement-2026.pdf"
    }


def test_denylist_blocks_suppressed_case_studies_even_if_leaked():
    # Defense-in-depth: even if a future bug put these in the "selected" set
    # directly (bypassing sitemap membership), the denylist must strip them.
    leaked = {
        "/case-studies/amazon-security/",
        "/case-studies/va-healthcare/",
        "/case-studies/dyess-afb/",
        "/thank-you/",
        "/apply-tech/",
        "/case-studies/7brew-multi-site/",  # legitimate, must survive
    }
    cleaned = apply_denylist(leaked)
    assert cleaned == {"/case-studies/7brew-multi-site/"}


def test_select_paths_to_submit_never_exceeds_sitemap_membership():
    # Even a global template change must never select a path that is not
    # actually in the sitemap (i.e. selection is bounded by ground truth).
    selected = select_paths_to_submit(["_config.yml"], SAMPLE_SITEMAP_URLS)
    sitemap_paths = sitemap_paths_from_urls(SAMPLE_SITEMAP_URLS)
    assert selected <= sitemap_paths
    assert selected == sitemap_paths  # global change -> full (small) sitemap


def test_select_paths_to_submit_suppressed_case_study_never_selected_even_if_in_sitemap():
    # Simulate a hypothetical sitemap regression where a suppressed study
    # leaked into sitemap.xml. The denylist must still block it end-to-end.
    poisoned_sitemap = SAMPLE_SITEMAP_URLS + [
        "https://novatitan.net/case-studies/amazon-security/"
    ]
    selected = select_paths_to_submit(["_data/case_studies.yml"], poisoned_sitemap)
    assert "/case-studies/amazon-security/" not in selected


def test_select_paths_to_submit_no_change_selects_nothing():
    selected = select_paths_to_submit(["README.md"], SAMPLE_SITEMAP_URLS)
    assert selected == set()


def test_select_paths_to_submit_key_file_never_selected_even_if_sitemap_leaks_it():
    # Defense-in-depth (PR #59 review follow-up, 2026-08): the PRIMARY control
    # keeping the IndexNow key file out of submissions is _config.yml's
    # `sitemap: false` scoped to it, which should keep it out of
    # sitemap.xml entirely (asserted separately in .github/workflows/
    # seo-qa.yml's "IndexNow — key file hygiene" step). This test proves the
    # SECONDARY control: even in the adversarial case of a future
    # sitemap-generation regression that leaked the key URL into
    # sitemap.xml, and even a global template/config change that would
    # otherwise resubmit the full sitemap, the denylist in
    # DENYLIST_PATH_SUBSTRINGS still strips the key URL end-to-end -- the
    # same pattern already relied on for the suppressed case studies.
    key_path = "/0241145aa37aab753ad44f042523ea8b.txt"
    key_url = "https://novatitan.net" + key_path
    poisoned_sitemap = SAMPLE_SITEMAP_URLS + [key_url]

    # An unrelated change must never select the (poisoned) key URL.
    selected = select_paths_to_submit(["services/index.html"], poisoned_sitemap)
    assert key_path not in selected

    # Even a global template/config change (which would otherwise resubmit
    # the full sitemap, including the leaked key URL) must still have the
    # key URL stripped by the denylist before submission.
    selected_global = select_paths_to_submit(["_config.yml"], poisoned_sitemap)
    assert key_path not in selected_global


def test_paths_to_absolute_urls():
    urls = paths_to_absolute_urls({"/quote/", "/about/"}, "https://novatitan.net")
    assert urls == ["https://novatitan.net/about/", "https://novatitan.net/quote/"]


def test_paths_to_absolute_urls_strips_trailing_slash_on_base():
    urls = paths_to_absolute_urls({"/"}, "https://novatitan.net/")
    assert urls == ["https://novatitan.net/"]


# --- key file validation -----------------------------------------------

def test_valid_key_file():
    key = "0241145aa37aab753ad44f042523ea8b"
    assert validate_key_file(f"{key}.txt", key) == []


def test_valid_key_file_trailing_newline_tolerated():
    key = "0241145aa37aab753ad44f042523ea8b"
    assert validate_key_file(f"{key}.txt", key + "\n") == []


def test_key_file_content_mismatch_flagged():
    problems = validate_key_file("abcdefgh12345678.txt", "not-the-key-value")
    assert problems


def test_key_filename_too_short_flagged():
    problems = validate_key_file("short.txt", "short")
    assert problems


def test_key_filename_bad_chars_flagged():
    problems = validate_key_file("has_underscore_key12345.txt", "has_underscore_key12345")
    assert problems


def test_actual_repo_key_file_is_valid():
    """Sanity check against the real committed key file, so a future rename
    or content edit that breaks the spec fails CI immediately.
    """
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    key = "0241145aa37aab753ad44f042523ea8b"
    filename = f"{key}.txt"
    path = os.path.join(repo_root, filename)
    assert os.path.exists(path), f"expected IndexNow key file at {path}"
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()
    assert validate_key_file(filename, content) == []


if __name__ == "__main__":
    import pytest

    sys.exit(pytest.main([__file__, "-v"]))
