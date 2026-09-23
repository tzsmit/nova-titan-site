/* Preserve enquiry context without intercepting navigation or reading form answers. */
(function () {
  'use strict';
  var fields = ['origin_page', 'landing_page', 'traffic_source', 'service', 'market',
    'cta', 'utm_source', 'utm_medium', 'utm_campaign'];

  function clean(key, value) {
    if (typeof value !== 'string' || !value) { return ''; }
    if (key === 'origin_page' || key === 'landing_page') {
      return value.length <= 200 && /^\/[A-Za-z0-9_\-/]*$/.test(value) ? value : '';
    }
    return value.length <= 120 && /^[A-Za-z0-9_. -]+$/.test(value) ? value : '';
  }

  function target(href, page) {
    if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') { return null; }
    try {
      var url = new URL(href, page.href);
      if (url.username || url.password) { return null; }
      if (url.origin === page.origin && url.pathname === '/quote/') {
        return { url: url, direct: false };
      }
      if (url.origin === 'https://tally.so' && url.pathname === '/r/Y5MMAN') {
        return { url: url, direct: true };
      }
    } catch (e) {}
    return null;
  }

  // Only infer a service when the page's explicit quote links agree. A page
  // advertising several services must not silently pick one for a generic CTA.
  function pageDefaults(hrefs, pageHref) {
    var page = new URL(pageHref), candidates = { service: new Set(), market: new Set() };
    hrefs.forEach(function (href) {
      var link = target(href, page);
      if (!link || link.direct) { return; }
      Object.keys(candidates).forEach(function (key) {
        var value = clean(key, link.url.searchParams.get(key));
        if (value) { candidates[key].add(value); }
      });
    });
    var result = {};
    Object.keys(candidates).forEach(function (key) {
      if (candidates[key].size === 1) { result[key] = Array.from(candidates[key])[0]; }
    });
    return result;
  }

  function enrich(href, pageHref, hiddenQS, defaults, surface) {
    var page = new URL(pageHref), link = target(href, page);
    if (!link) { return href; }
    var context = new URLSearchParams(hiddenQS || ''), params = link.url.searchParams;
    var allowed = link.direct ? fields : ['origin_page', 'service', 'market', 'cta'];
    allowed.forEach(function (key) {
      // Explicit CTA/service values remain authoritative, including static fallback labels.
      if (params.has(key)) { return; }
      var value = context.get(key);
      if (key === 'origin_page') {
        value = link.direct ? (clean(key, value) || page.pathname) : page.pathname;
      } else if (key === 'service' || key === 'market') {
        value = clean(key, value) || defaults[key];
      } else if (key === 'cta') {
        value = surface + '_quote';
      }
      value = clean(key, value);
      if (value) { params.set(key, value); }
    });
    return link.direct ? link.url.href : link.url.pathname + link.url.search + link.url.hash;
  }

  function enhancePage() {
    var pageHref = window.location.href;
    var hrefs = Array.from(document.querySelectorAll('main a[href]')).map(function (a) {
      return a.getAttribute('href');
    });
    var defaults = pageDefaults(hrefs, pageHref);
    document.querySelectorAll('a[href]').forEach(function (a) {
      try {
        var surface = a.closest('nav') ? 'nav' : a.closest('footer') ? 'footer' : 'body';
        var href = a.getAttribute('href');
        var next = enrich(href, pageHref, window.NT_TALLY_HIDDEN_QS, defaults, surface);
        if (next !== href) { a.setAttribute('href', next); }
      } catch (e) { /* The original working link is the fallback. */ }
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { enrich: enrich, pageDefaults: pageDefaults };
  } else if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhancePage);
    } else { enhancePage(); }
  }
})();
