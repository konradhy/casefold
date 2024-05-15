"use client";

import { Navigation } from "@/components/sidebar/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex ">
        <Navigation />
        {children}
      </div>
    </>
  );
}
