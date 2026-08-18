'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useThemeStore } from '@/store/themeStore';

const noopSubscribe = () => () => {};

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // Theme is resolved from matchMedia, so the server can't know it. Render nothing
  // until mounted rather than risk a hydration mismatch on the icon.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  if (!mounted) return null;

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="group fixed right-6 top-6 z-40 rounded-full border border-[color:var(--foreground)]/20 bg-[color:var(--background)]/40 p-3 backdrop-blur-md transition-colors duration-300 hover:border-[color:var(--gold)]/60 hover:bg-[color:var(--background)]/70"
    >
      <span className="relative block h-5 w-5">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={`absolute inset-0 h-5 w-5 text-[color:var(--gold)] transition-all duration-500 ${
            theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        >
          <path d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 11a4 4 0 100-8 4 4 0 000 8zm7-4a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm10.657 5.657a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM6.464 6.464a1 1 0 01-1.414 0l-.707-.707A1 1 0 015.757 4.343l.707.707a1 1 0 010 1.414zm9.193-2.121a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.464 13.536a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
        </svg>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={`absolute inset-0 h-5 w-5 text-[color:var(--foreground)]/80 transition-all duration-500 ${
            theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  );
}
