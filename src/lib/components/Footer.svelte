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
    border-top: 1px solid var(--border-neutral-primary);
    padding: var(--space-48) 0 var(--space-32);
  }
  .footer-inner {
    max-width: var(--site-max);
    margin: 0 auto;
    padding: 0 var(--space-24);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--space-32);
  }
  .footer-name {
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }
  .footer-tagline {
    color: var(--text-secondary);
  }
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
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
    margin: var(--space-32) auto 0;
    padding: var(--space-16) var(--space-24) 0;
    border-top: 1px solid var(--border-neutral-primary);
    color: var(--text-secondary);
  }
</style>
