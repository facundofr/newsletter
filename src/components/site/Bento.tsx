import type { SiteSettings } from "@/lib/settings-schema";
import { CheckPin, MapPin } from "./icons";
import { Reveal } from "./Reveal";
import { SocialTiles } from "./SocialTiles";

const CARD = "rounded-[24px] border border-black/[0.01] bg-[#F7F7F7] sm:rounded-[32px]";
const LABEL = "text-[12px] font-semibold leading-[16.3px] text-black/50";
const VALUE = "text-[24px] font-semibold leading-[28.8px] tracking-[-0.72px] text-black";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="flex items-center gap-[6px] rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-black/50">
        <span className="h-1.5 w-1.5 rounded-full bg-[#35C759]" />
        {children}
      </span>
    </div>
  );
}

type Text = {
  headline: string;
  bio: string;
  emoji: string;
  location: string;
  codingSince: string;
  focus: string;
  focusEmoji: string;
  name: string;
  basedIn: string;
  codingSinceLabel: string;
  mySocials: string;
  connect: string;
  platforms: string;
  alwaysLearning: string;
  exploring: string;
  lang: string;
};

/** The "about me" bento grid of the home page. */
export function Bento({ text, socials }: { text: Text; socials: SiteSettings["socials"] }) {
  const code = [
    "<!DOCTYPE html>",
    `<html lang="${text.lang}">`,
    "<head>",
    '    <meta charset="UTF-8" />',
    `    <title>${text.name}</title>`,
    "</head>",
  ];

  return (
    <section className="mx-auto max-w-[880px] px-[28px] pb-20 sm:px-6 sm:pb-40">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Big intro card */}
        <Reveal className="md:col-span-6">
          <div className={`${CARD} group flex h-[360px] flex-col justify-start gap-6 overflow-hidden p-[24px] sm:h-[567px] sm:gap-8 sm:p-[39px]`}>
            <h3 className="max-w-[285px] text-[24px] font-semibold leading-[30px] tracking-[-0.48px] text-black sm:text-[36px] sm:leading-[41.8px] sm:tracking-[-0.72px]">
              {text.headline} <span className="text-black/50">{text.bio}</span>
            </h3>
            <div className="mb-4 flex flex-1 items-end justify-center transition-transform duration-700 group-hover:scale-105 sm:mb-8">
              <span className="select-none text-[100px] leading-none sm:text-[160px]">{text.emoji}</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-6" delay={100}>
          <div className="flex h-auto flex-col gap-4 md:h-[567px]">
            {/* Based in */}
            <div className={`${CARD} relative flex min-h-[220px] flex-1 flex-col overflow-hidden px-[20px] pt-[20px] sm:px-[32px] sm:pt-[28px]`}>
              <div className="flex flex-col gap-[2px]">
                <p className={LABEL}>{text.basedIn}</p>
                <h4 className={VALUE}>{text.location}</h4>
              </div>
              <div className="absolute bottom-0 left-1/2 top-[73px] flex w-[calc(100%+64px)] -translate-x-1/2 items-center justify-center sm:justify-between">
                {[0, 1, 2].map((i) => (
                  <div key={`l${i}`} className="pin flex h-[64px] w-[64px] shrink-0 items-center justify-center" style={{ animationDelay: `${i * 80}ms` }}>
                    <MapPin className="h-10 w-10" />
                  </div>
                ))}
                <div className="pin relative z-10 flex w-[64px] shrink-0 items-end justify-center sm:mx-[12px]" style={{ animationDelay: "300ms" }}>
                  <CheckPin className="h-[72px] w-[64px] drop-shadow-[0_8px_16px_rgba(30,110,244,0.35)]" />
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={`r${i}`} className="pin flex h-[64px] w-[64px] shrink-0 items-center justify-center" style={{ animationDelay: `${(2 - i) * 80}ms` }}>
                    <MapPin className="h-10 w-10" />
                  </div>
                ))}
              </div>
            </div>

            {/* Coding since */}
            <div className={`${CARD} flex min-h-[220px] flex-1 flex-col overflow-hidden pt-[20px] sm:pt-[28px]`}>
              <div className="flex flex-col gap-[2px] px-[20px] sm:px-[32px]">
                <p className={LABEL}>{text.codingSinceLabel}</p>
                <h4 className={VALUE}>{text.codingSince}</h4>
              </div>
              <div className="relative ml-[20px] mt-4 flex-1 overflow-hidden sm:ml-[32px] sm:mt-6">
                <div className="flex h-full flex-col rounded-tl-[16px] border-l border-t border-black/[0.07] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex gap-[6px] border-b border-black/[0.07] px-[16px] pb-[10px] pt-[12px]">
                    <div className="h-[8px] w-[8px] rounded-full bg-black/50" />
                    <div className="h-[8px] w-[8px] rounded-full bg-black/10" />
                    <div className="h-[8px] w-[8px] rounded-full bg-black/10" />
                  </div>
                  <div className="px-[16px] pt-[10.5px]">
                    <div className="whitespace-pre font-mono text-[14px] font-medium leading-[20.2px] tracking-[-0.42px] text-black/50">
                      {code.map((line, i) => (
                        <div key={i} className="code-line" style={{ animationDelay: `${300 + i * 120}ms` }}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[136px] bg-gradient-to-r from-transparent to-[#F7F7F7]" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Socials */}
        <Reveal className="md:col-span-5">
          <div className={`${CARD} flex h-[220px] flex-col justify-between px-[20px] pb-[20px] pt-[20px] sm:h-[273px] sm:px-[32px] sm:pb-[32px] sm:pt-[28px]`}>
            <Pill>{text.mySocials}</Pill>
            <div className="flex flex-col items-center justify-center gap-6">
              <p className="text-center text-[18px] font-semibold leading-[23.4px] tracking-[-0.54px]">
                <span className="text-black">{text.connect}</span> <span className="text-black/50">{text.platforms}</span>
              </p>
              <SocialTiles socials={socials} />
            </div>
          </div>
        </Reveal>

        {/* Always learning */}
        <Reveal className="md:col-span-7" delay={100}>
          <div className={`${CARD} flex h-auto flex-col justify-between overflow-hidden px-[20px] pb-[20px] pt-[20px] sm:relative sm:h-[273px] sm:px-[32px] sm:pb-[32px] sm:pt-[28px]`}>
            <Pill>{text.alwaysLearning}</Pill>
            <div className="mt-[16px] sm:mt-0 sm:max-w-[60%]">
              <p className="text-[24px] font-semibold leading-[28.8px] tracking-[-0.72px] text-black/50">{text.exploring}</p>
              <h4 className={VALUE}>{text.focus}</h4>
            </div>
            <div className="mt-[8px] flex select-none justify-center sm:absolute sm:right-[24px] sm:top-1/2 sm:mt-0 sm:-translate-y-1/3">
              <span className="text-[80px] leading-none sm:text-[140px]">{text.focusEmoji}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
