"use client";
import { createContext } from "react";

type ThemeType = {
  pageBackground: string;
  containerBackground: string;
  cardBackground: string;
  cardText: string;
  header: string;
  footer: string;
  sidebars: string;
  search: string;
  shadow: string;
};

export const initThemes: { light: ThemeType; dark: ThemeType } = {
  light: {
    pageBackground: "",
    containerBackground: "bg-gray-200",
    cardBackground: "bg-gray-100 bg-opacity-90",
    cardText: "text-gray-800",
    header: "bg-gray-200 text-gray-700 rounded-lg shadow p-4 m-4",
    footer: "bg-white rounded-lg shadow m-4 dark:bg-gray-800 text-gray-800",
    sidebars: "bg-gray-100",
    search: `h-32 w-64 p-4 mt-4 ml-4 bg-gray-200 rounded-md`,
    shadow: `shadow-xl `,
  },
  dark: {
    pageBackground: `bg-slate-700`,
    containerBackground: `bg-slate-700`,
    cardBackground: `bg-gray-950 bg-opacity-40`,
    cardText: "text-gray-300",
    header: `bg-slate-950 text-gray-300 rounded-lg shadow p-4 m-4`,
    footer: `bg-slate-950 text-gray-300 rounded-lg shadow p-4 m-4`,
    sidebars: `bg-slate-950`,
    search: `bg-slate-950 bg-opacity-60 rounded-md`,
    shadow: `shadow-xl `,
  },
};

export const ThemeContext = createContext<[ThemeType, any]>([initThemes.dark, ()=>{}]);
