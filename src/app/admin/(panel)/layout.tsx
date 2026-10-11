import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../login/actions";
import { AdminNav } from "./AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link href="/admin" className="font-semibold tracking-tight">Admin</Link>
          <AdminNav />
          <div className="ml-auto flex items-center gap-3 text-sm">
            <a href="/" target="_blank" className="text-muted hover:text-ink">Ver sitio ↗</a>
            <form action={logout}>
              <button type="submit" className="text-muted hover:text-ink">Salir</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
