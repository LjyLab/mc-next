'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type LayoutSettingsContextType = {
  isFullWidth: boolean;
  toggleWidth: () => void;
};

const LayoutSettingsContext = createContext<LayoutSettingsContextType | undefined>(
  undefined
);

export function LayoutSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('layout-width-preference');
    if (saved) {
      setIsFullWidth(saved === 'full');
    }
  }, []);

  const toggleWidth = () => {
    setIsFullWidth((prev) => {
      const newValue = !prev;
      localStorage.setItem('layout-width-preference', newValue ? 'full' : 'narrow');
      return newValue;
    });
  };

  return (
    <LayoutSettingsContext.Provider value={{ isFullWidth, toggleWidth }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings() {
  const context = useContext(LayoutSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useLayoutSettings must be used within a LayoutSettingsProvider'
    );
  }
  return context;
}
