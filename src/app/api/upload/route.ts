import { isAdmin } from "@/lib/auth";
import { saveImage } from "@/lib/uploads";

/** Image upload used by the admin editor and image fields. */
export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "No autorizado" }, { status: 401 });
  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ error: "Falta el archivo" }, { status: 400 });
  try {
    return Response.json({ url: await saveImage(file) });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
}
