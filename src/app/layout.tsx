"use client";
// import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { ThemeContext, initThemes } from "@/providers/ThemeProvider";
import { useState } from "react";
import { SearchContext, initSearchParams } from "@/providers/SearchProvider";

const font = Titillium_Web({ subsets: ["latin"], weight: "300" });

// export const metadata: Metadata = {
//   title: "Sol Control",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState(initThemes.dark);
  const [searchParams, setSearch] = useState(initSearchParams);
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <SearchContext.Provider value={[searchParams, setSearch]}>
            {children}
          </SearchContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
