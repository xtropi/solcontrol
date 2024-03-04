import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from "./theme";

const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <div className="min-h-screen flex flex-col">

          <div className="flex-1 flex flex-col sm:flex-row">
            <main className={`flex-1 ${theme.pageBackground}`}>
              <header className={`${theme.header}`}>
                <h1 className="text-3xl font-bold">SOL Control</h1>
              </header>
              <div className={`overflow-y-auto px-4 py-8 ${theme.containerBackground}`}>
                {children}
              </div>
              <footer className={`${theme.footer}`}>
                <p>Made with Smart Validator Toolkit API.</p>
                <p>© 2024 Mukh.tar</p>
              </footer>
              </main>


            <nav className={`order-first ${theme.sidebars}`}></nav>
            <aside className={`${theme.sidebars}`}></aside>
          </div>

        </div>
      </body>
    </html>
  );
}
