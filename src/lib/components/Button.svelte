<script>
  import IconBox from './Icon.svelte';
  /**
   * Button
   * Si recibe `href` se renderiza como <a>, si no como <button>.
   * @prop {'primary' | 'ghost' | 'link'} variant
   * @prop {string} href - si existe, es un enlace
   * @prop {boolean} disabled
   * @prop {import('svelte').Component} icon - componente de @lucide/svelte (ej: ArrowRight), va antes del texto
   */
  let {
    variant = 'primary',
    href = undefined,
    disabled = false,
    icon: Icon = undefined,
    onclick = undefined,
    children
  } = $props();
</script>

{#if href}
  <a class="btn btn-{variant}" {href} aria-disabled={disabled}>
    {#if Icon}<IconBox icon={Icon} size="md" />{/if}
    {@render children()}
  </a>
{:else}
  <button class="btn btn-{variant}" {disabled} {onclick}>
    {#if Icon}<IconBox icon={Icon} size="md" />{/if}
    {@render children()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-8);
    font-family: var(--font-body);
    font-size: var(--size-base);
    font-weight: var(--weight-medium);
    line-height: var(--lh-none);
    padding: var(--space-12) var(--space-24);
    border-radius: var(--radius-pill);
    border: var(--border-width-md) solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition:
      background var(--duration-fast) var(--ease-default),
      color var(--duration-fast) var(--ease-default),
      border-color var(--duration-fast) var(--ease-default),
      transform var(--duration-fast) var(--ease-default);
    white-space: nowrap;
  }
  .btn:active {
    transform: scale(0.98);
  }

  /* Primary */
  .btn-primary {
    background: var(--bg-accent);
    color: var(--text-on-accent);
    --icon-color: var(--icon-on-accent);
    border-color: var(--border-accent);
  }
  .btn-primary:hover {
    background: var(--bg-accent-hover);
    border-color: var(--border-accent-hover);
  }
  .btn-primary:disabled,
  .btn-primary[aria-disabled='true'] {
    background: var(--bg-accent-disabled);
    border-color: var(--border-accent-disabled);
    color: var(--text-on-accent-disabled);
    --icon-color: var(--icon-on-accent-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Ghost */
  .btn-ghost {
    background: transparent;
    color: var(--text-primary);
    --icon-color: var(--icon-primary);
    border-color: var(--border-neutral-primary);
  }
  .btn-ghost:hover {
    background: var(--bg-neutral-secondary);
    border-color: var(--border-neutral-primary-hover);
  }
  .btn-ghost:disabled,
  .btn-ghost[aria-disabled='true'] {
    color: var(--text-disabled);
    --icon-color: var(--icon-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Link */
  .btn-link {
    background: transparent;
    border-color: transparent;
    color: var(--text-accent);
    --icon-color: var(--icon-accent);
    padding-left: 0;
    padding-right: 0;
  }
  .btn-link:hover {
    color: var(--text-accent-hover);
    --icon-color: var(--icon-accent-hover);
  }
  .btn-link:disabled,
  .btn-link[aria-disabled='true'] {
    color: var(--text-disabled);
    --icon-color: var(--icon-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
