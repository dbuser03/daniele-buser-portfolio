"use client";

import { createContext, useContext, ReactNode } from "react";

export type InteractionType = "interactive" | "pulse" | "text" | "default";

export interface InteractionContextType {
  onHoverStart: (type: InteractionType) => void;
  onHoverEnd: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const defaultContext: InteractionContextType = {
  onHoverStart: () => {},
  onHoverEnd: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
};

export const InteractionContext = createContext<InteractionContextType>(defaultContext);

export function InteractionProvider({
  children,
  value,
}: {
  children: ReactNode;
  value?: InteractionContextType;
}) {
  return (
    <InteractionContext.Provider value={value || defaultContext}>
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  return useContext(InteractionContext);
}
