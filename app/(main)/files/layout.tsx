"use client";
import { DocumentProvider } from "./DocumentContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DocumentProvider>{children} </DocumentProvider>
    </div>
  );
}





