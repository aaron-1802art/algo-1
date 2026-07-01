'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ModalType = 'signup' | 'demo' | 'alpaca' | null;
type ThemeType = 'light' | 'dark';

interface AlgoContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  demoStrategy: string;
  setDemoStrategy: (val: string) => void;
  isBrokerConnected: boolean;
  setIsBrokerConnected: (val: boolean) => void;
  activeDemoStep: number;
  setActiveDemoStep: (step: number) => void;
}

const AlgoContext = createContext<AlgoContextType | undefined>(undefined);

export function AlgoProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Demo States
  const [demoStrategy, setDemoStrategy] = useState('');
  const [isBrokerConnected, setIsBrokerConnected] = useState(false);
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('algo1-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('algo1-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AlgoContext.Provider
      value={{
        theme,
        toggleTheme,
        activeModal,
        setActiveModal,
        demoStrategy,
        setDemoStrategy,
        isBrokerConnected,
        setIsBrokerConnected,
        activeDemoStep,
        setActiveDemoStep
      }}
    >
      {children}
    </AlgoContext.Provider>
  );
}

export function useAlgo() {
  const context = useContext(AlgoContext);
  if (!context) {
    throw new Error('useAlgo must be used within an AlgoProvider');
  }
  return context;
}
