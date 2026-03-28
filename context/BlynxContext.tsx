import { createContext, useContext, useState, ReactNode } from "react";

export enum SORT {
  LATEST = "latest",
  OLDEST = "oldest",
}

type BlynkContextType = {
  sortMethod: SORT;
  setSortMethod: (value: SORT) => void;
  filters: string[];
  setFilters: (value: string[]) => void;
};

const BlynkContext = createContext<BlynkContextType | undefined>(undefined);

export const BlynkProvider = ({ children }: { children: ReactNode }) => {
  const [sortMethod, setSortMethod] = useState<SORT>(SORT.LATEST);
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <BlynkContext.Provider
      value={{ sortMethod, setSortMethod, filters, setFilters }}
    >
      {children}
    </BlynkContext.Provider>
  );
};

export const useBlynk = () => {
  const context = useContext(BlynkContext);
  if (!context) throw new Error("useBlynk must be used inside NewsProvider");
  return context;
};