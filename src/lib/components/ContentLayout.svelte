<script>
  import TableOfContents from './TableOfContents.svelte';

  /**
   * Layout de 3 columnas: sidebar izq | contenido | TOC der.
   * Las líneas divisorias llegan siempre hasta abajo (tocan el footer).
   * La columna izquierda puede ir vacía (mantiene su divisor). En mobile se oculta:
   * si su contenido debe verse ahí, la página lo pasa también a PageHeader (prop meta).
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
  .col-left { border-right: var(--border-width-sm) solid var(--border-neutral-primary); }
  .col-right { border-left: var(--border-width-sm) solid var(--border-neutral-primary); }

  .col-left .sticky,
  .col-right .sticky {
    position: sticky;
    top: var(--nav-height);
    padding: var(--spacing-sidebar-pad);
  }
  .col-left .sticky {
    max-height: calc(100vh - var(--nav-height));
    overflow-y: auto;
  }

  .col-center {
    padding: var(--spacing-content-pad-y) var(--spacing-content-pad-x) var(--spacing-inset-2xl);
    max-width: 760px;
    width: 100%;
    justify-self: center;
  }

  .toc-title {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-stack-md);
  }


  @media (max-width: 900px) {
    .layout { grid-template-columns: 1fr; min-height: 0; }
    .col-left, .col-right { display: none; }
    .col-center { max-width: 100%; }
  }
</style>
