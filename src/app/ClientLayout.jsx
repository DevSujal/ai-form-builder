"use client";

import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../components/theme-provider";
import Header from "./_components/Header";

export default function ClientLayout({ children }) {
  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
        <Header />
        {children}
      <Toaster />
    </div>
  );
}
