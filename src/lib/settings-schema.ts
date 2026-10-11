import type { L } from "./text";

/**
 * Everything on the public site that is not a post or a project lives here.
 * Stored as one JSON row in SiteSettings and edited from /admin/settings.
 */
export type StackItem = { name: string; icon: string; color: string; url: string; description: L };
export type Labeled = { label: L };

export type SiteSettings = {
  profile: {
    name: string;
    avatar: string;
    email: string;
    businessEmail: string;
    location: L;
    codingSince: L;
    calendlyUrl: string;
  };
  seo: { title: L; description: L };
  hero: { title: L; subtitle: L; chips: Labeled[] };
  about: { headline: L; bio: L; emoji: string; highlights: Labeled[]; focus: L; focusEmoji: string };
  products: { homeTitle: L; pageEmoji: string; pageTitle: L; pageSubtitle: L };
  techStack: { title: L; toolsTitle: L; devTitle: L; tools: StackItem[]; dev: StackItem[] };
  newsletter: { title: L; subtitle: L; ctaTitle: L; ctaSubtitle: L; description: L };
  services: {
    title: L;
    intro: L;
    offeringsTitle: L;
    offerings: { icon: string; title: L; description: L }[];
    processTitle: L;
    steps: { title: L; description: L }[];
    fitTitle: L;
    fit: Labeled[];
    ctaTitle: L;
    ctaSubtitle: L;
    ctaLabel: L;
  };
  socials: { label: string; url: string }[];
};

const l = (es: string, en: string): L => ({ es, en });
const item = (name: string, icon: string, color: string, url: string, es: string, en: string): StackItem => ({
  name, icon, color, url, description: l(es, en),
});

