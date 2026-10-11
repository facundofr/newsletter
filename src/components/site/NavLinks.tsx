"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV } from "./nav";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
}

export function DesktopNav() {
  const t = useTranslations("nav");
  const isActive = useIsActive();
  return (
    <nav className="hidden items-center gap-1 rounded-full border border-line bg-white p-1 md:flex">
      {NAV.map(({ href, key }) => (
        <Link
          key={href}
          href={href}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            isActive(href) ? "bg-ink text-white" : "text-muted hover:text-ink"
          }`}
        >
          {t(key)}
        </Link>
      ))}
    </nav>
  );
}

/** Floating pill navigation at the bottom of the screen on mobile. */
export function MobileNav() {
  const t = useTranslations("nav");
  const isActive = useIsActive();
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden">
      <div className="flex items-center gap-1 rounded-full border border-line bg-white/90 p-1.5 shadow-lg shadow-black/5 backdrop-blur">
        {NAV.map(({ href, key, Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={t(key)}
            className={`flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-[11px] transition ${
              isActive(href) ? "bg-ink text-white" : "text-muted"
            }`}
          >
            <Icon className="h-5 w-5" />
            {t(key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
