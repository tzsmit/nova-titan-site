#!/usr/bin/env python3
"""Guard company-only public identity in the complete built site and downloads."""
import hashlib
import html
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote
from pypdf import PdfReader

root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site')
errors = []
# Hashes avoid re-publishing the removed identifying strings in a public test.
private_tokens = {
    '59620bc1adea3f9241a9f5371b7bd51c2c95d116787f5eb2a484f80f514a6b4e',
    '452f6af46a132a94e59c0bd935a46a64aefa09736dfb44c74d854861ecf8cb89',
}
texts = 0
def inspect(text, path):
    decoded = html.unescape(unquote(text)).casefold()
    tokens = set(re.findall(r'[a-z0-9]+', decoded))
    if any(hashlib.sha256(t.encode()).hexdigest() in private_tokens for t in tokens):
        errors.append(f'{path}: personal identifier')
    for email in re.findall(r'[a-z0-9._+-]+@novatitan\.net', decoded):
        if email not in {'info@novatitan.net', 'security@novatitan.net', 'partners@novatitan.net'}:
            errors.append(f'{path}: non-role company email')

for path in root.rglob('*'):
    if not path.is_file(): continue
    if path.suffix.lower() in {'.html', '.xml', '.json', '.txt', '.js', '.css', '.svg'}:
        raw = path.read_text(encoding='utf-8')
        texts += 1
        inspect(raw, path)
        if path.suffix == '.html':
            for block in re.findall(r'<script[^>]*type=[\"\']application/ld\+json[\"\'][^>]*>(.*?)</script>', raw, re.S):
                data = json.loads(block)
                def walk(node):
                    if isinstance(node, dict):
                        if 'founder' in node: errors.append(f'{path}: founder graph')
                        if node.get('@type') == 'BlogPosting':
                            author = node.get('author', {})
                            if author.get('@type') != 'Organization': errors.append(f'{path}: personal post author')
                        for value in node.values(): walk(value)
                    elif isinstance(node, list):
                        for value in node: walk(value)
                walk(data)
    elif path.suffix.lower() == '.pdf':
        doc = PdfReader(path)
        inspect(str(doc.metadata) + '\n'.join(p.extract_text() or '' for p in doc.pages), path)
        for page in doc.pages:
            for ref in page.get('/Annots', []):
                inspect(str(ref.get_object()), path)

pdfs = list(root.rglob('*capability-statement*.pdf'))
if len(pdfs) != 4: errors.append('Expected four public capability-statement aliases')
if len({hashlib.sha256(p.read_bytes()).hexdigest() for p in pdfs}) != 1:
    errors.append('Capability aliases differ')
if len(list(root.rglob('*.html'))) < 30: errors.append('Complete site build required')
if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print(f'PASS: company-only identity across {texts} text assets and {len(pdfs)} matching public PDFs.')
