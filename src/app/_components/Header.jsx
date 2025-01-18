"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const { isSignedIn } = useUser();
  const path = usePathname();

    return !path.includes("aiform") && (
      <div className="p-5 border shadow-sm fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex justify-between items-center ">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="logo" width={180} height={50} />
          </Link>
          <div className="flex gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-5">
                <Link href={"/dashboard"}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton />
              </div>
            ) : (
              <SignInButton>
                <Button>Get Started</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    );
};

export default Header;
