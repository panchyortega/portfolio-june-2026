// Lista de proyectos — fuente única usada por la nav, la home y las
// páginas de detalle. Cuando montemos el Google Sheet, este archivo
// se generará automáticamente a partir de la planilla.
export const projects = [
  {
    slug: 'ucap',
    label: 'Ucap: Dashboard',
    title: 'Ucap: Dashboard',
    desc: 'Diseño end-to-end de una plataforma B2B de aprendizaje corporativo con IA. Dashboards complejos, visualización de datos y colaboración interdisciplinar.',
    imageLabel: 'imagen — Ucap Dashboard',
    tags: [
      { label: 'Profesional', variant: 'primary' },
      { label: '2025' }
    ]
  },
  {
    slug: 'ulern',
    label: 'Ulern: Study Session',
    title: 'Ulern: Study Session End Screen',
    desc: 'Diseño de la pantalla de cierre de sesión de estudio para Ulern. UX, animaciones con datos y fundamentos pedagógicos.',
    imageLabel: 'imagen — Ulern',
    tags: [
      { label: 'Profesional', variant: 'primary' },
      { label: '2025' }
    ]
  },
  {
    slug: 'aurora',
    label: 'Aurora Design System',
    title: 'Aurora Design System',
    desc: 'Sistema de diseño completo para una plataforma académica: investigación, diseño en Figma e implementación en código.',
    imageLabel: 'imagen — Aurora DS',
    tags: [
      { label: 'Capstone' },
      { label: '2024' }
    ]
  },
  {
    slug: 'glukko',
    label: 'Glukko App',
    title: 'Glukko App',
    desc: 'Aplicación de soporte para personas con diabetes. Research, prototipado y testing de usabilidad.',
    imageLabel: 'imagen — Glukko',
    tags: [
      { label: 'Académico' },
      { label: '2024' }
    ]
  },
  {
    slug: 'otros',
    label: 'Otros proyectos',
    title: 'Otros proyectos',
    desc: 'Piezas gráficas, email marketing, presentaciones, diseño editorial y más.',
    imageLabel: 'imagen — Otros proyectos',
    tags: [
      { label: 'Varios' },
      { label: '2023–2025' }
    ]
  }
];

// Helper para buscar un proyecto por slug
export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
