<script>
  import { onMount } from 'svelte';
  import Tag from './Tag.svelte';

  /**
   * Texto de las variantes de card sobre papel: título, descripción y chips.
   * La descripción muestra "lo que quepa": ajusta sus líneas al alto disponible.
   * @prop {string} title
   * @prop {string} desc
   * @prop {Array<{label: string, variant?: 'neutral'|'primary'}>} tags
   */
  let { title = '', desc = '', tags = [] } = $props();

  let ft = $state();
  let d = $state();
  let chips = $state();
  let h3 = $state();

  function fit() {
    if (!ft || !d) return;
    const H = ft.clientHeight;
    if (!H) return;
    const gap = parseFloat(getComputedStyle(ft).rowGap) || 0;
    const lh = parseFloat(getComputedStyle(d).lineHeight) || 20;
    const lines = Math.floor((H - h3.offsetHeight - chips.offsetHeight - gap * 2) / lh);
    if (lines < 1) d.style.display = 'none';
    else {
      d.style.display = '-webkit-box';
      d.style.webkitLineClamp = String(lines);
    }
  }

  onMount(() => {
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(ft);
    return () => ro.disconnect();
  });
</script>

<div class="ft" bind:this={ft}>
  <p class="t type-h3" bind:this={h3}>{title}</p>
  <p class="d type-small" bind:this={d}>{desc}</p>
  <div class="chips" bind:this={chips}>
    {#each tags as tag}
      <Tag variant={tag.variant ?? 'neutral'}>{tag.label}</Tag>
    {/each}
  </div>
</div>

<style>
  .ft {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    height: 100%;
    min-height: 0;
    min-width: 0;
  }
  .t {
    margin: 0;
    color: var(--text-on-paper);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }
  .d {
    margin: 0;
    color: var(--text-on-paper-secondary);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-6);
    flex: none;
    margin-top: auto;
    max-height: 22px;
    overflow: hidden;
  }
</style>
