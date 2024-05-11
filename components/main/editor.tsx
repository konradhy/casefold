"use client";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock, Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMemo } from "react";

interface EditorProps {
  pageText: string;
  pageNumber: number;
  fileId: Id<"files">;
}

export default function Editor({ pageText, pageNumber, fileId }: EditorProps) {
  const savePageText = useMutation(api.files.savePageText);

  const handleSave = async (jsonBlocks: Block[]) => {
    console.log("Saving page text");

   try {
    await savePageText({
      fileId: fileId,
      pageNumber: pageNumber,
      pageText: JSON.stringify(jsonBlocks),
    });
  } catch (error) {
    console.error("Failed to save page text", error);
  }
  };

  //This can be improved by grabing each paragraph and pass each paragraph as their own block. You can also utelize the children prop to pass in the children of the block
  //I should also use special formatting to make it clear that it's AI generated as opposed to your own personal notes

  // const editor: BlockNoteEditor = use
  // useCreateBlockNote({
  //   initialContent: initialContent,
  // });
  const editor = useMemo(() => {
    const initialContent: PartialBlock[] = [
      {
        content: pageText,
      },
    ];

    return BlockNoteEditor.create({ initialContent });
  }, [pageText]);

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
    
        void handleSave(editor.document);
      }}
    />
  );
}
