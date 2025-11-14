"use client";

import React, { useState, createContext, useContext } from "react";
import type { SectionName } from "@/lib/types";
import { Links, type LinkType } from "@/lib/data";
import { usePathname } from "next/navigation";

type ActiveSectionContextProviderProps = { children: React.ReactNode };

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastCLick: React.Dispatch<React.SetStateAction<number>>;
  headerSections: LinkType[];
  setHeaderSections: React.Dispatch<React.SetStateAction<LinkType[]>>;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null,
);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Zimmer");
  const [timeOfLastClick, setTimeOfLastCLick] = useState(0); // we need keep track of this to temporarrily block the observer
  const [headerSections, setHeaderSections] = useState(Links);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastCLick,
        headerSections,
        setHeaderSections,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider",
    );
  }
  return context;
}
