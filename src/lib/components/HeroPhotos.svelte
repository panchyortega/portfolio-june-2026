<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  /**
   * HeroPhotos — dos fotos unidas por un clip (hero del home).
   * Hover: las fotos se abren y se quedan abiertas; al salir caen (algunas variantes rebotan una vez).
   * Clic / toque: toda la animación de una. Salen destellos vectoriales (4 puntas y círculos).
   * El ciclo de 5 variantes es: rebota, rebota (distinto), no rebota, rebota, no rebota.
   */

  let duo = $state();
  let phFront = $state();
  let phBack = $state();
  let fxLayer = $state();

  onMount(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const REST = { f: 5, b: -5 };              // reposo: la de adelante con la parte de abajo a la izquierda, la de atrás a la derecha
    /* f/b = grados que se abre cada foto (el 2º valor es el rebote); t = momentos de la animación completa;
       fx = destellos de esa variante: n cantidad, mix proporción de círculos, size rango en px, pat dónde salen */
    const VARIANTS = [
      { dur: 1050, lag: 90,  f: [11, 3.5], b: [9, 3],    t: [.34, .64, .80], fx: { n: 11, mix: .50, size: [7, 15],  pat: 'top' } },
      { dur: 1100, lag: 130, f: [12, 4.5], b: [10, 2.5], t: [.35, .66, .82], fx: { n: 10, mix: .40, size: [8, 18],  pat: 'sides' } },
      { dur: 900,  lag: 70,  f: [10],      b: [9],       t: [.38],           fx: { n: 8,  mix: .30, size: [10, 20], pat: 'ring' } },
      { dur: 1000, lag: 100, f: [10, 3],   b: [11, 3.5], t: [.36, .65, .80], fx: { n: 9,  mix: .20, size: [12, 24], pat: 'scatter' } },
      { dur: 950,  lag: 80,  f: [10],      b: [8],       t: [.37],           fx: { n: 9,  mix: .65, size: [8, 16],  pat: 'bottom' } }
    ];
    const UP = 'cubic-bezier(.25,.6,.35,1)';   // sube suave
    const DOWN = 'cubic-bezier(.4,0,.75,.6)';  // cae con una aceleración leve (gravedad)

    /* ───── Destellos ───── */
    const PATHS = {
      s: '<path d="M12 0C12.9 7.4 16.6 11.1 24 12C16.6 12.9 12.9 16.6 12 24C11.1 16.6 7.4 12.9 0 12C7.4 11.1 11.1 7.4 12 0Z"/>',
      c: '<circle cx="12" cy="12" r="10"/>'
    };
    const rnd = (a, b) => a + Math.random() * (b - a);
    const PAT = {                              // devuelven x,y en % de la caja de las fotos
      ring:    () => { const t = rnd(0, 6.283); return [50 + 56 * Math.cos(t), 50 + 52 * Math.sin(t)]; },
      top:     () => { const t = rnd(-2.9, -.25); return [50 + 58 * Math.cos(t), 42 + 50 * Math.sin(t)]; },
      scatter: () => [rnd(2, 98), rnd(6, 96)],
      sides:   (i) => [i % 2 ? rnd(-6, 8) : rnd(92, 106), rnd(14, 90)],
      bottom:  () => { const t = rnd(.25, 2.9); return [50 + 58 * Math.cos(t), 52 + 50 * Math.sin(t)]; }
    };
    function burst(fx, count, span) {
      for (let i = 0; i < count; i++) {
        const [x, y] = PAT[fx.pat](i);
        const circ = Math.random() < fx.mix;
        const size = rnd(fx.size[0], fx.size[1]) * (circ ? .55 : 1);
        const el = document.createElement('span');
        el.className = 'sp';
        el.style.cssText = `left:${(x + 6) / 1.12}%;top:${(y + 6) / 1.12}%;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px`;
        el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${PATHS[circ ? 'c' : 's']}</svg>`;
        fxLayer.appendChild(el);
        const ox = x - 50, oy = y - 50, l = Math.hypot(ox, oy) || 1, dr = rnd(8, 20);
        const dx = ox / l * dr, dy = oy / l * dr - 4;
        const rot = circ ? 0 : rnd(40, 100) * (Math.random() < .5 ? -1 : 1);
        const a = el.animate([
          { transform: 'translate(0,0) scale(0) rotate(0deg)', opacity: 0 },
          { transform: `translate(${dx * .5}px,${dy * .5}px) scale(1) rotate(${rot * .5}deg)`, opacity: 1, offset: .4 },
          { transform: `translate(${dx}px,${dy}px) scale(0) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: rnd(520, 820), delay: rnd(0, span), easing: 'ease-out', fill: 'both' });
        a.finished.then(() => el.remove(), () => el.remove());
      }
    }

    /* ───── Fotos ───── */
    // sign +1 = sentido del reloj (la de adelante), −1 = antihorario (la de atrás); las dos giran desde el clip
    const photos = [
      { el: phFront, rest: REST.f, sign: +1, k: 'f' },
      { el: phBack,  rest: REST.b, sign: -1, k: 'b' }
    ];
    const angle = (el) => {
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/);
      if (!m) return 0;
      const q = m[1].split(',').map(Number);
      return Math.atan2(q[1], q[0]) * 180 / Math.PI;
    };
    // La sombra vive en la superficie: en reposo es corta y al abrirse (la foto se aleja) se desplaza, se difumina y se suaviza
    const shadow = (l) => `0 ${(1 + 8 * l).toFixed(1)}px ${(3 + 14 * l).toFixed(1)}px rgba(0, 0, 0, ${(0.12 - 0.02 * l).toFixed(3)})`;
    const R = (a, rest = a) => ({ transform: `rotate(${a}deg)`, boxShadow: shadow(Math.min(1, Math.abs(a - rest) / 12)) });
    // arranca siempre desde el ángulo actual, así nunca pega un salto si se interrumpe una animación
    const run = (o, kfs, dur, delay) => {
      const cur = angle(o.el), sh = getComputedStyle(o.el).boxShadow;
      o.el._a?.cancel();
      kfs[0].transform = `rotate(${cur}deg)`;
      kfs[0].boxShadow = sh;
      const a = o.el.animate(kfs, { duration: dur, delay, fill: 'both' });
      o.el._a = a;
      return a.finished;
    };
    const lagOf = (o, v) => (o.k === 'b' ? v.lag : 0);

    let vi = 0;                                 // variante que toca
    let hv = VARIANTS[0];                       // variante en curso
    let busy = false;                           // true mientras corre la animación completa del clic

    // Hover: suben a su punto abierto y SE QUEDAN ahí
    function open() {
      if (busy) return;
      hv = VARIANTS[vi];
      photos.forEach((o) =>
        run(o, [{ ...R(0), easing: UP }, R(o.rest + o.sign * hv[o.k][0], o.rest)], hv.dur * hv.t[0], lagOf(o, hv))
      );
      burst(hv.fx, Math.ceil(hv.fx.n * .6), hv.dur * hv.t[0]);
    }
    // Salir del hover: recién ahí caen (y rebotan una vez si esa variante rebota)
    function close() {
      if (busy) return;
      if (!photos.some((o) => Math.abs(angle(o.el) - o.rest) > .4)) return;
      burst(hv.fx, Math.ceil(hv.fx.n * .5), hv.dur * (1 - hv.t[0]));
      photos.forEach((o) => {
        const kf = [{ ...R(0), easing: DOWN }, R(o.rest)];
        if (hv[o.k].length > 1) {
          kf.splice(1, 0,
            { ...R(o.rest), offset: .6, easing: UP },
            { ...R(o.rest + o.sign * hv[o.k][1], o.rest), offset: .8, easing: DOWN });
        }
        run(o, kf, hv.dur * (1 - hv.t[0]), lagOf(o, hv) * .5);
      });
      vi = (vi + 1) % VARIANTS.length;
    }
    // Clic o toque: toda la animación de una (sube, cae y rebota si toca)
    function full() {
      if (busy) return;
      hv = VARIANTS[vi];
      vi = (vi + 1) % VARIANTS.length;
      busy = true;
      const ps = photos.map((o) => {
        const t = hv.t, pk = hv[o.k], a = (d) => R(o.rest + o.sign * d, o.rest);
        const kf = [{ ...R(0), offset: 0, easing: UP }, { ...a(pk[0]), offset: t[0], easing: DOWN }];
        if (pk.length > 1) kf.push({ ...R(o.rest), offset: t[1], easing: UP }, { ...a(pk[1]), offset: t[2], easing: DOWN });
        kf.push({ ...R(o.rest), offset: 1 });
        return run(o, kf, hv.dur, lagOf(o, hv));
      });
      burst(hv.fx, hv.fx.n, hv.dur * .75);
      Promise.allSettled(ps).then(() => { busy = false; });
    }

    duo.addEventListener('mouseenter', open);
    duo.addEventListener('mouseleave', close);
    duo.addEventListener('click', full);
    return () => {
      duo.removeEventListener('mouseenter', open);
      duo.removeEventListener('mouseleave', close);
      duo.removeEventListener('click', full);
      photos.forEach((o) => o.el._a?.cancel());
    };
  });
