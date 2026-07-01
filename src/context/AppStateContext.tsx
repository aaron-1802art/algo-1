'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
type ModalType = 'login' | 'signup' | 'connectBroker' | 'demo' | null;

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  activeDemoStep: number;
  setActiveDemoStep: (step: number) => void;
  isBrokerConnected: boolean;
  setIsBrokerConnected: (status: boolean) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);
  const [isBrokerConnected, setIsBrokerConnected] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for theme
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // Default to dark
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AppStateContext.Provider
      value={{
        theme,
        toggleTheme,
        activeModal,
        setActiveModal,
        activeDemoStep,
        setActiveDemoStep,
        isBrokerConnected,
        setIsBrokerConnected,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
