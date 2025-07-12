import React, { createContext } from 'react';

const StarContext = createContext();

function StarProvider({ value, children }) {
  return <StarContext.Provider value={value}>{children}</StarContext.Provider>;
}
export { StarContext };
