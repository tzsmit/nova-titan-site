#!/usr/bin/env python3
"""
Count interactive surfaces in the BUILT site (_site) and classify each one with
the SAME branch order the delegated tracker in _includes/head.html uses.

The tracker is a single delegated click listener with an if/else-if cascade, so
every anchor resolves to AT MOST ONE event. Counting anchors with independent
greps (the method that produced the earlier "163") double-counts nothing here,
but it also silently mixed two different intent tiers together. This script
keeps them separate.

Branch order in head.html (must stay in sync):
  1. href starts with 'tel:'                -> phone_call_click
  2. href contains 'calendly.com'           -> schedule_click
  3. href starts with 'mailto:'             -> email_lead_click | email_click
  4. href matches /\\.pdf($|\\?)/i           -> file_download
  5. href==='/quote/' | startswith('/quote/') | contains 'tally.so'
                                            -> quote_request_click
  6. href === '/contact/'                   -> contact_page_click
  7. otherwise                              -> untracked

It ALSO reports "near misses": anchors that clearly express quote or contact
intent but whose href shape does not satisfy the tracker's branch condition
(e.g. an absolute https://novatitan.net/quote/ URL, which fails both
`=== '/quote/'` and `startswith('/quote/')`). Those are genuinely still
unmeasured and must not be counted as tracked.
"""
import glob
import os
import re
import sys
import json
from collections import Counter, defaultdict

SITE = '_site'

ANCHOR = re.compile(r'<a\b[^>]*>', re.I)
HREF = re.compile(r'href\s*=\s*"([^"]*)"', re.I)
LEAD_SUBJ = re.compile(r'(sub-?list|rfq|quote|bid|project|partner)', re.I)


def is_redirect_or_noindex(html):
    """Same exemption predicate family used by the CI H1 gate."""
    if 'http-equiv="refresh"' in html:
        return True
    if re.search(r'<script>\s*location\s*=', html):
        return True
    if re.search(r'name="robots"[^>]*content="[^"]*noindex', html):
        return True
    return False


def classify(href):
    """EXACT mirror of the head.html cascade. No normalisation, no cleverness --
    it must reproduce the tracker's real behaviour, including its blind spots."""
    h = href  # tracker uses getAttribute('href') verbatim, no trim
    if h.startswith('tel:'):
        return 'phone_call_click'
    if 'calendly.com' in h:
        return 'schedule_click'
    if h.startswith('mailto:'):
        isLead = ('subject=' in h.lower()) and bool(LEAD_SUBJ.search(h))
        return 'email_lead_click' if isLead else 'email_click'
    if re.search(r'\.pdf(\?|$)', h, re.I):
        return 'file_download'
    if h == '/quote/' or h.startswith('/quote/') or 'tally.so' in h:
        return 'quote_request_click'
    if h == '/contact/':
        return 'contact_page_click'
    return 'untracked'


def near_miss(href, ev):
    """Intent-bearing anchors the tracker's branch shapes do NOT catch."""
    if ev != 'untracked':
        return None
    if '/quote' in href:
        return 'quote-intent-not-matched'
    if '/contact' in href:
        return 'contact-intent-not-matched'
    if 'tel:' in href or 'mailto:' in href:
        return 'contact-scheme-not-at-start'
    return None


def main():
    if not os.path.isdir(SITE):
        sys.exit('_site missing - run a build first')

    per_event = Counter()
    per_event_content = Counter()
    pages_with = defaultdict(set)
    misses = Counter()
    miss_examples = defaultdict(set)
    total_anchors = 0
    content_pages = 0
    noncontent_pages = 0

    for path in sorted(glob.glob(SITE + '/**/*.html', recursive=True)):
        html = open(path, encoding='utf-8', errors='ignore').read()
        content = not is_redirect_or_noindex(path and html)
        if content:
            content_pages += 1
        else:
            noncontent_pages += 1

        rel = '/' + os.path.relpath(path, SITE)
        for tag in ANCHOR.findall(html):
            m = HREF.search(tag)
            if not m:
                continue
            total_anchors += 1
            href = m.group(1)
            ev = classify(href)
            per_event[ev] += 1
            if content:
                per_event_content[ev] += 1
            if ev != 'untracked':
                pages_with[ev].add(rel)
            nm = near_miss(href, ev)
            if nm:
                scope = 'content' if content else 'redirect/noindex'
                misses[f'{nm} [{scope}]'] += 1
                if len(miss_examples[f'{nm} [{scope}]']) < 6:
                    miss_examples[f'{nm} [{scope}]'].add(f'{href}  on {rel}')

    DIRECT = ['phone_call_click', 'schedule_click',
              'email_lead_click', 'email_click', 'file_download']
    NAV = ['quote_request_click', 'contact_page_click']

    def block(title, counter):
        print(f'\n== {title} ==')
        direct = sum(counter[k] for k in DIRECT)
        nav = sum(counter[k] for k in NAV)
        for k in DIRECT + NAV:
            print(f'  {k:24s} {counter[k]:5d}')
        print(f'  {"-"*30}')
        print(f'  {"DIRECT conversion":24s} {direct:5d}')
        print(f'  {"NAVIGATION intent":24s} {nav:5d}')
        print(f'  {"TRACKED total":24s} {direct+nav:5d}')
        print(f'  {"untracked (nav/chrome)":24s} {counter["untracked"]:5d}')
        return direct, nav

    print(f'html files              {content_pages + noncontent_pages}')
    print(f'content pages           {content_pages}')
    print(f'redirect/noindex pages  {noncontent_pages}')
    print(f'total anchors           {total_anchors}')

    block('ALL BUILT HTML', per_event)
    block('CANONICAL INDEXABLE CONTENT PAGES ONLY', per_event_content)

    print('\n== distinct pages carrying each surface (all HTML) ==')
    for k in DIRECT + NAV:
        print(f'  {k:24s} {len(pages_with[k]):5d} pages')

    print('\n== NEAR MISSES (intent present, tracker branch does NOT fire) ==')
    if not misses:
        print('  none')
    for k, v in sorted(misses.items()):
        print(f'  {k:32s} {v:5d}')
        for ex in sorted(miss_examples[k]):
            print(f'      e.g. {ex}')

    json.dump({'all': dict(per_event), 'content': dict(per_event_content)},
              open('/tmp/surfaces.json', 'w'), indent=2)


if __name__ == '__main__':
    main()
