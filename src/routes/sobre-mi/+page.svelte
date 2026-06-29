<script>
  import { intro, experience, education, skills } from '$lib/data/about.js';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';
  import Tag from '$lib/components/Tag.svelte';
</script>

<svelte:head>
  <title>Sobre mí — Francisca Ortega</title>
  <meta name="description" content={intro.bio} />
</svelte:head>

<main>
  <!-- Intro -->
  <section class="intro">
    <h1 class="intro-name">{intro.name}</h1>
    <p class="intro-bio type-body-lg">{intro.bio}</p>
    <div class="intro-tags">
      {#each intro.tags as tag}
        <Tag variant="neutral">{tag}</Tag>
      {/each}
    </div>
  </section>

  <!-- Experiencia -->
  <section class="section">
    <h2 class="section-title type-h2">Experiencia</h2>
    <div class="exp-list">
      {#each experience as exp}
        <ExperienceItem {exp} />
      {/each}
    </div>
  </section>

  <!-- Educación -->
  <section class="section">
    <h2 class="section-title type-h2">Educación</h2>
    <div class="edu-list">
      {#each education as edu}
        <div class="edu-item">
          <p class="edu-titulo type-h3">{edu.titulo}</p>
          <p class="edu-inst type-body">{edu.institucion}</p>
          <p class="edu-periodo type-small">{edu.periodo}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Habilidades -->
  <section class="section">
    <h2 class="section-title type-h2">Habilidades</h2>
    <div class="skills-grid">
      {#each skills as group}
        <div class="skill-group">
          <p class="skill-group-title type-label">{group.group}</p>
          <div class="skill-tags">
            {#each group.items as item}
              <Tag variant="neutral">{item}</Tag>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: var(--spacing-section-md) var(--spacing-content-pad) var(--spacing-section-md);
  }

  /* Intro */
  .intro { margin-bottom: var(--space-80); }
  .intro-name {
    font-family: var(--font-display);
    font-size: var(--size-4xl);
    font-weight: var(--weight-light);
    letter-spacing: var(--tracking-tight);
    line-height: 1.05;
    color: var(--text-primary);
    margin-bottom: var(--space-24);
  }
  .intro-bio {
    color: var(--text-secondary);
    margin-bottom: var(--space-24);
  }
  .intro-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
  }

  /* Secciones */
  .section { margin-bottom: var(--space-64); }
  .section-title {
    color: var(--text-primary);
    margin-bottom: var(--space-24);
    padding-bottom: var(--space-12);
    border-bottom: 1px solid var(--border-neutral-primary);
  }

  /* Educación */
  .edu-list { display: grid; gap: var(--space-24); }
  .edu-titulo { color: var(--text-primary); margin-bottom: var(--space-4); }
  .edu-inst { color: var(--text-secondary); }
  .edu-periodo { color: var(--text-secondary); margin-top: var(--space-4); }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-32);
  }
  .skill-group-title {
    color: var(--text-secondary);
    margin-bottom: var(--space-12);
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
  }

  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
</style>
