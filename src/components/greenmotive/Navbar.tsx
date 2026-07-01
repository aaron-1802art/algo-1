"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { FullScreenMenu } from "./ui/FullScreenMenu";

export function Navbar() {
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
        {/* Left: Logo Pill */}
        <div className={`glass-pill px-5 py-2.5 flex items-center gap-2 ${isScrolled ? 'bg-white/90' : ''} transition-colors`}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-green-600 to-emerald-300"
          />
          <span className="font-outfit font-semibold text-lg tracking-tight">GreenMotive</span>
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
            href="#services"
            className="px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-sm font-medium"
          >
            <span className="text-emerald-600 mr-2">•</span> Discover Innovations
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
        <div className={`glass-pill px-5 py-2.5 hidden lg:block ${isScrolled ? 'bg-white/90' : ''} transition-colors hover:bg-white cursor-pointer`}>
          <span className="text-sm font-medium">⚡ Renewable Energy Solutions</span>
        </div>
      </motion.header>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
