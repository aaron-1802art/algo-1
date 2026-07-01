'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Sun, Moon, TrendingUp } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';

export function GlassNavbar() {
  const { theme, toggleTheme, setActiveModal } = useAppState();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled 
            ? 'glass px-6 py-3 shadow-lg bg-white/5 dark:bg-black/20' 
            : 'px-0 py-0 bg-transparent border-transparent'
        }`}>
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <TrendingUp className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
              Algo<span className="text-blue-500 dark:text-blue-400">Swift</span>
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4 md:gap-6">
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400 dark:hover:text-white"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setActiveModal('login')}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Login
              </button>
              
              <button 
                onClick={() => setActiveModal('signup')}
                className="text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setActiveModal('signup')}
                className="text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white"
              >
                Start
              </button>
            </div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}
