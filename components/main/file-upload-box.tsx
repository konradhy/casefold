/*
1. Upload the pdf to our file storage
2. extract the pdf on the server
3. Simultanouslly, use pdffviewer or alt to render the pdf
4. Transform the text to summary using llm. Break it up by page
5. insert the summary the the blocknote
6. 
*/
"use client";

import Link from "next/link";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FileUploadBox() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
  };

  return (
    <>
      {}
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
    </>
  );
}







