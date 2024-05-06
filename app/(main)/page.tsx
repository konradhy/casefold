import PDFViewer from "@/components/main/pdf-viewer";
import Note from "@/components/main/note";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 m-4 bg-background">
      <div className="col-span-2 flex justify-center items-center h-[750px] shadow-2xl ">
        <PDFViewer />
      </div>

      <div className="col-span-2 flex justify-center items-center shadow-2xl">
       <Note/>
      </div>
    </div>
  );
}

/*

1. Create PDFViewer component
2. With react=pdf=view i can leverage on page change to also change the blocknote page
2. Add Seperator
3. Add resizable pannels

*/
