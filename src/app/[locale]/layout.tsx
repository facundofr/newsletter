import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileNav } from "@/components/site/NavLinks";
import { inter } from "../fonts";
import "../globals.css";

// Content comes from the database and is edited live from /admin.
export const dynamic = "force-dynamic";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const s = await getSettings();
  const l = locale as Locale;
  const title = pick(s.seo.title, l);
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    title: { default: title, template: `%s — ${s.profile.name}` },
    description: pick(s.seo.description, l),
    openGraph: { title, description: pick(s.seo.description, l), type: "website" },
    alternates: { languages: { es: "/", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const settings = await getSettings();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <Header settings={settings} />
          <main>{children}</main>
          <Footer settings={settings} />
          <MobileNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
