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
  />

  <article class="prose" bind:this={proseEl}>
    {@html html}
  </article>

  <nav class="project-nav">
    <Button variant="ghost" href={`${base}/proyectos/${prev.slug}`}>← Anterior</Button>
    <Button variant="primary" href={`${base}/proyectos/${next.slug}`}>Siguiente →</Button>
  </nav>
</ContentLayout>

<style>
  .project-nav {
    margin-top: var(--space-64);
    padding-top: var(--space-32);
    border-top: 1px solid var(--border-neutral-primary);
    display: flex;
    justify-content: flex-end;
    gap: var(--space-12);
  }

  /* ── Prose — estilos del markdown renderizado ── */
  .prose :global(h2) {
    font-family: var(--font-display);
    font-size: var(--size-2xl);
    font-weight: var(--weight-regular);
    color: var(--text-primary);
    line-height: var(--lh-snug);
    margin: var(--space-48) 0 var(--space-16);
    scroll-margin-top: calc(var(--nav-height) + var(--space-24));
  }
  .prose :global(h2:first-child) { margin-top: 0; }
  .prose :global(h3) {
    font-family: var(--font-display);
    font-size: var(--size-xl);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    line-height: var(--lh-snug);
    margin: var(--space-32) 0 var(--space-12);
    scroll-margin-top: calc(var(--nav-height) + var(--space-24));
  }
  .prose :global(p) {
    font-size: var(--size-base);
    line-height: var(--lh-normal);
    color: var(--text-primary);
    margin-bottom: var(--space-20);
  }
  .prose :global(blockquote) {
    border-left: 2px solid var(--border-accent-subtle);
    padding: var(--space-12) var(--space-16);
    background: var(--bg-accent-subtle);
    border-radius: 0 var(--radius-default) var(--radius-default) 0;
    font-style: italic;
    color: var(--text-accent);
    margin: var(--space-24) 0;
  }
  .prose :global(blockquote p) { color: var(--text-accent); margin: 0; }
  .prose :global(a) { color: var(--text-accent); text-decoration: underline; }
  .prose :global(ul), .prose :global(ol) {
    margin: 0 0 var(--space-20) var(--space-20);
    list-style: revert;
  }
  .prose :global(li) { margin-bottom: var(--space-8); line-height: var(--lh-normal); }

  /* ── Imágenes del contenido — pan + zoom in-situ ── */
  .prose :global(.content-image) {
    margin: var(--space-32) 0;
  }
  .prose :global(.content-caption) {
    margin-top: var(--space-8);
    font-size: var(--size-xs);
    color: var(--text-secondary);
    text-align: center;
  }

  .prose :global(.zoom-image) {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-loose);
    border: 1px solid var(--border-neutral-primary);
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
  .prose :global(.zoom-dots) {
    position: absolute;
    inset: -2000px;
    background-image: radial-gradient(var(--bg-neutral-tertiary) 1.4px, transparent 1.4px);
    background-size: 12.6px 12.6px;
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
    bottom: var(--space-16);
    right: var(--space-16);
    display: flex;
    gap: var(--space-6);
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
    border: 1px solid var(--border-neutral-primary);
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
    bottom: var(--space-16);
    left: var(--space-16);
    font-size: var(--size-xs);
    color: var(--text-secondary);
    background: var(--bg-neutral-primary);
    border: 1px solid var(--border-neutral-primary);
    border-radius: var(--radius-default);
    padding: var(--space-4) var(--space-8);
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
    margin: var(--space-32) 0;
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
  /* ── Videos del contenido — marco propio, loop, clic para pausar ── */
  .prose :global(.content-video) {
    margin: var(--space-32) 0;
  }
  .prose :global(.video-frame) {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-loose); /* mismo radio que las imágenes */
    border: 1px solid var(--border-neutral-primary);
    background: var(--bg-neutral-secondary);
    cursor: pointer;
    user-select: none;
    /* El aspect-ratio real se fija por JS al cargar el video (setupVideos) */
    aspect-ratio: 16 / 9;
  }
  .prose :global(.video-frame:focus-visible) {
    outline: 2px solid var(--border-accent);
    outline-offset: 2px;
  }
  .prose :global(.video-frame video) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Indicador de pausa: solo se ve cuando está en pausa */
  .prose :global(.video-play) {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--space-48);
    height: var(--space-48);
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--bg-neutral-primary) 85%, transparent);
    color: var(--text-primary);
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-default);
    pointer-events: none;
  }
  .prose :global(.video-play svg) {
    width: var(--space-20);
    height: var(--space-20);
    margin-left: 2px; /* centra óptico el triángulo */
  }
  .prose :global(.video-frame.is-paused .video-play) {
    opacity: 1;
  }

  /* Línea de progreso superpuesta: aparece en hover, en pausa o al arrastrar */
  .prose :global(.video-scrub) {
    position: absolute;
    left: var(--space-16);
    right: var(--space-16);
    bottom: var(--space-8);
    height: var(--space-20); /* zona de clic más alta que la línea */
    display: flex;
    align-items: center;
    cursor: pointer;
    touch-action: none;
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-default);
  }
  .prose :global(.video-frame:hover .video-scrub),
  .prose :global(.video-frame:focus-visible .video-scrub),
  .prose :global(.video-frame.is-paused .video-scrub),
  .prose :global(.video-frame.is-scrubbing .video-scrub) {
    opacity: 1;
  }
  .prose :global(.video-scrub-rail) {
    position: relative;
    width: 100%;
    height: var(--space-4);
    border-radius: var(--radius-pill);
    background: color-mix(in srgb, var(--bg-neutral-primary) 70%, transparent);
  }
  .prose :global(.video-scrub-fill) {
    position: absolute;
    inset: 0 auto 0 0;
    width: calc(var(--progress, 0) * 100%);
    border-radius: var(--radius-pill);
    background: var(--bg-accent);
  }
  .prose :global(.video-scrub-thumb) {
    position: absolute;
    top: 50%;
    left: calc(var(--progress, 0) * 100%);
    width: var(--space-12);
    height: var(--space-12);
    transform: translate(-50%, -50%);
    border-radius: var(--radius-pill);
    background: var(--bg-accent);
    border: 2px solid var(--bg-neutral-primary);
  }
</style>
