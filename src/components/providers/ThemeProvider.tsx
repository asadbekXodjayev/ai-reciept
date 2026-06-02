'use client';

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'recipeai-theme';
const THEME_EVENT = 'recipeai-theme-change';

/**
 * Inline script (string) that runs before React hydrates to set the correct
 * theme class on <html>, preventing a flash of the wrong theme. Injected from
 * the root layout via dangerouslySetInnerHTML.
 */
export const themeNoFlashScript = `(() => {
  try {
    const stored = localStorage.getItem('${STORAGE_KEY}');
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (_) {}
})();`;

// The DOM (set by the no-flash script) is the source of truth, so getSnapshot
// returns a stable 'light' | 'dark' primitive — safe for useSyncExternalStore.
function getThemeSnapshot(): Theme {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerThemeSnapshot(): Theme {
    return 'light';
}

function subscribeTheme(callback: () => void): () => void {
    window.addEventListener(THEME_EVENT, callback);
    window.addEventListener('storage', callback);
    return () => {
        window.removeEventListener(THEME_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

    const setTheme = useCallback((next: Theme) => {
        document.documentElement.classList.toggle('dark', next === 'dark');
        document.documentElement.style.colorScheme = next;
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* ignore storage failures (private mode, etc.) */
        }
        window.dispatchEvent(new Event(THEME_EVENT));
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(getThemeSnapshot() === 'dark' ? 'light' : 'dark');
    }, [setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}
