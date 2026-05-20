/* ============================================
   Lapin Maakuntakomppanian Kilta ry
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL SHADOW ─
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── ACTIVE NAV LINK ─
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

  // ── LIGHTBOX ─
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.gal-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src           = item.dataset.src;
      lbImg.style.display = '';
      lbCap.textContent   = item.dataset.caption || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.style.display = 'none';
  };
  if (lbClose) lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLb();
  });

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
