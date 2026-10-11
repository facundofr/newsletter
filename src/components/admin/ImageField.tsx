"use client";

import { useState } from "react";
import { isImageSrc } from "@/lib/text";
import { pickAndUpload } from "./upload";

type Props = {
  value: string;
  onChange: (v: string) => void;
  name?: string;
  /** Allow typing an emoji instead of uploading an image. */
  allowText?: boolean;
  placeholder?: string;
};

export function ImageField({ value, onChange, name, allowText = false, placeholder }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload() {
    setBusy(true);
    setError("");
    try {
      const url = await pickAndUpload();
      if (url) onChange(url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-soft text-2xl">
          {value && isImageSrc(value) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            value
          )}
        </div>
        <input
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? (allowText ? "Emoji o URL de imagen" : "URL de imagen")}
          className="input min-w-[10rem] flex-1"
        />
        <button type="button" onClick={upload} disabled={busy} className="btn-secondary shrink-0 py-2">
          {busy ? "Subiendo…" : "Subir"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-muted hover:text-red-600">
            Quitar
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
