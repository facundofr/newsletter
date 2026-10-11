"use client";

import type { Post } from "@prisma/client";
import { startTransition, useActionState, useState } from "react";
import { Editor } from "@/components/admin/Editor";
import { ImageField } from "@/components/admin/ImageField";
import { LocaleTabs } from "@/components/admin/LocaleTabs";
import { slugify } from "@/lib/text";
import { savePost, type FormState } from "./actions";

/** Formats a Date for <input type="datetime-local"> in the browser's timezone. */
function toLocalInput(d: Date) {
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, {});
  const [titleEs, setTitleEs] = useState(post?.titleEs ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [cover, setCover] = useState(post?.coverImage ?? "");
  const [publishedAt, setPublishedAt] = useState(() => toLocalInput(post?.publishedAt ?? new Date()));

  return (
    <form
      // onSubmit instead of action: React resets uncontrolled fields after a form action,
      // which would wipe unsaved text when validation fails.
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
        // Send an absolute ISO date so the server's timezone doesn't matter.
        fd.set("publishedAt", new Date(publishedAt).toISOString());
        startTransition(() => action(fd));
      }}
      className="grid gap-6 lg:grid-cols-[1fr_300px]"
    >
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="card p-6">
        <LocaleTabs
          es={
            <>
              <div>
                <label className="label">Título</label>
                <input
                  name="titleEs"
                  value={titleEs}
                  onChange={(e) => {
                    setTitleEs(e.target.value);
                    if (!slugTouched) setSlug(slugify(e.target.value));
                  }}
                  className="input text-base"
                  placeholder="Ej: En qué estoy trabajando este mes"
                />
              </div>
              <div>
                <label className="label">Resumen (aparece en el listado)</label>
                <textarea name="excerptEs" defaultValue={post?.excerptEs} rows={2} className="input" />
              </div>
              <div>
                <label className="label">Contenido</label>
                <Editor name="contentEs" initialHtml={post?.contentEs ?? ""} />
              </div>
            </>
          }
          en={
            <>
              <p className="rounded-xl bg-soft px-3 py-2 text-xs text-muted">
                Opcional. Si lo dejás vacío, en la versión en inglés del sitio se muestra el texto en español.
              </p>
              <div>
                <label className="label">Title</label>
                <input name="titleEn" defaultValue={post?.titleEn ?? ""} className="input text-base" />
              </div>
              <div>
                <label className="label">Excerpt</label>
                <textarea name="excerptEn" defaultValue={post?.excerptEn ?? ""} rows={2} className="input" />
              </div>
              <div>
                <label className="label">Content</label>
                <Editor name="contentEn" initialHtml={post?.contentEn ?? ""} />
              </div>
            </>
          }
        />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="card space-y-3 p-5">
          {state.error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
          <button type="submit" name="status" value="PUBLISHED" disabled={pending} className="btn-primary w-full">
            {pending ? "Guardando…" : post?.status === "PUBLISHED" ? "Guardar cambios" : "Publicar"}
          </button>
          <button type="submit" name="status" value="DRAFT" disabled={pending} className="btn-secondary w-full">
            {post?.status === "PUBLISHED" ? "Pasar a borrador" : "Guardar borrador"}
          </button>
        </div>
        <div className="card space-y-4 p-5">
          <div>
            <label className="label">URL</label>
            <div className="flex items-center gap-1 text-sm text-muted">
              /newsletter/
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="input px-2 py-1.5"
              />
            </div>
          </div>
          <div>
            <label className="label">Fecha de publicación</label>
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="input"
            />
            <p className="mt-1 text-xs text-muted">Si es futura, el artículo aparece recién ese día.</p>
          </div>
          <div>
            <label className="label">Imagen de portada</label>
            <ImageField name="coverImage" value={cover} onChange={setCover} />
          </div>
        </div>
      </aside>
    </form>
  );
}
