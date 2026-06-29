<script>
  import { base } from '$app/paths';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import Button from '$lib/components/Button.svelte';

  let { data } = $props();
  let { project, html, toc, readingTime, prev, next } = $derived(data);
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

  <article class="prose">
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
</style>
