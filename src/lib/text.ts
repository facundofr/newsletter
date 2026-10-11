import type { Locale } from "@/i18n/routing";

/** Bilingual string stored in settings. */
export type L = { es: string; en: string };

/** Pick the localized value, falling back to Spanish when English is empty. */
export function pick(value: L | undefined, locale: Locale): string {
  if (!value) return "";
  return (locale === "en" ? value.en : value.es) || value.es || value.en || "";
}

/** Pick between a required Spanish field and an optional English one. */
export function pickField(es: string, en: string | null | undefined, locale: Locale) {
  return locale === "en" && en?.trim() ? en : es;
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-AR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function isImageSrc(icon: string): boolean {
  return icon.startsWith("/") || icon.startsWith("http");
}
