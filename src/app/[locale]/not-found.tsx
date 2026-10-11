import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="container-site py-32 text-center">
      <p className="text-7xl font-semibold tracking-tight text-neutral-200">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <Link href="/" className="btn-secondary mt-8">{t("back")}</Link>
    </div>
  );
}
