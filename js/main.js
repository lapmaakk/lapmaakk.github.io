/* ============================================
   Lapin Maakuntakomppanian Kilta ry
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL SHADOW ──────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── ACTIVE NAV LINK -
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  const setActive = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });

  // ── MOBILE NAV ─
  const hbg    = document.getElementById('nav-hbg');
  const mobNav = document.getElementById('mob-nav');
  const spans  = hbg ? hbg.querySelectorAll('span') : [];

  const openMob = () => {
    mobNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  };
  const closeMob = () => {
    mobNav.classList.remove('open');
    document.body.style.overflow = '';
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  };

  if (hbg) hbg.addEventListener('click', () => {
    mobNav.classList.contains('open') ? closeMob() : openMob();
  });
  document.querySelectorAll('.mob-nav a').forEach(a =>
    a.addEventListener('click', closeMob)
  );

  // ── FADE-IN OBSERVER ─
  const fadeEls = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('in'));
  }

  // ── COUNTER ANIMATION ─
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.count);
      const sfx    = el.dataset.sfx || '';
      const dur    = 1600;
      let   start  = null;
      const step   = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(p * target) + sfx;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + sfx;
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countIO.observe(el));

  // ── LIGHTBOX ─
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.gal-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src          = item.dataset.src;
      lbCap.textContent  = item.dataset.caption || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  };
  if (lbClose) lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLb();
  });

  // ── CONTACT FORM ─
  const form   = document.getElementById('liity-form');
  const formOk = document.getElementById('liity-ok');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled    = true;
      btn.textContent = 'Lähetetään...';
      setTimeout(() => {
        form.style.display    = 'none';
        formOk.style.display  = 'block';
      }, 1000);
    });
  }

  // ── SMOOTH SCROLL ─
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY
                    - parseInt(getComputedStyle(document.documentElement)
                      .getPropertyValue('--nav-h'));
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
