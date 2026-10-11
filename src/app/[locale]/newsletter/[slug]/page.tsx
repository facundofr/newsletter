import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { cache } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { formatDate, pickField } from "@/lib/text";
import { Avatar } from "@/components/site/Avatar";
import { ArrowLeft } from "@/components/site/icons";
import { SubscribeForm } from "@/components/site/SubscribeForm";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

/** Published posts are public; drafts and scheduled posts are visible only to the admin (preview). */
const getPost = cache(async (slug: string) => {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return null;
  const isPublic = post.status === "PUBLISHED" && post.publishedAt <= new Date();
  if (!isPublic && !(await isAdmin())) return null;
  return post;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = pickField(post.titleEs, post.titleEn, locale);
  const description = pickField(post.excerptEs, post.excerptEn, locale);
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: post.coverImage ? [post.coverImage] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const [s, t] = await Promise.all([getSettings(), getTranslations("posts")]);

  const missingEnglish = locale === "en" && !post.contentEn?.trim();
  const content = pickField(post.contentEs, post.contentEn, locale);

  return (
    <article className="container-site max-w-3xl pt-10 sm:pt-16">
      {post.status !== "PUBLISHED" && (
        <p className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Vista previa — borrador no publicado</p>
      )}
      <Link href="/newsletter" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft /> {t("back")}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {pickField(post.titleEs, post.titleEn, locale)}
      </h1>
      <div className="mt-6 flex items-center gap-3 text-sm text-muted">
        <Avatar src={s.profile.avatar} name={s.profile.name} size={32} />
        <span className="font-medium text-ink">{s.profile.name}</span>
        <span>·</span>
        <span>{formatDate(post.publishedAt, locale)}</span>
        <span>·</span>
        <span>{t("minRead", { minutes: post.readingMinutes })}</span>
      </div>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt="" className="mt-10 w-full rounded-3xl border border-line object-cover" />
      )}
      {missingEnglish && <p className="mt-8 rounded-2xl bg-soft px-4 py-3 text-sm text-muted">{t("onlySpanish")}</p>}
      <div
        className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-tight prose-a:underline-offset-4 prose-img:rounded-2xl sm:prose-lg"
        // Content is authored only by the admin.
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="mt-16 rounded-4xl bg-soft p-8 text-center">
        <p className="text-lg font-semibold tracking-tight">{t("enjoyed")}</p>
        <div className="mt-6 flex justify-center">
          <SubscribeForm compact />
        </div>
      </div>
    </article>
  );
}
