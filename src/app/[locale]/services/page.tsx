import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/settings";
import { pick } from "@/lib/text";
import { RocketIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: pick((await getSettings()).services.title, locale) };
}

const CARD = "flex h-full flex-col gap-[20px] rounded-[24px] border border-black/[0.01] bg-[#F7F7F7] p-[28px]";
const CARD_TITLE = "text-[20px] font-semibold leading-[26px] tracking-[-0.4px] text-black";

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const [s, t] = await Promise.all([getSettings(), getTranslations("services")]);
  const sv = s.services;
  const p = (v: Parameters<typeof pick>[0]) => pick(v, locale);

  const bookCall = (extra = "") => (
    <a href={s.profile.calendlyUrl} target="_blank" rel="noopener noreferrer" className={`btn-blue ${extra}`}>
      {p(sv.ctaLabel)}
    </a>
  );

  return (
    <>
      <PageHero icon={<RocketIcon strokeWidth={1.75} className="h-10 w-10 text-black/70 sm:h-14 sm:w-14" />} title={p(sv.title)}>
        <p className="mt-[16px] max-w-[480px] whitespace-pre-line text-[16px] leading-[22px] text-black/50">{p(sv.intro)}</p>
        {bookCall("mt-[24px]")}
      </PageHero>

      <section className="mx-auto max-w-[880px] px-[28px] pb-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t("offerings")} title={p(sv.offeringsTitle)} size="md" />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sv.offerings.map((o, i) => (
            <Reveal key={i} delay={i * 160}>
              <div className={CARD}>
                <div className="flex items-center gap-[12px]">
                  <div className="round-icon">
                    <span className="text-[16px] leading-none">{o.icon}</span>
                  </div>
                  <h3 className={CARD_TITLE}>{p(o.title)}</h3>
                </div>
                <p className="text-[14px] leading-[19px] text-black/50">{p(o.description)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[880px] px-[28px] pb-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t("process")} title={p(sv.processTitle)} size="md" />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sv.steps.map((step, i) => (
            <Reveal key={i} delay={(i % 2) * 160}>
              <div className={CARD}>
                <div className="flex items-center gap-[12px]">
                  <div className="round-icon">
                    <span className="text-[14px] font-semibold text-black">{i + 1}</span>
                  </div>
                  <h3 className={CARD_TITLE}>{p(step.title)}</h3>
                </div>
                <ul className="flex flex-col gap-[8px]">
                  {p(step.description)
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line, j) => (
                      <li key={j} className="flex items-start gap-[8px] text-[14px] leading-[19px] text-black/50">
                        <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-black/20" />
                        {line}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[880px] px-[28px] pb-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={t("fit")} title={p(sv.fitTitle)} size="md" />
        </Reveal>
        <Reveal>
          <div className="rounded-[24px] border border-black/[0.01] bg-[#F7F7F7] p-[28px]">
            {sv.fit.map((f, i) => (
              <div key={i}>
                {i > 0 && <div className="my-[16px] h-px bg-black/[0.06]" />}
                <div className="flex items-center gap-[16px]">
                  <div className="round-icon">
                    <span className="text-[14px]">✓</span>
                  </div>
                  <p className="text-[16px] font-semibold leading-[22px] tracking-[-0.32px] text-black">{p(f.label)}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[880px] px-[28px] pb-40 sm:px-6">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="mb-[8px] text-[28px] font-semibold leading-[32.5px] tracking-[-0.56px] text-black sm:text-[36px] sm:leading-[41.8px] sm:tracking-[-0.72px]">
            {p(sv.ctaTitle)}
          </h2>
          <h2 className="mb-[16px] text-[28px] font-semibold leading-[32.5px] tracking-[-0.56px] text-black/50 sm:text-[36px] sm:leading-[41.8px] sm:tracking-[-0.72px]">
            {p(sv.ctaSubtitle)}
          </h2>
          {bookCall()}
        </Reveal>
      </section>
    </>
  );
}
