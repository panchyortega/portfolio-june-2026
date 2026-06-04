/* ─────────────────────────────────────────────
   MAIN.JS — Portfolio Fran Ortega
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });

  // ── TOC: construir desde headings ──
  const tocLists = document.querySelectorAll('.toc-list');
  if (tocLists.length > 0) {
    const headings = document.querySelectorAll('.project-content h2, .project-content h3');
    headings.forEach((heading, i) => {
      if (!heading.id) {
        heading.id = 'section-' + i;
      }
      tocLists.forEach(tocList => {
        const item = document.createElement('a');
        item.href = '#' + heading.id;
        item.className = 'toc-item' + (heading.tagName === 'H3' ? ' sub' : '');
        item.textContent = heading.textContent;
        item.addEventListener('click', e => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // cerrar panel mobile si está abierto
          closeTocPanel();
        });
        tocList.appendChild(item);
      });
    });
  }

  // ── TOC: highlight activo con IntersectionObserver ──
  const headings = document.querySelectorAll('.project-content h2, .project-content h3');
  if (headings.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + entry.target.id) {
              item.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(h => observer.observe(h));
  }

  // ── Barra de progreso de lectura ──
  const progressBar = document.querySelector('.toc-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ── TOC flotante (mobile) ──
  const tocFab = document.querySelector('.toc-fab');
  const tocPanel = document.querySelector('.toc-panel');

  const closeTocPanel = () => {
    if (tocPanel && tocFab) {
      tocPanel.classList.remove('visible');
      tocFab.classList.remove('open');
      setTimeout(() => { tocPanel.style.display = 'none'; }, 250);
    }
  };

  if (tocFab && tocPanel) {
    tocFab.addEventListener('click', () => {
      const isOpen = tocPanel.classList.contains('visible');
      if (isOpen) {
        closeTocPanel();
      } else {
        tocPanel.style.display = 'block';
        requestAnimationFrame(() => {
          tocPanel.classList.add('visible');
          tocFab.classList.add('open');
        });
      }
    });

    // cerrar al tocar fuera
    document.addEventListener('click', e => {
      if (!tocFab.contains(e.target) && !tocPanel.contains(e.target)) {
        closeTocPanel();
      }
    });
  }

  // ── Cursor personalizado (sutil) ──
  // Solo en desktop, solo cambia en links y botones
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    cursor.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--p-400); opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 200ms, transform 200ms, background 200ms;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    // escala en hover de links/botones
    document.querySelectorAll('a, button, .project-card, .toc-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.background = 'var(--p-500)';
        cursor.style.opacity = '0.6';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--p-400)';
        cursor.style.opacity = '1';
      });
    });
  }

});
