"use client";
import { Toaster } from "../components/ui/toaster";
import { Header } from "./_components";

export default function ClientLayout({ children }) {
  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
      <Header />
      <div className="mt-20">{children}</div>
      <Toaster />
    </div>
  );
}
