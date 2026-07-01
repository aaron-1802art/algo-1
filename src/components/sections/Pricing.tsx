'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAlgo } from '@/context/AlgoContext';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { setActiveModal } = useAlgo();

  return (
    <section className="py-32 bg-[var(--bg)] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-primary)] mb-8 tracking-tight">Simple, transparent pricing</h2>
          
          <div className="flex items-center justify-center gap-4 text-[13px] font-medium tracking-wide">
            <span className={!isYearly ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] transition-colors"}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] relative transition-colors focus:outline-none shadow-inner"
            >
              <motion.div 
                layout
                className="w-5 h-5 rounded-full bg-[var(--accent)] absolute top-[3px] left-1 shadow-[0_2px_8px_rgba(76,127,255,0.4)]"
                animate={{ x: isYearly ? 26 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={isYearly ? "text-[var(--text-primary)] flex items-center gap-2" : "text-[var(--text-secondary)] transition-colors flex items-center gap-2"}>
              Yearly <span className="text-[var(--accent)] text-[10px] font-bold bg-[var(--accent-soft-bg)] px-2 py-0.5 rounded border border-[rgba(76,127,255,0.15)] uppercase tracking-wider">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Starter */}
          <div className="card p-10 flex flex-col h-full">
            <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-3">Starter</h3>
            <p className="text-[var(--text-secondary)] text-[14px] mb-8 h-10 font-light leading-relaxed">Perfect for individuals learning algo trading.</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[var(--text-primary)]">$0</span>
              <span className="text-[var(--text-tertiary)] text-[13px] uppercase tracking-widest font-medium">/mo</span>
            </div>
            <ul className="flex flex-col gap-5 mb-10 flex-1">
              {['1 Live Strategy', '5 Years Backtest Data', 'Community Support', 'Alpaca Integration'].map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-[14px] text-[var(--text-secondary)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[var(--accent)]" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full h-12 text-[14px]" onClick={() => setActiveModal('signup')}>Get Started Free</Button>
          </div>

          {/* Pro */}
          <div className="card p-10 flex flex-col h-full border-[var(--border-hover)] relative transform md:-translate-y-4 shadow-[var(--shadow-lift)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent-soft-bg)] text-[var(--accent)] border border-[rgba(76,127,255,0.2)] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-[0_0_12px_rgba(76,127,255,0.15)] backdrop-blur-md">
              Most Popular
            </div>
            <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-3">Pro</h3>
            <p className="text-[var(--text-secondary)] text-[14px] mb-8 h-10 font-light leading-relaxed">For serious retail traders looking to scale.</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[var(--text-primary)]">${isYearly ? '79' : '99'}</span>
              <span className="text-[var(--text-tertiary)] text-[13px] uppercase tracking-widest font-medium">/mo</span>
            </div>
            <ul className="flex flex-col gap-5 mb-10 flex-1">
              {['10 Live Strategies', '10 Years Backtest Data', 'Priority Support', 'Custom Webhooks', 'Advanced AI Explanations'].map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-[14px] text-[var(--text-secondary)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-soft-bg)] border border-[rgba(76,127,255,0.15)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[var(--accent)]" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full h-12 text-[14px]" onClick={() => setActiveModal('signup')}>Start Pro Trial</Button>
          </div>

          {/* Institutional */}
          <div className="card p-10 flex flex-col h-full">
            <h3 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-3">Institutional</h3>
            <p className="text-[var(--text-secondary)] text-[14px] mb-8 h-10 font-light leading-relaxed">Custom setups for prop firms and funds.</p>
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[var(--text-primary)]">${isYearly ? '399' : '499'}</span>
              <span className="text-[var(--text-tertiary)] text-[13px] uppercase tracking-widest font-medium">/mo</span>
            </div>
            <ul className="flex flex-col gap-5 mb-10 flex-1">
              {['Unlimited Live Strategies', 'Full Tick-Level Data', 'Dedicated Account Manager', 'Multi-Broker Routing', 'On-Premise Deployment Options'].map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-[14px] text-[var(--text-secondary)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[var(--accent)]" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full h-12 text-[14px]" onClick={() => setActiveModal('signup')}>Contact Sales</Button>
          </div>

        </div>
      </div>
    </section>
  );
}
