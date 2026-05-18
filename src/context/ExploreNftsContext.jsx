import React, { createContext, useContext } from "react";
import useExploreNfts from "../hooks/useExploreNfts";

const ExploreNftsContext = createContext(undefined);

export const ExploreNftsProvider = ({ children }) => {
  const value = useExploreNfts();
  return (
    <ExploreNftsContext.Provider value={value}>
      {children}
    </ExploreNftsContext.Provider>
  );
};

export const useExploreNftsContext = () => {
  const context = useContext(ExploreNftsContext);
  if (context === undefined) {
    throw new Error("useExploreNftsContext must be used within ExploreNftsProvider");
  }
  return context;
};
