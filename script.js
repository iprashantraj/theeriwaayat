// ============================================
// RIWAAYAT PUBLICATIONS — Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Year in footer ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Topbar scroll state ----------
  const topbar = document.getElementById('topbar');
  const onScroll = () => {
    if (window.scrollY > 30) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Side nav ----------
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const sidenav = document.getElementById('sidenav');
  const backdrop = document.getElementById('backdrop');

  const openMenu = () => {
    sidenav.classList.add('open');
    backdrop.classList.add('open');
    menuBtn.classList.add('open');
    sidenav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    sidenav.classList.remove('open');
    backdrop.classList.remove('open');
    menuBtn.classList.remove('open');
    sidenav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  sidenav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  // ---------- Stat counter ----------
  const stats = document.querySelectorAll('.stat-num');
  const counted = new WeakSet();
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted.has(e.target)) {
        counted.add(e.target);
        animate(e.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => statObs.observe(s));

  // ---------- Carousel dots ----------
  const track = document.getElementById('carouselTrack');
  const dotsEl = document.getElementById('carouselDots');
  if (track && dotsEl) {
    const cards = track.querySelectorAll('.carousel-card');
    cards.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => {
        const card = cards[i];
        const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        track.scrollTo({ left, behavior: 'smooth' });
      });
      dotsEl.appendChild(b);
    });

    // Update active dot on scroll
    let raf;
    track.addEventListener('scroll', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let active = 0, min = Infinity;
        cards.forEach((c, i) => {
          const cc = c.offsetLeft + c.clientWidth / 2;
          const d = Math.abs(cc - center);
          if (d < min) { min = d; active = i; }
        });
        dotsEl.querySelectorAll('button').forEach((b, i) => {
          b.classList.toggle('active', i === active);
        });
      });
    }, { passive: true });
  }

  // ---------- Smooth anchor offset (account for fixed topbar) ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 56;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // ---------- Subtle parallax on hero florals ----------
  const florals = document.querySelectorAll('.floral');
  if (florals.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 800) {
        florals.forEach((f, i) => {
          const speed = i === 0 ? 0.15 : -0.12;
          f.style.transform = `translateY(${y * speed}px)`;
        });
      }
    }, { passive: true });
  }
});
