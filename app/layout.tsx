import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { name } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${name} - Read cases in half the time`,
  description: "CaseFold makes it easier to read cases by providing a split-screen interface where you view legal cases and their summaries side-by-side. Enhance your understanding with editable summaries, intuitive navigation, and a user-friendly layout designed for law students and professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
