'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useAlgo } from '@/context/AlgoContext';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export function Hero() {
  const { setActiveModal } = useAlgo();

  return (
    <section className="relative pt-48 pb-24 flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto flex flex-col items-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft-bg)] text-[var(--accent)] text-[11px] font-bold mb-10 border border-[rgba(76,127,255,0.15)] uppercase tracking-[0.15em] shadow-[0_0_12px_rgba(76,127,255,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          Algo1 v2.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold text-[var(--text-primary)] tracking-tight leading-[1.05] mb-8 max-w-4xl">
          Turn plain English into a <span className="text-[var(--accent)] drop-shadow-[0_0_24px_rgba(76,127,255,0.2)]">live trading strategy</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl font-light leading-relaxed">
          The no-code AI algorithmic-trading-strategy builder. Describe your rules naturally, and let Algo1 write, test, and deploy the code.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Button size="lg" onClick={() => setActiveModal('signup')} className="w-full sm:w-auto px-8 h-14 text-[15px]">
            Get Started &rarr;
          </Button>
          <Button size="lg" variant="outline" onClick={() => setActiveModal('demo')} className="w-full sm:w-auto gap-2 px-8 h-14 text-[15px] bg-[var(--surface)] shadow-sm">
            <Play className="w-4 h-4 text-[var(--text-tertiary)]" /> Watch Demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
