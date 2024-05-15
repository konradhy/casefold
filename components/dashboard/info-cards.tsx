"use client"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { InfoCard } from "./info-card";

/*
Create the component for the info cards. 
I think there are two ways i can do useImperativeHandle(
  I could grab the info from the database and use a loop to return the batch of info CardPropsOr this could accept a propwhich has 
  the data and the loop is controlled elsewhere. 

  Actually i realize now. I need to first make info cards and that has a loop of info card

*/
export default function InfoCards() {
  const fileInfo = useQuery(api.files.getFilesForUser)
  if(!fileInfo) return null

  return (
   <>
      {fileInfo?.map((file) => (
        <InfoCard key={file._id} fileName={file.fileName} description={"AI generated summary of what this is"} 
        creationTime={file._creationTime} id={file._id} />
       
      ))}
      </>

  );
}