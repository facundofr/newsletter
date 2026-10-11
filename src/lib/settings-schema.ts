import type { L } from "./text";

/**
 * Everything on the public site that is not a post or a project lives here.
 * Stored as one JSON row in SiteSettings and edited from /admin/settings.
 */
export type StackItem = { name: string; icon: string; url: string };
export type Labeled = { label: L };

export type SiteSettings = {
  profile: {
    name: string;
    avatar: string;
    email: string;
    location: L;
    codingSince: L;
    calendlyUrl: string;
  };
  seo: { title: L; description: L };
  hero: { title: L; subtitle: L; chips: Labeled[] };
  about: { bio: L; focus: L; highlights: Labeled[] };
  products: { title: L; subtitle: L };
  techStack: { title: L; subtitle: L; tools: StackItem[]; dev: StackItem[] };
  newsletter: { title: L; description: L };
  services: {
    headline: L;
    intro: L;
    offerings: { icon: string; title: L; description: L }[];
    processTitle: L;
    steps: { title: L; description: L }[];
    fitTitle: L;
    fit: Labeled[];
    ctaTitle: L;
    ctaLabel: L;
  };
  socials: { label: string; url: string }[];
};

const l = (es: string, en: string): L => ({ es, en });

export const defaultSettings: SiteSettings = {
  profile: {
    name: "Tu Nombre",
    avatar: "",
    email: "hola@tudominio.com",
    location: l("Buenos Aires, Argentina", "Buenos Aires, Argentina"),
    codingSince: l("Programando desde 2018", "Coding since 2018"),
    calendlyUrl: "https://calendly.com/",
  },
  seo: {
    title: l("Tu Nombre — Desarrollador", "Tu Nombre — Developer"),
    description: l(
      "Construyo software, comparto lo que aprendo y en qué estoy trabajando.",
      "I build software and share what I learn and what I'm working on.",
    ),
  },
  hero: {
    title: l("Hola, soy Tu Nombre.", "Hi, I'm Tu Nombre."),
    subtitle: l("Construyo y lanzo productos de software.", "I build and launch software products."),
    chips: [
      { label: l("🚀 Builder de SaaS", "🚀 SaaS Builder") },
      { label: l("💻 Software Engineer", "💻 Software Engineer") },
      { label: l("🏥 Healthtech", "🏥 Healthtech") },
      { label: l("✍️ Newsletter", "✍️ Newsletter") },
    ],
  },
  about: {
    bio: l(
      "Desarrollador en una empresa de medicina prepaga. Fuera del trabajo construyo productos propios, herramientas y experimentos.",
      "Developer at a healthcare company. Outside of work I build my own products, tools and experiments.",
    ),
    focus: l("Explorando agentes de IA y automatizaciones", "Exploring AI agents & automations"),
    highlights: [
      { label: l("🤖 Stack con IA", "🤖 AI Stack") },
      { label: l("🟢 Proyectos en producción", "🟢 Projects in production") },
      { label: l("🏥 Software de salud", "🏥 Healthcare software") },
    ],
  },
  products: {
    title: l("Mis proyectos", "My projects"),
    subtitle: l("Todo lo que estoy construyendo", "Everything I'm building"),
  },
  techStack: {
    title: l("Tech Stack", "Tech Stack"),
    subtitle: l("Lo que uso", "What I use"),
    tools: [
      { name: "Claude Code", icon: "🤖", url: "https://claude.com/claude-code" },
      { name: "VS Code", icon: "🧑‍💻", url: "https://code.visualstudio.com" },
      { name: "Figma", icon: "🎨", url: "https://figma.com" },
    ],
    dev: [
      { name: "Next.js", icon: "▲", url: "https://nextjs.org" },
      { name: "PostgreSQL", icon: "🐘", url: "https://postgresql.org" },
      { name: "Docker", icon: "🐳", url: "https://docker.com" },
      { name: "TypeScript", icon: "🟦", url: "https://typescriptlang.org" },
    ],
  },
  newsletter: {
    title: l("Mis actualizaciones, directo a tu mail", "My updates, straight to your inbox"),
    description: l(
      "En qué estoy trabajando, proyectos propios y lo que voy aprendiendo en el camino.",
      "What I'm working on, my own projects and what I learn along the way.",
    ),
  },
  services: {
    headline: l(
      "Ayudo a convertir ideas en productos reales — desde MVPs hasta plataformas completas.",
      "I help turn ideas into real products — from MVPs to full platforms.",
    ),
    intro: l(
      "Si tenés una idea y querés lanzarla rápido, trabajemos juntos.",
      "If you have an idea and want to launch fast, let's work together.",
    ),
    offerings: [
      { icon: "🚀", title: l("MVP SaaS", "SaaS MVP"), description: l("Tu idea validada y en producción en semanas.", "Your idea validated and live in weeks.") },
      { icon: "🖥️", title: l("Productos web", "Web products"), description: l("Dashboards, herramientas internas y plataformas.", "Dashboards, internal tools and platforms.") },
      { icon: "📱", title: l("Apps mobile", "Mobile apps"), description: l("Apps para iOS y Android.", "iOS and Android apps.") },
    ],
    processTitle: l("Cómo trabajo", "How I work"),
    steps: [
      { title: l("Alcance y prototipo", "Scope & prototype"), description: l("Mapeamos el flujo y en la primera semana tenés un prototipo clickeable.", "We map the user flow and you get a clickable prototype in week one.") },
      { title: l("Fundaciones", "Foundations"), description: l("Auth, modelo de datos, pagos, analytics y design system.", "Auth, data models, payments, analytics and design system.") },
      { title: l("Features core", "Core features"), description: l("Desarrollo iterativo con feedback constante.", "Lean, iterative development with constant feedback.") },
      { title: l("Lanzamiento", "Launch & hand-off"), description: l("Deploy a producción, documentación y roadmap.", "Production deploy, documentation and roadmap.") },
    ],
    fitTitle: l("¿Es para vos?", "Is it a fit?"),
    fit: [
      { label: l("Tenés una idea y querés validarla", "You have an idea and want to validate it") },
      { label: l("Preferís lanzar rápido y mejorar después", "You prefer launching fast and iterating") },
      { label: l("Te sentís cómodo trabajando con equipos chicos", "You're comfortable working with small teams") },
    ],
    ctaTitle: l("¿Hablamos?", "Let's talk?"),
    ctaLabel: l("Agendá una llamada", "Book a call"),
  },
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "GitHub", url: "https://github.com/" },
    { label: "X", url: "https://x.com/" },
  ],
};

