import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import type { StackItem } from "@/lib/settings-schema";
import { pick } from "@/lib/text";
import { Avatar } from "@/components/site/Avatar";
import { Icon } from "@/components/site/Icon";
import { ArrowUpRight, CodeIcon, PinIcon } from "@/components/site/icons";
import { PostCard } from "@/components/site/PostCard";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SubscribeForm } from "@/components/site/SubscribeForm";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [s, t, tNav, projects, posts] = await Promise.all([
    getSettings(),
    getTranslations("home"),
    getTranslations("nav"),
    prisma.project.findMany({ where: { featured: true }, orderBy: [{ order: "asc" }, { createdAt: "desc" }], take: 4 }),
    prisma.post.findMany({ where: { status: "PUBLISHED", publishedAt: { lte: new Date() } }, orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);
  const author = { name: s.profile.name, avatar: s.profile.avatar };

  return (
    <div className="container-site">
      {/* Hero */}
      <section className="pb-12 pt-10 sm:pt-20">
        <Avatar src={s.profile.avatar} name={s.profile.name} size={72} />
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          {pick(s.hero.title, locale)} <span className="text-muted">{pick(s.hero.subtitle, locale)}</span>
        </h1>
        {s.hero.chips.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {s.hero.chips.map((c, i) => (
              <span key={i} className="chip">{pick(c.label, locale)}</span>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/newsletter" className="btn-primary">{tNav("newsletter")}</Link>
          <Link href="/services" className="btn-secondary">{tNav("services")}</Link>
        </div>
      </section>

      {/* About bento */}
      <section className="grid gap-3 md:grid-cols-3">
        <div className="card flex flex-col justify-between gap-6 p-6">
          <PinIcon className="h-5 w-5 text-muted" />
          <div>
            <p className="eyebrow">{t("basedIn")}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{pick(s.profile.location, locale)}</p>
          </div>
        </div>
        <div className="card flex flex-col justify-between gap-6 p-6">
          <CodeIcon className="h-5 w-5 text-muted" />
          <p className="text-lg font-semibold tracking-tight">{pick(s.profile.codingSince, locale)}</p>
        </div>
        <div className="card flex flex-wrap content-center gap-2 p-6">
          {s.about.highlights.map((h, i) => (
            <span key={i} className="chip bg-soft">{pick(h.label, locale)}</span>
          ))}
        </div>
        <div className="card p-6 md:col-span-2">
          <p className="text-lg leading-relaxed sm:text-xl">{pick(s.about.bio, locale)}</p>
        </div>
        <div className="card flex flex-col justify-between gap-6 p-6">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <div>
            <p className="eyebrow">{t("currentFocus")}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{pick(s.about.focus, locale)}</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-24">
          <SectionHeading
            eyebrow={pick(s.products.subtitle, locale)}
            title={pick(s.products.title, locale)}
            action={<Link href="/projects" className="text-sm text-muted hover:text-ink">{t("seeAll")} →</Link>}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => <ProjectCard key={p.id} project={p} locale={locale} />)}
          </div>
        </section>
      )}

      {/* Tech stack */}
      <section className="mt-24">
        <SectionHeading eyebrow={pick(s.techStack.subtitle, locale)} title={pick(s.techStack.title, locale)} />
        <div className="grid gap-3 md:grid-cols-2">
          <StackCard title={t("dailyTools")} items={s.techStack.tools} />
          <StackCard title={t("devStack")} items={s.techStack.dev} />
        </div>
      </section>

      {/* Latest posts */}
      {posts.length > 0 && (
        <section className="mt-24">
          <SectionHeading
            eyebrow={t("fromNewsletter")}
            title={t("latestPosts")}
            action={<Link href="/newsletter" className="text-sm text-muted hover:text-ink">{t("seeAll")} →</Link>}
          />
          <div className="flex flex-col gap-3">
            {posts.map((p) => <PostCard key={p.id} post={p} locale={locale} author={author} />)}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mt-24 rounded-4xl bg-soft p-8 sm:p-12">
        <p className="eyebrow">{t("contactTitle")}</p>
        <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">{t("contactText")}</h2>
        <a href={`mailto:${s.profile.email}`} className="mt-6 inline-flex items-center gap-2 break-all text-lg font-medium underline-offset-4 hover:underline">
          {s.profile.email} <ArrowUpRight />
        </a>
        <p className="mt-1 text-sm text-muted">{t("inquiries")}</p>
        <div className="mt-8">
          <SubscribeForm compact />
        </div>
      </section>
    </div>
  );
}

function StackCard({ title, items }: { title: string; items: StackItem[] }) {
  return (
    <div className="card p-6">
      <p className="eyebrow mb-4">{title}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item, i) => {
          const content = (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-soft text-lg">
                <Icon value={item.icon} className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-medium">{item.name}</span>
            </>
          );
          return item.url ? (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-2xl p-1.5 transition hover:bg-soft">
              {content}
            </a>
          ) : (
            <div key={i} className="flex items-center gap-2.5 p-1.5">{content}</div>
          );
        })}
      </div>
    </div>
  );
}
