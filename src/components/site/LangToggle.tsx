"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = ["en", "es"] as const;

/** EN / ES switch floating in the top-right corner. */
export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();

  return (
    <div className="fixed right-6 top-6 z-50">
      <div
        className={`flex items-center gap-0.5 rounded-full border border-black/[0.07] bg-[#F7F7F7] p-1 shadow-[0px_4px_12px_rgba(0,0,0,0.04)] ${pending ? "opacity-70" : ""}`}
      >
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === locale}
            onClick={() => start(() => router.replace(pathname, { locale: l, scroll: false }))}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide outline-none transition-all duration-200 ${
              l === locale
                ? "border-black/[0.07] bg-white text-black shadow-sm"
                : "border-transparent text-black/40 hover:text-black/60"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
