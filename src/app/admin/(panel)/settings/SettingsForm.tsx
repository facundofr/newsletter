"use client";

import { startTransition, useActionState, useState } from "react";
import { ImageField } from "@/components/admin/ImageField";
import { settingsSections, socialsField, type Field, type SiteSettings } from "@/lib/settings-schema";
import type { L } from "@/lib/text";
import { saveSettingsAction, type FormState } from "./actions";

type Obj = Record<string, unknown>;

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [data, setData] = useState<SiteSettings>(initial);
  const [dirty, setDirty] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettingsAction, {});

  function save() {
    const fd = new FormData();
    fd.set("data", JSON.stringify(data));
    startTransition(() => action(fd));
    setDirty(false);
  }

  function updateSection(key: keyof SiteSettings, value: unknown) {
    setData((d) => ({ ...d, [key]: value }));
    setDirty(true);
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
      <nav className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
        <ul className="space-y-1 text-sm">
          {[...settingsSections.map((s) => ({ key: s.key, title: s.title })), { key: "socials", title: "Redes sociales" }].map((s) => (
            <li key={s.key}>
              <a href={`#${s.key}`} className="block rounded-lg px-3 py-1.5 text-muted hover:bg-white hover:text-ink">{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-6 pb-24">
        {settingsSections.map((section) => (
          <section key={section.key} id={section.key} className="card scroll-mt-20 space-y-5 p-6">
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
            {section.fields.map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={(data[section.key] as Obj)[f.key]}
                onChange={(v) => updateSection(section.key, { ...(data[section.key] as Obj), [f.key]: v })}
              />
            ))}
          </section>
        ))}
        <section id="socials" className="card scroll-mt-20 space-y-5 p-6">
          <h2 className="text-lg font-semibold tracking-tight">Redes sociales</h2>
          <FieldInput field={socialsField} value={data.socials} onChange={(v) => updateSection("socials", v)} />
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-3">
          {state.error && <span className="text-sm text-red-600">{state.error}</span>}
          {!dirty && state.ok && <span className="text-sm text-emerald-700">✅ Guardado — ya se ve en el sitio</span>}
          {dirty && <span className="text-sm text-muted">Cambios sin guardar</span>}
          <button type="button" onClick={save} disabled={pending} className="btn-primary">
            {pending ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <label className="label">{field.label}</label>
          <input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="input" />
        </div>
      );
    case "textarea":
      return (
        <div>
          <label className="label">{field.label}</label>
          <textarea value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} rows={3} className="input" />
        </div>
      );
    case "color":
      return (
        <div>
          <label className="label">{field.label}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={String(value || "#1A1A1A")}
              onChange={(e) => onChange(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-black/[0.07] bg-white p-1"
            />
            <input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="input w-32" />
          </div>
        </div>
      );
    case "image":
      return (
        <div>
          <label className="label">{field.label}</label>
          <ImageField value={String(value ?? "")} onChange={onChange} allowText />
        </div>
      );
    case "l":
    case "ltextarea": {
      const v = (value ?? { es: "", en: "" }) as L;
      const Input = field.type === "l" ? "input" : "textarea";
      return (
        <div>
          <label className="label">{field.label}</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["es", "en"] as const).map((lang) => (
              <div key={lang} className="relative">
                <span className="pointer-events-none absolute left-3 top-2.5 text-xs font-semibold uppercase text-neutral-400">{lang}</span>
                <Input
                  value={v[lang]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...v, [lang]: e.target.value })}
                  rows={field.type === "ltextarea" ? 3 : undefined}
                  className="input pl-10"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "list": {
      const items = (value as Obj[]) ?? [];
      const set = (next: Obj[]) => onChange(next);
      const move = (i: number, dir: -1 | 1) => {
        const next = [...items];
        [next[i], next[i + dir]] = [next[i + dir], next[i]];
        set(next);
      };
      return (
        <div>
          <label className="label">{field.label}</label>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-line bg-soft/60 p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-muted">
                  <span>#{i + 1}</span>
                  <div className="flex gap-1">
                    <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="rounded px-2 py-1 hover:bg-white disabled:opacity-30">↑</button>
                    <button type="button" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="rounded px-2 py-1 hover:bg-white disabled:opacity-30">↓</button>
                    <button type="button" onClick={() => set(items.filter((_, j) => j !== i))} className="rounded px-2 py-1 text-red-600 hover:bg-white">Quitar</button>
                  </div>
                </div>
                <div className="space-y-3">
                  {field.fields.map((sub) => (
                    <FieldInput
                      key={sub.key}
                      field={sub}
                      value={item[sub.key]}
                      onChange={(v) => set(items.map((it, j) => (j === i ? { ...it, [sub.key]: v } : it)))}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set([...items, structuredClone(field.empty) as Obj])}
              className="btn-secondary py-2"
            >
              + Agregar
            </button>
          </div>
        </div>
      );
    }
  }
}
