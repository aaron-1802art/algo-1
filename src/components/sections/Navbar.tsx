'use client';

import React, { useState, useEffect } from 'react';
import { useAlgo } from '@/context/AlgoContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, TrendingUp, Menu, X } from 'lucide-react';

const TICKER_DATA = [
  { sym: 'AAPL', price: '173.50', change: '+1.2%' },
  { sym: 'TSLA', price: '180.09', change: '-2.1%' },
  { sym: 'NVDA', price: '942.11', change: '+4.5%' },
  { sym: 'SPY', price: '508.32', change: '+0.8%' },
  { sym: 'BTC', price: '68,241', change: '+3.1%' },
  { sym: 'ETH', price: '3,842', change: '-1.4%' },
  { sym: 'MSFT', price: '420.55', change: '+0.4%' },
  { sym: 'AMD', price: '164.21', change: '-0.9%' },
];

export function Navbar() {
  const { theme, toggleTheme, setActiveModal } = useAlgo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${isScrolled ? 'bg-[var(--surface)] border-b border-[var(--border)] py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-[8px] bg-[var(--accent-soft-bg)] border border-[rgba(120,160,255,0.15)] flex items-center justify-center text-[var(--accent)] shadow-[0_4px_12px_rgba(76,127,255,0.1)]">
              <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">
              Algo<span className="text-[var(--accent)]">1</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme} className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-full hover:bg-[var(--accent-soft-bg)] focus:outline-none">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setActiveModal('signup')}>Log in</Button>
              <Button variant="primary" onClick={() => setActiveModal('signup')}>Get Started &rarr;</Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-[var(--text-secondary)] focus:outline-none">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[var(--text-primary)] focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[var(--surface-raised)] border-b border-[var(--border)] p-4 flex flex-col gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:hidden">
            <Button variant="outline" className="w-full" onClick={() => { setActiveModal('signup'); setMobileMenuOpen(false); }}>Log in</Button>
            <Button variant="primary" className="w-full" onClick={() => { setActiveModal('signup'); setMobileMenuOpen(false); }}>Get Started</Button>
          </div>
        )}
      </nav>

      {/* Scrolling Ticker Strip beneath nav */}
      <div className={`fixed left-0 right-0 z-30 transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden bg-[var(--bg)] border-b border-[rgba(255,255,255,0.03)] h-8 flex items-center ${isScrolled ? 'top-[73px]' : 'top-[88px]'}`}>
        <div className="flex whitespace-nowrap animate-[scroll_40s_linear_infinite] gap-12 px-6 text-[11px] font-mono tracking-wider font-medium">
          {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-[var(--text-tertiary)]">{item.sym}</span>
              <span className="text-[var(--text-secondary)]">{item.price}</span>
              <span className={item.change.startsWith('+') ? 'text-emerald-500/80' : 'text-rose-500/80'}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </>
  );
}
