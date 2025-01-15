"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../../components/ui/toggle";
import { usePathname } from "next/navigation";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

    return !path.includes("aiform") && (
      <div className="p-5 border shadow-sm">
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