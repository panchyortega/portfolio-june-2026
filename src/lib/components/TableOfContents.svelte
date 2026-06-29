<script>
  import { onMount } from 'svelte';

  /**
   * Table of Contents con scroll-spy.
   * @prop {Array<{text: string, id: string, depth: number}>} items
   */
  let { items = [] } = $props();

  let activeId = $state(items[0]?.id ?? '');

  onMount(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);

    if (!headings.length) return;

    // Marca activo el último heading que pasó bajo la nav
    const NAV_OFFSET = 72;
    function onScroll() {
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= NAV_OFFSET + 4) {
          current = h;
        } else {
          break;
        }
      }
      activeId = current.id;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  function handleClick(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    activeId = id;
    const NAV_OFFSET = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
</script>

<nav class="toc" aria-label="Tabla de contenidos">
  <ul class="toc-list">
    {#each items as item}
      <li>
        <a
          href="#{item.id}"
          class="toc-item type-small"
          class:sub={item.depth === 3}
          class:active={activeId === item.id}
          onclick={(e) => handleClick(e, item.id)}
        >{item.text}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .toc-list {
    border-left: 1.5px solid var(--border-neutral-primary);
  }
  .toc-item {
    display: block;
    color: var(--text-secondary);
    padding: var(--space-4) var(--space-12);
    border-left: 2px solid transparent;
    margin-left: -1.5px;
    line-height: 1.4;
    cursor: pointer;
    transition:
      color var(--duration-fast) var(--ease-default),
      border-color var(--duration-fast) var(--ease-default);
  }
  .toc-item:hover {
    color: var(--text-primary);
  }
  .toc-item.active {
    color: var(--text-accent);
    border-left-color: var(--border-accent-subtle);
  }
  .toc-item.sub {
    padding-left: var(--space-24);
  }
</style>
