import { prisma } from "@/lib/prisma";

/** RFC 8058 one-click unsubscribe (used by Gmail/Outlook's "Unsubscribe" button). */
export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (token) await prisma.subscriber.deleteMany({ where: { token } });
  return new Response(null, { status: 204 });
}
