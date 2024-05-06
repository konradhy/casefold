



function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="500px"
      style={{ border: 'none' }}
      title="PDF Viewer"
    />
  );
}

export default PdfViewer;