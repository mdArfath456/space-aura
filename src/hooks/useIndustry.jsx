import React, { createContext, useContext, useState, useEffect } from 'react';
import { INDUSTRIES, DEFAULT_INDUSTRY } from '../config/businessConfig.js';

const IndustryContext = createContext(null);

export function IndustryProvider({ children }) {
  const [industryKey, setIndustryKey] = useState(DEFAULT_INDUSTRY);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('auraspace_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const currentIndustry = INDUSTRIES[industryKey] || INDUSTRIES[DEFAULT_INDUSTRY] || INDUSTRIES.workspace;

  useEffect(() => {
    try {
      localStorage.setItem('auraspace_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <IndustryContext.Provider
      value={{
        industryKey,
        setIndustryKey,
        currentIndustry,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  const context = useContext(IndustryContext);
  if (!context) {
    throw new Error('useIndustry must be used within an IndustryProvider');
  }
  return context;
}
