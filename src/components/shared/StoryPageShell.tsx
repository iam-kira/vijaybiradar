import type { CSSProperties, ReactNode } from "react";
import type { StoryTheme } from "@/lib/storyThemes";

export function StoryPageShell({
  theme,
  children,
  className = "",
}: {
  theme: StoryTheme;
  children: ReactNode;
  className?: string;
}) {
  const shellStyle = {
    background: `radial-gradient(circle at top, ${theme.palette.glow}22 0%, transparent 24%), linear-gradient(180deg, ${theme.palette.background} 0%, var(--bg-primary) 100%)`,
    ["--story-primary" as string]: theme.palette.primary,
    ["--story-secondary" as string]: theme.palette.secondary,
    ["--story-accent" as string]: theme.palette.accent,
    ["--story-glow" as string]: theme.palette.glow,
    ["--story-panel" as string]: theme.palette.panel,
    ["--story-ghost" as string]: theme.palette.ghost,
  } as CSSProperties;

  return (
    <div className={`story-page-shell ${className}`.trim()} style={shellStyle}>
      {children}
    </div>
  );
}
