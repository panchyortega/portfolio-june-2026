import adapter from '@sveltejs/adapter-static';

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
      // Si publicas en usuario.github.io/portfolio-june-2026 descomenta la línea:
      // base: '/portfolio-june-2026'
    }
  }
};

export default config;
