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
  block: string | null | undefined;
}

export default function Editor({
  pageText,
  pageNumber,
  fileId,
  block,
}: EditorProps) {
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

  const editor = useMemo(() => {
    if (block) {
      return BlockNoteEditor.create({ initialContent: JSON.parse(block) });
    }
    const initialContent: PartialBlock[] = [
      {
        content: pageText,
      },
    ];

    return BlockNoteEditor.create({ initialContent });
  }, [pageText, block]); // you cah just ignore certain dependency

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        //I am suspicious of this void
        void handleSave(editor.document);
      }}
    />
  );
}
