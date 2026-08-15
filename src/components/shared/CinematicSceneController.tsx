"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export interface Scene {
  id: string;
  title: string;
  startScroll: number; // 0-1 percentage
  endScroll: number;
  music?: string;
  backgroundColor?: string;
}

interface CinematicSceneControllerProps {
  scenes: Scene[];
  onSceneChange?: (scene: Scene) => void;
}

export function useCinematicScenes({ scenes, onSceneChange }: CinematicSceneControllerProps) {
  const { scrollYProgress } = useScroll();
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercentage(latest);

    // Find which scene we're currently in
    const activeScene = scenes.find(
      (scene) => latest >= scene.startScroll && latest < scene.endScroll
    );

    if (activeScene && activeScene.id !== currentScene.id) {
      setCurrentScene(activeScene);
      onSceneChange?.(activeScene);
    }
  });

  return { currentScene, scrollPercentage };
}

export function CinematicSceneProvider({
  scenes,
  children,
  onSceneChange,
}: CinematicSceneControllerProps & { children: React.ReactNode }) {
  useCinematicScenes({ scenes, onSceneChange });

  return <>{children}</>;
}

// Pre-defined scenes for the landing page
export const LANDING_PAGE_SCENES: Scene[] = [
  {
    id: "intro",
    title: "Intro: VIJAY BIRADAR",
    startScroll: 0,
    endScroll: 0.15,
    music: "introAmbient",
    backgroundColor: "rgba(4, 7, 12, 0.8)",
  },
  {
    id: "hero",
    title: "Hero Statement",
    startScroll: 0.15,
    endScroll: 0.35,
    backgroundColor: "rgba(4, 7, 12, 0.6)",
  },
  {
    id: "achievements",
    title: "Key Achievements",
    startScroll: 0.35,
    endScroll: 0.55,
    backgroundColor: "rgba(4, 7, 12, 0.5)",
  },
  {
    id: "highlights",
    title: "Project Highlights",
    startScroll: 0.55,
    endScroll: 0.75,
    backgroundColor: "rgba(4, 7, 12, 0.4)",
  },
  {
    id: "cta",
    title: "Call to Action",
    startScroll: 0.75,
    endScroll: 1.0,
    backgroundColor: "rgba(4, 7, 12, 0.3)",
  },
];
