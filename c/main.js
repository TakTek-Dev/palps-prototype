// «الحبر»: menu drawer + photo scroller arrows. Vanilla, no dependencies.
(function () {
  var drawer = document.getElementById('drawer');
  if (drawer) {
    var openers = document.querySelectorAll('[data-open-menu],[data-open-search]');
    var lastFocus = null;

    function setExpanded(v) {
      openers.forEach(function (b) { b.setAttribute('aria-expanded', v ? 'true' : 'false'); });
    }
    function open(focusSearch) {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      setExpanded(true);
      var target = focusSearch ? drawer.querySelector('input[type=search]') : drawer.querySelector('.drawer__close');
      setTimeout(function () { if (target) target.focus(); }, 60);
    }
    function close() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      setExpanded(false);
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll('[data-open-menu]').forEach(function (b) { b.addEventListener('click', function () { open(false); }); });
    document.querySelectorAll('[data-open-search]').forEach(function (b) { b.addEventListener('click', function () { open(true); }); });
    drawer.querySelectorAll('[data-close-menu]').forEach(function (b) { b.addEventListener('click', close); });
    drawer.querySelectorAll('.drawer__nav a').forEach(function (a) { a.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        var f = drawer.querySelectorAll('.drawer__panel a, .drawer__panel button, .drawer__panel input');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // Photo scroller. The page is RTL, so "next" moves the strip toward the left.
  document.querySelectorAll('[data-scroller-nav]').forEach(function (nav) {
    var track = document.getElementById(nav.getAttribute('data-scroller-nav'));
    if (!track) return;
    var prev = nav.querySelector('[data-dir=prev]');
    var next = nav.querySelector('[data-dir=next]');

    function step() {
      var card = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
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
})();
