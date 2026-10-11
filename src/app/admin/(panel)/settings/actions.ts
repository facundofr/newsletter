"use server";

import { requireAdmin } from "@/lib/auth";
import { saveSettings } from "@/lib/settings";
import { defaultSettings, type SiteSettings } from "@/lib/settings-schema";

export type FormState = { error?: string; ok?: boolean; at?: number };

/** Forces untrusted input into the exact shape of the defaults (unknown keys dropped, types coerced). */
function conform(template: unknown, value: unknown): unknown {
  if (typeof template === "string") return typeof value === "string" ? value.slice(0, 5000) : template;
  if (Array.isArray(template)) {
    return Array.isArray(value) ? value.slice(0, 50).map((v) => conform(template[0], v)) : template;
  }
  if (typeof template === "object" && template !== null) {
    const v = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(template).map(([k, t]) => [k, conform(t, v[k])]));
  }
  return template;
}

export async function saveSettingsAction(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  try {
    const data = conform(defaultSettings, JSON.parse(String(formData.get("data")))) as SiteSettings;
    await saveSettings(data);
    return { ok: true, at: Date.now() };
  } catch {
    return { error: "No se pudo guardar. Revisá los datos." };
  }
}
