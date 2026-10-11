import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdmin())) return new Response("No autorizado", { status: 401 });
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "asc" } });
  const rows = [
    "email,locale,created_at",
    ...subscribers.map((s) => `${s.email},${s.locale},${s.createdAt.toISOString()}`),
  ];
  return new Response(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="suscriptores-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
