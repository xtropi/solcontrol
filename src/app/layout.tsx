import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";

const font = Titillium_Web({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Sol Control",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
