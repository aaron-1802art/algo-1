'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareText, Code2, BarChart3, Sparkles, Link2, Zap } from 'lucide-react';

const features = [
  {
    step: 'Step 1',
    title: 'Type strategy in plain English',
    description: 'Describe entries, exits, and indicators naturally — no coding required.',
    icon: MessageSquareText,
  },
  {
    step: 'Step 2',
    title: 'AI converts it to code',
    description: 'Groq-powered AI generates production-ready Python backtest logic.',
    icon: Code2,
  },
  {
    step: 'Step 3',
    title: 'Backtest on historical data',
    description: 'Run against up to 10 years of Polygon market data in seconds.',
    icon: BarChart3,
  },
  {
    step: 'Step 4',
    title: 'See results + AI explanation',
    description: 'Review equity curves, stats, and a coach-style breakdown of what worked.',
    icon: Sparkles,
  },
  {
    step: 'Step 5',
    title: 'Connect your broker',
    description: 'Link Alpaca paper trading with one click — real markets, zero risk.',
    icon: Link2,
  },
  {
    step: 'Step 6',
    title: 'Strategy runs live 24/7',
    description: 'Your algorithm monitors markets and executes while you sleep.',
    icon: Zap,
  },
];

export default function GlassFeatures() {
  return (
    <section className="relative py-24 min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-white/20">
      
      {/* Background ambient lighting for Glassmorphism contrast */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        
        {/* Header Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
            AlgoSwift Workflow
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500"
          >
            From idea to execution.
          </motion.h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 + index * 0.1, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative"
            >
              {/* Glassmorphic Card */}
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full gap-4">
                  
                  {/* Icon & Step Label */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-blue-400">
                      {feature.step}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="mt-2 flex-grow space-y-2">
                    <h3 className="text-lg font-medium text-zinc-100 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
