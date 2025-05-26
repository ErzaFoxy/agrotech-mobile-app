// context/globalLoaderContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface GlobalLoaderContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const GlobalLoaderContext = createContext<GlobalLoaderContextType>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
});

export const GlobalLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setTransitioning] = useState(false);

  const startTransition = () => setTransitioning(true);
  const endTransition = () => setTransitioning(false);

  return (
    <GlobalLoaderContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
    </GlobalLoaderContext.Provider>
  );
};

export const useGlobalLoader = () => useContext(GlobalLoaderContext);