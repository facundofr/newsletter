import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/text";

export default async function PostsAdmin() {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Artículos</h1>
        <Link href="/admin/posts/new" className="btn-primary">+ Nuevo artículo</Link>
      </div>
      <div className="card mt-6 divide-y divide-line">
        {posts.length === 0 && <p className="p-6 text-sm text-muted">Todavía no escribiste nada.</p>}
        {posts.map((p) => (
          <Link key={p.id} href={`/admin/posts/${p.id}`} className="flex items-center gap-4 p-4 transition hover:bg-soft">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.coverImage && <img src={p.coverImage} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.titleEs}</p>
              <p className="truncate text-xs text-muted">
                {formatDate(p.publishedAt, "es")} · /{p.slug}
                {!p.titleEn && " · ⚠️ sin versión en inglés"}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                p.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {p.status === "PUBLISHED" ? "Publicado" : "Borrador"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
