// «الحبر»: palette preview (prototype only), search bar, phone drawer, video scroller arrows. Vanilla.
(function () {
  var PALS = ['burgundy', 'charcoal', 'navy'];
  var root = document.documentElement;

  function readPal() {
    var m = /[?&]c=([a-z]+)/.exec(location.search);
    return m && PALS.indexOf(m[1]) > -1 ? m[1] : 'burgundy';
  }
  function applyPal(p) {
    PALS.forEach(function (x) { root.classList.remove('pal-' + x); });
    root.classList.add('pal-' + p);
  }
  // runs in <head>, before first paint, so there is no flash of the wrong colour
  applyPal(readPal());

  document.addEventListener('DOMContentLoaded', function () {
    var pal = readPal();
    var theme = document.querySelector('meta[name=theme-color]');
    var brandHex = { burgundy: '#7A0F1E', charcoal: '#1A1A1A', navy: '#0F2A47' };

    function setPal(p, push) {
      pal = p;
      applyPal(p);
      if (theme) theme.setAttribute('content', brandHex[p]);
      document.querySelectorAll('[data-pal]').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-pal') === p ? 'true' : 'false');
      });
      // keep the choice on links between the homepage and the identity book
      document.querySelectorAll('a[href^="home.html"], a[href^="index.html"]').forEach(function (a) {
        var base = a.getAttribute('href').replace(/\?c=[a-z]+/, '');
        var hash = '';
        var i = base.indexOf('#');
        if (i > -1) { hash = base.slice(i); base = base.slice(0, i); }
        a.setAttribute('href', base + (p === 'burgundy' ? '' : '?c=' + p) + hash);
      });
      if (push) {
        var url = new URL(location.href);
        if (p === 'burgundy') url.searchParams.delete('c'); else url.searchParams.set('c', p);
        history.replaceState(null, '', url);
      }
    }
    setPal(pal, false);
    document.querySelectorAll('[data-pal]').forEach(function (b) {
      b.addEventListener('click', function () { setPal(b.getAttribute('data-pal'), true); });
    });

    // search bar under the nav bar
    var sbtn = document.querySelector('[data-search-toggle]');
    var sbar = document.getElementById('searchbar');
    if (sbtn && sbar) {
      sbtn.addEventListener('click', function () {
        var open = sbar.hidden;
        sbar.hidden = !open;
        sbtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) sbar.querySelector('input').focus();
      });
      sbar.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { sbar.hidden = true; sbtn.setAttribute('aria-expanded', 'false'); sbtn.focus(); }
      });
    }

    // phone drawer
    var drawer = document.getElementById('drawer');
    if (drawer) {
      var opener = document.querySelector('[data-open-menu]');
      var lastFocus = null;
      var open = function () {
        lastFocus = document.activeElement;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
        if (opener) opener.setAttribute('aria-expanded', 'true');
        setTimeout(function () { var c = drawer.querySelector('.drawer__close'); if (c) c.focus(); }, 60);
      };
      var close = function () {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
        if (opener) opener.setAttribute('aria-expanded', 'false');
        if (lastFocus) lastFocus.focus();
      };
      if (opener) opener.addEventListener('click', open);
      drawer.querySelectorAll('[data-close-menu]').forEach(function (b) { b.addEventListener('click', close); });
      drawer.querySelectorAll('.drawer__nav a').forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) {
        if (!drawer.classList.contains('is-open')) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') {
          var f = drawer.querySelectorAll('.drawer__panel a, .drawer__panel button');
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }

    // scroller arrows. The page is RTL, so "next" moves the strip toward the left.
    document.querySelectorAll('[data-scroller-nav]').forEach(function (nav) {
      var track = document.getElementById(nav.getAttribute('data-scroller-nav'));
      if (!track) return;
      var prev = nav.querySelector('[data-dir=prev]');
      var next = nav.querySelector('[data-dir=next]');
      function step() {
        var card = track.firstElementChild;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        var one = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
        return Math.max(one, Math.floor(track.clientWidth / one) * one - one);
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth;
        var pos = Math.abs(track.scrollLeft);
        prev.disabled = pos < 4;
        next.disabled = pos > max - 4;
      }
      prev.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  });
})();
