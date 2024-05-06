"use client"
import "@react-pdf-viewer/core/lib/styles/index.css";
import { SpecialZoomLevel, Viewer, Worker, PageChangeEvent } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useState } from "react";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PDFViewer(){
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [currentPage, setCurrentPage] = useState(5);
    


    const handlePageChange = (e: PageChangeEvent) => {
        setCurrentPage(e.currentPage);
        
        localStorage.setItem('current-page', `${e.currentPage}`);
    }

    return(
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
           
                <Viewer
                    fileUrl="/pdfs/model.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                    onPageChange={handlePageChange}
                    defaultScale={SpecialZoomLevel.PageFit}
                initialPage={currentPage}
                />
                {currentPage}
         
        </Worker>
    )
}