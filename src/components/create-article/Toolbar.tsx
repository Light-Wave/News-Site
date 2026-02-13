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
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <Btn
        className={btn(editor.isActive("heading", { level: 1 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </Btn>
      <Btn
        className={btn(editor.isActive("heading", { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Btn>
      <Btn
        className={btn(editor.isActive("heading", { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <b>B</b>
      </Btn>
      <Btn
        className={btn(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i>I</i>
      </Btn>
      <Btn
        className={btn(editor.isActive("strike"))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <s>S</s>
      </Btn>
      <Btn
        className={btn(editor.isActive("code"))}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        &lt;/&gt;
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        &bull; List
      </Btn>
      <Btn
        className={btn(editor.isActive("orderedList"))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </Btn>

      <span className="w-px bg-border mx-1" />

      <Btn
        className={btn(editor.isActive("blockquote"))}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        &quot;
      </Btn>
      <Btn
        className={btn(editor.isActive("codeBlock"))}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        {"{}"}
      </Btn>
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        {">-"}
      </Btn>
    </div>
  );
}
