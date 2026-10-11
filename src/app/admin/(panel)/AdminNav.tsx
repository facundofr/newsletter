"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/posts", label: "Artículos" },
  { href: "/admin/projects", label: "Proyectos" },
  { href: "/admin/settings", label: "Contenido del sitio" },
  { href: "/admin/subscribers", label: "Suscriptores" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto text-sm">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 transition ${
            pathname.startsWith(l.href) ? "bg-ink text-white" : "text-muted hover:text-ink"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
