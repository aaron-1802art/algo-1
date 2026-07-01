'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function GlassHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
      {/* 3D BACKGROUND SIMULATION USING CSS GRADIENTS & BLURS */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        {/* Abstract Sphere 1 */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[60%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr from-zinc-600 via-zinc-400 to-white blur-[8px] opacity-40 mix-blend-screen shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
        />
        {/* Abstract Ring (Simulated) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border-[40px] border-zinc-700/30 blur-[4px] mix-blend-screen shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        />
        {/* Abstract Sphere 2 */}
        <motion.div 
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[40%] w-[15vw] h-[15vw] max-w-[200px] max-h-[200px] rounded-full bg-gradient-to-br from-zinc-800 to-zinc-400 blur-[6px] opacity-60 mix-blend-screen shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* GLASSMORPHISM MAIN CARD */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[90%] max-w-4xl h-[60%] max-h-[400px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-10 flex flex-col justify-center overflow-hidden"
      >
        {/* Subtitle */}
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 leading-none"
        >
          AlgoSwift
        </motion.h2>
        
        {/* Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-light tracking-tight text-white/50 leading-none mt-2"
        >
          platform.
        </motion.h1>

        {/* Badges/Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <span className="text-[10px] border border-white/20 text-white/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">Deploy</span>
            <span className="text-[10px] border border-white/20 text-white/60 px-2 py-0.5 rounded font-mono uppercase tracking-wider">Scale</span>
          </div>
          <p className="text-xs text-white/40 max-w-sm mt-2 leading-relaxed">
            Automated strategy execution in plain English. Fully integrated glassmorphism deployment matrix.
          </p>
        </motion.div>

        {/* Footer icons (simulated) */}
        <div className="absolute bottom-6 right-6 flex gap-3 text-white/30">
          <div className="w-4 h-4 rounded bg-white/10" />
          <div className="w-4 h-4 rounded bg-white/10" />
          <div className="w-4 h-4 rounded bg-white/10" />
        </div>

        {/* Ambient glare on the glass */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none" />
      </motion.div>
    </section>
  );
}
