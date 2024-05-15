"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { name } from "@/lib/utils";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="  bg-background  flex items-center w-full p-6 ">
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Enter {`${name}`}</Link>
            </Button>

            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};
