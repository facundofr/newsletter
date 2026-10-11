import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

export default async function Dashboard() {
  // getSettings() also seeds the database on first run.
  await getSettings();
  const [published, drafts, projects, subscribers] = await Promise.all([
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.project.count(),
    prisma.subscriber.count(),
  ]);

  const stats = [
    { label: "Artículos publicados", value: published, href: "/admin/posts" },
    { label: "Borradores", value: drafts, href: "/admin/posts" },
    { label: "Proyectos", value: projects, href: "/admin/projects" },
    { label: "Suscriptores", value: subscribers, href: "/admin/subscribers" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Hola 👋</h1>
        <Link href="/admin/posts/new" className="btn-primary">+ Nuevo artículo</Link>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition hover:border-neutral-300">
            <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <QuickLink href="/admin/posts/new" title="Escribir un artículo" text="Contá en qué estás trabajando, en español y en inglés." />
        <QuickLink href="/admin/projects/new" title="Agregar un proyecto" text="Sumá un proyecto propio a tu portfolio." />
        <QuickLink href="/admin/settings" title="Editar textos del sitio" text="Hero, sobre mí, tech stack, servicios, redes…" />
      </div>
    </div>
  );
}

function QuickLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="card p-5 transition hover:border-neutral-300">
      <p className="font-semibold">{title} →</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </Link>
  );
}
