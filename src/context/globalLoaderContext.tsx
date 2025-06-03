
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalLoaderContextType {
  isTransitioning: boolean;
  setNavigationReady: () => void;
  setLayoutReady: () => void;
  startTransition: () => void;
}

const GlobalLoaderContext = createContext<GlobalLoaderContextType>({
  isTransitioning: false,
  startTransition: () => { },
  setNavigationReady: () => { },
  setLayoutReady: () => { },
});

export const GlobalLoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [navigationReady, setNavigationReadyFlag] = useState(false);
  const [layoutReady, setLayoutReadyFlag] = useState(false);

  useEffect(() => {
    if (navigationReady && layoutReady) {
      setIsTransitioning(false);
      // сбрасываем флаги после завершения
      setNavigationReadyFlag(false);
      setLayoutReadyFlag(false);
    }
  }, [navigationReady, layoutReady]);

  // fallback — завершить через 4 сек если что-то зависло
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setNavigationReadyFlag(false);
        setLayoutReadyFlag(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const startTransition = () => setIsTransitioning(true);
  const setNavigationReady = () => setNavigationReadyFlag(true);
  const setLayoutReady = () => setLayoutReadyFlag(true);

  return (
    <GlobalLoaderContext.Provider
      value={{
        isTransitioning,
        startTransition,
        setNavigationReady,
        setLayoutReady,
      }}
    >
      {children}
    </GlobalLoaderContext.Provider>
  );
};

export const useGlobalLoader = () => useContext(GlobalLoaderContext);