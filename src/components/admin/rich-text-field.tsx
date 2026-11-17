"use client";

import { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  LinkIcon,
  QuoteIcon,
  UndoIcon,
  RedoIcon,
} from "@/lib/icons";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 ${
        active ? "bg-purple-100 text-purple-700" : "text-slate hover:bg-surface hover:text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface px-2 py-1.5">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <QuoteIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt("Link URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <UndoIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <RedoIcon className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextField({
  label,
  name,
  defaultValue,
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  help?: string;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div>
      <label className="block text-sm font-medium text-charcoal">{label}</label>
      <input type="hidden" name={name} value={html} />
      <div className="mt-1.5 overflow-hidden rounded-lg border border-border bg-white shadow-sm focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-500/20">
        {editor && <Toolbar editor={editor} />}
        <EditorContent
          editor={editor}
          className="rich-text max-h-96 min-h-32 overflow-y-auto px-3.5 py-2.5 text-sm [&_.ProseMirror]:outline-none"
        />
      </div>
      {help && <p className="mt-1.5 text-xs text-slate">{help}</p>}
    </div>
  );
}
