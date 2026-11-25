/* Taylor Tree Care — vanilla JS
   header · menu · hedge trim (signature) · services explorer · work strip + lightbox · steps · form */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- hero entrance (once) ---------------- */
  requestAnimationFrame(function () { document.documentElement.classList.add('is-loaded'); });

  /* ---------------- header ---------------- */
  var header = $('[data-header]');
  var onScrollHeader = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  // active section in the nav
  var navLinks = $$('[data-nav]');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'work', 'how', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) secObs.observe(el); });
  }

  /* ---------------- mobile menu ---------------- */
  var menuBtn = $('[data-menu-btn]'), menu = $('[data-menu]');
  var setMenu = function (open) {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    $('[data-menu-icon]').setAttribute('d', open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h10');
    if (open) header.classList.add('is-scrolled'); else onScrollHeader();
  };
  menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });

  /* ---------------- the hedge trim ----------------
     Each hedge edge starts overgrown. A trimmer rides the orange string line and the
     growth above it drops away: on load in the hero, as you scroll for the rest. */
  var hedges = $$('[data-hedge]');
  var leafCols = ['#4D771D', '#9DB87A', '#26382A'];
  function clippings(h, p) {
    if (reduce || Math.random() > 0.55) return;
    var x = p * (h.offsetWidth + 40) - 30;
    if (x < 0 || x > h.offsetWidth) return;
    var c = document.createElement('span');
    c.className = 'clip';
    c.style.left = (x + Math.random() * 14 - 7) + 'px';
    c.style.top = (24 + Math.random() * 14) + 'px';
    c.style.setProperty('--clip', leafCols[(Math.random() * 3) | 0]);
    c.style.setProperty('--dx', (Math.random() * 30 - 8) + 'px');
    c.style.setProperty('--rot', (Math.random() * 300 - 150) + 'deg');
    h.appendChild(c);
    setTimeout(function () { c.remove(); }, 1200);
  }
  function setP(h, p) {
    p = Math.max(0, Math.min(1, p));
    if (h._p === p) return;
    var moving = h._p !== undefined && p > h._p;
    h._p = p;
    h.style.setProperty('--p', p.toFixed(4));
    h.classList.toggle('is-done', p >= 1);
    var t = h.querySelector('.hedge-trimmer');
    if (t) t.classList.toggle('buzz', moving && p < 1);
    if (moving) clippings(h, p);
    clearTimeout(h._stop);
    h._stop = setTimeout(function () { if (t) t.classList.remove('buzz'); }, 120);
  }

  if (reduce) {
    hedges.forEach(function (h) { setP(h, 1); });
  } else {
    // hero: cut once on load
    var heroHedge = $('[data-hedge="load"]');
    if (heroHedge) {
      setP(heroHedge, 0);
      var t0 = null, dur = 2300, delay = 700;
      var run = function (ts) {
        if (t0 === null) t0 = ts;
        var k = Math.max(0, (ts - t0 - delay) / dur);
        var e = k < 1 ? 1 - Math.pow(1 - k, 2.2) : 1;
        setP(heroHedge, e);
        if (k < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }
    // the rest: scrubbed by scroll, never un-cut
    var scrollHedges = $$('[data-hedge="scroll"]');
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      scrollHedges.forEach(function (h) {
        var r = h.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) { if (r.bottom < 0) setP(h, 1); return; }
        var p = (vh * 0.92 - r.top) / (vh * 0.5);
        setP(h, Math.max(h._p || 0, p));
      });
    };
    scrollHedges.forEach(function (h) { setP(h, 0); });
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------- headings: pull the string line taut when seen ---------------- */
  var lined = $$('[data-lined]');
  if (!reduce && 'IntersectionObserver' in window) {
    var lObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-pulled'); lObs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    lined.forEach(function (el) { lObs.observe(el); });
  }

  /* ---------------- services explorer ---------------- */
  var tabs = $$('[role="tab"]');
  var elev = $('[data-elev]'), elevLine = $('[data-elev-line]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (on) { panel.hidden = false; panel.classList.remove('is-in'); void panel.offsetWidth; panel.classList.add('is-in'); }
      else panel.hidden = true;
    });
    var key = tab.dataset.key;
    elev.classList.add('has-sel');
    $$('[data-part]', elev).forEach(function (g) { g.classList.toggle('is-sel', g.dataset.part === key); });
    elevLine.style.transform = 'translateY(' + tab.dataset.y + 'px)';
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });
  $$('[data-part]', elev).forEach(function (g) {
    g.addEventListener('click', function () { var t = tabs.filter(function (x) { return x.dataset.key === g.dataset.part; })[0]; if (t) selectTab(t); });
  });
  selectTab($('[aria-selected="true"]') || tabs[0]);

  // service buttons pre-fill the form
  $$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = $('#f-service'); var v = a.dataset.pick;
      $$('option', sel).forEach(function (o) { if (o.textContent === v) sel.value = v; });
    });
  });

  /* ---------------- work strip ---------------- */
  var track = $('[data-work-track]');
  var step = function (dir) { track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 640), behavior: reduce ? 'auto' : 'smooth' }); };
  var prev = $('[data-work-prev]'), next = $('[data-work-next]');
  if (prev) prev.addEventListener('click', function () { step(-1); });
  if (next) next.addEventListener('click', function () { step(1); });

  /* ---------------- lightbox ---------------- */
  var items = $$('[data-lb]');
  var lb = $('[data-lb-root]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]');
  var cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + items.length) % items.length;
    var img = items[cur].querySelector('img');
    lbImg.style.opacity = '0';
    var full = img.getAttribute('src').replace('-sm.webp', '.webp');
    var pre = new Image();
    pre.onload = pre.onerror = function () { lbImg.src = full; lbImg.alt = img.alt; lbImg.style.opacity = '1'; };
    pre.src = full;
    lbCap.textContent = items[cur].querySelector('.work-cap').textContent;
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; $('[data-lb-close]').focus(); }
  function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
  $('[data-lb-close]').addEventListener('click', close);
  $('[data-lb-prev]').addEventListener('click', function () { show(cur - 1); });
  $('[data-lb-next]').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'Tab') { // keep focus inside
      var f = $$('button', lb); var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return; var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1)); sx = null;
  });

  /* ---------------- steps: the line runs down to each peg ---------------- */
  var stepsLine = $('[data-steps-line]');
  if (stepsLine && !reduce && 'IntersectionObserver' in window) {
    stepsLine.style.transform = 'scaleY(0)';
    stepsLine.style.transition = 'transform 1.4s cubic-bezier(.2,.7,.2,1)';
    var pegs = $$('.step .peg');
    pegs.forEach(function (p) { p.style.transform = 'scale(.6)'; });
    var sObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      stepsLine.style.transform = 'scaleY(1)';
      pegs.forEach(function (p, i) { setTimeout(function () { p.style.transform = 'scale(1)'; }, 200 + i * 260); });
      sObs.disconnect();
    }, { threshold: 0.35 });
    sObs.observe($('[data-steps]'));
  }

  /* ---------------- form ---------------- */
  var form = $('[data-form]');
  function check(f) {
    var err = f.parentNode.querySelector('.err');
    var ok = f.checkValidity();
    if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value)) ok = false;
    f.classList.toggle('is-bad', !ok);
    f.classList.toggle('is-good', ok && !!f.value);
    f.setAttribute('aria-invalid', String(!ok));
    if (err) { err.hidden = ok; err.textContent = ok ? '' : f.dataset.msg; if (!err.id) err.id = f.id + '-err'; f.setAttribute('aria-describedby', err.id); }
    return ok;
  }
  var fields = $$('input.field, textarea.field', form);
  fields.forEach(function (f) {
    f.addEventListener('blur', function () { if (f.value || f.classList.contains('is-bad')) check(f); });
    f.addEventListener('input', function () { if (f.classList.contains('is-bad')) check(f); });
  });
  form.addEventListener('submit', function (e) {
    var bad = fields.filter(function (f) { return !check(f); });
    if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
    var btn = $('[data-submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Sending</span>';
  });
})();
