"use client";
import { useContext } from "react";
import { Grid } from "@/components/Grid";
import { ValidatorCard } from "@/components/ValidatorCard";
import { validators } from "@/mocks";
import { ThemeContext } from "@/providers/ThemeProvider";
import { SearchPanel } from "@/components/SearchPanel";
import { SearchContext } from "@/providers/SearchProvider";
// import { theme } from "./theme";
const recommendedVals = [
  "5yRbBQY5ZKe7VcuuwCS8wVvMfcq41gNctbdhK781Joep",
  "4nPK76BVEj5Mzy6fctkuZrKieNUpxu6mfWVjNy7fBt9X",
  "HKebwAfFxtEN1hcFDoCqTLcnynQZ77MrYuN7AAfbyiVb",
  "4Xz17Lsc6miC7UUVcfbrZhBxgjySEowyH6f8QwwVP6xw",
  "FyrwfMaomErzqrFUXMjCJ7mA4u81DsiDdrzC3MJD6d4j",
  "akb7XJkB8rgvDixC25gxpGisNS1aAQbk6HZkR9X1jrX",
];

export default function Home() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [searchParams, setSearch] = useContext(SearchContext);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col sm:flex-row">
        <main className={`flex-1 bg-opacity-0 ${theme.pageBackground}`}>
          <header className={`${theme.header} ${theme.shadow}`}>
            <h1 className="text-3xl font-bold">SOL Control</h1>
          </header>
          <div
            className={`overflow-y-auto px-4 py-8 bg-opacity-0 ${theme.containerBackground}`}
          >
            <Grid>
              {validators.data
                .slice(
                  !searchParams.isRecommended ? 200 : undefined,
                  !searchParams.isRecommended ? 300 : undefined
                )
                .filter((item) => {
                  const isEmpty =
                    !item.name && (!item.website || !item.details);
                  if (!searchParams.isRecommended) return !isEmpty;
                  return !isEmpty && recommendedVals.includes(item.validatorId);
                })
                .map((validator: any, index: number) => (
                  <ValidatorCard key={index} data={validator} />
                ))}
            </Grid>
          </div>
          <footer className={`${theme.footer} ${theme.shadow}`}>
            <p>Made with Smart Validator Toolkit API.</p>
            <p>© 2024 Mukh.tar</p>
          </footer>
        </main>

        <nav className={`order-first bg-opacity-0 ${theme.sidebars}`}>
          <SearchPanel />
        </nav>
        {/* <aside className={`${theme.sidebars}`}></aside> */}
      </div>
    </div>
  );
}
