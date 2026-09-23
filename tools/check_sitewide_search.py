"""Check generated metadata, visible FAQ parity and actionable service intake."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import json,re

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=[]; self.feed(text)
    def handle_starttag(self, tag, attrs): self.tags.append((tag,dict(attrs)))

root=Path('_site'); checked=0
for path in root.rglob('*.html'):
    raw=path.read_text(encoding='utf8'); page=Page(raw)
    metas=[a for t,a in page.tags if t=='meta']
    if any(a.get('http-equiv','').lower()=='refresh' for a in metas): continue
    counts=Counter(a.get('property') or a.get('name') for a in metas)
    duplicates={k:v for k,v in counts.items() if k and k.startswith(('og:','twitter:')) and v>1}
    assert not duplicates,(str(path),duplicates)
    assert sum(t=='link' and a.get('rel')=='canonical' for t,a in page.tags)==1,path
    for block in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',raw,re.S):json.loads(block)
    checked+=1

raw=(root/'faqs/index.html').read_text(encoding='utf8')
schemas=[json.loads(s) for s in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',raw,re.S)]
faq=next(s for s in schemas if s.get('@type')=='FAQPage')
class Answers(HTMLParser):
    def __init__(self,text):
        super().__init__();self.in_details=False;self.text=[];self.feed(text)
    def handle_starttag(self,t,a):
        if t=='details':self.in_details=True
    def handle_endtag(self,t):
        if t=='details':self.in_details=False
    def handle_data(self,d):
        if self.in_details:self.text.append(d)
faq_content=re.search(r'<main\b[^>]*>(.*?)</main>',raw,re.S).group(1)
visible=' '.join(' '.join(Answers(faq_content).text).split())
for q in faq['mainEntity']:
    assert q['name'] in visible,q['name']
    assert q['acceptedAnswer']['text'] in visible,q['name']
assert len(faq['mainEntity'])==len(re.findall(r'<details\b',faq_content))
intake=json.loads(Path('_data/project_intake.json').read_text(encoding='utf8'))
for url in intake:
    raw=(root/url.lstrip('/')/'index.html').read_text(encoding='utf8')
    assert raw.count('id="project-intake-title"')==1,url
    assert '/quote/?cta=service_scope_inputs' in raw,url
config=Path('_config.yml').read_text(encoding='utf8')
for held_path in ['case-studies/brownwood-retail-network-system-set', 'assets/images/work/brownwood-retail']:
    if re.search(r'^\s+-\s+'+re.escape(held_path)+r'\s*$',config,re.M):
        assert not (root/held_path).exists(),held_path
print(f'{checked} content pages: unique metadata, one canonical and valid JSON-LD; {len(faq["mainEntity"])} FAQ answers match visible text; {len(intake)} service intake sections pass; configured publication exclusions honored.')
