<script>
  /**
   * Table of Contents con scroll-spy.
   * @prop {Array<{text: string, id: string, depth: number}>} items
   *
   * - Se re-engancha cada vez que cambian los items (al navegar entre
   *   proyectos el componente se reutiliza y onMount no vuelve a correr).
   * - Al hacer clic, fija el ítem activo mientras dura el scroll y corrige
   *   el destino si el contenido cambió de alto en el camino (imágenes lazy,
   *   diagramas), en vez de dejar que el scroll-spy salte entre secciones.
   */
  let { items = [] } = $props();

  let activeId = $state('');
  let lockedId = null; // ítem clicado mientras dura el scroll programático
  let settleTimer = 0;
  let tries = 0;

  const MAX_TRIES = 4;
  const SETTLE_MS = 140;

  // Offset bajo la nav: el mismo scroll-margin-top que usan los headings
  function offsetOf(el) {
    return parseFloat(getComputedStyle(el).scrollMarginTop) || 72;
  }

  function atBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  }

  $effect(() => {
    const ids = items.map((i) => i.id);
    const headings = ids.map((id) => document.getElementById(id)).filter(Boolean);

    activeId = ids[0] ?? '';
    lockedId = null;
    if (!headings.length) return;

    function spy() {
      // Marca activo el último heading que pasó bajo la nav
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= offsetOf(h) + 4) current = h;
        else break;
      }
      // Al final de la página, las últimas secciones no alcanzan a subir:
      // marca la última cuyo título ya es visible
      if (atBottom()) {
        for (const h of headings) {
          if (h.getBoundingClientRect().top < window.innerHeight) current = h;
        }
      }
      activeId = current.id;
    }

    function settle() {
      const target = lockedId && document.getElementById(lockedId);
      if (!target) return;
      const delta = target.getBoundingClientRect().top - offsetOf(target);
      // El contenido se movió durante el scroll: vuelve a apuntar
      if (Math.abs(delta) > 4 && !(delta > 0 && atBottom()) && tries < MAX_TRIES) {
        tries++;
        window.scrollTo({ top: window.scrollY + delta, behavior: 'smooth' });
        return;
      }
      lockedId = null;
    }

    function onScroll() {
      if (lockedId) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(settle, SETTLE_MS);
        return;
      }
      spy();
    }

    // La persona toma el control (rueda, touch, teclado): suelta el bloqueo
    function release() {
      if (!lockedId) return;
      lockedId = null;
      clearTimeout(settleTimer);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchstart', release, { passive: true });
    window.addEventListener('keydown', release);
    spy();

    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
      window.removeEventListener('keydown', release);
    };
  });

  function handleClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    activeId = id;
    lockedId = id;
    tries = 0;
    clearTimeout(settleTimer);
    const top = target.getBoundingClientRect().top + window.scrollY - offsetOf(target);
    window.scrollTo({ top, behavior: 'smooth' });
    // Si no hay nada que scrollear, igual se resuelve
    settleTimer = setTimeout(() => {
      if (lockedId === id) lockedId = null;
    }, 1500);
  }
</script>

<nav class="toc" aria-label="Tabla de contenidos">
  <ul class="toc-list">
    {#each items as item}
      <li>
        <a
          href="#{item.id}"
          class="toc-item type-small"
          class:sub={item.depth === 3}
          class:active={activeId === item.id}
          onclick={(e) => handleClick(e, item.id)}
        >{item.text}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .toc-list {
    border-left: var(--border-width-md) solid var(--border-neutral-primary);
  }
  .toc-item {
    display: block;
    color: var(--text-secondary);
    padding: var(--space-4) var(--space-12);
    border-left: var(--border-width-lg) solid transparent;
    margin-left: -1.5px;
    line-height: 1.4;
    cursor: pointer;
    transition:
      color var(--duration-fast) var(--ease-default),
      border-color var(--duration-fast) var(--ease-default);
  }
  .toc-item:hover {
    color: var(--text-primary);
  }
  .toc-item.active {
    color: var(--text-accent);
    border-left-color: var(--border-accent-subtle);
  }
  .toc-item.sub {
    padding-left: var(--space-24);
  }
</style>
