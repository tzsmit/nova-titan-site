/** Progressive navigation enhancements. Native details work without this script. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.nav-container');
    if (!nav) return;
    var disclosures = Array.from(nav.querySelectorAll('details'));
    function close(detail, restoreFocus) {
      if (!detail.open) return;
      detail.open = false;
      if (restoreFocus) detail.querySelector('summary').focus();
    }
    disclosures.forEach(function (detail) {
      detail.addEventListener('toggle', function () {
        if (detail.open) disclosures.forEach(function (other) {
          if (other !== detail) close(other, false);
        });
      });
      detail.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && detail.open) {
          event.preventDefault();
          close(detail, true);
        }
      });
      detail.addEventListener('focusout', function (event) {
        if (!detail.contains(event.relatedTarget)) close(detail, false);
      });
      detail.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { close(detail, false); });
      });
    });
    document.addEventListener('click', function (event) {
      disclosures.forEach(function (detail) {
        if (!detail.contains(event.target)) close(detail, false);
      });
    });
    // A mobile menu must not reopen unexpectedly after a desktop resize.
    var desktop = window.matchMedia('(min-width: 1024px)');
    desktop.addEventListener('change', function () {
      disclosures.forEach(function (detail) { close(detail, false); });
    });
    function updateShadow() { nav.classList.toggle('shadow-2xl', window.scrollY > 50); }
    window.addEventListener('scroll', updateShadow, { passive: true });
    updateShadow();
    // Native hash navigation preserves focus/history and avoids forced smooth motion.
  });
})();
