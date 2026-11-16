// Network-free customer-journey regressions; do not create a real enquiry.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { enrich, pageDefaults } = require('../assets/js/quote-context.js');
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
const servicePage = 'https://novatitan.net/services/structured-cabling-lubbock-tx/';
const quotePage = 'https://novatitan.net/quote/?service=structured_cabling&market=lubbock';
const firstTouch = 'landing_page=%2Fservices%2Fstructured-cabling-lubbock-tx%2F&traffic_source=utm&utm_source=google&utm_medium=cpc&utm_campaign=lubbock';
const context = firstTouch + '&origin_page=%2Fservices%2Fstructured-cabling-lubbock-tx%2F&service=structured_cabling&market=lubbock&cta=cabling_hero';
function params(url) { return new URL(url, servicePage).searchParams; }
function landingContext(href) {
  const head = fs.readFileSync(path.join(__dirname, '../_includes/head.html'), 'utf8');
  const start = head.indexOf('function qp(name)');
  const end = head.indexOf('function sameOriginReferrerPath()', start);
  assert.ok(start >= 0 && end > start);
  return vm.runInNewContext(head.slice(start, end) + 'quoteParam;', {
    URLSearchParams, window: { location: new URL(href, servicePage) }
  });
}
test('direct fallback preserves first touch and service without replacing its CTA', () => {
  const p = params(enrich('https://tally.so/r/Y5MMAN?cta=quote_fallback', quotePage, context, {}, 'body'));
  assert.equal(p.get('utm_campaign'), 'lubbock');
  assert.equal(p.get('landing_page'), '/services/structured-cabling-lubbock-tx/');
  assert.equal(p.get('service'), 'structured_cabling');
  assert.equal(p.get('market'), 'lubbock');
  assert.equal(p.get('cta'), 'quote_fallback');
});
test('generic nav quote keeps the current service and originating page', () => {
  const href = enrich('/quote/', servicePage, firstTouch, {service:'structured_cabling', market:'lubbock'}, 'nav');
  assert.equal(new URL(href, servicePage).search, '');
  const contextValue = landingContext(href);
  assert.equal(contextValue('service'), 'structured_cabling');
  assert.equal(contextValue('origin_page'), new URL(servicePage).pathname);
  assert.equal(contextValue('cta'), 'nav_quote');
  assert.equal(contextValue('utm_source'), ''); // The session retains first-touch attribution.
});
test('explicit destination choices and hash are preserved', () => {
  const result = enrich('/quote/?service=fiber&market=dfw&cta=specific#form', servicePage, context, {}, 'nav');
  assert.equal(params(result).get('service'), 'fiber');
  assert.equal(params(result).get('market'), 'dfw');
  assert.equal(params(result).get('cta'), 'specific');
  assert.ok(result.endsWith('#form'));
});
test('context fragments preserve an explicit CTA and still work without session storage', () => {
  const href = '/quote/#nt-quote?cta=location_hero&service=low_voltage&market=lubbock';
  const result = enrich(href, servicePage, undefined, {service:'fiber', market:'dfw'}, 'nav');
  const contextValue = landingContext(result);
  assert.equal(contextValue('cta'), 'location_hero');
  assert.equal(contextValue('service'), 'low_voltage');
  assert.equal(contextValue('market'), 'lubbock');
  assert.equal(contextValue('origin_page'), new URL(servicePage).pathname);
  assert.equal(enrich(result, servicePage, undefined, {}, 'nav'), result);
});
test('existing shared links still work and ordinary anchors remain ordinary', () => {
  assert.equal(landingContext(quotePage)('service'), 'structured_cabling');
  assert.equal(landingContext('/quote/?service=fiber#nt-quote?service=wifi')('service'), 'fiber');
  assert.equal(landingContext('/quote/#form')('service'), '');
  assert.equal(landingContext('/contact/#nt-quote?service=fiber')('service'), '');
  assert.equal(enrich('/quote/#form', servicePage, context, {}, 'body'), '/quote/#form');
  assert.equal(enrich('/quote/', quotePage, context, {}, 'nav'), '/quote/');
});
test('only the approved form and same-origin quote route are changed', () => {
  for (const href of ['mailto:info@novatitan.net', 'tel:+18063700624', '/contact/', '/quote/other/',
    'https://example.org/quote/', 'https://tally.so/r/OTHER', 'https://tally.so.evil.test/r/Y5MMAN',
    'http://tally.so/r/Y5MMAN', 'https://user:password@tally.so/r/Y5MMAN']) {
    assert.equal(enrich(href, servicePage, context, {}, 'body'), href);
  }
});
test('does not propagate arbitrary customer fields or malformed attribution', () => {
  const p = params(enrich('https://tally.so/r/Y5MMAN', quotePage,
    'email=someone%40example.com&service=someone%40example.com&utm_campaign=someone%40example.com&landing_page=https%3A%2F%2Fexample.com%2F&origin_page=%2Fquote%2F%3Femail%3Dprivate', {}, 'body'));
  assert.equal(p.has('email'), false);
  assert.equal(p.has('service'), false);
  assert.equal(p.has('utm_campaign'), false);
  assert.equal(p.has('landing_page'), false);
  assert.equal(p.get('origin_page'), '/quote/');
});
test('missing analytics or storage does not disable the form link', () => {
  assert.equal(new URL(enrich('https://tally.so/r/Y5MMAN', quotePage, undefined, {}, 'body')).pathname, '/r/Y5MMAN');
});
test('quote-page skip links and same-page controls remain untouched', () => {
  for (const href of ['#content', '#form', '?step=2', '']) {
    assert.equal(enrich(href, quotePage, context, {}, 'body'), href);
  }
});
test('mixed-service page does not assign a guessed service', () => {
  const result = pageDefaults(['/quote/?service=fiber', '/quote/?service=wifi'], servicePage);
  assert.equal(result.service, undefined);
});
test('consistent explicit page links provide defaults', () => {
  assert.deepEqual(pageDefaults(['/quote/', '/quote/#nt-quote?service=structured_cabling&market=lubbock', '/quote/?service=structured_cabling'], servicePage),
    {service:'structured_cabling', market:'lubbock'});
});
test('repeated enhancement is idempotent', () => {
  const first = enrich('https://tally.so/r/Y5MMAN?cta=quote_fallback', quotePage, context, {}, 'body');
  assert.equal(enrich(first, quotePage, context, {}, 'body'), first);
});
console.log(`${count} quote-context cases passed; no network or form submission.`);
