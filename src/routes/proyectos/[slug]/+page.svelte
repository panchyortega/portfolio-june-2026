<script>
  import { base } from '$app/paths';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import MetaCard from '$lib/components/MetaCard.svelte';
  import Button from '$lib/components/Button.svelte';
  import { ArrowLeft } from '@lucide/svelte';

  let { data } = $props();
  let { project, html, toc } = $derived(data);
</script>

<svelte:head>
  <title>{project.title} — Fran Ortega</title>
  <meta name="description" content={project.desc} />
</svelte:head>

<ContentLayout tocItems={toc}>
  {#snippet left()}
    <a href="{base}/" class="back-link type-label">
      <ArrowLeft size={15} /> Volver
    </a>
    <MetaCard items={project.meta} />
  {/snippet}

  <header class="project-header">
    <h1 class="project-title type-h1">{project.title}</h1>
    <p class="project-desc type-body-lg">{project.desc}</p>
  </header>

  <article class="prose">
    {@html html}
  </article>

  <div class="project-nav">
    <Button variant="ghost" href={`${base}/`}>← Todos los proyectos</Button>
  </div>
</ContentLayout>

<style>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-6);
    color: var(--text-secondary);
    margin-bottom: var(--space-32);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .back-link:hover { color: var(--text-accent); }

  .project-header {
    margin-bottom: var(--space-40);
    padding-bottom: var(--space-32);
    border-bottom: 1px solid var(--border-neutral-primary);
  }
  .project-title { color: var(--text-primary); margin-bottom: var(--space-16); }
  .project-desc { color: var(--text-secondary); }

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
  .prose :global(blockquote p) { color: var(--text-accent); margin: 0; }
  .prose :global(a) { color: var(--text-accent); text-decoration: underline; }
  .prose :global(ul), .prose :global(ol) {
    margin: 0 0 var(--space-20) var(--space-20);
    list-style: revert;
  }
  .prose :global(li) { margin-bottom: var(--space-8); line-height: var(--lh-normal); }
</style>
