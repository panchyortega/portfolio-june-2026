<script>
  import { intro, experience, education, skills } from '$lib/data/about.js';
  import ContentLayout from '$lib/components/ContentLayout.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import ExperienceItem from '$lib/components/ExperienceItem.svelte';
  import Tag from '$lib/components/Tag.svelte';

  const toc = [
    { text: 'Experiencia', id: 'experiencia', depth: 2 },
    { text: 'Educación', id: 'educacion', depth: 2 },
    { text: 'Habilidades', id: 'habilidades', depth: 2 }
  ];
</script>

<svelte:head>
  <title>Sobre mí — Francisca Ortega</title>
  <meta name="description" content={intro.bio} />
</svelte:head>

<ContentLayout tocItems={toc}>
  <PageHeader title={intro.name} subtitle={intro.bio} />

  <section class="section" id="experiencia">
    <h2 class="section-title type-h2">Experiencia</h2>
    <div class="exp-list">
      {#each experience as exp}
        <ExperienceItem {exp} />
      {/each}
    </div>
  </section>

  <section class="section" id="educacion">
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

  <section class="section" id="habilidades">
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
</ContentLayout>

<style>
  .section { margin-bottom: var(--spacing-section-sm); }
  .section:last-child { margin-bottom: 0; }
  .section-title {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-lg);
    padding-bottom: var(--spacing-inset-sm);
    border-bottom: var(--border-width-sm) solid var(--border-neutral-primary);
    scroll-margin-top: calc(var(--nav-height) + var(--spacing-stack-lg));
  }

  .edu-list { display: grid; gap: var(--spacing-gap-lg); }
  .edu-titulo { color: var(--text-primary); margin-bottom: var(--spacing-stack-2xs); }
  .edu-inst { color: var(--text-secondary); }
  .edu-periodo { color: var(--text-secondary); margin-top: var(--spacing-stack-2xs); }

  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-gap-xl); }
  .skill-group-title { color: var(--text-secondary); margin-bottom: var(--spacing-stack-sm); }
  .skill-tags { display: flex; flex-wrap: wrap; gap: var(--spacing-gap-xs); }

  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
</style>
