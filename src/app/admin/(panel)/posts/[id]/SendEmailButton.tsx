"use client";

import { useActionState } from "react";
import { sendPostEmail, type FormState } from "../actions";

export function SendEmailButton({ id, sentAt, enabled }: { id: string; sentAt: string | null; enabled: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendPostEmail, {});

  if (!enabled) {
    return (
      <span className="text-xs text-muted" title="Configurá RESEND_API_KEY y EMAIL_FROM en el .env">
        ✉️ Email desactivado
      </span>
    );
  }

  return (
    <form
      action={action}
      onSubmit={(e) => {
        const msg = sentAt
          ? `Este artículo ya se envió el ${new Date(sentAt).toLocaleString()}. ¿Reenviarlo a todos?`
          : "¿Enviar este artículo por email a todos los suscriptores?";
        if (!confirm(msg)) e.preventDefault();
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="btn-secondary py-2">
        {pending ? "Enviando…" : sentAt ? "✉️ Reenviar" : "✉️ Enviar a suscriptores"}
      </button>
      {state.ok && <span className="text-xs text-emerald-700">{state.ok}</span>}
      {state.error && <span className="text-xs text-red-600">{state.error}</span>}
    </form>
  );
}
