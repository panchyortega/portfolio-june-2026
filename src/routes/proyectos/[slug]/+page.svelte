<script>
  import { base } from '$app/paths';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  import Button from '$lib/components/Button.svelte';
  import { ArrowLeft } from '@lucide/svelte';

  let { data } = $props();
  let { project, html, toc } = $derived(data);
</script>

<svelte:head>
  <title>{project.title} — Fran Ortega</title>
  <meta name="description" content={project.desc} />
</svelte:head>

<div class="project-layout">
  <!-- Sidebar izquierdo — meta -->
  <aside class="sidebar-left">
    <a href="{base}/" class="back-link type-label">
      <ArrowLeft size={15} /> Volver
    </a>
    <MetaCard items={project.meta} />
  </aside>

  <!-- Contenido -->
  <main class="content">
    <header class="project-header">
      <h1 class="project-title type-h1">{project.title}</h1>
      <p class="project-desc type-body-lg">{project.desc}</p>
    </header>

    <!-- Meta inline (solo mobile) -->
    <div class="meta-mobile">
      <MetaCard items={project.meta} />
    </div>

    <article class="prose">
      {@html html}
    </article>

    <div class="project-nav">
      <Button variant="ghost" href={`${base}/`}>← Todos los proyectos</Button>
    </div>
  </main>

  <!-- Sidebar derecho — TOC -->
  <aside class="sidebar-right">
    {#if toc.length}
      <p class="toc-title type-label">En esta página</p>
      <TableOfContents items={toc} />
    {/if}
  </aside>
</div>

<style>
  .project-layout {
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

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-6);
    color: var(--text-secondary);
    margin-bottom: var(--space-32);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .back-link:hover { color: var(--text-accent); }

  .content {
    padding: var(--space-48) var(--space-56);
    max-width: 760px;
  }
  .project-header {
    margin-bottom: var(--space-40);
    padding-bottom: var(--space-32);
    border-bottom: 1px solid var(--border-neutral-primary);
  }
  .project-title {
    color: var(--text-primary);
    margin-bottom: var(--space-16);
  }
  .project-desc {
    color: var(--text-secondary);
  }

  .toc-title {
    color: var(--text-secondary);
    margin-bottom: var(--space-16);
  }

  .meta-mobile { display: none; }

  .project-nav {
    margin-top: var(--space-64);
    padding-top: var(--space-32);
    border-top: 1px solid var(--border-neutral-primary);
    display: flex;
    justify-content: flex-start;
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
  .prose :global(blockquote p) {
    color: var(--text-accent);
    margin: 0;
  }
  .prose :global(a) {
    color: var(--text-accent);
    text-decoration: underline;
  }
  .prose :global(ul), .prose :global(ol) {
    margin: 0 0 var(--space-20) var(--space-20);
    list-style: revert;
  }
  .prose :global(li) {
    margin-bottom: var(--space-8);
    line-height: var(--lh-normal);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .project-layout { grid-template-columns: 1fr; }
    .sidebar-left, .sidebar-right { display: none; }
    .content { padding: var(--space-32) var(--space-24); max-width: 100%; }
    .meta-mobile {
      display: block;
      padding: var(--space-20);
      border: 1px solid var(--border-neutral-primary);
      border-radius: var(--radius-loose);
      margin-bottom: var(--space-32);
    }
  }
</style>
