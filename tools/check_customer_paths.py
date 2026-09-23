#!/usr/bin/env python3
"""Check the generated customer journey without making requests or submitting forms."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import sys

site = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
origin = 'https://novatitan.net'
errors = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.tags, self.ids, self.refs = path, [], set(), []
        self.feed(path.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'a' and a.get('href'): self.refs.append(a['href'])
        if tag in ('img', 'script', 'iframe') and a.get('src'): self.refs.append(a['src'])
        if tag == 'link' and a.get('rel') == 'stylesheet': self.refs.append(a.get('href', ''))
        if tag in ('source', 'img') and a.get('srcset'):
            self.refs.extend(part.strip().split()[0] for part in a['srcset'].split(','))

pages = {p.resolve(): Page(p) for p in site.rglob('*.html')}
content = {p: doc for p, doc in pages.items() if any(t == 'h1' for t, _ in doc.tags)}
if len(content) < 30: errors.append('Expected a complete production build, not an empty/partial site.')
checked = 0
for path, doc in content.items():
    relative = path.relative_to(site).as_posix()
    for ref in doc.refs:
        url = urlsplit(urljoin(origin + '/' + relative, ref))
        if url.scheme not in ('http', 'https') or url.netloc != 'novatitan.net': continue
        target = site / unquote(url.path).lstrip('/')
        if target.is_dir(): target /= 'index.html'
        target = target.resolve()
        if not target.is_relative_to(site) or not target.is_file():
            errors.append(f'{relative}: missing local target {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{relative}: missing fragment {ref}')
        checked += 1
    if any(t == 'nav' and a.get('aria-label') == 'Main navigation' for t, a in doc.tags):
        if not any(t == 'a' and a.get('href') == '#content' and 'skip-link' in a.get('class', '') for t, a in doc.tags):
            errors.append(f'{relative}: keyboard skip link missing')
        if not any(t == 'main' and a.get('id') == 'content' and a.get('tabindex') == '-1' for t, a in doc.tags):
            errors.append(f'{relative}: skip destination must receive focus')
        if any(a.get('role') in ('menu', 'menubar', 'menuitem') for _, a in doc.tags):
            errors.append(f'{relative}: application menu semantics on site navigation')

for route in ('quote', 'contact'):
    doc = pages.get((site / route / 'index.html').resolve())
    if not doc:
        errors.append(f'{route}: route missing')
        continue
    refs = doc.refs
    if not any(r.startswith('tel:+18063700624') for r in refs): errors.append(f'{route}: phone fallback missing')
    if not any(r.startswith('mailto:') for r in refs): errors.append(f'{route}: email fallback missing')
    direct = next((i for i, (t, a) in enumerate(doc.tags) if t == 'a' and a.get('href', '').startswith('https://tally.so/r/Y5MMAN')), None)
    embed = next((i for i, (t, a) in enumerate(doc.tags) if t == 'iframe' and 'Y5MMAN' in a.get('data-tally-src', '')), None)
    if direct is None or embed is None or direct > embed:
        errors.append(f'{route}: working direct-form alternative must precede embed')
if not (site / 'thank-you/index.html').is_file(): errors.append('Confirmation page missing')
if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print(f'PASS: {len(content)} content pages, {checked} local destinations, customer contact alternatives and keyboard entry points.')