</script>

<div class="duo" bind:this={duo}>
  <div class="ph back" bind:this={phBack}>
    <img src="{base}/images/home/paisaje.jpg" alt="Paisaje de dunas y humedal" width="960" height="720" loading="eager" />
  </div>
  <div class="ph front" bind:this={phFront}>
    <img src="{base}/images/home/foto-fran.jpg" alt="Retrato de Fran Ortega" width="720" height="1126" loading="eager" />
  </div>
  <span class="clip" aria-hidden="true"></span>
  <div class="fx" bind:this={fxLayer} aria-hidden="true"></div>
</div>

<style>
  .duo {
    --px: 50%;    /* posición del clip: ancla común de las dos fotos */
    --py: 9%;
    position: relative;
    width: 100%;
    max-width: 460px;
    aspect-ratio: 1 / 0.86;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .ph {
    position: absolute;
    top: calc(var(--py) - 16px);
    padding: var(--space-8);
    background: var(--bg-paper);
    border: 1px solid var(--border-paper);
    border-radius: var(--radius-default);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    will-change: transform, box-shadow;
  }
  .ph img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-subtle);
  }
  /* El origen de la rotación es el clip, para las dos fotos */
  .back {
    width: 78%;
    aspect-ratio: 4 / 3.18;
    left: calc(var(--px) - 36% * .78);
    transform-origin: 36% 16px;
    transform: rotate(-5deg);
    z-index: 1;
  }
  .back img { object-position: 70% 50%; }
  .front {
    width: 56%;
    aspect-ratio: 3 / 4.15;
    left: calc(var(--px) - 64% * .56);
    transform-origin: 64% 16px;
    transform: rotate(5deg);
    z-index: 2;
  }
  .front img { object-position: 50% 25%; }

  /* Clip */
  .clip {
    position: absolute;
    z-index: 5;
    left: calc(var(--px) - 7px);
    top: calc(var(--py) - 30px);
    width: 14px;
    height: 42px;
    border: 2px solid var(--border-clip);
    border-radius: 7px;
    pointer-events: none;
  }
  .clip::after {
    content: '';
    position: absolute;
    left: 1px;
    right: 1px;
    top: 9px;
    bottom: -3px;
    border: 2px solid var(--border-clip);
    border-radius: 5px;
  }

  /* Destellos (se crean desde JS, por eso :global) */
  .fx {
    position: absolute;
    inset: -6%;
    z-index: 6;
    pointer-events: none;
    overflow: visible;
  }
  .fx :global(.sp) {
    position: absolute;
    display: block;
    will-change: transform, opacity;
  }
  .fx :global(.sp svg) {
    display: block;
    width: 100%;
    height: 100%;
    fill: var(--fill-sparkle);
  }
</style>
