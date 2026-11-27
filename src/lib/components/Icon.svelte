<script>
  /**
   * Icon
   * Contenedor de tamaño fijo para un ícono de @lucide/svelte. El ícono
   * llena el contenedor sin deformarse y toma el grosor de su tamaño.
   * Color: --icon-color del contexto (un token --icon-*); por defecto --icon-primary.
   * Estilos globales en src/styles/blocks.css (también los usa markdown.js).
   * @prop {Component} icon - componente de @lucide/svelte
   * @prop {'sm' | 'md' | 'lg'} size - sm: texto pequeño · md: botones · lg: cards
   * @prop {string} label - texto para lectores de pantalla; sin él, es decorativo
   */
  let { icon: Glyph, size = 'md', label = undefined, class: cls = '' } = $props();
</script>

<span
  class="icon icon-{size} {cls}"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  <Glyph />
</span>
