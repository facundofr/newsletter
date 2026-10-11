import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/lib/settings-schema";
import { NAV } from "./nav";

export async function Footer({ settings }: { settings: SiteSettings }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const products = await prisma.project.findMany({
    where: { featured: true, url: { not: null } },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 4,
    select: { id: true, name: true, url: true },
  });

  return (
    <footer className="mt-24 border-t border-line pb-32 pt-12 md:pb-12">
      <div className="container-site grid gap-10 text-sm sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <p className="font-semibold">{settings.profile.name}</p>
          <a href={`mailto:${settings.profile.email}`} className="block break-all text-muted hover:text-ink">
            {settings.profile.email}
          </a>
        </div>
        <FooterCol title="Menu">
          {NAV.map(({ href, key }) => (
            <Link key={href} href={href} className="text-muted hover:text-ink">
              {t(`nav.${key}`)}
            </Link>
          ))}
        </FooterCol>
        {settings.socials.length > 0 && (
          <FooterCol title={locale === "en" ? "Social" : "Redes"}>
            {settings.socials.map((s) => (
              <a key={s.url + s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                {s.label}
              </a>
            ))}
          </FooterCol>
        )}
        {products.length > 0 && (
          <FooterCol title={t("nav.projects")}>
            {products.map((p) => (
              <a key={p.id} href={p.url!} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                {p.name}
              </a>
            ))}
          </FooterCol>
        )}
      </div>
      <p className="container-site mt-10 text-xs text-muted">
        © {new Date().getFullYear()} {settings.profile.name}. {t("footer.rights")}
      </p>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{title}</p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}
