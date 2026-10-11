export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Error subiendo la imagen");
  return data.url as string;
}

/** Opens the file picker and resolves with the uploaded image URL (or null if cancelled). */
export function pickAndUpload(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      uploadImage(file).then(resolve, reject);
    };
    input.click();
  });
}
