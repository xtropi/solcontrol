"use client";
// import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { ThemeContext, initThemes } from "@/providers/ThemeProvider";
import { useCallback, useMemo, useState } from "react";
import { SearchContext, initSearchParams } from "@/providers/SearchProvider";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

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

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Testnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      // new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <html lang="en" className={"dark"}>
      <body className={font.className}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ThemeContext.Provider value={[theme, setTheme]}>
                <SearchContext.Provider value={[searchParams, setSearch]}>
                  {children}
                </SearchContext.Provider>
              </ThemeContext.Provider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
