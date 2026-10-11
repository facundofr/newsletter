import type { Locale } from "@/i18n/routing";
import type { SiteSettings } from "@/lib/settings-schema";
import { pick } from "@/lib/text";
import { SubscribeForm } from "./SubscribeForm";

/** Gray "Get weekly insights" box with the email form. */
export function SubscribeBox({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const n = settings.newsletter;
  return (
    <div id="subscribe" className="flex scroll-mt-24 flex-col rounded-[16px] border border-black/[0.01] bg-[#F7F7F7] p-[20px] sm:px-[32px] sm:py-[28px]">
      <p className="text-[20px] font-semibold leading-[24px] tracking-[-0.6px] sm:text-[24px] sm:leading-[28.8px] sm:tracking-[-0.72px]">
        <span className="text-black">{pick(n.ctaTitle, locale)}</span> <span className="text-black/50">{pick(n.ctaSubtitle, locale)}</span>
      </p>
      <p className="mb-5 mt-2 text-[13px] font-semibold leading-[18px] text-black/50 sm:mb-6 sm:text-[14px] sm:leading-[19px]">
        {pick(n.description, locale)}
      </p>
      <SubscribeForm />
    </div>
  );
}
