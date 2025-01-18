"use client";
import { usePathname } from "next/navigation";
import { Toaster } from "../components/ui/toaster";
import { Header } from "./_components";

export default function ClientLayout({ children }) {
  const path = usePathname();
  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
      {!path.includes("aiform") && <Header />}
      <div className={`${!path.includes("aiform") && "mt-20"}`}>{children}</div>
      <Toaster />
    </div>
  );
}
