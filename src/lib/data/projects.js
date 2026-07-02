// Lista de proyectos — fuente única usada por la nav, la home y las
// páginas de detalle. Cuando montemos el Google Sheet, este archivo
// se generará automáticamente a partir de la planilla.
//
// Cada proyecto tiene:
//   slug, label, title, desc, imageLabel, tags  → listado y cards
//   meta    → filas del sidebar en la página de detalle
//   content → cuerpo del caso de estudio en Markdown (## genera la TOC)

export const projects = [
  {
    slug: 'ucap',
    label: 'Ucap: Dashboard',
    title: 'Ucap: Dashboard',
    desc: 'Diseño end-to-end de una plataforma B2B de aprendizaje corporativo con IA. Dashboards complejos, visualización de datos y colaboración interdisciplinar.',
    imageLabel: 'imagen — Ucap Dashboard',
    tags: [{ label: 'Profesional', variant: 'primary' }, { label: '2025' }],
    meta: [
      { label: 'Empresa', value: 'Ulern / Edtech' },
      { label: 'Año', value: '2025' },
      { label: 'Tipo', tags: [{ label: 'Profesional', variant: 'primary' }] },
      { label: 'Mi rol', value: 'Product Designer' },
      { label: 'Herramientas', value: 'Figma · Notion' }
    ],
    content: `## Contexto\n\nContenido en preparación. Este caso de estudio se completará pronto.\n\n## El problema\n\nPróximamente.`
  },
  {
    slug: 'ulern',
    label: 'Ulern: Study Session',
    title: 'Ulern: Study Session End Screen',
    desc: 'Diseño de la pantalla de cierre de sesión de estudio para Ulern. UX, animaciones con datos y fundamentos pedagógicos.',
    imageLabel: 'imagen — Ulern',
    tags: [{ label: 'Profesional', variant: 'primary' }, { label: '2025' }],
    meta: [
      { label: 'Empresa', value: 'Ulern / Edtech' },
      { label: 'Año', value: '2025' },
      { label: 'Tipo', tags: [{ label: 'Profesional', variant: 'primary' }] },
      { label: 'Mi rol', value: 'Product Designer' },
      { label: 'Herramientas', value: 'Figma' }
    ],
    content: `## Contexto\n\nContenido en preparación. Este caso de estudio se completará pronto.\n\n## El problema\n\nPróximamente.`
  },
  {
    slug: 'aurora',
    label: 'Aurora Design System',
    title: 'Aurora Design System',
    desc: 'Sistema de diseño completo para una plataforma académica: investigación, diseño en Figma e implementación en código.',
    imageLabel: 'imagen — Aurora DS',
    tags: [{ label: 'Capstone' }, { label: '2024' }],
    meta: [
      { label: 'Empresa', value: 'PUCV — Wiki Casiopea' },
      { label: 'Año', value: '2024' },
      { label: 'Tipo', tags: [{ label: 'Capstone' }, { label: 'UI & Front-End' }] },
      { label: 'Mi rol', value: 'Lead Designer' },
      { label: 'Estado', tags: [{ label: 'Entregado', variant: 'primary' }] },
      { label: 'Herramientas', value: 'Figma · GitHub · VS Code' }
    ],
    content: `## Contexto

Este proyecto corresponde a mi tesis de pregrado, desarrollada entre marzo y diciembre de 2024. Junto a dos compañeros y con la guía de nuestra profesora, trabajamos en el rediseño de la plataforma Wiki Casiopea.

Mi foco personal fue crear una nueva skin visual que modernizara la apariencia de la plataforma y mejorara significativamente la experiencia de usuario. Durante el primer semestre realizamos investigación con usuarios y propusimos una dirección de diseño inicial. Desde ahí, tomé la responsabilidad de diseñar un sistema de diseño completo en Figma, para luego implementarlo en código.

## El problema

Wiki Casiopea es la wiki académica más grande de Chile. Estudiantes y profesores de la Escuela de Arquitectura y Diseño de la PUCV la usan para documentar cursos, proyectos y eventos. Sin embargo, la investigación reveló que la interfaz compleja y poco intuitiva era la principal barrera para su uso efectivo.

### Hallazgos de investigación

Realizamos encuestas con 60 participantes y entrevistas con 12 usuarios — profesores y estudiantes de Diseño y Arquitectura. Los hallazgos fueron consistentes: la plataforma requería conocimiento técnico para editar contenido, la curva de aprendizaje era demasiado empinada, y los estudiantes de Arquitectura la percibían como inaccesible y desorganizada.

> La complejidad de la interfaz y la falta de intuitividad son las principales barreras para la adopción efectiva de Wiki Casiopea.

## Propuesta

El proyecto apuntaba a mejorar la usabilidad y accesibilidad de Wiki Casiopea rediseñando su interfaz para hacerla más moderna, intuitiva y amigable, mientras se reforzaba su filosofía abierta y colaborativa.

La propuesta incluía: una sidebar fija para navegación interna en una misma página, modificaciones al menú para encontrar información más fácilmente, un diseño limpio y accesible compatible con dispositivos móviles, y un sistema de diseño modular con documentación clara.

## Sistema de diseño en Figma

Creé un sistema de diseño que contiene todos los componentes base y estilos, lo que permitirá el desarrollo posterior de templates en Mustache y LESS para la nueva skin. La documentación clara fue clave: necesitaba ser comprensible tanto para desarrolladores avanzados como para estudiantes de diseño desde tercer año en adelante. Cada componente fue documentado con convenciones de nombres claras, variantes y estados.

![Dashboard del sistema Aurora con componentes y visualización de datos](/images/proyectos/aurora/dashboard.png "Vista general del sistema Aurora aplicado a un dashboard")

## Implementación en código

Una vez estructurado el sistema de diseño y definido el diseño visual, se crearon templates usando Mustache, que luego se renderizaron como páginas HTML. Para el manejo de estilos se usó LESS, un preprocesador CSS que permite mejor organización de variables y estilos, de manera similar a cómo se gestionan en Figma. Todo el proceso se llevó a cabo usando Visual Studio Code y GitHub.

\`\`\`mermaid
flowchart TD
    A((Inicio)) --> B[Definir componente en Figma]
    B --> C{¿Cumple con los tokens?}
    C -- No --> D[Ajustar variables y estilos]
    D --> C
    C -- Sí --> E[Crear template en Mustache]
    E --> F[Aplicar estilos en LESS]
    F --> G{¿Pasa revisión visual?}
    G -- No --> D
    G -- Sí --> H[Renderizar a HTML]
    H --> I((Fin))
\`\`\`

## Entregable final

Se creó una página de documentación de componentes usando el mismo sistema de diseño desarrollado para el proyecto. Esta documentación está disponible públicamente y el repositorio del proyecto se puede encontrar en GitHub.

## Aprendizajes

Este proyecto me permitió entender en profundidad el puente entre diseño y desarrollo — crear documentación que funciona tanto para diseñadores como para desarrolladores, llevar un sistema de diseño desde Figma hasta producción, y trabajar con las restricciones reales de un stack tecnológico preexistente.`
  },
  {
    slug: 'glukko',
    label: 'Glukko App',
    title: 'Glukko App',
    desc: 'Aplicación de soporte para personas con diabetes. Research, prototipado y testing de usabilidad.',
    imageLabel: 'imagen — Glukko',
    tags: [{ label: 'Académico' }, { label: '2024' }],
    meta: [
      { label: 'Tipo', tags: [{ label: 'Académico' }] },
      { label: 'Año', value: '2024' },
      { label: 'Mi rol', value: 'UX Designer' },
      { label: 'Herramientas', value: 'Figma' }
    ],
    content: `## Contexto\n\nContenido en preparación. Este caso de estudio se completará pronto.\n\n## El problema\n\nPróximamente.`
  },
  {
    slug: 'otros',
    label: 'Otros proyectos',
    title: 'Otros proyectos',
    desc: 'Piezas gráficas, email marketing, presentaciones, diseño editorial y más.',
    imageLabel: 'imagen — Otros proyectos',
    tags: [{ label: 'Varios' }, { label: '2023–2025' }],
    meta: [
      { label: 'Tipo', tags: [{ label: 'Varios' }] },
      { label: 'Período', value: '2023–2025' }
    ],
    content: `## Trabajos varios\n\nContenido en preparación. Esta sección reunirá piezas gráficas, email marketing, presentaciones y diseño editorial.`
  }
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
