import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-sm p-8">
        <h1 className="text-xl font-semibold tracking-tight">Panel de administración</h1>
        <p className="mt-1 text-sm text-muted">Ingresá para editar tu sitio.</p>
        <LoginForm />
      </div>
    </div>
  );
}
