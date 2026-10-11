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
import { PostCard } from "@/components/site/PostCard";
import { SectionHeading } from "@/components/site/SectionHeading";

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
  const [s, t, related] = await Promise.all([
    getSettings(),
    getTranslations("posts"),
    prisma.post.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() }, NOT: { id: post.id } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  const missingEnglish = locale === "en" && !post.contentEn?.trim();
  const excerpt = pickField(post.excerptEs, post.excerptEn, locale);
  const author = { name: s.profile.name, avatar: s.profile.avatar };

  return (
    <>
      <section className="mx-auto max-w-[720px] px-6 pb-12 pt-32">
        {post.status !== "PUBLISHED" && (
          <p className="mb-8 rounded-[16px] bg-amber-50 px-4 py-3 text-[14px] font-semibold text-amber-800">
            Vista previa — borrador no publicado
          </p>
        )}
        <Link href="/newsletter" className="mb-12 inline-block text-[14px] font-semibold text-black/40 transition-colors hover:text-black">
          {t("back")}
        </Link>
        <div className="flex flex-col gap-[4px]">
          <p className="eyebrow">{formatDate(post.publishedAt, locale, true)}</p>
          <h1 className="text-[32px] font-semibold leading-[38px] tracking-[-0.64px] text-black sm:text-[44px] sm:leading-[51px] sm:tracking-[-0.88px]">
            {pickField(post.titleEs, post.titleEn, locale)}
          </h1>
          {excerpt && <p className="mt-2 text-[14px] font-semibold leading-[19px] text-black/50">{excerpt}</p>}
          <div className="mt-6 flex items-center gap-3">
            <Avatar src={author.avatar} name={author.name} size={32} />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold leading-[18px] text-black">{author.name}</span>
              <span className="text-[12px] font-semibold text-black/50">{t("minRead", { minutes: post.readingMinutes })}</span>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-[720px] px-6">
        <div className="mb-10 border-t border-black/[0.07]" />
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" className="mb-10 w-full rounded-[16px] border border-black/[0.07] object-cover" />
        )}
        {missingEnglish && (
          <p className="mb-8 rounded-[16px] bg-[#F7F7F7] px-4 py-3 text-[14px] font-semibold text-black/50">{t("onlySpanish")}</p>
        )}
        <div
          className="article-body"
          // Content is authored only by the admin.
          dangerouslySetInnerHTML={{ __html: pickField(post.contentEs, post.contentEn, locale) }}
        />
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[880px] px-6 pb-16 pt-24">
          <SectionHeading eyebrow={t("keepReading")} title={t("related")} size="md" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.id} post={r} locale={locale} author={author} longDate />
            ))}
          </div>
        </section>
      )}

      <section className={`mx-auto max-w-[880px] px-6 pb-20 ${related.length ? "" : "pt-24"}`}>
        <div className="flex flex-col rounded-[16px] border border-black/[0.01] bg-[#F7F7F7] px-[20px] py-[20px] sm:px-[32px] sm:py-[28px]">
          <p className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] sm:text-[24px] sm:leading-[28.8px] sm:tracking-[-0.72px]">
            <span className="text-black">{t("enjoyed")}</span> <span className="text-black/50">{t("getMore")}</span>
          </p>
          <p className="mt-2 text-[14px] font-semibold leading-[19px] text-black/50">
            <Link href="/newsletter#subscribe" className="text-[#1E6EF4] hover:underline">
              {t("subscribeLink")}
            </Link>{" "}
            {t("subscribeRest")}
          </p>
        </div>
      </section>
    </>
  );
}
