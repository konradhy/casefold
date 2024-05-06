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

export default function PDFViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [currentPage, setCurrentPage] = useState(5);

  const handlePageChange = (e: PageChangeEvent) => {
    setCurrentPage(e.currentPage);

    localStorage.setItem("current-page", `${e.currentPage}`);
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl="https://clever-raven-862.convex.cloud/api/storage/6a23b8e1-32aa-4b2a-9009-5e959050f09f"
        plugins={[defaultLayoutPluginInstance]}
        onPageChange={handlePageChange}
        defaultScale={SpecialZoomLevel.PageFit}
        initialPage={currentPage}
      />
      {currentPage}
    </Worker>
  );
}