/* ---------- Admin form schema ---------- */

export type Field =
  | { key: string; label: string; type: "text" | "textarea" | "image" }
  | { key: string; label: string; type: "l" | "ltextarea" }
  | { key: string; label: string; type: "list"; fields: Field[]; empty: unknown };

export type Section = { key: keyof SiteSettings; title: string; fields: Field[] };

const emptyL = { es: "", en: "" };
const stackFields: Field[] = [
  { key: "name", label: "Nombre", type: "text" },
  { key: "icon", label: "Ícono (emoji o imagen)", type: "image" },
  { key: "url", label: "URL", type: "text" },
];

export const settingsSections: Section[] = [
  {
    key: "profile",
    title: "Perfil y contacto",
    fields: [
      { key: "name", label: "Nombre", type: "text" },
      { key: "avatar", label: "Foto / avatar", type: "image" },
      { key: "email", label: "Email de contacto", type: "text" },
      { key: "location", label: "Ubicación", type: "l" },
      { key: "codingSince", label: "Programando desde", type: "l" },
      { key: "calendlyUrl", label: "Link para agendar llamadas (Calendly, Cal.com…)", type: "text" },
    ],
  },
  {
    key: "seo",
    title: "SEO (título de la pestaña y descripción)",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "description", label: "Descripción", type: "ltextarea" },
    ],
  },
  {
    key: "hero",
    title: "Home — Hero",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "subtitle", label: "Subtítulo", type: "l" },
      { key: "chips", label: "Chips", type: "list", fields: [{ key: "label", label: "Texto", type: "l" }], empty: { label: emptyL } },
    ],
  },
  {
    key: "about",
    title: "Home — Sobre mí",
    fields: [
      { key: "bio", label: "Bio", type: "ltextarea" },
      { key: "focus", label: "Foco actual", type: "l" },
      { key: "highlights", label: "Logros / highlights", type: "list", fields: [{ key: "label", label: "Texto", type: "l" }], empty: { label: emptyL } },
    ],
  },
  {
    key: "products",
    title: "Home / Projects — Encabezado de proyectos",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "subtitle", label: "Subtítulo", type: "l" },
    ],
  },
  {
    key: "techStack",
    title: "Home — Tech Stack",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "subtitle", label: "Subtítulo", type: "l" },
      { key: "tools", label: "Herramientas diarias", type: "list", fields: stackFields, empty: { name: "", icon: "", url: "" } },
      { key: "dev", label: "Stack de desarrollo", type: "list", fields: stackFields, empty: { name: "", icon: "", url: "" } },
    ],
  },
  {
    key: "newsletter",
    title: "Newsletter — Encabezado",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "description", label: "Descripción", type: "ltextarea" },
    ],
  },
  {
    key: "services",
    title: "Services — Work with me",
    fields: [
      { key: "headline", label: "Titular", type: "ltextarea" },
      { key: "intro", label: "Intro", type: "ltextarea" },
      {
        key: "offerings",
        label: "Servicios",
        type: "list",
        fields: [
          { key: "icon", label: "Ícono (emoji o imagen)", type: "image" },
          { key: "title", label: "Título", type: "l" },
          { key: "description", label: "Descripción", type: "ltextarea" },
        ],
        empty: { icon: "", title: emptyL, description: emptyL },
      },
      { key: "processTitle", label: "Título del proceso", type: "l" },
      {
        key: "steps",
        label: "Pasos del proceso",
        type: "list",
        fields: [
          { key: "title", label: "Título", type: "l" },
          { key: "description", label: "Descripción", type: "ltextarea" },
        ],
        empty: { title: emptyL, description: emptyL },
      },
      { key: "fitTitle", label: "Título sección 'Fit'", type: "l" },
      { key: "fit", label: "Puntos 'Fit'", type: "list", fields: [{ key: "label", label: "Texto", type: "l" }], empty: { label: emptyL } },
      { key: "ctaTitle", label: "Título del CTA", type: "l" },
      { key: "ctaLabel", label: "Texto del botón", type: "l" },
    ],
  },
];

export const socialsField: Field = {
  key: "socials",
  label: "Redes sociales",
  type: "list",
  fields: [
    { key: "label", label: "Nombre (LinkedIn, GitHub, X, Instagram, YouTube…)", type: "text" },
    { key: "url", label: "URL", type: "text" },
  ],
  empty: { label: "", url: "" },
};
