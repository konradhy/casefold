import React, { createContext, useContext, useState } from "react";

// Define the context shape
interface DocumentContextType {
  fileId: string | null;
  pageNumber: number | null;
  setFileId: (fileId: string) => void;
  setPageNumber: (pageNumber: number) => void;
}

// Create the context with default values
const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

interface DocumentProviderProps {
  children: React.ReactNode;
}

// Provide the context with state logic
export const DocumentProvider: React.FC<DocumentProviderProps> = ({
  children,
}) => {
  const [fileId, setFileId] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number | null>(null);

  return (
    <DocumentContext.Provider
      value={{ fileId, pageNumber, setFileId, setPageNumber }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

// Custom hook to use the document context
export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};


