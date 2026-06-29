<script>
  /**
   * Tag / Chip
   * @prop {'neutral' | 'primary'} variant - estilo del tag
   */
  let { variant = 'neutral', children } = $props();
</script>

<span class="tag tag-{variant}">{@render children()}</span>

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    font-size: var(--size-xs);
    font-weight: var(--weight-medium);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-subtle);
    line-height: 1;
    white-space: nowrap;
  }

  .tag-neutral {
    background: var(--bg-neutral-secondary);
    color: var(--text-secondary);
  }

  .tag-primary {
    background: var(--bg-accent-muted);
    color: var(--text-accent);
  }
</style>
