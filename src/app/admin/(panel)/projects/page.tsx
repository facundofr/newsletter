import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Proyectos</h1>
        <Link href="/admin/projects/new" className="btn-primary">+ Nuevo proyecto</Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Los proyectos &quot;destacados&quot; aparecen en el Home y en el footer. Se ordenan por el campo &quot;orden&quot; (menor primero).
      </p>
      <div className="card mt-6 divide-y divide-line">
        {projects.length === 0 && <p className="p-6 text-sm text-muted">Todavía no hay proyectos.</p>}
        {projects.map((p) => (
          <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center gap-4 p-4 transition hover:bg-soft">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.name}</p>
              <p className="truncate text-xs text-muted">{p.url ?? "sin link"} · orden {p.order}</p>
            </div>
            {p.featured && <span className="rounded-full bg-soft px-2.5 py-1 text-xs">⭐ Destacado</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
