import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Link2 } from "lucide-react";

const buttonClass = "rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary disabled:opacity-40";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
    ],
    content: value || { type: "doc", content: [{ type: "paragraph" }] },
    onUpdate: ({ editor: current }) => onChange(current.getJSON()),
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[260px] px-4 py-3 focus:outline-none",
        "aria-label": "Cuerpo de la noticia",
      },
    },
  });

  if (!editor) return <div className="min-h-[260px] animate-pulse rounded-md bg-secondary" />;

  const setLink = () => {
    const previous = editor.getAttributes("link").href || "";
    const url = window.prompt("Pegá el enlace", previous);
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-white">
      <div className="flex flex-wrap gap-2 border-b border-border bg-secondary/40 p-2">
        <button type="button" className={buttonClass} title="Negrita" onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></button>
        <button type="button" className={buttonClass} title="Cursiva" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></button>
        <button type="button" className={buttonClass} title="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></button>
        <button type="button" className={buttonClass} title="Lista numerada" onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></button>
        <button type="button" className={buttonClass} title="Cita" onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></button>
        <button type="button" className={buttonClass} title="Enlace" onClick={setLink}><Link2 size={16} /></button>
        <span className="mx-1 border-l border-border" />
        <button type="button" className={buttonClass} title="Deshacer" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></button>
        <button type="button" className={buttonClass} title="Rehacer" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
