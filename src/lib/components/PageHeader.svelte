<script>
  import { ArrowLeft } from '@lucide/svelte';
  import { Clock } from '@lucide/svelte';

  /**
   * Page Header — encabezado consistente de páginas internas.
   * @prop {string} title - título (H1)
   * @prop {string} [subtitle] - bajada (párrafo secundario)
   * @prop {string} [backHref] - si existe, muestra "← Volver" (solo proyectos)
   * @prop {string} [readingTime] - tiempo de lectura (solo proyectos)
   * @prop {string} [eyebrow] - texto pequeño sobre el título (opcional)
   */
  let { title, subtitle, backHref, readingTime, eyebrow } = $props();
</script>

<header class="page-header">
  {#if backHref}
    <a href={backHref} class="back-link type-label">
      <ArrowLeft size={15} /> Volver
    </a>
  {/if}

  {#if eyebrow}
    <p class="eyebrow type-label">{eyebrow}</p>
  {/if}

  <h1 class="ph-title type-h1">{title}</h1>

  {#if subtitle}
    <p class="ph-subtitle type-body-lg">{subtitle}</p>
  {/if}

  {#if readingTime}
    <p class="ph-reading type-small">
      <Clock size={14} /> {readingTime}
    </p>
  {/if}
</header>

<style>
  .page-header {
    margin-bottom: var(--space-40);
    padding-bottom: var(--space-32);
    border-bottom: 1px solid var(--border-neutral-primary);
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

  .eyebrow {
    color: var(--text-secondary);
    display: block;
    margin-bottom: var(--space-12);
  }

  .ph-title {
    color: var(--text-primary);
    margin-bottom: var(--space-16);
  }

  .ph-subtitle {
    color: var(--text-secondary);
  }

  .ph-reading {
    display: inline-flex;
    align-items: center;
    gap: var(--space-6);
    color: var(--text-secondary);
    margin-top: var(--space-16);
  }
</style>
