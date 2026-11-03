// Phone menu only.
(function () {
  var btn = document.querySelector('.menu-btn');
  var panel = document.getElementById('menu-panel');
  var head = document.querySelector('.site-head');
  if (!btn || !panel || !head) return;

  function setHeadHeight() {
    document.documentElement.style.setProperty('--head-h', head.getBoundingClientRect().bottom + 'px');
  }

  function toggle(open) {
    setHeadHeight();
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    panel.setAttribute('aria-hidden', String(!open));
    if (open) {
      var field = panel.querySelector('input');
      if (field) field.focus({ preventScroll: true });
    }
  }

  btn.addEventListener('click', function () {
    toggle(btn.getAttribute('aria-expanded') !== 'true');
  });

  var searchBtn = document.querySelector('.search-btn');
  if (searchBtn) searchBtn.addEventListener('click', function () { toggle(true); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { toggle(false); btn.focus(); }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && btn.getAttribute('aria-expanded') === 'true') toggle(false);
  });
})();
