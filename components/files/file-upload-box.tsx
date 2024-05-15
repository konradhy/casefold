/*
1. Upload the pdf to our file storage
2. extract the pdf on the server
3. Simultanouslly, use pdffviewer or alt to render the pdf
4. Transform the text to summary using llm. Break it up by page
5. insert the summary the the blocknote
6. 
*/
"use client";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import PDFViewer from "./pdf-viewer";
import { useDocument } from "@/app/(main)/files/DocumentContext";
import { Id } from "@/convex/_generated/dataModel";

export default function FileUploadBox() {
  const params = useParams();
  const fileId = params.fileId;

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { setFileId, setPageNumber } = useDocument();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);

  const fetchedFileUrl = useQuery(
    api.files.getFile,
    fileId !== null
      ? {
          fileId: fileId as Id<"files">,
        }
      : "skip",
  );

  useEffect(() => {
    if (fetchedFileUrl) {
      setFileUrl(fetchedFileUrl);
      setFileId(fileId as string);
    }
  }, [fetchedFileUrl]);

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    const fileData = await saveStorageId({
      storageId: (uploaded[0].response as any).storageId,
      fileName: uploaded[0].name,
      fileType: uploaded[0].type,
    });

    setFileUrl(fileData.fileUrl);
    setFileId(fileData.id);
    setPageNumber(0);
  };

  return (
    <>
      {!fileUrl ? (
        <UploadDropzone
          uploadUrl={generateUploadUrl}
          fileTypes={{
            "application/pdf": [".pdf"],
            "image/*": [".png", ".gif", ".jpeg", ".jpg"],
          }}
          onUploadComplete={saveAfterUpload}
          onUploadError={(error: unknown) => {
            // Do something with the error.

            alert(`ERROR! `);
          }}
        />
      ) : (
        <PDFViewer fileUrl={fileUrl} />
      )}
    </>
  );
}
