"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { subscribe, type SubscribeState } from "@/app/actions";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("subscribe");
  const locale = useLocale();
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });

  if (state.status === "success") {
    return <p className="rounded-full bg-soft px-5 py-3 text-sm font-medium">✅ {t("success")}</p>;
  }

  return (
    <div className="w-full max-w-md">
      <form action={action} className="flex w-full gap-2 rounded-full border border-line bg-white p-1.5">
        <input type="hidden" name="locale" value={locale} />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <input
          type="email"
          name="email"
          required
          placeholder={t("placeholder")}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted"
        />
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? t("sending") : t("button")}
        </button>
      </form>
      {state.status === "invalid" && <p className="mt-2 px-4 text-xs text-red-600">{t("invalid")}</p>}
      {state.status === "error" && <p className="mt-2 px-4 text-xs text-red-600">{t("error")}</p>}
      {!compact && state.status === "idle" && <p className="mt-2 px-4 text-xs text-muted">{t("noSpam")}</p>}
    </div>
  );
}
