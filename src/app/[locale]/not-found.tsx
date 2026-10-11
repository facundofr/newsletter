import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/PageHero";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="pb-24">
      <PageHero icon={<span className="text-[42px] leading-none sm:text-[56px]">🧭</span>} title="404">
        <h2 className="text-[32px] font-semibold leading-[38px] tracking-[-0.96px] text-black/50 sm:text-[48px] sm:leading-[55.7px] sm:tracking-[-1.44px]">
          {t("title")}
        </h2>
        <Link href="/" className="btn-blue mt-[24px]">{t("back")}</Link>
      </PageHero>
    </div>
  );
}
