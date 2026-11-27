<script>
  import { ArrowLeft, Clock } from '@lucide/svelte';
  import Icon from './Icon.svelte';

  /**
   * Page Header — encabezado consistente de páginas internas.
   * @prop {string} title - título (H1)
   * @prop {string} [subtitle] - bajada (párrafo secundario)
   * @prop {string} [backHref] - si existe, muestra "← Volver" (solo proyectos)
   * @prop {string} [readingTime] - tiempo de lectura (solo proyectos)
   * @prop {string} [eyebrow] - texto pequeño sobre el título (opcional)
   * @prop {import('svelte').Snippet} [meta] - datos del proyecto; solo se ven en mobile
   *   (en desktop van en el sidebar izquierdo de ContentLayout)
   */
  let { title, subtitle, backHref, readingTime, eyebrow, meta } = $props();
</script>

<header class="page-header">
  {#if backHref}
    <a href={backHref} class="back-link type-label">
      <Icon icon={ArrowLeft} size="sm" /> Volver
    </a>
  {/if}

  {#if eyebrow}
    <p class="eyebrow type-label">{eyebrow}</p>
  {/if}

  <h1 class="ph-title type-h1">{title}</h1>

  {#if subtitle}
    <p class="ph-subtitle type-body">{subtitle}</p>
  {/if}

  {#if readingTime}
    <p class="ph-reading type-small">
      <Icon icon={Clock} size="sm" /> {readingTime}
    </p>
  {/if}

  {#if meta}
    <div class="ph-meta">{@render meta()}</div>
  {/if}
</header>

<style>
  .page-header {
    margin-bottom: var(--spacing-stack-2xl);
    padding-bottom: var(--spacing-inset-xl);
    border-bottom: var(--border-width-sm) solid var(--border-neutral-primary);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-gap-xs);
    color: var(--text-secondary);
    --icon-color: var(--icon-secondary);
    margin-bottom: var(--spacing-stack-xl);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .back-link:hover { color: var(--text-accent); --icon-color: var(--icon-accent); }

  .eyebrow {
    color: var(--text-secondary);
    display: block;
    margin-bottom: var(--spacing-stack-sm);
  }

  .ph-title {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-md);
  }

  .ph-subtitle {
    color: var(--text-secondary);
  }

  .ph-reading {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-gap-xs);
    color: var(--text-secondary);
    --icon-color: var(--icon-secondary);
    margin-top: var(--spacing-stack-md);
  }

  /* Datos del proyecto: en desktop viven en el sidebar; en mobile, acá */
  .ph-meta { display: none; }
  @media (max-width: 900px) {
    .ph-meta {
      display: block;
      margin-top: var(--spacing-stack-lg);
      padding: var(--spacing-inset-md);
      background: var(--bg-neutral-primary);
      border: var(--border-width-sm) solid var(--border-neutral-primary);
      border-radius: var(--radius-loose);
    }
  }
</style>
