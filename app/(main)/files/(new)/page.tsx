import Note from "@/components/files/note";
import FileUploadBox from "@/components/files/file-upload-box";

export default function Main() {
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
