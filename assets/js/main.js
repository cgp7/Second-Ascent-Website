/* Second Ascent — interactions and GSAP choreography.
   Every animation is progressive: content is visible and usable without JS or with reduced motion. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 900px)');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  }

  /* ---------------------------------------------------------------- intro */
  var intro = document.getElementById('intro');
  var introMode = doc.getAttribute('data-intro');
  var introDone = !intro || introMode === 'skip' || !doc.hasAttribute('data-has-intro');
  var onIntroDone = [];
  function whenIntroDone(fn) { introDone ? fn() : onIntroDone.push(fn); }

  function setInert(on) {
    $$('body > *').forEach(function (el) {
      if (el === intro || el.tagName === 'SCRIPT' || el.tagName === 'DIALOG') return;
      if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
    });
  }

  function finishIntro() {
    if (introDone) return;
    introDone = true;
    store.set('sa-intro-seen', String(Date.now()));
    if (intro) intro.remove();
    doc.classList.remove('intro-active');
    doc.setAttribute('data-intro', 'skip');
    setInert(false);
    var h1 = $('#statement-title');
    if (h1) h1.focus({ preventScroll: true });
    if (hasGsap) ScrollTrigger.refresh();
    onIntroDone.splice(0).forEach(function (fn) { fn(); });
  }

  function runIntro() {
    window.__saIntro = true;
    window.scrollTo(0, 0);
    setInert(true);
    var played = false;
    var timers = [];
    var left = $('.intro__half--left', intro);
    var right = $('.intro__half--right', intro);
    var top = $('.intro__btn--top', intro);
    var bottom = $('.intro__btn--bottom', intro);
    var short = introMode === 'short';

    function play() {
      if (played) return;
      played = true;
      timers.forEach(clearTimeout);
      intro.classList.remove('is-prompting');
      if (!hasGsap || reduce.matches) {
        intro.style.transition = 'opacity .5s';
        intro.style.opacity = '0';
        setTimeout(finishIntro, 520);
        return;
      }
      var fall = window.innerHeight * 0.7;
      var tl = gsap.timeline({ onComplete: finishIntro });
      tl.to(bottom, { scale: 1.14, duration: 0.14, ease: 'power2.out' })
        .to(bottom, { y: fall, x: 40, rotation: 160, opacity: 0, duration: 0.8, ease: 'power2.in' })
        .to(top, { scale: 1.14, duration: 0.14, ease: 'power2.out' }, 0.2)
        .to(top, { y: fall * 1.3, x: -30, rotation: -140, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0.34)
        .add(function () { intro.classList.add('is-open'); }, 0.5)
        .to(left, { xPercent: -104, rotation: -3, transformOrigin: '100% 50%', duration: 1.4, ease: 'power3.inOut' }, 0.5)
        .to(right, { xPercent: 104, rotation: 3, transformOrigin: '0% 50%', duration: 1.4, ease: 'power3.inOut' }, 0.5)
        .from('.statement__inner', { scale: 0.94, opacity: 0, duration: 1.3, ease: 'power3.out' }, 0.95);
      if (short) tl.timeScale(2.6);
    }

    function skip() {
      if (played) return;
      played = true;
      timers.forEach(clearTimeout);
      if (hasGsap && !reduce.matches) gsap.to(intro, { opacity: 0, duration: 0.35, onComplete: finishIntro });
      else finishIntro();
    }

    $$('[data-unbutton]', intro).forEach(function (b) { b.addEventListener('click', play); });
    $('[data-intro-skip]', intro).addEventListener('click', skip);
    intro.addEventListener('keydown', function (e) { if (e.key === 'Escape') skip(); });

    // Wait for the halves (with a ceiling), then prompt and auto-play if nobody acts.
    var imgs = $$('.intro__half img', intro);
    var ready = Promise.all(imgs.map(function (img) {
      return img.decode ? img.decode().catch(function () { throw new Error('img'); }) : Promise.resolve();
    }));
    var timeout = new Promise(function (res) { setTimeout(function () { res('slow'); }, 4000); });
    Promise.race([ready, timeout]).then(function (r) {
      if (r === 'slow') { skip(); return; }
      if (short) { timers.push(setTimeout(play, 250)); return; }
      timers.push(setTimeout(function () { intro.classList.add('is-prompting'); }, 700));
      timers.push(setTimeout(play, 3200));
    }, skip);
  }

  if (!introDone && intro) runIntro();
  else if (intro) intro.remove();

  /* ---------------------------------------------------------------- header */
  var header = $('.site-header');
  function setupHeader() {
    if (!header) return;
    var lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      var menuOpen = $('#menu') && $('#menu').open;
      header.classList.toggle('is-hidden', y > lastY && y > 400 && !menuOpen && !header.contains(document.activeElement));
      lastY = y;
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });

    if (!hasGsap) return;
    $$('main [data-theme], footer[data-theme]').forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec, start: 'top 36px', end: 'bottom 36px',
        onToggle: function (self) { if (self.isActive) header.setAttribute('data-theme', sec.getAttribute('data-theme')); },
      });
    });
  }

  /* ---------------------------------------------------------------- dialogs */
  function animateDialog(dlg, panel, open, done) {
    if (!hasGsap || reduce.matches) { if (done) done(); return; }
    var fromSide = desktop.matches && dlg.classList.contains('sheet');
    var props = dlg.classList.contains('menu')
      ? { opacity: 0 }
      : fromSide ? { xPercent: 100 } : { yPercent: 100 };
    if (open) gsap.fromTo(panel, props, Object.assign({ duration: 0.55, ease: 'power3.out', clearProps: 'all' }, { opacity: 1, xPercent: 0, yPercent: 0 }));
    else gsap.to(panel, Object.assign({ duration: 0.35, ease: 'power2.in', onComplete: done }, props));
  }

  function setupDialog(dlg, openers, closeSel, onOpen) {
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var trigger = null;
    function open(e) {
      trigger = e && e.currentTarget;
      if (onOpen) onOpen(trigger);
      dlg.showModal();
      doc.style.overflow = 'hidden';
      animateDialog(dlg, dlg, true);
      if (dlg.classList.contains('menu') && hasGsap && !reduce.matches) {
        gsap.from($$('.menu__list li', dlg), { y: 40, opacity: 0, stagger: 0.05, duration: 0.7, delay: 0.1 });
      }
    }
    function close() {
      animateDialog(dlg, dlg, false, function () {
        dlg.close();
        if (hasGsap) gsap.set(dlg, { clearProps: 'all' });
      });
      if (!hasGsap || reduce.matches) dlg.close();
    }
    dlg.addEventListener('close', function () {
      doc.style.overflow = '';
      if (trigger && document.contains(trigger)) trigger.focus();
    });
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg && dlg.classList.contains('sheet')) close(); });
    openers.forEach(function (b) { b.addEventListener('click', open); });
    $$(closeSel, dlg).forEach(function (b) { b.addEventListener('click', close); });
    // Close the menu when following an in-page link.
    if (dlg.classList.contains('menu')) $$('a', dlg).forEach(function (a) { a.addEventListener('click', function () { dlg.close(); }); });
  }

  setupDialog($('#menu'), $$('[data-menu-open]'), '[data-menu-close]');
  setupDialog($('#inquiry'), $$('[data-inquire]'), '[data-sheet-close]', function (btn) {
    var name = btn ? btn.getAttribute('data-inquire') : '';
    var dlg = $('#inquiry');
    $('[data-inquire-name]', dlg).textContent = name || 'this piece';
    $('[data-inquire-field]', dlg).value = name ? name + ' (' + btn.getAttribute('data-inquire-id') + ')' : '';
    var form = $('form', dlg);
    if (form.classList.contains('is-sent')) { form.classList.remove('is-sent'); form.reset(); $('.form__status', form).textContent = ''; }
  });

  /* ---------------------------------------------------------------- forms */
  function fieldError(field) {
    var v = field.validity;
    if (v.valueMissing) return field.type === 'checkbox' ? 'Please tick this box to continue.' : 'Please fill this in.';
    if (v.typeMismatch && field.type === 'email') return 'Please enter an email address like name@example.com.';
    if (v.tooLong) return 'Please shorten this a little.';
    return v.valid ? '' : 'Please check this field.';
  }

  $$('form[data-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    var status = $('.form__status', form);
    var submit = $('button[type="submit"]', form);

    function check(field) {
      var errEl = field.closest('.field') && $('.field__error', field.closest('.field'));
      var msg = fieldError(field);
      if (errEl) {
        errEl.textContent = msg;
        var ids = (field.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== errEl.id; });
        if (msg) ids.push(errEl.id);
        if (ids.length) field.setAttribute('aria-describedby', ids.join(' ')); else field.removeAttribute('aria-describedby');
      }
      if (msg) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
      return !msg;
    }

    $$('input, select, textarea', form).forEach(function (f) {
      f.addEventListener('blur', function () { if (f.hasAttribute('aria-invalid')) check(f); });
      f.addEventListener('change', function () { if (f.hasAttribute('aria-invalid')) check(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input:not([type="hidden"]):not([name="company_website"]), select, textarea', form);
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) {
        status.className = 'form__status is-error';
        status.textContent = bad.length === 1 ? 'One field needs attention.' : bad.length + ' fields need attention.';
        bad[0].focus();
        return;
      }
      submit.disabled = true;
      status.className = 'form__status';
      status.textContent = 'Sending…';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.classList.add('is-sent');
        status.textContent = form.name === 'newsletter'
          ? 'You are on the list. Thanks.'
          : 'Sent. Thanks, we will reply by email.';
        status.setAttribute('tabindex', '-1');
        status.focus();
      }).catch(function () {
        status.className = 'form__status is-error';
        status.textContent = 'That did not send. Please check your connection and try again.';
      }).then(function () { submit.disabled = false; });
    });
  });

  /* ---------------------------------------------------------------- storage */
  var clearBtn = $('[data-clear-storage]');
  if (clearBtn) clearBtn.addEventListener('click', function () {
    try { localStorage.removeItem('sa-intro-seen'); sessionStorage.removeItem('sa-session'); } catch (e) {}
    $('[data-clear-status]').textContent = 'Done. Nothing from this site is saved in your browser now.';
  });

  /* ---------------------------------------------------------------- collection */
  function setupCollection() {
    var section = $('.collection');
    if (!section) return;
    var viewport = $('[data-track-viewport]', section);
    var track = $('[data-track]', section);
    var frames = $$('.frame', track);
    var dots = $$('[data-progress]', section);
    var horizontal = null;

    function setActive(i) {
      dots.forEach(function (d, j) { if (j === i) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current'); });
    }
    setActive(0);

    // Native swipe (mobile, reduced motion): track active frame.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (horizontal) return;
        entries.forEach(function (en) { if (en.isIntersecting) setActive(frames.indexOf(en.target)); });
      }, { root: viewport, threshold: 0.6 });
      frames.forEach(function (f) { io.observe(f); });
    }

    function goTo(i) {
      var f = frames[i];
      if (!f) return;
      if (horizontal) {
        var st = horizontal.scrollTrigger;
        var max = track.scrollWidth - window.innerWidth;
        var y = st.start + (f.offsetLeft / max) * (st.end - st.start);
        window.scrollTo({ top: Math.min(y, st.end), behavior: reduce.matches ? 'auto' : 'smooth' });
      } else {
        viewport.scrollTo({ left: f.offsetLeft - (frames[0].offsetLeft), behavior: reduce.matches ? 'auto' : 'smooth' });
      }
    }
    dots.forEach(function (d, i) { d.addEventListener('click', function (e) { e.preventDefault(); goTo(i); }); });

    // Keyboard: when focus lands inside an off-screen frame, bring that frame into view.
    track.addEventListener('focusin', function (e) {
      var f = e.target.closest('.frame');
      if (!f || !horizontal) return;
      viewport.scrollLeft = 0;
      goTo(frames.indexOf(f));
    });

    if (!hasGsap) return;
    var mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', function () {
      section.classList.add('is-pinned');
      // The track moves by transform, so native lazy-loading can lag behind; fetch the frames up front.
      $$('.frame__img', track).forEach(function (img) { img.loading = 'eager'; });
      var dist = function () { return track.scrollWidth - window.innerWidth; };
      horizontal = gsap.to(track, {
        x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: {
          trigger: section, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          end: function () { return '+=' + dist(); },
          onUpdate: function (self) {
            var x = self.progress * dist() + window.innerWidth / 2;
            var idx = 0;
            frames.forEach(function (f, i) { if (f.offsetLeft <= x) idx = i; });
            setActive(Math.min(idx, dots.length - 1));
          },
        },
      });
      frames.forEach(function (f) {
        var img = $('.frame__img', f);
        if (img) gsap.fromTo(img, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: f, containerAnimation: horizontal, start: 'left right', end: 'right left', scrub: true } });
        var text = $('.frame__text, .frame__endcard', f);
        if (text) gsap.from(text.children, { y: 40, opacity: 0, stagger: 0.07, scrollTrigger: { trigger: f, containerAnimation: horizontal, start: 'left 65%', toggleActions: 'play none none reverse' } });
      });
      return function () { section.classList.remove('is-pinned'); horizontal = null; gsap.set(track, { clearProps: 'transform' }); };
    });
  }

  /* ---------------------------------------------------------------- reveals */
  function splitWords(el) {
    if (el.dataset.splitDone) return [];
    el.dataset.splitDone = '1';
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w) {
      return '<span class="split-w" aria-hidden="true"><span class="split-i">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span></span>';
    }).join(' ');
    return $$('.split-i', el);
  }

  function setupReveals() {
    if (!hasGsap) return;
    var mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', function () {
      $$('[data-split]').forEach(function (el) {
        var words = splitWords(el);
        var isStatement = el.id === 'statement-title';
        var tween = gsap.from(words, { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out', paused: true });
        if (isStatement) whenIntroDone(function () { tween.play(); });
        else ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: function () { tween.play(); } });
      });

      gsap.set('[data-reveal]', { opacity: 0, y: 48 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%', once: true,
        onEnter: function (els) { gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1, overwrite: true }); },
      });

      $$('[data-speed]').forEach(function (el) {
        var s = parseFloat(el.getAttribute('data-speed')) || 1;
        var amt = (1 - s) * 400;
        gsap.fromTo(el, { y: -amt / 2 }, { y: amt / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Flannel buttons in labels turn slightly as they scroll past, like they were just sewn on.
      $$('.label .fbtn, .steps__item .fbtn').forEach(function (b) {
        gsap.from(b, { rotation: -120, scale: 0.4, opacity: 0, duration: 0.9, ease: 'back.out(2)', scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
      });
    });
  }

  // Object-position from data-focus (keeps markup free of inline styles for the CSP).
  $$('img[data-focus]').forEach(function (img) { img.style.objectPosition = img.getAttribute('data-focus'); });

  setupHeader();
  setupCollection();
  setupReveals();
  if (hasGsap) window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
