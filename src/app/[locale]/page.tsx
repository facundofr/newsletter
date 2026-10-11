import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import type { StackItem } from "@/lib/settings-schema";
import { pick } from "@/lib/text";
import { Avatar } from "@/components/site/Avatar";
import { Bento } from "@/components/site/Bento";
import { Carousel } from "@/components/site/Carousel";
import { Icon } from "@/components/site/Icon";
import { Marquee } from "@/components/site/Marquee";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [s, t, projects] = await Promise.all([
    getSettings(),
    getTranslations("home"),
    prisma.project.findMany({ where: { featured: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
  ]);
  const p = (v: Parameters<typeof pick>[0]) => pick(v, locale);

  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center overflow-hidden pb-20 pt-20 sm:pb-40 sm:pt-32">
        <div className="max-w-7xl px-6">
          <Reveal className="relative mx-auto mb-8 h-[90px] w-[90px] sm:mb-12 sm:h-[120px] sm:w-[120px]">
            <div className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[24px] bg-[#F7F7F7] sm:h-[120px] sm:w-[120px] sm:rounded-[32px]">
              <Avatar src={s.profile.avatar} name={s.profile.name} size={120} rounded="0" />
            </div>
          </Reveal>
          <Reveal className="mx-auto mb-[56px] flex max-w-[600px] flex-col items-center text-center sm:mb-[112px]" delay={100}>
            <h1 className="text-[32px] font-semibold leading-[38px] tracking-[-0.96px] text-black sm:text-[48px] sm:leading-[55.7px] sm:tracking-[-1.44px]">
              {p(s.hero.title)}
            </h1>
            <h2 className="max-w-[460px] text-[32px] font-semibold leading-[38px] tracking-[-0.96px] text-black/50 sm:text-[48px] sm:leading-[55.7px] sm:tracking-[-1.44px]">
              {p(s.hero.subtitle)}
            </h2>
          </Reveal>
        </div>
        <Marquee top={s.hero.chips.map((c) => p(c.label))} bottom={s.about.highlights.map((c) => p(c.label))} />
      </section>

      <Bento
        socials={s.socials}
        text={{
          headline: p(s.about.headline),
          bio: p(s.about.bio),
          emoji: s.about.emoji,
          location: p(s.profile.location),
          codingSince: p(s.profile.codingSince),
          focus: p(s.about.focus),
          focusEmoji: s.about.focusEmoji,
          name: p(s.hero.title),
          basedIn: t("basedIn"),
          codingSinceLabel: t("codingSince"),
          mySocials: t("mySocials"),
          connect: t("connect"),
          platforms: t("platforms"),
          alwaysLearning: t("alwaysLearning"),
          exploring: t("exploring"),
          lang: locale,
        }}
      />

      {/* Products */}
      {projects.length > 0 && (
        <section className="pb-20 sm:pb-40">
          <Reveal className="mx-auto max-w-[880px] px-[40px] sm:px-6">
            <SectionHeading
              eyebrow={t("myProducts")}
              title={p(s.products.homeTitle)}
              size="md"
              action={
                <Link href="/projects" className="btn-blue w-full whitespace-nowrap sm:w-auto sm:py-3">
                  {t("viewAll")}
                </Link>
              }
            />
          </Reveal>
          <Reveal>
            <Carousel>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </Carousel>
          </Reveal>
        </section>
      )}

      {/* Tech stack */}
      <section className="mx-auto max-w-[880px] px-[28px] pb-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t("techStack")} title={p(s.techStack.title)} />
        </Reveal>
        <div className="grid grid-cols-1 gap-x-[40px] gap-y-8 sm:grid-cols-2 sm:gap-y-0 md:gap-x-[88px]">
          <StackColumn title={p(s.techStack.toolsTitle)} items={s.techStack.tools} locale={locale} />
          <StackColumn title={p(s.techStack.devTitle)} items={s.techStack.dev} locale={locale} />
        </div>
      </section>
    </>
  );
}

function StackColumn({ title, items, locale }: { title: string; items: StackItem[]; locale: Locale }) {
  return (
    <Reveal>
      <p className="border-b border-black/[0.07] pb-[16px] text-[14px] font-semibold leading-[19px] text-black/50">{title}</p>
      {items.map((item, i) => {
        const row = (
          <>
            <div
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] text-[20px] text-white"
              style={{ backgroundColor: item.color || "#1A1A1A" }}
            >
              <Icon value={item.icon} className="h-full w-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold leading-[19px] text-black transition-colors group-hover:text-[#1E6EF4]">
                {item.name}
              </span>
              <span className="text-[14px] font-semibold leading-[19px] text-black/50">{pick(item.description, locale)}</span>
            </div>
          </>
        );
        const cls = "group flex items-center gap-[16px] border-b border-black/[0.07] py-[16px]";
        return item.url ? (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>{row}</a>
        ) : (
          <div key={i} className={cls}>{row}</div>
        );
      })}
    </Reveal>
  );
}
