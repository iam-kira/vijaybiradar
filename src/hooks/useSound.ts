"use client";

import { useContext } from "react";
import { SoundContext } from "@/components/shared/SoundProvider";

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
