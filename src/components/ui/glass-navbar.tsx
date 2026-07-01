'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function GlassNavbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      <div className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
        <Link href="#services" className="hover:text-white transition-colors">Services</Link>
        <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        <Link href="/workspace" className="text-white font-bold hover:text-indigo-400 transition-colors">Login</Link>
      </div>

      <div className="text-xs text-zinc-500 hidden sm:block font-mono">
        www.algoswift.io
      </div>
    </motion.nav>
  );
}
