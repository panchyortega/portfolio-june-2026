<script>
  import TableOfContents from './TableOfContents.svelte';

  /**
   * Layout de 3 columnas: sidebar izq | contenido | TOC der.
   * Las líneas divisorias llegan siempre hasta abajo (tocan el footer).
   * La columna izquierda puede ir vacía (mantiene su divisor).
   * @prop {Array<{text,id,depth}>} tocItems
   * @prop {import('svelte').Snippet} [left] - contenido del sidebar izquierdo (opcional)
   * @prop {import('svelte').Snippet} children
   */
  let { tocItems = [], left, children } = $props();
</script>

<div class="layout">
  <aside class="col col-left">
    {#if left}<div class="sticky">{@render left()}</div>{/if}
  </aside>

  <main class="col-center">
    {#if left}<div class="left-mobile">{@render left()}</div>{/if}
    {@render children()}
  </main>

  <aside class="col col-right">
    {#if tocItems.length}
      <div class="sticky">
        <p class="toc-title type-label">En esta página</p>
        <TableOfContents items={tocItems} />
      </div>
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
    /* Asegura que los divisores lleguen al footer incluso en páginas cortas */
    min-height: calc(100vh - var(--nav-height));
  }

  /* Las columnas laterales se estiran a la altura total del grid:
     el borde vive en la columna, no en el contenido sticky,
     así el divisor llega hasta abajo y toca el footer. */
  .col-left { border-right: 1px solid var(--border-neutral-primary); }
  .col-right { border-left: 1px solid var(--border-neutral-primary); }

  .col-left .sticky,
  .col-right .sticky {
    position: sticky;
    top: var(--nav-height);
    padding: var(--space-32);
  }
  .col-left .sticky {
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
  }

  .col-center {
    padding: var(--space-32) var(--space-56) var(--space-48);
    max-width: 760px;
    width: 100%;
    justify-self: center;
  }

  .toc-title {
    color: var(--text-secondary);
    margin-bottom: var(--space-16);
  }

  .left-mobile { display: none; }

  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; min-height: 0; }
    .col-left, .col-right { display: none; }
    .col-center { padding: var(--space-32) var(--space-24); max-width: 100%; }
    .left-mobile {
      display: block;
      padding: var(--space-20);
      border: 1px solid var(--border-neutral-primary);
      border-radius: var(--radius-loose);
      margin-bottom: var(--space-32);
    }
  }
</style>
