"use client";

import { EditorContent, useEditor, useEditorState, type Editor as TEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import type { EditorView } from "@tiptap/pm/view";
import { pickAndUpload, uploadImage } from "./upload";

type Props = { name: string; initialHtml: string; placeholder?: string };

/** Rich text editor; the HTML is mirrored into a hidden input so it submits with the form. */
export function Editor({ name, initialHtml }: Props) {
  const [html, setHtml] = useState(initialHtml);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } },
      }),
      Image,
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none min-h-[320px] px-5 py-4 outline-none prose-img:rounded-xl",
      },
      // Paste or drop an image file -> upload it and insert it.
      handlePaste: (view, event) => insertFiles(view, event.clipboardData?.files),
      handleDrop: (view, event) => insertFiles(view, (event as DragEvent).dataTransfer?.files),
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white focus-within:border-neutral-400">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function insertFiles(view: EditorView, files?: FileList | null) {
  const images = Array.from(files ?? []).filter((f) => f.type.startsWith("image/"));
  if (!images.length) return false;
  images.forEach((f) =>
    uploadImage(f)
      .then((src) => {
        const node = view.state.schema.nodes.image.create({ src });
        view.dispatch(view.state.tr.replaceSelectionWith(node));
      })
      .catch((e) => alert(e.message)),
  );
  return true;
}

function Toolbar({ editor }: { editor: TEditor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      strike: e.isActive("strike"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      code: e.isActive("codeBlock"),
      link: e.isActive("link"),
    }),
  });
  const c = () => editor.chain().focus();

  function link() {
    if (s.link) return c().unsetLink().run();
    const href = prompt("URL del link:");
    if (href) c().extendMarkRange("link").setLink({ href }).run();
  }

  async function image() {
    try {
      const src = await pickAndUpload();
      if (src) c().setImage({ src }).run();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  const buttons: [string, boolean, () => void, string][] = [
    ["B", s.bold, () => c().toggleBold().run(), "Negrita"],
    ["I", s.italic, () => c().toggleItalic().run(), "Cursiva"],
    ["S", s.strike, () => c().toggleStrike().run(), "Tachado"],
    ["H2", s.h2, () => c().toggleHeading({ level: 2 }).run(), "Título"],
    ["H3", s.h3, () => c().toggleHeading({ level: 3 }).run(), "Subtítulo"],
    ["• Lista", s.bullet, () => c().toggleBulletList().run(), "Lista"],
    ["1. Lista", s.ordered, () => c().toggleOrderedList().run(), "Lista numerada"],
    ["❝", s.quote, () => c().toggleBlockquote().run(), "Cita"],
    ["</>", s.code, () => c().toggleCodeBlock().run(), "Código"],
    ["🔗", s.link, link, "Link"],
    ["🖼️", false, image, "Imagen"],
    ["—", false, () => c().setHorizontalRule().run(), "Separador"],
    ["↶", false, () => c().undo().run(), "Deshacer"],
    ["↷", false, () => c().redo().run(), "Rehacer"],
  ];

  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-line bg-white/95 p-2 backdrop-blur">
      {buttons.map(([label, active, onClick, title]) => (
        <button
          key={title}
          type="button"
          title={title}
          onClick={onClick}
          className={`rounded-lg px-2.5 py-1 text-sm transition ${active ? "bg-ink text-white" : "text-ink hover:bg-soft"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
