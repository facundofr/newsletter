"use client";

import type { Project } from "@prisma/client";
import { startTransition, useActionState, useState } from "react";
import { ImageField } from "@/components/admin/ImageField";
import { saveProject, type FormState } from "../actions";

export function ProjectForm({ project }: { project: Project | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject, {});
  const [image, setImage] = useState(project?.image ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
      className="card space-y-5 p-6"
    >
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Nombre</label>
          <input name="name" defaultValue={project?.name} required className="input" />
        </div>
        <div>
          <label className="label">Etiqueta (SaaS, App, Open Source…)</label>
          <input name="tag" defaultValue={project?.tag ?? ""} className="input" />
        </div>
      </div>
      <div>
        <label className="label">Descripción 🇦🇷 Español</label>
        <textarea name="descriptionEs" defaultValue={project?.descriptionEs} rows={3} className="input" />
      </div>
      <div>
        <label className="label">Description 🇺🇸 English (opcional)</label>
        <textarea name="descriptionEn" defaultValue={project?.descriptionEn ?? ""} rows={3} className="input" />
      </div>
      <div>
        <label className="label">Link al proyecto</label>
        <input name="url" defaultValue={project?.url ?? ""} placeholder="https://" className="input" />
      </div>
      <div>
        <label className="label">Imagen</label>
        <ImageField name="image" value={image} onChange={setImage} />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? true} className="h-4 w-4 accent-black" />
          Destacado (mostrar en el Home)
        </label>
        <label className="flex items-center gap-2 text-sm">
          Orden
          <input type="number" name="order" defaultValue={project?.order ?? 0} className="input w-20 py-1.5" />
        </label>
      </div>
      {state.error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
