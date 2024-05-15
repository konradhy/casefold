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
        <Navbar />

        {children}
      </Authenticated>
    </>
  );
}
