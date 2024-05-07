"use client";

import { useState } from "react";
import {
  SpecialZoomLevel,
  Viewer,
  Worker,
  PageChangeEvent,
  DocumentLoadEvent,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  fileUrl: string;
}
export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [currentPage, setCurrentPage] = useState(5);

  const handlePageChange = (e: PageChangeEvent) => {
    setCurrentPage(e.currentPage);

    localStorage.setItem("current-page", `${e.currentPage}`);
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl}
        plugins={[defaultLayoutPluginInstance]}
        onPageChange={handlePageChange}
        defaultScale={SpecialZoomLevel.PageFit}
        initialPage={currentPage}
      />
      {currentPage}
    </Worker>
  );
}



