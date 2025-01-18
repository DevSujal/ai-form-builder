"use client";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import {SideNav} from "./_components";
import { AlignJustify, X } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <SignedIn>
      <div>
        <div className="w-72 fixed flex gap-2">
          <SideNav
            className={`md:grid 
              h-full 
              w-64 
              bg-white 
          fixed 
        top-30 
        left-0 
        md:left-64
        transform 
        transition-transform 
        duration-300 
        ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-full"}
          `}
          />
          {
            <div className="md:hidden mt-5 cursor-pointer">
              {(isVisible && (
                <X
                  onClick={() => setIsVisible(false)}
                  className={` 
        transform 
        transition-transform 
        duration-300 
        ease-in-out
        absolute
        left-64
        `}
                />
              )) || (
                <AlignJustify
                  onClick={() => setIsVisible(true)}
                  className="ml-4"
                />
              )}
            </div>
          }
        </div>
        <div className="ml-2 md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;
