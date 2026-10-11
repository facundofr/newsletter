"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type SubscribeState = { status: "idle" | "success" | "invalid" | "error" };

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  locale: z.enum(["es", "en"]).catch("es"),
  // Honeypot: bots tend to fill every field.
  website: z.string().max(0).optional(),
});

export async function subscribe(_: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale"),
    website: formData.get("website") ?? undefined,
  });
  if (!parsed.success) return { status: "invalid" };
  try {
    await prisma.subscriber.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email, locale: parsed.data.locale },
      update: {},
    });
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
