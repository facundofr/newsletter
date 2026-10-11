"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();

  return (
    <div className={`flex items-center rounded-full border border-line bg-white p-0.5 text-xs font-medium ${pending ? "opacity-60" : ""}`}>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() =>
            start(() => {
              router.replace(pathname, { locale: l, scroll: false });
            })
          }
          className={`rounded-full px-2.5 py-1 uppercase transition ${l === locale ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
          aria-pressed={l === locale}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
