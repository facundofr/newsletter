import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { ProjectCard } from "@/components/site/ProjectCard";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: pick((await getSettings()).products.title, locale) };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const [s, t, projects] = await Promise.all([
    getSettings(),
    getTranslations("projects"),
    prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
  ]);

  return (
    <div className="container-site pt-10 sm:pt-20">
      <p className="eyebrow">{pick(s.products.subtitle, locale)}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">{pick(s.products.title, locale)}</h1>
      {projects.length === 0 ? (
        <p className="mt-12 text-muted">{t("empty")}</p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.id} project={p} locale={locale} />)}
        </div>
      )}
    </div>
  );
}
