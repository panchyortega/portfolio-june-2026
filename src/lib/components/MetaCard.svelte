<script>
  import Tag from './Tag.svelte';

  /**
   * Meta Card — datos del proyecto en el sidebar
   * @prop {Array<{label: string, value?: string, tags?: Array}>} items
   */
  let { items = [] } = $props();
</script>

<div class="meta-card">
  {#each items as item}
    <div class="meta-item">
      <p class="meta-label type-label">{item.label}</p>
      {#if item.tags}
        <div class="meta-tags">
          {#each item.tags as tag}
            <Tag variant={tag.variant ?? 'neutral'}>{tag.label}</Tag>
          {/each}
        </div>
      {:else}
        <p class="meta-value type-meta-value">{item.value}</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .meta-item {
    margin-bottom: var(--spacing-stack-lg);
  }
  .meta-item:last-child {
    margin-bottom: 0;
  }
  .meta-label {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-2xs);
  }
  .meta-value {
    color: var(--text-secondary);
  }
  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-gap-xs);
  }

  /* Mobile: tabla compacta, etiqueta a la izquierda y valor a la derecha */
  @media (max-width: 900px) {
    .meta-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--spacing-gap-md);
      margin-bottom: var(--spacing-stack-sm);
    }
    .meta-label { margin-bottom: 0; flex-shrink: 0; }
    .meta-value { text-align: right; }
    .meta-tags { justify-content: flex-end; }
  }
</style>
