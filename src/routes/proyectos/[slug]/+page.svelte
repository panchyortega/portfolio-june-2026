<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { setupMermaid } from '$lib/mermaid.js';
  import { setupZoomImages } from '$lib/zoomImage.js';
  import { setupVideos } from '$lib/videoFrame.js';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import Button from '$lib/components/Button.svelte';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import Icon from '$lib/components/Icon.svelte';

  let { data } = $props();
  let { project, html, toc, readingTime, prev, next } = $derived(data);

  let proseEl;

  onMount(() => {
    const cleanupMermaid = setupMermaid(proseEl);
    const cleanupZoomImages = setupZoomImages(proseEl);
    const cleanupVideos = setupVideos(proseEl);

    return () => {
      cleanupMermaid();
      cleanupZoomImages();
      cleanupVideos();
    };
  });
</script>

<svelte:head>
  <title>{project.title} — Fran Ortega</title>
  <meta name="description" content={project.desc} />
</svelte:head>

<ContentLayout tocItems={toc}>
  {#snippet left()}
    <MetaCard items={project.meta} />
  {/snippet}

  <PageHeader
    title={project.title}
    subtitle={project.desc}
    backHref={`${base}/`}
    {readingTime}
  >
    {#snippet meta()}<MetaCard items={project.meta} />{/snippet}
  </PageHeader>

  <article class="prose" bind:this={proseEl}>
    {@html html}
  </article>

  <nav class="project-nav">
    <Button variant="ghost" href={`${base}/proyectos/${prev.slug}`}><Icon icon={ArrowLeft} size="md" /> Anterior</Button>
    <Button variant="primary" href={`${base}/proyectos/${next.slug}`}>Siguiente <Icon icon={ArrowRight} size="md" /></Button>
  </nav>
</ContentLayout>

<style>
  .project-nav {
    margin-top: var(--spacing-section-sm);
    padding-top: var(--spacing-inset-xl);
    border-top: var(--border-width-sm) solid var(--border-neutral-primary);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-gap-sm);
  }

  /* ── Prose — estilos del markdown renderizado ── */
  /* Tipografía de h2/h3/p: clases .type-h2, .type-h3 y .type-body que agrega
     markdown.js. Acá solo color y ritmo vertical. */
  .prose :global(h2) {
    color: var(--text-primary);
    margin: var(--spacing-stack-2xl) 0 var(--spacing-stack-md);
    scroll-margin-top: calc(var(--nav-height) + var(--spacing-stack-lg));
  }
  .prose :global(h2:first-child) { margin-top: 0; }
  .prose :global(h3) {
    color: var(--text-primary);
    margin: var(--spacing-stack-xl) 0 var(--spacing-stack-sm);
    scroll-margin-top: calc(var(--nav-height) + var(--spacing-stack-lg));
  }
  .prose :global(p) {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-lg);
  }
  .prose :global(blockquote) {
    border-left: var(--border-width-lg) solid var(--border-accent-subtle);
    padding: var(--spacing-inset-sm) var(--spacing-inset-md);
    background: var(--bg-accent-subtle);
    border-radius: 0 var(--radius-default) var(--radius-default) 0;
    font-style: italic;
    color: var(--text-accent);
    margin: var(--spacing-stack-lg) 0;
  }
  .prose :global(blockquote p) { color: var(--text-accent); margin: 0; }
  .prose :global(a) { color: var(--text-accent); text-decoration: underline; }
  .prose :global(ul), .prose :global(ol) {
    margin: 0 0 var(--spacing-stack-lg) var(--spacing-inset-lg);
    list-style: revert;
  }
  .prose :global(li) { margin-bottom: var(--spacing-stack-2xs); line-height: var(--lh-normal); }

  /* ── Imágenes del contenido — pan + zoom in-situ ── */
  .prose :global(.content-image) {
    margin: var(--spacing-stack-xl) 0;
  }
  .prose :global(.content-caption) {
    margin-top: var(--spacing-stack-xs);
    font-size: var(--size-xs);
    color: var(--text-secondary);
    text-align: center;
  }

  .prose :global(.zoom-image) {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-loose);
    border: var(--border-width-sm) solid var(--border-neutral-primary);
    background: var(--bg-neutral-secondary);
    cursor: grab;
    touch-action: none;
    user-select: none;
    /* El aspect-ratio real se fija por JS al cargar la imagen (setupZoomImages) */
    aspect-ratio: 16 / 9;
  }
  .prose :global(.zoom-image.grabbing) {
    cursor: grabbing;
  }

  .prose :global(.zoom-canvas) {
    position: absolute;
    inset: 0;
    transform-origin: 0 0;
    will-change: transform;
  }
  /* Fuera del canvas: no se escala como bitmap, así se ve nítido con cualquier zoom.
     Grilla adaptativa (zoomImage.js): punto de tamaño fijo, separación --dot-step
     entre 16 y 32px, y una grilla intermedia que aparece con --dot-fine (0→1). */
  .prose :global(.zoom-dots) {
    --dot: var(--bg-neutral-tertiary);
    --dot-r: 1.1px;
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(circle, var(--dot) var(--dot-r), transparent calc(var(--dot-r) + 0.6px)),
      radial-gradient(circle, color-mix(in srgb, var(--dot) calc(var(--dot-fine, 0) * 100%), transparent) var(--dot-r), transparent calc(var(--dot-r) + 0.6px));
    background-size:
      var(--dot-step, 16px) var(--dot-step, 16px),
      calc(var(--dot-step, 16px) / 2) calc(var(--dot-step, 16px) / 2);
  }
  .prose :global(.zoom-canvas img) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    pointer-events: none;
  }

  /* Controles fijos — aparecen en hover, no oscurecen el fondo */
  .prose :global(.zoom-controls) {
    position: absolute;
    bottom: var(--spacing-inset-md);
    right: var(--spacing-inset-md);
    display: flex;
    gap: var(--spacing-gap-xs);
    opacity: 0;
    transform: translateY(4px);
    transition: opacity var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
    z-index: 2;
  }
  .prose :global(.zoom-image:hover .zoom-controls),
  .prose :global(.zoom-image:focus-within .zoom-controls) {
    opacity: 1;
    transform: translateY(0);
  }
  .prose :global(.zoom-controls button) {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-neutral-primary);
    color: var(--text-primary);
    border: var(--border-width-sm) solid var(--border-neutral-primary);
    border-radius: var(--radius-default);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(17, 23, 16, 0.1);
    transition: background var(--duration-fast) var(--ease-default);
  }
  .prose :global(.zoom-controls button:hover:not(:disabled)) {
    background: var(--bg-neutral-secondary-hover);
  }
  .prose :global(.zoom-controls button:disabled) {
    color: var(--text-disabled);
    cursor: default;
    opacity: 0.5;
  }
  .prose :global(.zoom-controls button svg) {
    width: 17px;
    height: 17px;
  }

  .prose :global(.zoom-level) {
    position: absolute;
    bottom: var(--spacing-inset-md);
    left: var(--spacing-inset-md);
    font-size: var(--size-xs);
    color: var(--text-secondary);
    background: var(--bg-neutral-primary);
    border: var(--border-width-sm) solid var(--border-neutral-primary);
    border-radius: var(--radius-default);
    padding: var(--spacing-inset-2xs) var(--spacing-inset-xs);
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-default);
    z-index: 2;
    font-variant-numeric: tabular-nums;
  }
  .prose :global(.zoom-image:hover .zoom-level) {
    opacity: 1;
  }

  /* ── Diagramas Mermaid ── */
  .prose :global(pre.mermaid) {
    display: flex;
    justify-content: center;
    margin: var(--spacing-stack-xl) 0;
    padding: 0;
    background: none;
    border: none;
    /* Evita el flash del código crudo antes de renderizar */
    font-size: 0;
  }
  .prose :global(pre.mermaid svg) {
    max-width: 100%;
    height: auto;
  }
</style>
