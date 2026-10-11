import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { HeroSubtitle, PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: pick((await getSettings()).products.pageTitle, locale) };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const [s, t, projects] = await Promise.all([
    getSettings(),
    getTranslations("projects"),
    prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <>
      <PageHero
        icon={<span className="text-[42px] leading-none sm:text-[56px]">{s.products.pageEmoji}</span>}
        title={pick(s.products.pageTitle, locale)}
        subtitle={<HeroSubtitle>{pick(s.products.pageSubtitle, locale)}</HeroSubtitle>}
      />
      <section className="mx-auto max-w-[880px] px-[20px] pb-20 sm:px-6">
        {projects.length === 0 ? (
          <p className="text-center text-[14px] font-semibold text-black/50">{t("empty")}</p>
        ) : (
          <div className="flex flex-col gap-[16px] sm:gap-[24px]">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <ProjectCard project={p} locale={locale} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
