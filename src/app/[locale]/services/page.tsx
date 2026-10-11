import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { Icon } from "@/components/site/Icon";
import { ArrowUpRight, CheckIcon } from "@/components/site/icons";
import { SectionHeading } from "@/components/site/SectionHeading";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("eyebrow") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const [s, t] = await Promise.all([getSettings(), getTranslations("services")]);
  const sv = s.services;

  const cta = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <a href={s.profile.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {pick(sv.ctaLabel, locale)} <ArrowUpRight />
      </a>
      <span className="text-sm text-muted">
        {t("orEmail")}{" "}
        <a href={`mailto:${s.profile.email}`} className="font-medium text-ink underline-offset-4 hover:underline">
          {s.profile.email}
        </a>
      </span>
    </div>
  );

  return (
    <div className="container-site pt-10 sm:pt-20">
      <section>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">{pick(sv.headline, locale)}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{pick(sv.intro, locale)}</p>
        <div className="mt-8">{cta}</div>
      </section>

      <section className="mt-24">
        <SectionHeading title={t("offerings")} />
        <div className="grid gap-3 md:grid-cols-3">
          {sv.offerings.map((o, i) => (
            <div key={i} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft text-xl">
                <Icon value={o.icon} />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{pick(o.title, locale)}</h3>
              <p className="mt-2 text-sm text-muted">{pick(o.description, locale)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading title={pick(sv.processTitle, locale)} />
        <ol className="grid gap-3 md:grid-cols-2">
          {sv.steps.map((step, i) => (
            <li key={i} className="card flex gap-5 p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{pick(step.title, locale)}</h3>
                <p className="mt-1.5 text-sm text-muted">{pick(step.description, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24">
        <SectionHeading title={pick(sv.fitTitle, locale)} />
        <ul className="card divide-y divide-line">
          {sv.fit.map((f, i) => (
            <li key={i} className="flex items-center gap-4 p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckIcon />
              </span>
              {pick(f.label, locale)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 rounded-4xl bg-ink p-8 text-white sm:p-12">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{pick(sv.ctaTitle, locale)}</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={s.profile.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-ink hover:bg-neutral-200">
            {pick(sv.ctaLabel, locale)} <ArrowUpRight />
          </a>
          <a href={`mailto:${s.profile.email}`} className="text-sm text-neutral-300 hover:text-white">
            {s.profile.email}
          </a>
        </div>
      </section>
    </div>
  );
}
