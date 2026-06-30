import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import { getProject, projects } from '$lib/data/projects.js';
import { renderMarkdown, readingTime } from '$lib/markdown.js';

export function entries() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) error(404, 'Proyecto no encontrado');

  const project = projects[idx];
  const { html, toc } = renderMarkdown(project.content, { base });

  // Navegación circular anterior / siguiente
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return {
    project,
    html,
    toc,
    readingTime: readingTime(project.content),
    prev: { slug: prev.slug, label: prev.label },
    next: { slug: next.slug, label: next.label }
  };
}
