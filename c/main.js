// «الحبر»: today's date, search bar, phone drawer, video scroller arrows. Vanilla.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // today's date in the top bar (Gregorian, Latin digits, like the site's own dates)
    var today = document.querySelector('[data-today]');
    if (today && window.Intl) {
      var now = new Date();
      try {
        today.textContent = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
        today.setAttribute('datetime', now.toISOString().slice(0, 10));
      } catch (e) { /* keep the static date */ }
    }

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
