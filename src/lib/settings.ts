import "server-only";
import { cache } from "react";
import { prisma } from "./prisma";
import { defaultSettings, type SiteSettings } from "./settings-schema";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Stored values win; objects merge recursively so new default fields appear automatically. */
function merge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = k in base ? merge((base as Record<string, unknown>)[k], v) : v;
  }
  return out as T;
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!row) {
    await seedFirstRun();
    return defaultSettings;
  }
  return merge(defaultSettings, row.data);
});

export async function saveSettings(data: SiteSettings) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, data },
    update: { data },
  });
}

/** First boot: store default settings plus an example post and project so the site isn't empty. */
async function seedFirstRun() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, data: defaultSettings },
    update: {},
  });
  if ((await prisma.post.count()) === 0) {
    await prisma.post.create({
      data: {
        slug: "bienvenidos",
        titleEs: "Bienvenidos",
        titleEn: "Welcome",
        excerptEs: "Arranca mi newsletter: acá voy a contar en qué estoy trabajando.",
        excerptEn: "My newsletter starts: here I'll share what I'm working on.",
        contentEs:
          "<p>¡Hola! Este es el primer artículo. Editalo o borralo desde <strong>/admin</strong>.</p><p>Acá voy a compartir mis proyectos, lo que aprendo y en qué ando.</p>",
        contentEn:
          "<p>Hi! This is the first post. Edit or delete it from <strong>/admin</strong>.</p><p>Here I'll share my projects, what I learn and what I'm up to.</p>",
        status: "PUBLISHED",
        readingMinutes: 1,
      },
    });
  }
  if ((await prisma.project.count()) === 0) {
    await prisma.project.create({
      data: {
        name: "Mi primer proyecto",
        descriptionEs: "Descripción corta del proyecto. Editalo desde el admin.",
        descriptionEn: "Short project description. Edit it from the admin.",
        url: "https://github.com/",
        tag: "SaaS",
        featured: true,
      },
    });
  }
}
