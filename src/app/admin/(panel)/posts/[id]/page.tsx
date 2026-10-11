import Link from "next/link";
import { notFound } from "next/navigation";
import { emailEnabled } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { deletePost } from "../actions";
import { PostForm } from "../PostForm";
import { SendEmailButton } from "./SendEmailButton";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

export default async function EditPost({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <Link href="/admin/posts" className="text-sm text-muted hover:text-ink">← Artículos</Link>
      <div className="mb-6 mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Editar artículo</h1>
        <div className="flex flex-wrap items-center gap-2">
          <a href={`/newsletter/${post.slug}`} target="_blank" className="btn-secondary py-2">Ver ES ↗</a>
          <a href={`/en/newsletter/${post.slug}`} target="_blank" className="btn-secondary py-2">Ver EN ↗</a>
          {post.status === "PUBLISHED" && (
            <SendEmailButton id={post.id} sentAt={post.emailSentAt?.toISOString() ?? null} enabled={emailEnabled()} />
          )}
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button type="submit" className="rounded-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">Borrar</button>
          </form>
        </div>
      </div>
      {saved && <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">✅ Guardado</p>}
      {/* key forces a fresh form after each save */}
      <PostForm key={post.updatedAt.toISOString()} post={post} />
    </div>
  );
}
