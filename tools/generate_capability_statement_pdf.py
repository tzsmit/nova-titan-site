#!/usr/bin/env python3
"""
Generate the Nova Titan Systems capability-statement PDF from the canonical
HTML source, then copy the exact same PDF bytes to all four public alias
paths so they remain byte-identical (required by .github/workflows/seo-qa.yml
gates #9 / #9b / #9c).

Usage:
    python3 tools/generate_capability_statement_pdf.py

DO NOT regenerate each alias independently -- always generate once from the
canonical source and copy bytes. Independent regeneration runs can introduce
different internal PDF metadata/timestamps even from identical HTML input,
which breaks the byte-identical invariant.
"""
import hashlib
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

SOURCE_HTML = REPO_ROOT / "assets/docs/source/nova-titan-systems-capability-statement-2026.html"

# The first path is generated directly from source; the rest are byte-identical
# copies of it.
CANONICAL_OUTPUT = REPO_ROOT / "assets/docs/nova-titan-systems-capability-statement-2026.pdf"

ALIAS_PATHS = [
    REPO_ROOT / "assets/capability-statement/novatitan-capability-statement.pdf",
    REPO_ROOT / "assets/docs/nova-titan-systems-capability-statement-hubzone-2026.pdf",
    REPO_ROOT / "assets/docs/nova-titan-systems-federal-capability-statement.pdf",
]

ALL_PUBLIC_PATHS = [CANONICAL_OUTPUT] + ALIAS_PATHS


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    h.update(path.read_bytes())
    return h.hexdigest()


def main() -> int:
    if not SOURCE_HTML.exists():
        print(f"ERROR: canonical source not found: {SOURCE_HTML}", file=sys.stderr)
        return 1

    try:
        from weasyprint import HTML
    except ImportError:
        print("ERROR: weasyprint is required. Install with: pip3 install weasyprint", file=sys.stderr)
        return 1

    print(f"Generating PDF from canonical source: {SOURCE_HTML}")
    HTML(filename=str(SOURCE_HTML)).write_pdf(str(CANONICAL_OUTPUT))
    print(f"  -> wrote {CANONICAL_OUTPUT}")

    canonical_bytes = CANONICAL_OUTPUT.read_bytes()
    if not canonical_bytes.startswith(b"%PDF"):
        print("ERROR: generated file does not start with %PDF magic bytes", file=sys.stderr)
        return 1

    for alias in ALIAS_PATHS:
        alias.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(CANONICAL_OUTPUT, alias)
        print(f"  -> copied identical bytes to {alias}")

    print("\nSHA-256 of all four public PDFs:")
    hashes = set()
    for p in ALL_PUBLIC_PATHS:
        digest = sha256_of(p)
        hashes.add(digest)
        print(f"  {digest}  {p.relative_to(REPO_ROOT)}")

    if len(hashes) != 1:
        print("\nERROR: PDFs are NOT byte-identical!", file=sys.stderr)
        return 1

    print("\nOK: all four public PDFs are byte-identical.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
