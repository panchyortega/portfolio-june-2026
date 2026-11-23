/**
 * Comportamiento de los videos de contenido (.video-frame):
 * - Siempre en loop, silenciados, sin controles nativos.
 * - Clic (o Espacio/Enter) en el marco pausa y reanuda.
 * - Al hacer hover aparece una línea de progreso superpuesta; se puede
 *   arrastrar para saltar a otro momento del video.
 * - Solo se reproducen mientras están visibles en pantalla. Si la persona
 *   prefiere menos movimiento, parten en pausa.
 *
 * Uso (en onMount de la página):
 *   const cleanup = setupVideos(containerEl);
 *   return cleanup;
 */

const KEY_STEP_S = 2;

/**
 * @param {HTMLElement} container
 * @returns {() => void} función de limpieza
 */
export function setupVideos(container) {
  const nodes = [...container.querySelectorAll('.video-frame')];
  const cleanups = nodes.map(setupOne);
  return () => cleanups.forEach((fn) => fn());
}

function setupOne(root) {
  const video = root.querySelector('video');
  const track = root.querySelector('.video-scrub');
  if (!video || !track) return () => {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let paused = reduceMotion; // intención de la persona (el atributo muted no siempre pasa al elemento)
  let visible = false;
  let dragging = false;
  let raf = 0;

  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  function setProgress() {
    const d = video.duration;
    const ratio = d && isFinite(d) ? Math.min(1, Math.max(0, video.currentTime / d)) : 0;
    root.style.setProperty('--progress', String(ratio));
  }

  function apply() {
    root.classList.toggle('is-paused', paused);
    if (!paused && visible && !dragging) video.play().catch(() => {});
    else video.pause();
  }

  function toggle() {
    paused = !paused;
    apply();
  }

  // El aspect ratio real sale del propio video (evita barras y saltos de layout)
  function fitRatio() {
    if (video.videoWidth && video.videoHeight) {
      root.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    }
    setProgress();
  }
  if (video.readyState >= 1) fitRatio();
  video.addEventListener('loadedmetadata', fitRatio);
  video.addEventListener('timeupdate', setProgress);

  // Progreso fluido mientras la línea está visible
  function tick() {
    setProgress();
    raf = requestAnimationFrame(tick);
  }
  function startTick() {
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function stopTick() {
    if (dragging) return;
    cancelAnimationFrame(raf);
    raf = 0;
  }
  root.addEventListener('pointerenter', startTick);
  root.addEventListener('pointerleave', stopTick);

  // Clic en el marco = pausar / reanudar
  root.addEventListener('click', toggle);

  // Teclado: Espacio/Enter pausa, flechas saltan
  function onKey(e) {
    if (e.target !== root) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const d = video.duration || 0;
      const next = video.currentTime + (e.key === 'ArrowRight' ? KEY_STEP_S : -KEY_STEP_S);
      video.currentTime = Math.min(d, Math.max(0, next));
      setProgress();
    }
  }
  root.addEventListener('keydown', onKey);

  // Línea de progreso arrastrable
  function seekFromEvent(e) {
    const d = video.duration;
    if (!d || !isFinite(d)) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * d;
    setProgress();
  }
  function onDown(e) {
    e.stopPropagation();
    e.preventDefault();
    dragging = true;
    root.classList.add('is-scrubbing');
    track.setPointerCapture(e.pointerId);
    startTick();
    apply(); // pausa mientras se arrastra
    seekFromEvent(e);
  }
  function onMove(e) {
    if (dragging) seekFromEvent(e);
  }
  function onUp(e) {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('is-scrubbing');
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    if (!root.matches(':hover')) stopTick();
    apply(); // retoma si la persona no lo había pausado
  }
  track.addEventListener('pointerdown', onDown);
  track.addEventListener('pointermove', onMove);
  track.addEventListener('pointerup', onUp);
  track.addEventListener('pointercancel', onUp);
  track.addEventListener('click', (e) => e.stopPropagation()); // no confundir con pausa

  // Solo reproduce mientras se ve
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      apply();
    },
    { threshold: 0.25 }
  );
  io.observe(root);

  root.classList.toggle('is-paused', paused);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    video.pause();
    root.removeEventListener('click', toggle);
    root.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerenter', startTick);
    root.removeEventListener('pointerleave', stopTick);
    video.removeEventListener('loadedmetadata', fitRatio);
    video.removeEventListener('timeupdate', setProgress);
  };
}
