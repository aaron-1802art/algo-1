"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { label: "Our Mission", href: "#who-we-are" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/40 backdrop-blur-3xl saturate-200"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-4 glass-pill glass-hover"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="text-4xl md:text-6xl font-outfit font-medium tracking-tight text-neutral-900 hover:text-green-800 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 flex gap-6 text-neutral-600"
          >
            <a href="#" className="hover:text-black">LinkedIn</a>
            <a href="#" className="hover:text-black">Instagram</a>
            <a href="#" className="hover:text-black">Twitter</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
