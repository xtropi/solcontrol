'use client';
import { useContext } from 'react';
import { Grid } from "@/components/Grid";
import { ValidatorCard } from "@/components/ValidatorCard";
import { validators } from "@/mocks";
import { ThemeContext } from '@/providers/ThemeProvider';
import { SearchPanel } from '@/components/SearchPanel';
// import { theme } from "./theme";
export default function Home() {
  const [theme, setTheme] = useContext(ThemeContext);
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
                .slice(200, 300)
                .filter((item)=>item.name||item.website||item.details)
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
          <SearchPanel/>
        </nav>
        {/* <aside className={`${theme.sidebars}`}></aside> */}
      </div>
    </div>
  );
}
