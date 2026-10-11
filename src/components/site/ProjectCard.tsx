import type { Project } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pickField } from "@/lib/text";
import { DEFAULT_ACCENT } from "./project-accent";

/** Large product card: text and button on the left, screenshot bleeding off the right edge. */
export async function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = await getTranslations("projects");
  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-[#F7F7F7] sm:rounded-[28px]">
      <div className="flex h-auto flex-col gap-0 px-[20px] pb-0 pt-[24px] sm:h-[560px] sm:flex-row sm:gap-[32px] sm:pb-0 sm:pl-[32px] sm:pr-0 sm:pt-[32px]">
        <div className="flex w-full shrink-0 flex-col gap-[6px] sm:w-[260px] sm:justify-end sm:pb-[32px]">
          <h3 className="text-[20px] font-semibold leading-[25px] tracking-[-0.4px] text-black sm:text-[24px] sm:leading-[28.8px] sm:tracking-[-0.48px]">
            {project.name}
          </h3>
          <p className="whitespace-pre-line text-[12px] font-semibold leading-[16.3px] text-black/50">
            {pickField(project.descriptionEs, project.descriptionEn, locale)}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[10px] inline-flex w-full items-center justify-center rounded-full px-6 py-[14px] text-[14px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-fit"
              style={{ backgroundColor: project.accentColor || DEFAULT_ACCENT }}
            >
              {t("visit")}
            </a>
          )}
        </div>
        <div className="relative mt-[20px] min-h-[180px] flex-1 overflow-hidden rounded-tl-[8px] border-l border-t border-black/[0.07] bg-white sm:mt-0 sm:min-h-0">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.name} className="absolute inset-0 h-full w-full object-cover object-left-top" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EAF1FE] to-[#F7F7F7] text-[40px] font-semibold tracking-[-1.2px] text-black/10">
              {project.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
