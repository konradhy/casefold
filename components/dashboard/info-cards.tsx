"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { InfoCard } from "./info-card";
import { useSearchParams } from "next/navigation";

export default function InfoCards() {
  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");
  //maybe needs to be done with usestate

  const fileInfo = useQuery(
    api.files.getFilesForUser,
    searchString ? { searchString } : {},
  );
  if (!fileInfo) return null;

  return (
    <>
      {fileInfo?.map((file) => (
        <InfoCard
          key={file._id}
          fileName={file.fileName}
          description={"AI generated summary of what this is"}
          creationTime={file._creationTime}
          id={file._id}
        />
      ))}
    </>
  );
}
