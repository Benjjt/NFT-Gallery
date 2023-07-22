"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  currentDisplay: string;
  setCurrentDisplay: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  isFilterOpen: false,
  setIsFilterOpen: (): boolean => false,
  currentDisplay: "default",
  setCurrentDisplay: (): string => "default",
});

export const FilterButtonContext = ({ children }: { children: any }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentDisplay, setCurrentDisplay] = useState("default");

  return (
    <GlobalContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        currentDisplay,
        setCurrentDisplay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useFilterButtonContext = () => useContext(GlobalContext);
