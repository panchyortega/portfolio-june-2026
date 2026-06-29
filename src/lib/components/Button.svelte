<script>
  /**
   * Button
   * Si recibe `href` se renderiza como <a>, si no como <button>.
   * @prop {'primary' | 'ghost' | 'link'} variant
   * @prop {string} href - si existe, es un enlace
   * @prop {boolean} disabled
   * @prop {string} icon - clase de Tabler Icon (ej: 'ti-arrow-right')
   */
  let {
    variant = 'primary',
    href = undefined,
    disabled = false,
    icon = undefined,
    onclick = undefined,
    children
  } = $props();
</script>

{#if href}
  <a class="btn btn-{variant}" {href} aria-disabled={disabled}>
    {#if icon}<i class="ti {icon}" aria-hidden="true"></i>{/if}
    {@render children()}
  </a>
{:else}
  <button class="btn btn-{variant}" {disabled} {onclick}>
    {#if icon}<i class="ti {icon}" aria-hidden="true"></i>{/if}
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
    line-height: 1;
    padding: var(--space-12) var(--space-24);
    border-radius: var(--radius-pill);
    border: 1.5px solid transparent;
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
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Ghost */
  .btn-ghost {
    background: transparent;
    color: var(--text-primary);
    border-color: var(--border-neutral-primary);
  }
  .btn-ghost:hover {
    background: var(--bg-neutral-secondary);
    border-color: var(--border-neutral-primary-hover);
  }
  .btn-ghost:disabled,
  .btn-ghost[aria-disabled='true'] {
    color: var(--text-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Link */
  .btn-link {
    background: transparent;
    border-color: transparent;
    color: var(--text-accent);
    padding-left: 0;
    padding-right: 0;
  }
  .btn-link:hover {
    color: var(--text-accent-hover);
  }
  .btn-link:disabled,
  .btn-link[aria-disabled='true'] {
    color: var(--text-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
