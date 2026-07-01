"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function AlgoNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header
        className={`fixed top-6 left-0 right-0 z-40 mx-auto max-w-7xl px-4 lg:px-8 transition-all duration-500 flex justify-between items-center`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left: Logo */}
        <div className={`glass-pill px-5 py-2.5 flex items-center gap-2 ${isScrolled ? 'bg-white/90' : ''} transition-colors`}>
          <div className="flex gap-1 items-center mr-1">
             <div className="w-2 h-2 rounded-full bg-red-400" />
             <div className="w-2 h-2 rounded-full bg-amber-400" />
             <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-outfit font-semibold text-lg tracking-tight">AlgoSwift.</span>
        </div>

        {/* Center: Split Pill */}
        <div className={`glass-pill hidden md:flex items-center overflow-hidden ${isScrolled ? 'bg-white/90' : ''} transition-colors p-1`}>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-sm font-medium"
          >
            <Menu size={16} /> Menu
          </button>
          <div className="w-[1px] h-4 bg-neutral-300 mx-1" />
          <a 
            href="#features"
            className="px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-sm font-medium"
          >
            <span className="text-emerald-600 mr-2">•</span> Discover Features
          </a>
        </div>
        
        {/* Mobile menu trigger */}
        <div className="md:hidden glass-pill">
           <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Right: Badge */}
        <div className={`glass-pill px-5 py-2.5 hidden lg:block ${isScrolled ? 'bg-white/90' : ''} transition-colors hover:bg-white cursor-pointer group`}>
          <a href="/workspace" className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse group-hover:bg-emerald-600" />
            Enter Workspace
          </a>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/50 backdrop-blur-3xl saturate-200"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-4 glass-pill glass-hover"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            
            <nav className="flex flex-col items-center gap-8">
              {[
                { label: "Home", href: "#home" },
                { label: "Features", href: "#features" },
                { label: "Contact", href: "#contact" },
                { label: "Login", href: "/workspace" }
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-4xl md:text-6xl font-outfit font-medium tracking-tight text-neutral-900 hover:text-emerald-700 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex gap-6 text-neutral-500 font-mono text-sm"
            >
              www.algoswift.io
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
