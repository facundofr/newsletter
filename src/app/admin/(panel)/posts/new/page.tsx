import Link from "next/link";
import { PostForm } from "../PostForm";

export default function NewPost() {
  return (
    <div>
      <Link href="/admin/posts" className="text-sm text-muted hover:text-ink">← Artículos</Link>
      <h1 className="mb-6 mt-2 text-2xl font-semibold tracking-tight">Nuevo artículo</h1>
      <PostForm />
    </div>
  );
}
