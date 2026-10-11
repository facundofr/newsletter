"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { emailEnabled, escapeHtml, sendBatch, siteUrl } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { readingMinutes, slugify } from "@/lib/text";

export type FormState = { error?: string; ok?: string };

const optional = z.string().trim().transform((v) => v || null);

const postSchema = z.object({
  id: z.string().optional(),
  titleEs: z.string().trim().min(1, "El título en español es obligatorio"),
  titleEn: optional,
  excerptEs: z.string().trim(),
  excerptEn: optional,
  contentEs: z.string(),
  contentEn: optional,
  slug: z.string().trim(),
  coverImage: optional,
  publishedAt: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export async function savePost(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { id, slug: rawSlug, publishedAt, ...data } = parsed.data;

  const slug = slugify(rawSlug || data.titleEs);
  if (!slug) return { error: "El slug no es válido" };
  const clash = await prisma.post.findFirst({ where: { slug, NOT: id ? { id } : undefined } });
  if (clash) return { error: `Ya existe otro artículo con la URL "${slug}"` };

  const date = publishedAt ? new Date(publishedAt) : new Date();
  if (isNaN(date.getTime())) return { error: "Fecha inválida" };

  const values = { ...data, slug, publishedAt: date, readingMinutes: readingMinutes(data.contentEs) };
  const post = id
    ? await prisma.post.update({ where: { id }, data: values })
    : await prisma.post.create({ data: values });

  redirect(`/admin/posts/${post.id}?saved=1`);
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  await prisma.post.delete({ where: { id: String(formData.get("id")) } });
  redirect("/admin/posts");
}

/** Emails a published post to every subscriber, in their language. */
export async function sendPostEmail(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  if (!emailEnabled()) return { error: "Configurá RESEND_API_KEY y EMAIL_FROM en el .env para enviar emails." };

  const post = await prisma.post.findUnique({ where: { id: String(formData.get("id")) } });
  if (!post || post.status !== "PUBLISHED") return { error: "Publicá el artículo antes de enviarlo." };

  const [subscribers, s] = await Promise.all([prisma.subscriber.findMany(), getSettings()]);
  if (subscribers.length === 0) return { error: "Todavía no tenés suscriptores." };

  const base = siteUrl();
  const emails = subscribers.map((sub) => {
    const en = sub.locale === "en";
    const title = (en && post.titleEn) || post.titleEs;
    const content = (en && post.contentEn) || post.contentEs;
    const url = `${base}${en ? "/en" : ""}/newsletter/${post.slug}`;
    const unsubscribeUrl = `${base}${en ? "/en" : ""}/unsubscribe?token=${sub.token}`;
    return {
      to: sub.email,
      subject: title,
      headers: {
        "List-Unsubscribe": `<${base}/api/unsubscribe?token=${sub.token}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      html: emailTemplate({
        title,
        content: absolutize(content, base),
        url,
        unsubscribeUrl,
        author: s.profile.name,
        readOnline: en ? "Read online" : "Leer en la web",
        unsubscribe: en ? "Unsubscribe" : "Darme de baja",
      }),
    };
  });

  try {
    await sendBatch(emails);
  } catch (e) {
    return { error: (e as Error).message };
  }
  await prisma.post.update({ where: { id: post.id }, data: { emailSentAt: new Date() } });
  return { ok: `Enviado a ${subscribers.length} suscriptor(es).` };
}

/** Email clients need absolute URLs for uploaded images. */
function absolutize(html: string, base: string) {
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${base}/`);
}

function emailTemplate(p: {
  title: string; content: string; url: string; unsubscribeUrl: string; author: string; readOnline: string; unsubscribe: string;
}) {
  return `<!doctype html><html><body style="margin:0;background:#f6f6f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Arial,sans-serif;color:#0a0a0a">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
<div style="background:#fff;border:1px solid #ececec;border-radius:24px;padding:32px">
<p style="margin:0 0 8px;color:#6b6b6b;font-size:14px">${escapeHtml(p.author)}</p>
<h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;letter-spacing:-0.02em">${escapeHtml(p.title)}</h1>
<div style="font-size:16px;line-height:1.7">${p.content.replace(/<img /g, '<img style="max-width:100%;height:auto;border-radius:12px" ')}</div>
<p style="margin:32px 0 0"><a href="${p.url}" style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px">${p.readOnline}</a></p>
</div>
<p style="text-align:center;color:#6b6b6b;font-size:12px;margin-top:24px"><a href="${p.unsubscribeUrl}" style="color:#6b6b6b">${p.unsubscribe}</a></p>
</div></body></html>`;
}
