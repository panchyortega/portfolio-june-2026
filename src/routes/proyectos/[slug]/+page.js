import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects.js';
import { renderMarkdown } from '$lib/markdown.js';

// Prerendera una página por cada proyecto
export function entries() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
  const project = getProject(params.slug);
  if (!project) error(404, 'Proyecto no encontrado');

  const { html, toc } = renderMarkdown(project.content);
  return { project, html, toc };
}
