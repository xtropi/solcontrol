export const darkMainColor = 'gray'
export const darkAccentColor = 'amber'
const themes = {
  light: {
    pageBackground: "",
    containerBackground: "bg-gray-200",
    cardBackground: (index: number) =>
      index % 2 === 0 ? "bg-white" : "bg-gray-100",
    cardText: "text-gray-800",
    pageHeader: "bg-gray-600 text-gray-200",
    footer: "bg-white rounded-lg shadow m-4 dark:bg-gray-800 text-gray-800",
    sidebars: "bg-gray-100 sm:w-32",
  },
  dark: {
    pageBackground: `bg-${darkAccentColor}-900`,
    containerBackground: `bg-${darkAccentColor}-900`,
    cardBackground: `bg-gray-900`,
    cardText: "text-gray-100",
    header: `bg-${darkAccentColor}-950 text-gray-200 rounded-lg shadow p-4 m-4`,
    footer: `bg-${darkAccentColor}-950 text-gray-200 rounded-lg shadow p-4 m-4`,
    sidebars: `bg-${darkAccentColor}-950 sm:w-32`,
  },
};

export const theme = themes.dark;