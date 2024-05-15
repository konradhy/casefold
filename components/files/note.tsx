"use client";
import dynamic from "next/dynamic";
import { useDocument } from "@/app/(main)/files/DocumentContext";
import { useQuery, useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect } from "react";

const Editor = dynamic(() => import("./editor"), { ssr: false });

export default function Note() {
  const convex = useConvex();
  const [result, setResult] = useState<string | null>(null);
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

  useEffect(() => {
    async function fetchData() {
      if (!fileIdTyped || pageNumber == null) {
        return;
      }
      //Use only if handleSave was triggered. Set up useing context, after use reset the check
      try {
        const result = await convex.query(api.files.getBlock, {
          fileId: fileIdTyped,
          pageNumber: pageNumber,
        });
        setResult(result);
      } catch (error) {
        console.error("Failed to fetch data from getblock", error);
      }
    }
    void fetchData();
  }, [pageNumber, fileIdTyped, convex]);

  if (!fileIdTyped || pageNumber == null) {
    return null;
  }

  return (
    <div>
      <Editor
        pageText={pageText || ""}
        pageNumber={pageNumber}
        fileId={fileIdTyped}
        block={result}
      />
    </div>
  );
}

/*
1. Takes a look at the file ID and the Pagenumber then passes in some intial content to the editor


*/