export const defaultSettings: SiteSettings = {
  profile: {
    name: "Tu Nombre",
    avatar: "",
    email: "hola@tudominio.com",
    businessEmail: "hola@tudominio.com",
    location: l("Buenos Aires, Argentina", "Buenos Aires, Argentina"),
    codingSince: l("Marzo 2018", "March 2018"),
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
    headline: l("Developer", "Developer"),
    bio: l("construyendo productos, herramientas y experimentos.", "building products, tools and experiments."),
    emoji: "👨‍💻",
    highlights: [
      { label: l("🤖 Stack con IA", "🤖 AI Stack") },
      { label: l("🟢 Proyectos en producción", "🟢 Projects in production") },
      { label: l("🏥 Software de salud", "🏥 Healthcare software") },
      { label: l("♾️ Aprendiendo siempre", "♾️ Always learning") },
    ],
    focus: l("Agentes de IA y automatizaciones", "AI agents & automations"),
    focusEmoji: "🤖",
  },
  products: {
    homeTitle: l("Todos mis proyectos", "All My Products"),
    pageEmoji: "💼",
    pageTitle: l("Todos mis proyectos", "All my projects"),
    pageSubtitle: l("que construí y lancé", "I've built and launched"),
  },
  techStack: {
    title: l("Lo que uso", "What I Use"),
    toolsTitle: l("Herramientas que uso todos los días", "Tools I use every day"),
    devTitle: l("El stack con el que construyo", "The stack I use to build"),
    tools: [
      item("Claude Code", "✳️", "#D4A27F", "https://claude.com/claude-code", "Mi agente de IA para programar.", "My preferred AI coding agent."),
      item("VS Code", "🧑‍💻", "#0078D4", "https://code.visualstudio.com", "Mi editor de código.", "My go-to code editor."),
      item("Figma", "🎨", "#1A1A1A", "https://figma.com", "Para diseñar interfaces.", "Where I design interfaces."),
    ],
    dev: [
      item("Next.js", "▲", "#000000", "https://nextjs.org", "El framework que uso para web.", "The framework I use for web development."),
      item("PostgreSQL", "🐘", "#336791", "https://postgresql.org", "Mi base de datos preferida.", "My preferred database."),
      item("Docker", "🐳", "#1D63ED", "https://docker.com", "Para desplegar en mi VPS.", "How I deploy to my VPS."),
    ],
  },
  newsletter: {
    title: l("Mis actualizaciones", "My weekly updates"),
    subtitle: l("en qué estoy trabajando", "on what I'm building"),
    ctaTitle: l("Recibí mis actualizaciones", "Get my updates"),
    ctaSubtitle: l("directo en tu mail", "straight to your inbox"),
    description: l(
      "Suscribite para enterarte en qué estoy trabajando, mis proyectos y lo que voy aprendiendo.",
      "Subscribe to follow what I'm working on, my projects and what I'm learning.",
    ),
  },
  services: {
    title: l("Trabajemos juntos", "Work with me"),
    intro: l(
      "Ayudo a convertir ideas en productos reales — desde MVPs hasta plataformas completas.",
      "I help turn ideas into real products — from MVPs to full platforms.",
    ),
    offeringsTitle: l("Qué puedo construir", "What I can help build"),
    offerings: [
      { icon: "📦", title: l("MVP SaaS", "SaaS MVP"), description: l("Tu idea convertida en un producto real.", "Turn your idea into a real product.") },
      { icon: "💻", title: l("Productos web", "Web Products"), description: l("Dashboards, herramientas internas o plataformas completas.", "Dashboards, internal tools or full platforms.") },
      { icon: "📱", title: l("Apps mobile", "Mobile Apps"), description: l("Apps para iOS y Android.", "Mobile apps built for both iOS and Android.") },
    ],
    processTitle: l("Cómo trabajo", "How I work"),
    steps: [
      { title: l("Alcance y prototipo", "Scope & prototype"), description: l("Mapeamos juntos los flujos clave\nPrototipo clickeable en la primera semana", "Map out the key user flows together\nClickable prototype within the first week") },
      { title: l("Fundaciones", "Foundations"), description: l("Auth, modelo de datos, pagos y analytics\nDesign system + primeras pantallas", "Auth, data model, payments & analytics\nDesign system + first screens") },
      { title: l("Features core", "Core features"), description: l("La versión más simple que aporta valor\nRondas de feedback e iteraciones rápidas", "Build the leanest version that delivers value\nFeedback rounds and quick iterations") },
      { title: l("Lanzamiento", "Launch & hand-off"), description: l("Deploy a producción\nDocumentación, walkthrough y roadmap", "Deploy to production\nDocumentation, walkthrough & next-steps roadmap") },
    ],
    fitTitle: l("Es para vos si", "You're a good fit if"),
    fit: [
      { label: l("Tenés una idea que querés construir", "You're a founder or entrepreneur with an idea you want to build") },
      { label: l("Querés lanzar rápido", "You want to launch quickly") },
      { label: l("Preferís trabajar con un equipo chico", "You prefer working with a small team / builder") },
    ],
    ctaTitle: l("¿Tenés una idea?", "Have an idea?"),
    ctaSubtitle: l("Hablemos.", "Let's talk."),
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
  | { key: string; label: string; type: "text" | "textarea" | "image" | "color" }
  | { key: string; label: string; type: "l" | "ltextarea" }
  | { key: string; label: string; type: "list"; fields: Field[]; empty: unknown };

export type Section = { key: keyof SiteSettings; title: string; fields: Field[] };

const emptyL = { es: "", en: "" };
const labeledList = (key: string, label: string): Field => ({
  key, label, type: "list", fields: [{ key: "label", label: "Texto (podés empezar con un emoji)", type: "l" }], empty: { label: emptyL },
});
const stackFields: Field[] = [
  { key: "name", label: "Nombre", type: "text" },
  { key: "icon", label: "Ícono (emoji o imagen)", type: "image" },
  { key: "color", label: "Color de fondo del ícono", type: "color" },
  { key: "description", label: "Descripción", type: "l" },
  { key: "url", label: "URL", type: "text" },
];
const emptyStack = { name: "", icon: "", color: "#1A1A1A", url: "", description: emptyL };

export const settingsSections: Section[] = [
  {
    key: "profile",
    title: "Perfil y contacto",
    fields: [
      { key: "name", label: "Nombre", type: "text" },
      { key: "avatar", label: "Foto (aparece en el Home, footer y artículos)", type: "image" },
      { key: "email", label: "Email — tarjeta \"Let's Talk\"", type: "text" },
      { key: "businessEmail", label: "Email — tarjeta \"Business Inquiries\"", type: "text" },
      { key: "location", label: "Ubicación (tarjeta \"Based In\")", type: "l" },
      { key: "codingSince", label: "Programando desde (tarjeta \"Coding Since\")", type: "l" },
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
    title: "Home — Presentación",
    fields: [
      { key: "title", label: "Título (negro)", type: "l" },
      { key: "subtitle", label: "Subtítulo (gris)", type: "l" },
      labeledList("chips", "Chips de colores — fila 1"),
    ],
  },
  {
    key: "about",
    title: "Home — Sobre mí",
    fields: [
      labeledList("highlights", "Chips de colores — fila 2"),
      { key: "headline", label: "Tarjeta grande: título (negro)", type: "l" },
      { key: "bio", label: "Tarjeta grande: texto (gris)", type: "ltextarea" },
      { key: "emoji", label: "Tarjeta grande: emoji", type: "text" },
      { key: "focus", label: "\"Always Learning\": en qué estás explorando", type: "l" },
      { key: "focusEmoji", label: "\"Always Learning\": emoji", type: "text" },
    ],
  },
  {
    key: "products",
    title: "Proyectos — Encabezados",
    fields: [
      { key: "homeTitle", label: "Título de la sección en el Home", type: "l" },
      { key: "pageEmoji", label: "Emoji de la página Projects", type: "text" },
      { key: "pageTitle", label: "Título de la página Projects (negro)", type: "l" },
      { key: "pageSubtitle", label: "Subtítulo de la página Projects (gris)", type: "l" },
    ],
  },
  {
    key: "techStack",
    title: "Home — Tech Stack",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "toolsTitle", label: "Título columna izquierda", type: "l" },
      { key: "tools", label: "Herramientas (columna izquierda)", type: "list", fields: stackFields, empty: emptyStack },
      { key: "devTitle", label: "Título columna derecha", type: "l" },
      { key: "dev", label: "Stack (columna derecha)", type: "list", fields: stackFields, empty: emptyStack },
    ],
  },
  {
    key: "newsletter",
    title: "Newsletter",
    fields: [
      { key: "title", label: "Título de la página (negro)", type: "l" },
      { key: "subtitle", label: "Título de la página (gris)", type: "l" },
      { key: "ctaTitle", label: "Caja de suscripción: título (negro)", type: "l" },
      { key: "ctaSubtitle", label: "Caja de suscripción: título (gris)", type: "l" },
      { key: "description", label: "Caja de suscripción: descripción", type: "ltextarea" },
    ],
  },
  {
    key: "services",
    title: "Services — Work with me",
    fields: [
      { key: "title", label: "Título", type: "l" },
      { key: "intro", label: "Intro", type: "ltextarea" },
      { key: "offeringsTitle", label: "Título de servicios", type: "l" },
      {
        key: "offerings",
        label: "Servicios",
        type: "list",
        fields: [
          { key: "icon", label: "Emoji", type: "text" },
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
          { key: "description", label: "Puntos (uno por línea)", type: "ltextarea" },
        ],
        empty: { title: emptyL, description: emptyL },
      },
      { key: "fitTitle", label: "Título sección 'Fit'", type: "l" },
      labeledList("fit", "Puntos 'Fit'"),
      { key: "ctaTitle", label: "Cierre: título (negro)", type: "l" },
      { key: "ctaSubtitle", label: "Cierre: título (gris)", type: "l" },
      { key: "ctaLabel", label: "Texto del botón azul", type: "l" },
    ],
  },
];

export const socialsField: Field = {
  key: "socials",
  label: "Redes sociales",
  type: "list",
  fields: [
    { key: "label", label: "Nombre (X, Instagram, TikTok, LinkedIn, YouTube, GitHub…)", type: "text" },
    { key: "url", label: "URL", type: "text" },
  ],
  empty: { label: "", url: "" },
};
