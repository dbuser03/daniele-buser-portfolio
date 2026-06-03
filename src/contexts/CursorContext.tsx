"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CursorContextType } from "@/types/layout/cursor";

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorContext must be used within CursorProvider");
  }
  return context;
};

export const CursorProvider: React.FC<
  CursorContextType & { children: ReactNode }
> = ({ children, ...contextValue }) => {
  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
};
