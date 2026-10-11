import type { Project } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pickField } from "@/lib/text";
import { ArrowUpRight } from "./icons";

export async function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = await getTranslations("projects");
  return (
    <article className="card flex flex-col overflow-hidden p-3">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-soft">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-2xl font-semibold text-neutral-300">
            {project.name}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          {project.tag && <span className="chip px-2.5 py-0.5 text-xs text-muted">{project.tag}</span>}
        </div>
        <p className="flex-1 text-sm text-muted">{pickField(project.descriptionEs, project.descriptionEn, locale)}</p>
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-3 self-start py-2">
            {t("visit")} <ArrowUpRight />
          </a>
        )}
      </div>
    </article>
  );
}
