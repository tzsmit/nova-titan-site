#!/usr/bin/env python3
"""Built-page structural checks; not a WCAG conformance certification."""
from pathlib import Path
from html.parser import HTMLParser
import sys

root=Path(sys.argv[1] if len(sys.argv)>1 else '_site')
errors=[]
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.tags=[];self.feed(text)
    def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))

pages=[]
for path in root.rglob('*.html'):
    p=Page(path.read_text(encoding='utf-8'))
    if not any(t=='h1' for t,a in p.tags):continue
    if not any(t=='nav' and a.get('aria-label')=='Main navigation' for t,a in p.tags):continue
    pages.append(path)
    links=[a.get('href') for t,a in p.tags if t=='a']
    styles=[a.get('href') for t,a in p.tags if t=='link' and a.get('rel')=='stylesheet']
    for href in ['#content','/accessibility/']:
        if href not in links:errors.append(f'{path}: missing {href}')
    if '/assets/css/accessibility.css' not in styles:errors.append(f'{path}: keyboard/motion stylesheet not loaded')
    for t,a in p.tags:
        if t=='img' and 'alt' not in a:errors.append(f'{path}: image missing alt: {a.get("src")}')
        if t=='iframe' and not a.get('title','').strip():errors.append(f'{path}: iframe missing title')
        if a.get('tabindex','').isdigit() and int(a['tabindex'])>0:errors.append(f'{path}: positive tabindex changes navigation order')
for route in ['privacy','terms','refunds','accessibility']:
    p=root/route/'index.html'
    if p not in pages:errors.append(f'{route}: shared accessible layout missing')
if len(pages)<30:errors.append('Incomplete site build')
if errors:print('\n'.join(errors));sys.exit(1)
print(f'PASS: structural accessibility checks on {len(pages)} content pages. Manual keyboard, contrast, zoom, forms and assistive-technology review still required.')
