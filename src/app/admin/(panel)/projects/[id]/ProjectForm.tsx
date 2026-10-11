"use client";

import type { Project } from "@prisma/client";
import { startTransition, useActionState, useState } from "react";
import { ImageField } from "@/components/admin/ImageField";
import { DEFAULT_ACCENT } from "@/components/site/project-accent";
import { saveProject, type FormState } from "../actions";

export function ProjectForm({ project }: { project: Project | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject, {});
  const [image, setImage] = useState(project?.image ?? "");
  const [accent, setAccent] = useState(project?.accentColor ?? DEFAULT_ACCENT);

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
      <div>
        <label className="label">Nombre</label>
        <input name="name" defaultValue={project?.name} required className="input" />
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
        <label className="label">Captura / imagen (se muestra a la derecha de la tarjeta)</label>
        <ImageField name="image" value={image} onChange={setImage} />
      </div>
      <div>
        <label className="label">Color del botón "Visit Site"</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border border-black/[0.07] bg-white p-1"
          />
          <input name="accentColor" value={accent} onChange={(e) => setAccent(e.target.value)} className="input w-32" />
          <span className="rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>Visit Site</span>
        </div>
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
