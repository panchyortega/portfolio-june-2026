<script>
  import { projects } from '$lib/data/projects.js';
  import { readingTime } from '$lib/markdown.js';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<svelte:head>
  <title>Fran Ortega — Product Designer</title>
  <meta name="description" content="Portfolio de Fran Ortega, Product Designer en Santiago, Chile." />
</svelte:head>

<main>
  <section class="hero">
    <p class="eyebrow type-label">UX/UI Designer — Santiago, Chile</p>
    <h1 class="hero-title">Diseño de productos que tienen sentido.</h1>
    <p class="hero-bio type-body-lg">
      Trabajo en el espacio entre UX y sistemas de diseño, con interés en cómo la
      IA puede integrarse de forma significativa en la experiencia.
    </p>
  </section>

  <section class="projects">
    <p class="projects-title type-label">Proyectos</p>
    <div class="projects-grid">
      {#each projects as p}
        <ProjectCard
          href="/proyectos/{p.slug}"
          title={p.title}
          desc={p.desc}
          imageLabel={p.imageLabel}
          tags={p.tags}
          readingTime={readingTime(p.content)}
        />
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    max-width: var(--site-max);
    margin: 0 auto;
    padding: 0 var(--spacing-content-pad);
  }

  /* Hero */
  .hero {
    padding: var(--spacing-section-md) 0 var(--spacing-section-sm);
    max-width: 640px;
  }
  .eyebrow {
    color: var(--text-secondary);
    display: block;
    margin-bottom: var(--space-16);
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: var(--size-4xl);
    font-weight: var(--weight-light);
    letter-spacing: var(--tracking-tight);
    line-height: 1.05;
    color: var(--text-primary);
    margin-bottom: var(--space-24);
  }
  .hero-bio {
    color: var(--text-secondary);
    max-width: 480px;
  }

  /* Proyectos */
  .projects {
    padding-bottom: var(--spacing-section-md);
  }
  .projects-title {
    color: var(--text-secondary);
    display: block;
    margin-bottom: var(--space-24);
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-gap-md);
  }

  @media (max-width: 900px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
