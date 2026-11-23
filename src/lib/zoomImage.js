/**
 * Comportamiento de pan + zoom in-situ para las imágenes de contenido.
 * Reemplaza el patrón de lightbox: la imagen se manipula dentro de su
 * propio marco, sin overlay a pantalla completa.
 *
 * Uso (en onMount de la página):
 *   const cleanup = setupZoomImages(containerEl);
 *   return cleanup;
 */

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const MIN_VISIBLE = 0.2; // fracción mínima de la imagen que queda visible al panear
const EPS = 0.001;
const WHEEL_SETTLE_MS = 150;

// Grilla de puntos adaptativa (como Figma): la separación en pantalla siempre
// queda entre DOT_STEP y 2×DOT_STEP. Al acercar, aparecen puntos intermedios
// con un fundido; al alejar, se van. Al 100% la separación es exactamente DOT_STEP.
const DOT_STEP = 16; // px en pantalla al 100%
const ANIM_MS = 340;
const easeOut = (t) => 1 - Math.pow(1 - t, 4); // ≈ cubic-bezier(0.22, 1, 0.36, 1)

/**
 * @param {HTMLElement} container
 * @returns {() => void} función de limpieza
 */
export function setupZoomImages(container) {
  const nodes = [...container.querySelectorAll('.zoom-image')];
  const cleanups = nodes.map(setupOne);
  return () => cleanups.forEach((fn) => fn());
}

