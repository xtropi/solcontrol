"use client";
import { SearchContext } from "@/providers/SearchProvider";
import { ThemeContext, initThemes } from "@/providers/ThemeProvider";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { ChangeEventHandler, useCallback, useContext, useEffect } from "react";

export const SearchPanel = ({ data }: any) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [searchParams, setSearch] = useContext(SearchContext);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      // console.log(event.currentTarget?.checked)
      setSearch((prevState: any) => ({
        ...prevState,
        isRecommended: !prevState.isRecommended,
      }));
    },
    [setSearch]
  );
  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);
  return (
    <div className={theme.search+" w-64 p-4 mt-4 ml-4 "}>
      <h1 className={`grid place-content-center mb-6 text-3xl font-bold ${theme.cardText}`}>SOL Control</h1>
      <div className="grid place-content-center">
        <WalletMultiButton />
      </div>
      <label className="inline-flex items-center cursor-pointer m-3">
        <input
          type="checkbox"
          checked={searchParams.isRecommended}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="relative w-20 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-xl font-medium text-gray-800 dark:text-gray-300">
          Community recommended
        </span>
      </label>
    </div>
  );
};
