<script>
  import { base } from '$app/paths';
  import { Clock } from '@lucide/svelte';
  import Tag from './Tag.svelte';
  import ImagePlaceholder from './ImagePlaceholder.svelte';
  import ProjectCardTicket from './ProjectCardTicket.svelte';
  import ProjectCardSobre from './ProjectCardSobre.svelte';
  import ProjectCardClip from './ProjectCardClip.svelte';

  /**
   * Project Card
   * @prop {string} href - ruta al proyecto (relativa, ej: '/proyectos/ucap')
   * @prop {string} title
   * @prop {string} desc
   * @prop {string} image - URL de imagen real (opcional)
   * @prop {string} imageLabel - texto del placeholder si no hay imagen
   * @prop {Array<{label: string, variant?: 'neutral'|'primary'}>} tags
   * @prop {string} [readingTime] - ej: "3 min de lectura" (solo variante 'clasica')
   * @prop {'sobre'|'clasica'|'ticket'|'clip'} variant - forma de la card. 'clasica' es la oficial del sitio
   *   (decisión de Panchy: el listado del home usa solo sobres). 'clasica' es la card anterior, y
   *   'ticket' y 'clip' son alternativas guardadas. No cambiar el home a otra sin que ella lo pida.
   */
  let {
    href = '#',
    title = '',
    desc = '',
    image = undefined,
    imageLabel = '',
    tags = [],
    readingTime = undefined,
    variant = 'clasica'
  } = $props();
</script>

{#if variant === 'ticket'}
  <ProjectCardTicket {href} {title} {desc} {image} {imageLabel} {tags} />
{:else if variant === 'clip'}
  <ProjectCardClip {href} {title} {desc} {image} {imageLabel} {tags} />
{:else if variant === 'clasica'}
<a class="project-card" href="{base}{href}">
  <div class="project-card-thumb">
    {#if image}
      <img src={image} alt={title} />
    {:else}
      <ImagePlaceholder label={imageLabel} height="100%" />
    {/if}
  </div>
  <div class="project-card-body">
    {#if tags.length}
      <div class="project-card-meta">
        {#each tags as tag}
          <Tag variant={tag.variant ?? 'neutral'}>{tag.label}</Tag>
        {/each}
      </div>
    {/if}
    <p class="project-card-title type-h3">{title}</p>
    <p class="project-card-desc type-small">{desc}</p>
    {#if readingTime}
      <p class="project-card-reading type-small">
        <Clock size={13} /> {readingTime}
      </p>
    {/if}
  </div>
</a>
{:else}
  <ProjectCardSobre {href} {title} {desc} {image} {imageLabel} {tags} />
{/if}

<style>
  .project-card {
    display: block;
    text-decoration: none;
    border: 1px solid var(--border-neutral-primary);
    border-radius: var(--radius-loose);
    overflow: hidden;
    background: var(--bg-neutral-primary);
    transition:
      border-color var(--duration-normal) var(--ease-default),
      transform var(--duration-normal) var(--ease-default);
  }
  .project-card:hover {
    border-color: var(--border-neutral-primary-hover);
    transform: translateY(-2px);
  }

  .project-card-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bg-neutral-secondary);
    overflow: hidden;
  }
  .project-card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .project-card:hover .project-card-thumb img {
    transform: scale(1.03);
  }

  .project-card-body {
    padding: var(--space-20);
  }
  .project-card-meta {
    display: flex;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }
  .project-card-title {
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }
  .project-card-desc {
    color: var(--text-secondary);
    line-height: 1.6;
  }
  .project-card-reading {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    color: var(--text-secondary);
    margin-top: var(--space-12);
  }
</style>
