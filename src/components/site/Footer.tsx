import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/lib/settings-schema";
import { pick } from "@/lib/text";
import { Avatar } from "./Avatar";
import { BackToTop } from "./BackToTop";
import { NAV } from "./nav";

const LINK = "text-[24px] font-semibold leading-tight text-black transition-colors hover:text-[#1E6EF4]";
const LINK_MOBILE = "text-[21px] font-semibold leading-tight tracking-[-0.42px] text-black transition-colors hover:text-[#1E6EF4]";

export async function Footer({ settings }: { settings: SiteSettings }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const products = await prisma.project.findMany({
    where: { featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 5,
    select: { id: true, name: true, url: true },
  });
  const { profile } = settings;

  const columns = [
    {
      title: t("footer.menu"),
      links: NAV.map(({ href, key }) => ({ key: href, label: t(`nav.${key}`), href, internal: true })),
    },
    {
      title: t("footer.follow"),
      links: settings.socials.map((s, i) => ({ key: s.url + i, label: s.label, href: s.url, internal: false })),
    },
    {
      title: t("footer.myProducts"),
      links: products.map((p) => ({ key: p.id, label: p.name, href: p.url ?? "", internal: false })),
    },
  ].filter((c) => c.links.length > 0);

  const renderLink = (l: (typeof columns)[number]["links"][number], cls: string) =>
    l.internal ? (
      <Link key={l.key} href={l.href} className={cls}>{l.label}</Link>
    ) : l.href ? (
      <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>{l.label}</a>
    ) : (
      <span key={l.key} className={cls.replace("hover:text-[#1E6EF4]", "")}>{l.label}</span>
    );

  const intro = (
    <>
      <span className="text-black">{pick(settings.hero.title, locale)}</span>
      <br />
      <span className="text-black/50">{pick(settings.hero.subtitle, locale)}</span>
    </>
  );

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[880px] px-[28px] py-12 pb-36 sm:px-6 sm:py-20 sm:pb-44">
        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <EmailCard label={t("footer.letsTalk")} email={profile.email} />
          <EmailCard label={t("footer.business")} email={profile.businessEmail || profile.email} />
        </div>

        {/* Desktop */}
        <div className="hidden gap-3 md:grid md:grid-cols-[1fr_2fr]">
          <div className="flex h-[329px] flex-col items-center justify-center gap-4 rounded-3xl bg-[#F7F7F7] p-10">
            <p className="max-w-[180px] text-center text-[14px] font-semibold leading-[19px]">{intro}</p>
            <Avatar src={profile.avatar} name={profile.name} size={160} rounded="40px" />
          </div>
          <div className="flex h-[329px] flex-col justify-between gap-8 rounded-3xl bg-[#F7F7F7] p-10">
            <div className="grid w-full grid-cols-3 gap-6">
              {columns.map((c) => (
                <div key={c.title} className="flex flex-col justify-start gap-2">
                  <p className="text-[14px] font-medium text-black/50">{c.title}</p>
                  <nav className="flex flex-col gap-1">{c.links.map((l) => renderLink(l, LINK))}</nav>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-black/50">© {new Date().getFullYear()}</p>
              <BackToTop label={t("footer.backToTop")} />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex flex-row items-center justify-center gap-6 rounded-[24px] bg-[#F7F7F7] p-6">
            <Avatar src={profile.avatar} name={profile.name} size={90} rounded="24px" />
            <p className="text-left text-[14px] font-semibold leading-[19px]">{intro}</p>
          </div>
          <div className="flex flex-col gap-8 rounded-[24px] bg-[#F7F7F7] p-6">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8">
              {columns.map((c) => (
                <div key={c.title} className="contents">
                  <p className="pt-[3px] text-[14px] font-medium text-black/50">{c.title}</p>
                  <nav className="flex flex-col items-end gap-1">{c.links.map((l) => renderLink(l, LINK_MOBILE))}</nav>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-black/50">© {new Date().getFullYear()}</p>
              <BackToTop label={t("footer.backToTop")} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EmailCard({ label, email }: { label: string; email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="group flex h-auto flex-col items-center justify-center gap-2 rounded-[24px] bg-[#F7F7F7] p-6 transition-colors hover:bg-[#EFEFEF] sm:h-[118px] sm:rounded-3xl sm:p-10"
    >
      <p className="text-[14px] font-semibold leading-[19px] text-black/50">{label}</p>
      <span className="break-all text-center text-[21px] font-semibold leading-[26.9px] tracking-[-0.63px] text-black transition-colors group-hover:text-[#1E6EF4] sm:break-normal sm:text-[24px] sm:leading-[30.7px] sm:tracking-[-0.72px]">
        {email}
      </span>
    </a>
  );
}