function setupOne(root) {
  const canvas = root.querySelector('.zoom-canvas');
  const dots = root.querySelector('.zoom-dots');
  const img = root.querySelector('img');
  const zoomLabel = root.querySelector('.zoom-level');
  const controls = root.querySelector('.zoom-controls');
  const btnIn = root.querySelector('[data-act="in"]');
  const btnOut = root.querySelector('[data-act="out"]');
  const btnReset = root.querySelector('[data-act="reset"]');

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let lastFocalX = 0;
  let lastFocalY = 0;
  let wheelTimer = null;

  // El aspect ratio del marco lo define la imagen real, no un valor fijo.
  function setAspectRatio() {
    if (img.naturalWidth && img.naturalHeight) {
      root.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
    }
  }
  if (img.complete) setAspectRatio();
  else img.addEventListener('load', setAspectRatio, { once: true });

  function bounds() {
    const w = root.clientWidth;
    const h = root.clientHeight;
    const cw = w * scale;
    const ch = h * scale;
    return {
      minX: -cw + w * MIN_VISIBLE,
      maxX: w - w * MIN_VISIBLE,
      minY: -ch + h * MIN_VISIBLE,
      maxY: h - h * MIN_VISIBLE
    };
  }

  function updateButtons() {
    btnIn.disabled = scale >= MAX_SCALE - EPS;
    btnOut.disabled = scale <= MIN_SCALE + EPS;
    btnReset.disabled = Math.abs(scale - 1) < EPS && Math.abs(tx) < 0.5 && Math.abs(ty) < 0.5;
  }

  // Dibuja la grilla para un estado dado (escala y desplazamiento)
  function drawDots(s, x, y) {
    if (!dots) return;
    let step = DOT_STEP * s;
    while (step < DOT_STEP - EPS) step *= 2;
    while (step >= DOT_STEP * 2 - EPS) step /= 2;
    // 0 al 100% (solo la grilla base) → 1 justo antes de duplicarse
    const fine = Math.min(1, Math.max(0, (step - DOT_STEP) / DOT_STEP));
    dots.style.setProperty('--dot-step', `${step}px`);
    dots.style.setProperty('--dot-fine', String(fine));
    dots.style.backgroundPosition = `${x}px ${y}px, ${x + step / 4}px ${y + step / 4}px`;
  }

  // Los puntos siguen la misma curva que la transición CSS del canvas
  let dotsState = { s: 1, x: 0, y: 0 };
  let dotsRaf = 0;
  function animateDots(animate) {
    cancelAnimationFrame(dotsRaf);
    const from = { ...dotsState };
    const to = { s: scale, x: tx, y: ty };
    if (!animate) {
      dotsState = to;
      drawDots(to.s, to.x, to.y);
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const k = easeOut(Math.min(1, (now - t0) / ANIM_MS));
      dotsState = {
        s: from.s + (to.s - from.s) * k,
        x: from.x + (to.x - from.x) * k,
        y: from.y + (to.y - from.y) * k
      };
      drawDots(dotsState.s, dotsState.x, dotsState.y);
      if (k < 1) dotsRaf = requestAnimationFrame(step);
    };
    dotsRaf = requestAnimationFrame(step);
  }

  function apply(animate) {
    canvas.style.transition = animate ? 'transform 340ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    canvas.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    animateDots(animate);
    zoomLabel.textContent = Math.round(scale * 100) + '%';
    updateButtons();
  }

  const clampHard = (v, min, max) => Math.min(max, Math.max(min, v));
  const clampRubber = (v, min, max, resistance = 0.35) => {
    if (v < min) return min - (min - v) * resistance;
    if (v > max) return max + (v - max) * resistance;
    return v;
  };

  function settlePan() {
    const b = bounds();
    tx = clampHard(tx, b.minX, b.maxX);
    ty = clampHard(ty, b.minY, b.maxY);
    apply(true);
  }

  // Zoom "duro" — botones y doble click. Nunca pasa de los límites.
  function zoomAt(targetScale, cx, cy, animate) {
    const prev = scale;
    const next = clampHard(targetScale, MIN_SCALE, MAX_SCALE);
    if (Math.abs(next - prev) < EPS) return;
    scale = next;
    const rect = root.getBoundingClientRect();
    const px = cx ?? rect.width / 2;
    const py = cy ?? rect.height / 2;
    tx = px - (px - tx) * (scale / prev);
    ty = py - (py - ty) * (scale / prev);
    const b = bounds();
    tx = clampHard(tx, b.minX, b.maxX);
    ty = clampHard(ty, b.minY, b.maxY);
    apply(animate);
  }

  // Zoom con rueda: elástico y continuo mientras se scrollea; se asienta
  // en el límite real recién cuando el gesto termina (evita flicker).
  function wheelZoom(factor, cx, cy) {
    lastFocalX = cx;
    lastFocalY = cy;
    const prev = scale;
    let raw = scale * factor;
    raw = clampHard(raw, MIN_SCALE * 0.55, MAX_SCALE * 1.25);
    scale = clampRubber(raw, MIN_SCALE, MAX_SCALE, 0.4);
    tx = cx - (cx - tx) * (scale / prev);
    ty = cy - (cy - ty) * (scale / prev);
    const b = bounds();
    tx = clampHard(tx, b.minX, b.maxX);
    ty = clampHard(ty, b.minY, b.maxY);
    apply(false);

    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(settleWheelZoom, WHEEL_SETTLE_MS);
  }

  function settleWheelZoom() {
    const target = clampHard(scale, MIN_SCALE, MAX_SCALE);
    if (Math.abs(target - scale) > EPS) {
      const prev = scale;
      scale = target;
      tx = lastFocalX - (lastFocalX - tx) * (scale / prev);
      ty = lastFocalY - (lastFocalY - ty) * (scale / prev);
    }
    settlePan();
  }

  function onWheel(e) {
    e.preventDefault();
    const rect = root.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const unit = e.deltaMode === 1 ? 15 : 1;
    const amount = e.deltaY * unit;
    const factor = Math.exp(-amount * 0.0018);
    wheelZoom(factor, cx, cy);
  }
  root.addEventListener('wheel', onWheel, { passive: false });

  // Los botones detienen la propagación: si no, el pointerdown burbujea
  // al contenedor, que captura el puntero y "roba" el click del botón.
  function stopProp(e) { e.stopPropagation(); }
  controls.addEventListener('pointerdown', stopProp);
  controls.addEventListener('dblclick', stopProp);

  function onIn() { zoomAt(scale * 1.4, undefined, undefined, true); }
  function onOut() { zoomAt(scale / 1.4, undefined, undefined, true); }
  function onReset() { scale = 1; tx = 0; ty = 0; apply(true); }
  btnIn.addEventListener('click', onIn);
  btnOut.addEventListener('click', onOut);
  btnReset.addEventListener('click', onReset);

  // Doble click: si no está en 100%, vuelve a 100% centrada (punto de
  // referencia fácil). Si ya está en 100%, acerca a 200% hacia el cursor.
  function onDblClick(e) {
    const rect = root.getBoundingClientRect();
    const atOriginal = Math.abs(scale - 1) < EPS;
    if (atOriginal) {
      zoomAt(2, e.clientX - rect.left, e.clientY - rect.top, true);
    } else {
      scale = 1;
      tx = 0;
      ty = 0;
      apply(true);
    }
  }
  root.addEventListener('dblclick', onDblClick);

  // Arrastre — pointer capture + listeners en window para que no se
  // quede "pegado" si el cursor sale del marco mientras se arrastra.
  let dragging = false;
  let sx = 0;
  let sy = 0;
  let btx = 0;
  let bty = 0;
  let pid = null;

  function onPointerDown(e) {
    dragging = true;
    pid = e.pointerId;
    root.classList.add('grabbing');
    sx = e.clientX;
    sy = e.clientY;
    btx = tx;
    bty = ty;
    try { root.setPointerCapture(pid); } catch (_) {}
  }
  function onPointerMove(e) {
    if (!dragging) return;
    const b = bounds();
    tx = clampRubber(btx + (e.clientX - sx), b.minX, b.maxX);
    ty = clampRubber(bty + (e.clientY - sy), b.minY, b.maxY);
    apply(false);
  }
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('grabbing');
    settlePan();
  }
  root.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  apply(false);

  return function cleanup() {
    cancelAnimationFrame(dotsRaf);
    clearTimeout(wheelTimer);
    root.removeEventListener('wheel', onWheel);
    controls.removeEventListener('pointerdown', stopProp);
    controls.removeEventListener('dblclick', stopProp);
    btnIn.removeEventListener('click', onIn);
    btnOut.removeEventListener('click', onOut);
    btnReset.removeEventListener('click', onReset);
    root.removeEventListener('dblclick', onDblClick);
    root.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', endDrag);
  };
}
