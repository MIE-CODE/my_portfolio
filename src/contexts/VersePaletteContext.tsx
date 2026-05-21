"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { ColorScheme } from "@/src/contexts/ThemeContext";
import { getVersePalette, type VersePalette } from "@/src/lib/versePalette";

const VersePaletteContext = createContext<VersePalette>(
  getVersePalette("dark"),
);

export function VersePaletteProvider({
  scheme,
  children,
}: {
  scheme: ColorScheme;
  children: ReactNode;
}) {
  const palette = useMemo(() => getVersePalette(scheme), [scheme]);
  return (
    <VersePaletteContext.Provider value={palette}>
      {children}
    </VersePaletteContext.Provider>
  );
}

export function useVersePalette() {
  return useContext(VersePaletteContext);
}
