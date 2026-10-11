import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { NewspaperIcon } from "@/components/site/icons";
import { HeroSubtitle, PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SubscribeBox } from "@/components/site/SubscribeBox";

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
    <>
      <PageHero
        icon={<NewspaperIcon strokeWidth={1.75} className="h-10 w-10 text-black/70 sm:h-14 sm:w-14" />}
        title={pick(s.newsletter.title, locale)}
        subtitle={<HeroSubtitle>{pick(s.newsletter.subtitle, locale)}</HeroSubtitle>}
      />

      <section className="mx-auto max-w-[880px] px-6 pb-20 sm:pb-40">
        <Reveal>
          <SubscribeBox settings={s} locale={locale} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[880px] px-6 pb-16 sm:pb-20">
        <Reveal>
          <SectionHeading eyebrow={t("articles")} title={t("latest")} />
        </Reveal>
        {posts.length === 0 ? (
          <p className="text-[14px] font-semibold text-black/50">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 80} className="flex">
                <div className="flex w-full [&>a]:w-full">
                  <PostCard post={post} locale={locale} author={author} />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
