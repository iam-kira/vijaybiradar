import { create } from 'zustand';
import type { Theme } from '@/data/scenes';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Defaults to the visitor's system preference; a manual toggle overrides it for
 * the session only (deliberately not persisted).
 */
const systemTheme = (): Theme =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';

export const useThemeStore = create<ThemeState>((set) => ({
  theme: systemTheme(),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}));

export type { Theme };
