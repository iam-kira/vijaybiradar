"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { Scene } from "./CinematicSceneController";

interface AudioSequencerProps {
  scenes: Scene[];
}

export function AudioSequencer({ scenes }: AudioSequencerProps) {
  const { scrollYProgress } = useScroll();
  const { playAmbient, stopAmbient, setVolume, volume } = useSound();
  const currentSceneRef = useRef<string | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout>();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Find current scene
    const currentScene = scenes.find(
      (scene) => latest >= scene.startScroll && latest < scene.endScroll
    );

    if (!currentScene) return;

    // If scene changed, transition music
    if (currentScene.id !== currentSceneRef.current) {
      currentSceneRef.current = currentScene.id;

      // Clear existing timeout
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }

      // Only change music if this scene has a music property
      if (currentScene.music) {
        // Fade out old, fade in new
        stopAmbient();
        
        const timeout = setTimeout(() => {
          playAmbient();
        }, 300);
        fadeOutTimeoutRef.current = timeout;
      }
    }

    // Dynamic volume based on scroll progress within scene
    const sceneProgress =
      (latest - currentScene.startScroll) / (currentScene.endScroll - currentScene.startScroll);
    
    // Volume peaks at middle of scene, fades at edges (0.6 to 1.0 range)
    const volumeMultiplier = 0.6 + Math.max(0, 0.4 * (1 - Math.abs(sceneProgress - 0.5) * 2));
    setVolume(volume * volumeMultiplier); // This won't work as intended, needs API change
  });

  useEffect(() => {
    return () => {
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
    };
  }, []);

  return null; // This component is hook-based, no visual output
}
