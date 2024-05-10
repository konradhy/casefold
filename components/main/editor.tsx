"use client";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

interface EditorProps {
  pageText: string; // Assuming pageText is an array of PartialBlock
}

export default function Editor({ pageText }: EditorProps) {
  //This can be improved by grabing each paragraph and pass each paragraph as their own block. You can also utelize the children prop to pass in the children of the block
  //I should also use special formatting to make it clear that it's AI generated as opposed to your own personal notes
  const initialContent: PartialBlock[] = [
    {
      content: pageText,
    },
  ];

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent,
  });

  return <BlockNoteView editor={editor} />;
}
