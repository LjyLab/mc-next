'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type LayoutSettingsContextType = {
  isFullWidth: boolean;
  toggleWidth: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedWidth = localStorage.getItem('layout-width-preference');
    if (savedWidth) {
      setIsFullWidth(savedWidth === 'full');
    }
    const savedSidebar = localStorage.getItem('layout-sidebar-preference');
    if (savedSidebar) {
      setIsSidebarOpen(savedSidebar === 'open');
    }
  }, []);

  const toggleWidth = () => {
    setIsFullWidth((prev) => {
      const newValue = !prev;
      localStorage.setItem('layout-width-preference', newValue ? 'full' : 'narrow');
      return newValue;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newValue = !prev;
      localStorage.setItem('layout-sidebar-preference', newValue ? 'open' : 'closed');
      return newValue;
    });
  };

  return (
    <LayoutSettingsContext.Provider value={{ isFullWidth, toggleWidth, isSidebarOpen, toggleSidebar }}>
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
