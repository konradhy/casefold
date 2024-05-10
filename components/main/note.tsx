"use client";
import dynamic from "next/dynamic";
import { useDocument } from "@/app/(main)/DocumentContext";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PartialBlock } from "@blocknote/core";

const Editor = dynamic(() => import("./editor"), { ssr: false });

export default function Note() {
  const { fileId, pageNumber } = useDocument();
  const fileIdTyped: Id<"files"> = fileId as unknown as Id<"files">;
  const shouldQuery = fileId != null && pageNumber != null;
  const pageText = useQuery(
    api.files.getPageText,
    shouldQuery
      ? {
          fileId: fileIdTyped,
          pageNumber,
        }
      : "skip",
  );

  if (!pageText) {
    return null;
  }
  return (
    <div>
      <Editor pageText={pageText} />
    </div>
  );
}

/*
1. Takes a look at the file ID and the Pagenumber then passes in some intial content to the editor


*/
