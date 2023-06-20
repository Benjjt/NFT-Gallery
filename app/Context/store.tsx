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
}

const GlobalContext = createContext<ContextProps>({
  isFilterOpen: false,
  setIsFilterOpen: (): boolean => false,
});

export const FilterButtonContext = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useFilterButtonContext = () => useContext(GlobalContext);
