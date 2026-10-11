"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { subscribe, type SubscribeState } from "@/app/actions";

export function SubscribeForm() {
  const t = useTranslations("subscribe");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [state, action, pending] = useActionState<SubscribeState, FormData>(subscribe, { status: "idle" });

  if (state.status === "success") {
    return (
      <p className="rounded-full border border-black/[0.07] bg-white px-6 py-3.5 text-[14px] font-semibold text-black">
        ✓ {t("success")}
      </p>
    );
  }

  return (
    <form action={action}>
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-3">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 rounded-full border border-black/[0.07] bg-white px-6 py-3.5 text-[14px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-[#1E6EF4]"
        />
        <button
          type="submit"
          disabled={pending || !email.trim()}
          className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#1E6EF4] px-8 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1A62DB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? t("sending") : t("button")}
        </button>
      </div>
      {state.status === "invalid" && <p className="mt-3 px-6 text-[13px] font-semibold text-red-600">{t("invalid")}</p>}
      {state.status === "error" && <p className="mt-3 px-6 text-[13px] font-semibold text-red-600">{t("error")}</p>}
    </form>
  );
}
