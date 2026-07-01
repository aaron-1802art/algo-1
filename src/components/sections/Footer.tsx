'use client';

import React, { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[var(--bg)] pt-24 pb-12 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-[8px] bg-[var(--accent-soft-bg)] border border-[rgba(120,160,255,0.15)] flex items-center justify-center text-[var(--accent)] shadow-[0_4px_12px_rgba(76,127,255,0.1)]">
                <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">
                Algo<span className="text-[var(--accent)]">1</span>
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-[15px] font-light max-w-sm leading-relaxed">
              Institutional-grade algorithmic trading, built for everyone. No coding required.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-[13px] text-[var(--text-primary)] uppercase tracking-widest mb-6">Platform</h4>
            <ul className="flex flex-col gap-4 text-[14px]">
              {['Strategy Builder', 'Backtesting Engine', 'Broker Integrations', 'Pricing'].map(link => (
                <li key={link}>
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-[13px] text-[var(--text-primary)] uppercase tracking-widest mb-6">Stay Updated</h4>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg px-4 h-11 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <Button type="submit" variant="secondary" className="w-full h-11 text-[13px]">
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-3 text-emerald-400 bg-[var(--surface-raised)] border border-[rgba(16,185,129,0.2)] p-4 rounded-lg">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-[13px] font-medium leading-tight">You're on the list! Check your inbox soon.</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[var(--text-tertiary)] font-light">
          <div>&copy; {new Date().getFullYear()} Algo1 Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
