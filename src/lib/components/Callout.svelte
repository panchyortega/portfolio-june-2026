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
    padding: var(--space-12) var(--space-16);
    background: var(--bg-accent-subtle);
    border-radius: 0 var(--radius-default) var(--radius-default) 0;
    color: var(--text-accent);
    margin: var(--space-24) 0;
  }
</style>
