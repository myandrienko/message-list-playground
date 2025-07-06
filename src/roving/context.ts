import { createContext } from "react";

export interface RovingFocusStackContextValue {
  stackId: string;
  focusedAreaId: string | null;
}

export const RovingFocusStackContext =
  createContext<RovingFocusStackContextValue | null>(null);

export interface RovingFocusAreaContextValue {
  fullAreaId: string;
  isFocused: boolean;
  isFocusable: boolean;
}

export const RovingFocusAreaContext =
  createContext<RovingFocusAreaContextValue>({
    fullAreaId: "",
    isFocused: true,
    isFocusable: true,
  });
