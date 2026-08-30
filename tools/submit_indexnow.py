#!/usr/bin/env python3
"""
Post-deploy IndexNow submission for novatitan.net (PR #59).

Intended invocation (see .github/workflows/indexnow.yml):
    python3 tools/submit_indexnow.py --before <sha> --after <sha>

Behavior contract (per the PR #59 brief, §6/§24 -- non-negotiable):
    * This script must NEVER cause the site deployment itself to fail.
      It only ever runs in a SEPARATE, POST-deploy job/workflow, and that
      workflow step is itself marked `continue-on-error: true` at the
      GitHub Actions level as a second layer of protection. Within the
      script, all network/HTTP failures are caught and logged, and the
      script exits 0 in every case except a genuine local misconfiguration
      it cannot safely proceed from (e.g. the key file is missing).
    * It only ever submits URLs that are members of the already-hard-gated
      built sitemap.xml (see tools/indexnow_lib.py for the full guarantee
      chain). It never submits amazon-security / va-healthcare / dyess-afb
      / thank-you / apply-tech under any circumstance.
    * It uses the official batch endpoint (POST https://api.indexnow.org/indexnow)
      with the documented JSON body {host, key, keyLocation, urlList}.
    * If there is nothing eligible to submit, it exits 0 and logs "nothing
      to submit" -- it does NOT resubmit the full sitemap on every commit
      (IndexNow's own operator guidance explicitly warns against that).
"""
from __future__ import annotations

import argparse
import glob
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from indexnow_lib import (  # noqa: E402
    paths_to_absolute_urls,
    select_paths_to_submit,
    validate_key_file,
)

HOST = "novatitan.net"
BASE_URL = f"https://{HOST}"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
SITE_DIR = "_site"
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def log(msg: str) -> None:
    print(f"[indexnow] {msg}", flush=True)


def find_key_file() -> tuple[str, str] | None:
    """Locate the single {key}.txt verification file at the repo root.
    Returns (key, filename) or None if not found / ambiguous.
    """
    candidates = [
        os.path.basename(p)
        for p in glob.glob(os.path.join(REPO_ROOT, "*.txt"))
        if re.match(r"^[a-zA-Z0-9-]{8,128}\.txt$", os.path.basename(p))
        and os.path.basename(p) not in ("robots.txt", "humans.txt", "security.txt")
    ]
    if len(candidates) != 1:
        log(
            f"ERROR: expected exactly one IndexNow key file at repo root, "
            f"found {candidates}"
        )
        return None

    filename = candidates[0]
    path = os.path.join(REPO_ROOT, filename)
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()

    problems = validate_key_file(filename, content)
    if problems:
        for p in problems:
            log(f"ERROR: invalid key file -- {p}")
        return None

    key = filename[: -len(".txt")]
    return key, filename


def get_changed_files(before: str, after: str) -> list[str]:
    if not before or before == "0000000000000000000000000000000000000000":
        # First push / no meaningful base to diff against: treat as a
        # global change so nothing is silently missed. This is the same
        # officially-justified "full (small) sitemap resubmission" path
        # used for template/config changes.
        log("no usable 'before' SHA (new branch or first push); treating as full")
        return ["_config.yml"]
    try:
        out = subprocess.run(
            ["git", "diff", "--name-only", before, after],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        return [line.strip() for line in out.stdout.splitlines() if line.strip()]
    except subprocess.CalledProcessError as e:
        log(f"WARNING: git diff failed ({e}); treating as full")
        return ["_config.yml"]


def get_sitemap_urls() -> list[str]:
    path = os.path.join(REPO_ROOT, SITE_DIR, "sitemap.xml")
    if not os.path.exists(path):
        log(f"ERROR: {path} not found -- was the site built before running this?")
        return []
    with open(path, "r", encoding="utf-8") as fh:
        xml = fh.read()
    return re.findall(r"<loc>(.*?)</loc>", xml)


def submit_batch(key: str, key_filename: str, urls: list[str]) -> bool:
    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": f"{BASE_URL}/{key_filename}",
        "urlList": urls,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            log(f"submitted {len(urls)} URL(s); response status {resp.status}")
            return True
    except urllib.error.HTTPError as e:
        # Documented IndexNow response codes: 200 OK, 202 Accepted,
        # 400 Bad request, 403 Forbidden (key invalid/mismatched),
        # 422 Unprocessable (host mismatch / not verified),
        # 429 Too Many Requests.
        body = e.read().decode("utf-8", errors="ignore") if e.fp else ""
        log(f"WARNING: IndexNow HTTP {e.code}: {body[:500]}")
        return False
    except urllib.error.URLError as e:
        log(f"WARNING: IndexNow network error: {e}")
        return False


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--before", default=os.environ.get("INDEXNOW_BEFORE_SHA", ""))
    parser.add_argument("--after", default=os.environ.get("INDEXNOW_AFTER_SHA", ""))
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be submitted without calling IndexNow.",
    )
    args = parser.parse_args()

    key_info = find_key_file()
    if key_info is None:
        # Local misconfiguration (key file missing/invalid). This is the
        # ONE case allowed to exit non-zero, and even then only within this
        # standalone post-deploy job -- never inside the deploy itself.
        return 1
    key, key_filename = key_info

    sitemap_urls = get_sitemap_urls()
    if not sitemap_urls:
        log("no sitemap URLs available; nothing to do. Exiting cleanly.")
        return 0

    changed_files = get_changed_files(args.before, args.after)
    log(f"changed files ({len(changed_files)}): {changed_files[:20]}")

    paths = select_paths_to_submit(changed_files, sitemap_urls)
    if not paths:
        log("no eligible URLs changed; nothing to submit. Exiting cleanly.")
        return 0

    urls = paths_to_absolute_urls(paths, BASE_URL)
    log(f"eligible URLs to submit ({len(urls)}): {urls}")

    if args.dry_run:
        log("dry-run mode; not calling IndexNow.")
        return 0

    ok = submit_batch(key, key_filename, urls)
    if not ok:
        log("IndexNow submission failed/degraded -- exiting 0 by design "
            "(this must never fail the calling workflow or deployment).")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:  # noqa: BLE001 -- last-resort safety net
        log(f"UNEXPECTED ERROR (swallowed by design): {e}")
        sys.exit(0)
