import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { emailEnabled } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/text";

async function removeSubscriber(formData: FormData) {
  "use server";
  await requireAdmin();
  await prisma.subscriber.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/subscribers");
}

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Suscriptores</h1>
          <p className="mt-1 text-sm text-muted">{subscribers.length} en total</p>
        </div>
        <a href="/admin/subscribers/export" className="btn-secondary">Exportar CSV</a>
      </div>
      {!emailEnabled() && (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          El envío de emails está desactivado. Los suscriptores se guardan igual; para enviarles tus artículos configurá
          RESEND_API_KEY y EMAIL_FROM en el archivo .env (ver README).
        </p>
      )}
      <div className="card mt-6 divide-y divide-line">
        {subscribers.length === 0 && <p className="p-6 text-sm text-muted">Todavía no hay suscriptores.</p>}
        {subscribers.map((s) => (
          <div key={s.id} className="flex items-center gap-4 px-4 py-3 text-sm">
            <span className="min-w-0 flex-1 truncate font-medium">{s.email}</span>
            <span className="rounded-full bg-soft px-2 py-0.5 text-xs uppercase">{s.locale}</span>
            <span className="hidden text-xs text-muted sm:inline">{formatDate(s.createdAt, "es")}</span>
            <form action={removeSubscriber}>
              <input type="hidden" name="id" value={s.id} />
              <button type="submit" className="text-xs text-muted hover:text-red-600">Quitar</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
