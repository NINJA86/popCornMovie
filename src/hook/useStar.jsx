import React, { createContext, useContext } from 'react';

const StarContext = createContext();

function StarProvider({ value, children }) {
  return <StarContext.Provider value={value}>{children}</StarContext.Provider>;
}

function useStar() {
  const context = useContext(StarContext);

  if (context === undefined) {
    throw new Error('useStar must be within Provider');
  }
  return context;
}
export { StarProvider, useStar };
