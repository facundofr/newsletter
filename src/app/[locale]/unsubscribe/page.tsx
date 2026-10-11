import { getLocale, getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";

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
    <div className="container-site max-w-xl pt-20 text-center">
      {done ? (
        <>
          <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-muted">{t("text")}</p>
        </>
      ) : subscriber ? (
        <form action={unsubscribe}>
          <input type="hidden" name="token" value={token} />
          <p className="text-muted">{subscriber.email}</p>
          <button type="submit" className="btn-primary mt-6">{t("button")}</button>
        </form>
      ) : (
        <p className="text-muted">{t("invalid")}</p>
      )}
      <Link href="/" className="btn-secondary mt-10">{t("back")}</Link>
    </div>
  );
}
