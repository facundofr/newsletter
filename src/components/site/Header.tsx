import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/lib/settings-schema";
import { Avatar } from "./Avatar";
import { LangToggle } from "./LangToggle";
import { DesktopNav } from "./NavLinks";

export async function Header({ settings }: { settings: SiteSettings }) {
  const t = await getTranslations("nav");
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Avatar src={settings.profile.avatar} name={settings.profile.name} size={32} />
          <span className="hidden sm:inline">{settings.profile.name}</span>
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <LangToggle />
          <Link href="/newsletter#subscribe" className="btn-primary px-4 py-2 text-xs sm:text-sm">
            {t("subscribe")}
          </Link>
        </div>
      </div>
    </header>
  );
}
