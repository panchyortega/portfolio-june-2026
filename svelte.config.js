import adapter from '@sveltejs/adapter-static';

// Rutas que aún no existen durante la migración. Cuando se construyan,
// se quitan de esta lista. El prerender avisa en vez de romper.
const PENDIENTES = ['/sobre-mi', '/sistema', '/proyectos'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    paths: {
      base: '/portfolio-june-2026'
    },
    prerender: {
      handleHttpError: ({ path, message }) => {
        if (PENDIENTES.some((p) => path.includes(p))) {
          console.warn('[migración] ruta pendiente, ignorada:', path);
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;
