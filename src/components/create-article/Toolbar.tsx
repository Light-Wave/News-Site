"use client";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const btn = (active: boolean) => (active ? "bg-accent" : "");

  const Btn = (props: React.ComponentProps<typeof Button>) => (
    <Button type="button" variant="ghost" size="sm" {...props} />
  );

  return (
    <div
      className="flex flex-wrap gap-1 p-2 border-b"
      role="toolbar"
      aria-label="Editor formatting options"
    >
      <Btn
        className={btn(editor.isActive("heading", { level: 1 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        aria-pressed={editor.isActive("heading", { level: 1 })}
        aria-label="Heading level 1"
      >
        H1
      </Btn>
      <Btn
        className={btn(editor.isActive("heading", { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        aria-pressed={editor.isActive("heading", { level: 2 })}
        aria-label="Heading level 2"
      >
        H2
      </Btn>
      <Btn
        className={btn(editor.isActive("heading", { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        aria-pressed={editor.isActive("heading", { level: 3 })}
        aria-label="Heading level 3"
      >
        H3
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-pressed={editor.isActive("bold")}
        aria-label="Bold"
      >
        <b>B</b>
      </Btn>
      <Btn
        className={btn(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-pressed={editor.isActive("italic")}
        aria-label="Italic"
      >
        <i>I</i>
      </Btn>
      <Btn
        className={btn(editor.isActive("strike"))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        aria-pressed={editor.isActive("strike")}
        aria-label="Strike-through"
      >
        <s>S</s>
      </Btn>
      <Btn
        className={btn(editor.isActive("code"))}
        onClick={() => editor.chain().focus().toggleCode().run()}
        aria-pressed={editor.isActive("code")}
        aria-label="Inline code"
      >
        &lt;/&gt;
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-pressed={editor.isActive("bulletList")}
        aria-label="Bullet list"
      >
        &bull; List
      </Btn>
      <Btn
        className={btn(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-pressed={editor.isActive("orderedList")}
        aria-label="Numbered list"
      >
        1. List
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        aria-pressed={editor.isActive("blockquote")}
        aria-label="Blockquote"
      >
        &quot;
      </Btn>
      <Btn
        className={btn(editor.isActive("codeBlock"))}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-pressed={editor.isActive("codeBlock")}
        aria-label="Code block"
      >
        {"{}"}
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="Horizontal rule"
      >
        {">-"}
      </Btn>
    </div>
  );
}
