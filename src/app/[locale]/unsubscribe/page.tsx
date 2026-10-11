import { getLocale, getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { MailIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";

type Props = { searchParams: Promise<{ token?: string; done?: string }> };

async function unsubscribe(formData: FormData) {
  "use server";
  const token = String(formData.get("token") ?? "");
  if (token) await prisma.subscriber.deleteMany({ where: { token } });
  redirect({ href: "/unsubscribe?done=1", locale: await getLocale() });
}

/** Asks for a click before unsubscribing, so email link scanners can't unsubscribe people. */
export default async function UnsubscribePage({ searchParams }: Props) {
  const { token, done } = await searchParams;
  const t = await getTranslations("unsubscribe");
  const subscriber = token ? await prisma.subscriber.findUnique({ where: { token } }) : null;

  return (
    <div className="pb-24">
      <PageHero icon={<MailIcon strokeWidth={1.75} className="h-10 w-10 text-black/70 sm:h-14 sm:w-14" />} title={done ? t("title") : "Newsletter"}>
        <div className="mt-[16px] text-[16px] leading-[22px] text-black/50">
          {done ? (
            <p>{t("text")}</p>
          ) : subscriber ? (
            <form action={unsubscribe} className="flex flex-col items-center gap-[24px]">
              <input type="hidden" name="token" value={token} />
              <p>{subscriber.email}</p>
              <button type="submit" className="btn-blue cursor-pointer">{t("button")}</button>
            </form>
          ) : (
            <p>{t("invalid")}</p>
          )}
        </div>
        <Link href="/" className="mt-[24px] text-[14px] font-semibold text-black/40 transition-colors hover:text-black">
          {t("back")}
        </Link>
      </PageHero>
    </div>
  );
}
