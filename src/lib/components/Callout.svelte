<script>
  /**
   * Callout
   * Bloque destacado con tinte de acento, para citas o notas.
   */
  let { children } = $props();
</script>

<div class="callout type-callout">
  {@render children()}
</div>

<style>
  .callout {
    border-left: var(--border-width-lg) solid var(--border-accent-subtle);
    padding: var(--spacing-inset-sm) var(--spacing-inset-md);
    background: var(--bg-accent-subtle);
    border-radius: 0 var(--radius-default) var(--radius-default) 0;
    color: var(--text-accent);
    margin: var(--spacing-stack-lg) 0;
  }
</style>
