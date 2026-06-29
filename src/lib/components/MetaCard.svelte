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
        <p class="meta-value type-small">{item.value}</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .meta-item {
    margin-bottom: var(--space-20);
  }
  .meta-item:last-child {
    margin-bottom: 0;
  }
  .meta-label {
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }
  .meta-value {
    color: var(--text-secondary);
    line-height: 1.5;
  }
  .meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
  }
</style>
