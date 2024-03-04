import { SearchContext } from "@/providers/SearchProvider";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export const SearchPanel = ({ data }: any) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [searchParams, setSearch] = useContext(SearchContext);
  return (
    <div>asdasd</div>
  )
}