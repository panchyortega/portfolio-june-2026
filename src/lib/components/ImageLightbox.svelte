<script>
  import { ZoomIn, ZoomOut, X, RotateCcw } from '@lucide/svelte';

  /**
   * Lightbox de imagen con zoom y paneo.
   * @prop {string|null} src - si tiene valor, el lightbox está abierto
   * @prop {string} [alt]
   * @prop {() => void} onclose
   */
  let { src = null, alt = '', onclose } = $props();

  let scale = $state(1);
  let tx = $state(0);
  let ty = $state(0);

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;

  const MIN = 1;
  const MAX = 6;

  // Resetea la vista cada vez que se abre una imagen nueva
  $effect(() => {
    if (src) {
      scale = 1;
      tx = 0;
      ty = 0;
    }
  });

  function zoomIn() { scale = Math.min(+(scale * 1.4).toFixed(2), MAX); }
  function zoomOut() {
    scale = Math.max(+(scale / 1.4).toFixed(2), MIN);
    if (scale === MIN) { tx = 0; ty = 0; }
  }
  function reset() { scale = 1; tx = 0; ty = 0; }

  function onWheel(e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }

  function onPointerDown(e) {
    if (scale === MIN) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = tx;
    baseY = ty;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    tx = baseX + (e.clientX - startX);
    ty = baseY + (e.clientY - startY);
  }
  function onPointerUp() { dragging = false; }

  function onKeydown(e) {
    if (!src) return;
    if (e.key === 'Escape') onclose?.();
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-') zoomOut();
  }

  function onBackdropClick(e) {
    // Cierra solo si clickeas el fondo, no la imagen ni la barra
    if (e.target === e.currentTarget) onclose?.();
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if src}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Visor de imagen" onclick={onBackdropClick}>
    <div class="lb-toolbar">
      <button class="lb-btn" onclick={zoomOut} aria-label="Alejar"><ZoomOut size={20} /></button>
      <button class="lb-btn" onclick={zoomIn} aria-label="Acercar"><ZoomIn size={20} /></button>
      <button class="lb-btn" onclick={reset} aria-label="Restablecer zoom"><RotateCcw size={18} /></button>
      <button class="lb-btn" onclick={() => onclose?.()} aria-label="Cerrar"><X size={20} /></button>
    </div>

    <img
      class="lb-img"
      class:grabbable={scale > MIN}
      src={src}
      {alt}
      style="transform: translate({tx}px, {ty}px) scale({scale}); cursor: {scale > MIN ? (dragging ? 'grabbing' : 'grab') : 'zoom-in'};"
      onwheel={onWheel}
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onclick={(e) => { if (scale === MIN) zoomIn(); e.stopPropagation(); }}
      draggable="false"
    />
  </div>
{/if}

<style>
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(17, 23, 16, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: fade var(--duration-normal) var(--ease-default);
  }
  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .lb-toolbar {
    position: absolute;
    top: var(--space-16);
    right: var(--space-16);
    display: flex;
    gap: var(--space-8);
    z-index: 2;
  }
  .lb-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: none;
    border-radius: var(--radius-default);
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-default);
  }
  .lb-btn:hover { background: rgba(255, 255, 255, 0.22); }

  .lb-img {
    max-width: 92vw;
    max-height: 88vh;
    object-fit: contain;
    border-radius: var(--radius-default);
    user-select: none;
    touch-action: none;
    transition: transform 60ms linear;
  }
</style>
