"use client"
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

export default function Editor() {

  const editor = useCreateBlockNote();
 
 
  return <BlockNoteView editor={editor} />;
}

