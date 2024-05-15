"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { name } from "@/lib/utils";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "@/components/search";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="flex items-center w-full px-6 pt-6 pb-2 border-b border-stone-400">
      <div className=" md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && (
          <>
            <Search />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Home</Link>
            </Button>

            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
};
