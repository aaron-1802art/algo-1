'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';

const Ticker = () => (
  <div className="absolute top-24 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none flex">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 text-xs font-mono text-zinc-500 dark:text-zinc-400"
    >
      {[...Array(2)].map((_, j) => (
        <React.Fragment key={j}>
          <span>AAPL: +1.2%</span>
          <span>TSLA: -0.8%</span>
          <span>MSFT: +0.4%</span>
          <span>NVDA: +3.1%</span>
          <span>BTC: +2.5%</span>
          <span>ETH: +1.1%</span>
          <span>SPY: +0.2%</span>
          <span>QQQ: +0.5%</span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export function GlassHero() {
  const { setActiveModal } = useAppState();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
      
      {/* Background blobs (the system prompts specifically ask for this) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="bg-blob bg-blue-500/20 w-[40vw] h-[40vw] top-[10%] left-[10%]" />
        <div className="bg-blob bg-violet-500/20 w-[35vw] h-[35vw] bottom-[10%] right-[10%] animate-[pulse_12s_ease-in-out_infinite_reverse]" />
        <div className="bg-blob bg-indigo-500/10 w-[50vw] h-[50vw] top-[30%] left-[30%] animate-[pulse_15s_linear_infinite]" />
      </div>

      <Ticker />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass p-12 md:p-16 flex flex-col items-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-600 dark:text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AlgoSwift v2.0 is live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6 max-w-4xl"
          >
            Turn plain English into a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
              live trading strategy
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed font-light"
          >
            No-code AI strategy building for institutional-grade algorithmic execution. Describe entries, exits, and indicators naturally.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => setActiveModal('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1"
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => setActiveModal('demo')}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/5 text-zinc-900 dark:text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
            >
              <Play size={18} fill="currentColor" /> Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
