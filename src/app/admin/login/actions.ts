"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { checkCredentials, createSession, destroySession } from "@/lib/auth";

// Simple in-memory brute-force protection: 5 failed attempts per IP every 15 minutes.
const attempts = new Map<string, { count: number; until: number }>();
const WINDOW = 15 * 60 * 1000;

export type LoginState = { error: string; email: string };

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "local";
  const now = Date.now();
  const email = String(formData.get("email") ?? "");
  const entry = attempts.get(ip);
  if (entry && entry.until > now && entry.count >= 5) {
    return { error: "Demasiados intentos. Esperá 15 minutos.", email };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(email, password)) {
    const next = entry && entry.until > now ? entry.count + 1 : 1;
    attempts.set(ip, { count: next, until: now + WINDOW });
    return { error: "Email o contraseña incorrectos.", email };
  }

  attempts.delete(ip);
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
