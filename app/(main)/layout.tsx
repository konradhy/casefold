"use client";
import { Navbar } from "@/components/navbar";

import { Authenticated } from "convex/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Authenticated>
        <div className=" bg-[url('/background.jpg')] bg-transparent bg-cover bg-center backdrop-blur">
          <Navbar />

          {children}
        </div>
      </Authenticated>
    </>
  );
}
