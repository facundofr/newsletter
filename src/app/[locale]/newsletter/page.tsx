import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { PostCard } from "@/components/site/PostCard";
import { SubscribeForm } from "@/components/site/SubscribeForm";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const s = await getSettings();
  return { title: "Newsletter", description: pick(s.newsletter.description, locale) };
}

export default async function NewsletterPage({ params }: Props) {
  const { locale } = await params;
  const [s, t, posts] = await Promise.all([
    getSettings(),
    getTranslations("posts"),
    prisma.post.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
      orderBy: { publishedAt: "desc" },
    }),
  ]);
  const author = { name: s.profile.name, avatar: s.profile.avatar };

  return (
    <div className="container-site pt-10 sm:pt-20">
      <section id="subscribe" className="scroll-mt-24 rounded-4xl bg-soft px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="eyebrow">Newsletter</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {pick(s.newsletter.title, locale)}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">{pick(s.newsletter.description, locale)}</p>
        <div className="mt-8 flex justify-center">
          <SubscribeForm />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        {posts.length === 0 ? (
          <p className="text-center text-muted">{t("empty")}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((p) => <PostCard key={p.id} post={p} locale={locale} author={author} />)}
          </div>
        )}
      </section>
    </div>
  );
}
