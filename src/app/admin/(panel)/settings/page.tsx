import { getSettings } from "@/lib/settings";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Contenido del sitio</h1>
      <p className="mt-1 text-sm text-muted">
        Todos los textos del sitio, en español e inglés. Para íconos podés usar un emoji (🚀) o subir una imagen.
      </p>
      <SettingsForm initial={settings} />
    </div>
  );
}
