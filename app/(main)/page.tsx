import Note from "@/components/main/note";
import FileUploadBox from "@/components/main/file-upload-box";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 m-4 bg-background">
      <div className="col-span-2 flex justify-center items-center h-[750px] shadow-2xl ">
        <FileUploadBox />
      </div>
      <div className="col-span-2 flex justify-center items-center shadow-2xl">
        <Note />
      </div>
    </div>
  );
}

/*

1. Create PDFViewer component
2. With react=pdf=view i can leverage on page change to also change the blocknote page
2. Add Seperator
3. Add resizable pannels

Don't worry about how pretty it looks on the outside. Instead, focus on the code being senior and the functionality.

To do:
When I upload a PDF I generate a summarized page by page conversion on the blocknote
1. When I upload a pdf I extract the text. 
  - 
1. In the future ondocumentload can be used. 

1. Make a screen for user to upload the pdf
2. Upon upload we first add it to pdf viewer to render on screen
3. Then we upload

When I scroll the pdf I scroll the blocknote
*/
