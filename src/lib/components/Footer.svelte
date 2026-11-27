<script>
  import { base } from '$app/paths';

  const year = new Date().getFullYear();
</script>

<footer>
  <div class="footer-inner">
    <div>
      <p class="footer-name type-h3">Fran Ortega</p>
      <p class="footer-tagline type-small">Product Designer</p>
    </div>
    <nav class="footer-links">
      <a class="footer-link type-small" href="{base}/">Inicio</a>
      <a class="footer-link type-small" href="{base}/sobre-mi">Sobre mí</a>
      <a class="footer-link type-small" href="{base}/sistema">Sistema de diseño</a>
    </nav>
  </div>
  <div class="footer-bottom type-caption">
    © {year} Fran Ortega — Hecho con SvelteKit
  </div>
</footer>

<style>
  footer {
    border-top: var(--border-width-sm) solid var(--border-neutral-primary);
    padding: var(--spacing-inset-2xl) 0 var(--spacing-inset-xl);
  }
  .footer-inner {
    max-width: var(--site-max);
    margin: 0 auto;
    padding: 0 var(--spacing-gutter);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--spacing-gap-xl);
  }
  .footer-name {
    color: var(--text-primary);
    margin-bottom: var(--spacing-stack-2xs);
  }
  .footer-tagline {
    color: var(--text-secondary);
  }
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-gap-xs);
  }
  .footer-link {
    color: var(--text-secondary);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .footer-link:hover {
    color: var(--text-accent);
  }
  .footer-bottom {
    max-width: var(--site-max);
    margin: var(--spacing-stack-xl) auto 0;
    padding: var(--spacing-inset-md) var(--spacing-gutter) 0;
    border-top: var(--border-width-sm) solid var(--border-neutral-primary);
    color: var(--text-secondary);
  }
</style>
