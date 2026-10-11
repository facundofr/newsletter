"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { MailIcon } from "./icons";
import { NAV } from "./nav";

const BTN =
  "relative flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[12px] outline-none sm:h-[52px] sm:w-[52px] sm:rounded-[16px]";

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[8px] border border-black/[0.07] bg-[#F7F7F7] px-2 py-0.5 text-[14px] font-semibold tracking-[-0.42px] text-black/50 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
      {label}
    </span>
  );
}

/** Floating navigation dock fixed at the bottom of every page. */
export function Dock() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-[28px] sm:bottom-12 sm:px-6">
      <nav className="pointer-events-auto flex items-center gap-[6px] overflow-visible rounded-[22px] border border-black/[0.07] bg-[#F7F7F7] p-[6px] shadow-[0px_32px_24px_-12px_rgba(0,0,0,0.04)]">
        {NAV.map(({ href, key, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={t(key)}
              className={`${BTN} group border border-black/[0.07] bg-white transition-colors duration-300 active:bg-black/[0.06]`}
            >
              <Tooltip label={t(key)} />
              <Icon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-colors ${active ? "text-[#3b82f6]" : "text-black/40 group-hover:text-black/60"}`}
              />
            </Link>
          );
        })}
        <div className="mx-1 w-px self-stretch bg-black/10" />
        <Link
          href="/newsletter#subscribe"
          aria-label={t("subscribe")}
          className={`${BTN} group border border-transparent bg-[#3b82f6] transition-colors hover:bg-[#2f74e8]`}
        >
          <Tooltip label={t("subscribe")} />
          <MailIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </Link>
      </nav>
    </div>
  );
}
