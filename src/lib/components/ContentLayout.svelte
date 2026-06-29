<script>
  import TableOfContents from './TableOfContents.svelte';

  /**
   * Layout de 3 columnas: sidebar izq | contenido | TOC der.
   * Con líneas divisorias y sidebars sticky. Responsive a 1 columna.
   * @prop {Array<{text,id,depth}>} tocItems - items de la tabla de contenidos
   * @prop {import('svelte').Snippet} [left] - contenido del sidebar izquierdo
   * @prop {import('svelte').Snippet} children - contenido central
   */
  let { tocItems = [], left, children } = $props();
</script>

<div class="layout">
  <aside class="sidebar-left">
    {@render left?.()}
  </aside>

  <main class="content">
    {#if left}
      <div class="left-mobile">{@render left()}</div>
    {/if}
    {@render children()}
  </main>

  <aside class="sidebar-right">
    {#if tocItems.length}
      <p class="toc-title type-label">En esta página</p>
      <TableOfContents items={tocItems} />
    {/if}
  </aside>
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr var(--sidebar-width);
    max-width: var(--site-max);
    margin: 0 auto;
    width: 100%;
  }

  .sidebar-left {
    border-right: 1px solid var(--border-neutral-primary);
    padding: var(--space-32);
    position: sticky;
    top: var(--nav-height);
    height: calc(100vh - var(--nav-height));
    align-self: start;
    overflow-y: auto;
  }
  .sidebar-right {
    border-left: 1px solid var(--border-neutral-primary);
    padding: var(--space-32);
    position: sticky;
    top: var(--nav-height);
    align-self: start;
  }

  .content {
    padding: var(--space-48) var(--space-56);
    max-width: 760px;
    width: 100%;
  }

  .toc-title {
    color: var(--text-secondary);
    margin-bottom: var(--space-16);
  }

  .left-mobile { display: none; }

  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar-left, .sidebar-right { display: none; }
    .content { padding: var(--space-32) var(--space-24); max-width: 100%; }
    .left-mobile {
      display: block;
      padding: var(--space-20);
      border: 1px solid var(--border-neutral-primary);
      border-radius: var(--radius-loose);
      margin-bottom: var(--space-32);
    }
  }
</style>
