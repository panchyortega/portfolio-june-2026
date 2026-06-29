<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { theme, toggleTheme } from '$lib/stores/theme.js';
  import { projects } from '$lib/data/projects.js';
  import { ChevronDown, House, LayoutGrid, User, Palette, Sun, Moon } from '@lucide/svelte';

  let openDropdown = $state(null); // 'proyectos' | 'mas' | null

  // Ruta actual sin el base path, para comparar estados activos
  let path = $derived($page.url.pathname.replace(base, '') || '/');
  let inProyectos = $derived(path.startsWith('/proyectos'));

  function toggle(name) {
    openDropdown = openDropdown === name ? null : name;
  }

  function closeAll() {
    openDropdown = null;
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeAll();
  }
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:document onclick={(e) => {
  if (!e.target.closest('.nav-dropdown-wrap')) closeAll();
}} />

<!-- ── Nav desktop ── -->
<nav class="nav">
  <a href="{base}/" class="nav-logo type-body">Fran Ortega</a>

  <div class="nav-left">
    <div class="nav-dropdown-wrap">
      <button
        class="nav-btn"
        class:active={inProyectos}
        aria-expanded={openDropdown === 'proyectos'}
        onclick={() => toggle('proyectos')}
      >
        Proyectos <ChevronDown size={14} class="chevron" />
      </button>
      <div class="nav-dropdown" class:open={openDropdown === 'proyectos'}>
        {#each projects as p}
          <a
            href="{base}/proyectos/{p.slug}"
            class:selected={path === `/proyectos/${p.slug}`}
          >{p.label}</a>
        {/each}
      </div>
    </div>

    <a href="{base}/sobre-mi" class="nav-btn" class:active={path === '/sobre-mi'}>Sobre mí</a>
    <a href="{base}/sistema" class="nav-btn" class:active={path === '/sistema'}>DS</a>
  </div>

  <div class="nav-right">
    <button class="nav-btn nav-btn-icon" onclick={toggleTheme} title="Cambiar tema" aria-label="Cambiar tema">
      {#if $theme === 'dark'}<Sun size={18} />{:else}<Moon size={18} />{/if}
    </button>
  </div>
</nav>

<!-- ── Nav mobile ── -->
<nav class="mobile-nav">
  <a href="{base}/" class="mobile-nav-item" class:active={path === '/'}>
    <House size={22} />
    <span>Inicio</span>
  </a>

  <div class="nav-dropdown-wrap mobile-wrap">
    <button
      class="mobile-nav-item"
      class:active={inProyectos}
      aria-expanded={openDropdown === 'proyectos'}
      onclick={() => toggle('proyectos')}
    >
      <LayoutGrid size={22} />
      <span>Proyectos</span>
    </button>
    <div class="nav-dropdown nav-dropdown--up mobile-dd" class:open={openDropdown === 'proyectos'}>
      {#each projects as p}
        <a
          href="{base}/proyectos/{p.slug}"
          class:selected={path === `/proyectos/${p.slug}`}
        >{p.label}</a>
      {/each}
    </div>
  </div>

  <a href="{base}/sobre-mi" class="mobile-nav-item" class:active={path === '/sobre-mi'}>
    <User size={22} />
    <span>Sobre mí</span>
  </a>

  <a href="{base}/sistema" class="mobile-nav-item" class:active={path === '/sistema'}>
    <Palette size={22} />
    <span>DS</span>
  </a>

  <button class="mobile-nav-item" onclick={toggleTheme} aria-label="Cambiar tema">
    {#if $theme === 'dark'}<Sun size={22} />{:else}<Moon size={22} />{/if}
    <span>Tema</span>
  </button>
</nav>

<style>
  /* ── Nav desktop ── */
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    height: var(--nav-height);
    background: var(--bg-neutral-primary);
    border-bottom: 1px solid var(--border-neutral-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-32);
    gap: var(--space-24);
  }
  .nav-logo {
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    letter-spacing: var(--tracking-snug);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-logo:hover { color: var(--text-accent); }

  .nav-left, .nav-right {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    font-family: var(--font-body);
    font-size: var(--size-base);
    font-weight: var(--weight-regular);
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-6) var(--space-12);
    border-radius: var(--radius-default);
    transition: background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default);
    white-space: nowrap;
    position: relative;
  }
  .nav-btn:hover {
    background: var(--bg-neutral-secondary);
    color: var(--text-primary);
  }
  .nav-btn.active {
    color: var(--text-primary);
    font-weight: var(--weight-medium);
  }
  .nav-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: var(--space-12);
    right: var(--space-12);
    height: 2px;
    background: var(--bg-accent);
    border-radius: 2px 2px 0 0;
  }
  .nav-btn :global(.chevron) {
    transition: transform var(--duration-fast) var(--ease-default);
  }
  .nav-btn[aria-expanded='true'] {
    background: var(--bg-neutral-secondary);
    color: var(--text-primary);
  }
  .nav-btn[aria-expanded='true'] :global(.chevron) { transform: rotate(180deg); }

  .nav-btn-icon {
    width: 36px;
    height: 36px;
    padding: 0;
    justify-content: center;
  }

  /* ── Dropdown ── */
  .nav-dropdown-wrap { position: relative; }
  .nav-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: var(--bg-neutral-primary);
    border: 1px solid var(--border-neutral-primary);
    border-radius: var(--radius-loose);
    padding: var(--space-8) 0;
    min-width: 200px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    z-index: 200;
    display: none;
    opacity: 0;
    transform: translateY(-4px);
    pointer-events: none;
    transition: opacity var(--duration-normal) var(--ease-default), transform var(--duration-normal) var(--ease-default);
  }
  .nav-dropdown.open {
    display: block;
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .nav-dropdown--up {
    top: auto;
    bottom: calc(100% + 6px);
    transform: translateY(4px);
  }
  .nav-dropdown--up.open { transform: translateY(0); }

  .nav-dropdown a {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    width: 100%;
    padding: var(--space-8) var(--space-16);
    font-family: var(--font-body);
    font-size: var(--size-sm);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default);
  }
  .nav-dropdown a:hover {
    background: var(--bg-neutral-secondary);
    color: var(--text-primary);
  }
  .nav-dropdown a.selected {
    color: var(--text-accent);
    font-weight: var(--weight-medium);
    background: var(--bg-accent-subtle);
  }

  /* ── Nav mobile ── */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--bg-neutral-primary);
    border-top: 1px solid var(--border-neutral-primary);
    z-index: 150;
    align-items: center;
    justify-content: space-around;
    padding: 0 var(--space-8);
  }
  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: var(--space-6) var(--space-12);
    border-radius: var(--radius-default);
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    flex: 1;
    position: relative;
    transition: background var(--duration-fast) var(--ease-default);
    -webkit-tap-highlight-color: transparent;
  }
  .mobile-nav-item:hover { background: var(--bg-neutral-secondary); }
  .mobile-nav-item.active { background: var(--bg-accent-subtle); }
  .mobile-nav-item {
    color: var(--text-secondary);
    transition: background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default);
  }
  .mobile-nav-item.active { color: var(--text-accent); }
  .mobile-nav-item span {
    font-size: 0.625rem;
    color: inherit;
    white-space: nowrap;
  }

  .mobile-wrap {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .mobile-wrap .mobile-nav-item { width: 100%; }
  .mobile-dd {
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    min-width: 180px;
  }
  .mobile-dd.open { transform: translateX(-50%) translateY(0); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .nav { display: none; }
    .mobile-nav { display: flex; }
  }
</style>
