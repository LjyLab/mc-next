'use client';

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

type LayoutSettingsContextType = {
  isFullWidth: boolean;
  toggleWidth: () => void;
};

const LayoutSettingsContext = createContext<LayoutSettingsContextType | undefined>(
  undefined
);

export function LayoutSettingsProvider({
  children,
  initialLayout,
}: {
  children: React.ReactNode;
  initialLayout: boolean;
}) {
  const [isFullWidth, setIsFullWidth] = useState(initialLayout);

  const toggleWidth = () => {
    setIsFullWidth((prev) => {
      const newValue = !prev;
      Cookies.set('layout-width', newValue ? 'full' : 'narrow', { expires: 365 });
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
