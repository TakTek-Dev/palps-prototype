// Phone menu (drawer) only.
(function () {
  var drawer = document.getElementById('drawer');
  var opener = document.querySelector('[data-menu-open]');
  if (!drawer || !opener) return;
  var closers = drawer.querySelectorAll('[data-menu-close]');
  var closeBtn = drawer.querySelector('button[data-menu-close]');
  var timer;

  function open() {
    clearTimeout(timer);
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    opener.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    drawer.classList.remove('is-open');
    opener.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    timer = setTimeout(function () { drawer.hidden = true; }, 260);
    opener.focus();
  }

  opener.addEventListener('click', open);
  closers.forEach(function (el) { el.addEventListener('click', close); });
  drawer.querySelectorAll('.drawer-nav a, .live-pill').forEach(function (a) { a.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) close(); });
})();
