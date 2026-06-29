// Datos de la página Sobre mí — fuente única.

export const intro = {
  name: 'Francisca Ortega',
  bio: 'Diseñadora UX/UI titulada en Diseño con especialización en Interacción de la PUCV. Trabajo en el espacio entre visual design, sistemas de diseño e IA aplicada a experiencia de usuario. Me interesa hacer productos que tengan sentido — para quien los usa y para el negocio que los sostiene.',
  tags: ['Product Design', 'Design Systems', 'Figma', 'Santiago, Chile', 'Español · English · Italiano']
};

// Datos compactos para el sidebar izquierdo de la página
export const quickFacts = [
  { label: 'Ubicación', value: 'Santiago, Chile' },
  { label: 'Idiomas', value: 'Español · English · Italiano' },
  { label: 'Enfoque', tags: [{ label: 'Product Design' }, { label: 'Design Systems' }, { label: 'Figma' }] }
];

export const experience = [
  {
    id: 'racional',
    empresa: 'Racional',
    rol: 'Product Designer',
    fecha: '02/2026 — presente',
    tags: ['Fintech', 'Startup', 'Mobile', 'Inversiones', 'Figma', 'Agile'],
    como: 'Equipo pequeño e interfuncional — diseño, producto y tecnología comparten la misma mesa. Sprints cortos, feedback constante y mucha autonomía. Todo en híbrido, con ritmos rápidos y decisiones que se toman con pocos pero buenos datos.',
    logro: 'Diseño de flows de inversión, distribución de aportes y onboarding. Construcción del sistema de componentes y tokens en Figma, hoy en uso por el equipo. Colaboración en la definición de producto junto a CEO y Growth.',
    aprendi: {
      lead: 'Que en una fintech, la confianza del usuario es el producto.',
      rest: 'Cada decisión de diseño tiene peso legal, emocional y de negocio al mismo tiempo — y eso lo cambia todo. También aprendí que "simple" es el objetivo más difícil de alcanzar.'
    }
  },
  {
    id: 'ulern',
    empresa: 'Ulern',
    rol: 'UX/UI Designer',
    fecha: '02/2025 — 02/2026',
    tags: ['Edtech', 'Startup', 'Mobile & Web', 'IA', 'Tailwind', 'PrimeVue'],
    como: 'Única diseñadora dedicada con apoyo ocasional de un senior. Ritmos ágiles, handoff directo con dev y mucha coordinación con perfiles técnicos y de datos. Tres productos en paralelo, cada uno con su propio contexto.',
    logro: 'Diseño end-to-end de dos de los tres productos de la empresa — incluyendo dashboards de datos complejos y flows de aprendizaje adaptativo generados por IA. Desarrollo y mantención del design system en coordinación con el stack técnico.',
    aprendi: {
      lead: 'Que diseñar dashboards sin entender los datos es como decorar una casa sin saber quién va a vivir en ella.',
      rest: 'Aprendí a hacer las preguntas incómodas antes de abrir Figma — y a que el mejor wireframe a veces es una conversación.'
    }
  },
  {
    id: 'freelance',
    empresa: 'Freelance',
    rol: 'Graphic & Web Designer',
    fecha: '2022 — 2024',
    tags: ['Web Design', 'Gráfica', 'Clientes directos'],
    como: 'Empecé a freelancear mientras estudiaba porque la universidad no me daba suficiente y quería ir más lejos. Clientes directos, gestión propia, proyectos simultáneos y aprender haciendo.',
    logro: 'Diseño de landing pages, sitios web, portafolios y piezas gráficas para clientes de distintas industrias. Proyectos de principio a fin: briefing, propuesta, ejecución y entrega.',
    aprendi: {
      lead: 'Que el cliente siempre tiene razón... hasta que no la tiene.',
      rest: 'Aprendí a defender las decisiones de diseño con argumentos reales, y a saber cuándo ceder y cuándo no.'
    }
  },
  {
    id: 'cortexia',
    empresa: 'Cortexia',
    rol: 'UX/UI Design Intern',
    fecha: '12/2023 — 01/2024',
    tags: ['SaaS B2B', 'Web', 'Pasantía'],
    como: 'Primera experiencia en un equipo de producto real. Dos meses cortos pero intensos, trabajando junto a diseñadores y desarrolladores senior en un entorno B2B.',
    logro: 'Mejoras de navegación y UX en productos digitales. Wireframes, prototipos, testing de usabilidad y apoyo en la construcción del design system y dashboard.',
    aprendi: {
      lead: 'Que un buen proceso de diseño se nota en el producto, pero también en cómo trabaja el equipo.',
      rest: 'Mi primera vez viendo un design system en acción — y fue lo que más me enganchó.'
    }
  }
];

export const education = [
  {
    titulo: 'Diseño con especialización en Interacción',
    institucion: 'Pontificia Universidad Católica de Valparaíso',
    periodo: '2020 — 2024'
  },
  {
    titulo: 'Minor en Innovación y Emprendimiento',
    institucion: 'Pontificia Universidad Católica de Valparaíso',
    periodo: '2021 — 2024'
  }
];

export const skills = [
  { group: 'UX / Producto', items: ['User flows', 'Wireframing', 'Prototipado', 'Usability testing', 'Handoff'] },
  { group: 'UI / Visual', items: ['Interface design', 'Design systems', 'Tokens', 'Componentes'] },
  { group: 'Herramientas', items: ['Figma', 'Adobe CC', 'Notion', 'HTML/CSS'] },
  { group: 'Metodologías', items: ['Agile / Scrum', 'Kanban', 'Design thinking'] }
];
