'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function GlassFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }
    
    setError('');
    // Simulate network request
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }, 500);
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#050505] pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold tracking-tight text-white mb-4">
              Algo<span className="text-blue-500">Swift</span>.
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed mb-6">
              Institutional grade algorithmic execution. Transform natural language into quantitative strategies with zero friction.
            </p>
            
            <div className="relative max-w-sm">
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to updates"
                  className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors`}
                />
                <button 
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
              {error && <p className="absolute -bottom-5 left-1 text-[10px] text-red-400">{error}</p>}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Platform</h4>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/workspace" className="hover:text-white transition-colors">Terminal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-mono">
            &copy; {new Date().getFullYear()} AlgoSwift. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-zinc-600">
            <Link href="#" className="hover:text-white transition-colors">Twitter X</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {subscribed && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] glass px-4 py-3 rounded-xl flex items-center gap-3 bg-black/80 border-green-500/30"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="text-green-400" size={16} />
            </div>
            <p className="text-sm font-medium text-white">Subscribed successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
