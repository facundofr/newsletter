import "server-only";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR ?? "./uploads");

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const MAX_BYTES = 8 * 1024 * 1024;

/** Saves an uploaded image and returns its public URL. */
export async function saveImage(file: File): Promise<string> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Formato no soportado (usá JPG, PNG, WEBP, GIF o AVIF)");
  if (file.size > MAX_BYTES) throw new Error("La imagen supera los 8 MB");

  const now = new Date();
  const dir = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const name = `${randomUUID()}.${ext}`;
  await mkdir(path.join(UPLOAD_DIR, dir), { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, dir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${dir}/${name}`;
}
