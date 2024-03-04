'use client';
import { createContext } from 'react';

export const initThemes = {
    light: {
      pageBackground: "",
      containerBackground: "bg-gray-200",
      cardBackground: "bg-gray-100",
      cardText: "text-gray-800",
      pageHeader: "bg-gray-600 text-gray-200",
      footer: "bg-white rounded-lg shadow m-4 dark:bg-gray-800 text-gray-800",
      sidebars: "bg-gray-100 sm:w-32",
    },
    dark: {
      pageBackground: `bg-slate-700`,
      containerBackground: `bg-slate-700`,
      cardBackground: `bg-gray-950`,
      cardText: "text-gray-300",
      header: `bg-slate-950 text-gray-300 rounded-lg shadow p-4 m-4`,
      footer: `bg-slate-950 text-gray-300 rounded-lg shadow p-4 m-4`,
      sidebars: `bg-slate-950 sm:w-0 lg:w-16 2xl:w-64`,
      shadow: `shadow-xl `,
    },
  };

export const ThemeContext = createContext<[any, any] | []>([]);