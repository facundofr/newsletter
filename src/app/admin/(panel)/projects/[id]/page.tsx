import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "../actions";
import { ProjectForm } from "./ProjectForm";

/** Handles both /admin/projects/new and /admin/projects/[id]. */
export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = id === "new" ? null : await prisma.project.findUnique({ where: { id } });
  if (id !== "new" && !project) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/projects" className="text-sm text-muted hover:text-ink">← Proyectos</Link>
      <div className="mb-6 mt-2 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{project ? "Editar proyecto" : "Nuevo proyecto"}</h1>
        {project && (
          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <button type="submit" className="rounded-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">Borrar</button>
          </form>
        )}
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
