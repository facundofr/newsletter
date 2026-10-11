"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type FormState = { error?: string };

const optional = z.string().trim().transform((v) => v || null);

const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  descriptionEs: z.string().trim(),
  descriptionEn: optional,
  image: optional,
  url: optional.refine((v) => !v || /^https?:\/\//.test(v), "La URL debe empezar con http:// o https://"),
  tag: optional.optional(),
  accentColor: optional.refine((v) => !v || /^#[0-9a-fA-F]{6}$/.test(v), "Color inválido"),
  featured: z.literal("on").optional(),
  order: z.coerce.number().int().catch(0),
});

export async function saveProject(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { id, featured, ...data } = parsed.data;
  const values = { ...data, featured: featured === "on" };

  if (id) await prisma.project.update({ where: { id }, data: values });
  else await prisma.project.create({ data: values });
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: String(formData.get("id")) } });
  redirect("/admin/projects");
}
