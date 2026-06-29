<script>
  import Tag from './Tag.svelte';

  /**
   * Experience Item — una experiencia laboral
   * @prop {object} exp - { empresa, rol, fecha, tags, como, logro, aprendi }
   */
  let { exp } = $props();
</script>

<article class="exp" id={exp.id}>
  <header class="exp-header">
    <div>
      <p class="exp-empresa type-h3">{exp.empresa}</p>
      <p class="exp-rol type-body">{exp.rol}</p>
    </div>
    <span class="exp-fecha type-small">{exp.fecha}</span>
  </header>

  <div class="exp-tags">
    {#each exp.tags as tag}
      <Tag variant="neutral">{tag}</Tag>
    {/each}
  </div>

  <div class="exp-blocks">
    <div class="exp-block">
      <p class="exp-block-title type-label">Cómo trabajé</p>
      <p class="exp-block-text type-body">{exp.como}</p>
    </div>
    <div class="exp-block">
      <p class="exp-block-title type-label">Qué se logró</p>
      <p class="exp-block-text type-body">{exp.logro}</p>
    </div>
    <div class="exp-block">
      <p class="exp-block-title type-label">Qué aprendí</p>
      <p class="exp-block-text type-body">
        <strong class="exp-lead">{exp.aprendi.lead}</strong>
        {exp.aprendi.rest}
      </p>
    </div>
  </div>
</article>

<style>
  .exp {
    padding: var(--space-32) 0;
    border-bottom: 1px solid var(--border-neutral-primary);
  }
  .exp:last-child { border-bottom: none; }

  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--space-16);
    margin-bottom: var(--space-16);
  }
  .exp-empresa { color: var(--text-primary); }
  .exp-rol { color: var(--text-secondary); }
  .exp-fecha {
    color: var(--text-secondary);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .exp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
    margin-bottom: var(--space-24);
  }

  .exp-blocks {
    display: grid;
    gap: var(--space-20);
  }
  .exp-block-title {
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
  }
  .exp-block-text { color: var(--text-primary); }
  .exp-lead {
    color: var(--text-accent);
    font-weight: var(--weight-medium);
  }

  @media (max-width: 600px) {
    .exp-header { flex-direction: column; gap: var(--space-4); }
  }
</style>
