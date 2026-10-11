"use client";

import { useState } from "react";

/** ES / EN tabs. Both panels stay mounted (just hidden) so all fields submit with the form. */
export function LocaleTabs({ es, en }: { es: React.ReactNode; en: React.ReactNode }) {
  const [tab, setTab] = useState<"es" | "en">("es");
  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-line bg-white p-1 text-sm">
        {(["es", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setTab(l)}
            className={`rounded-full px-4 py-1.5 transition ${tab === l ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
          >
            {l === "es" ? "🇦🇷 Español" : "🇺🇸 English"}
          </button>
        ))}
      </div>
      <div className={tab === "es" ? "space-y-5" : "hidden"}>{es}</div>
      <div className={tab === "en" ? "space-y-5" : "hidden"}>{en}</div>
    </div>
  );
}
