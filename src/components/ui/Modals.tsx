'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, ArrowRight, CheckCircle2, Loader2, Play } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';
import { useRouter } from 'next/navigation';

export function Modals() {
  const { activeModal, setActiveModal, setIsBrokerConnected } = useAppState();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeModal = () => {
    setActiveModal(null);
    setLoading(false);
    setSuccess(false);
    setEmail('');
    setPassword('');
  };

  const simulateAction = (onSuccess: () => void) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    simulateAction(() => {
      closeModal();
      router.push('/workspace');
    });
  };

  const handleConnectBroker = () => {
    simulateAction(() => {
      setIsBrokerConnected(true);
      closeModal();
    });
  };

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass relative w-full max-w-md p-8 overflow-hidden bg-black/80 dark:bg-[#0A0A0F]/80"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Login / Signup Modal */}
          {(activeModal === 'login' || activeModal === 'signup') && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {activeModal === 'login' ? 'Welcome back' : 'Create an account'}
                </h2>
                <p className="text-sm text-white/50">
                  {activeModal === 'login' 
                    ? 'Enter your credentials to access your terminal.' 
                    : 'Start building automated trading strategies in seconds.'}
                </p>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center py-8 text-green-400">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <CheckCircle2 size={64} className="mb-4" />
                  </motion.div>
                  <p className="text-lg font-medium text-white">Authentication successful</p>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full relative mt-6 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        {activeModal === 'login' ? 'Sign In' : 'Get Started'}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  
                  {activeModal === 'login' && (
                    <button
                      type="button"
                      onClick={(e) => handleLogin(e)}
                      className="w-full mt-2 py-3 text-sm font-medium text-white/60 hover:text-white transition-colors border border-white/5 rounded-xl hover:bg-white/5"
                    >
                      Continue as Demo
                    </button>
                  )}
                </form>
              )}
            </div>
          )}

          {/* Connect Broker Modal */}
          {activeModal === 'connectBroker' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                {/* Simulated Alpaca Logo */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H22L12 2Z" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Connect Alpaca</h2>
              <p className="text-sm text-white/50 mb-8 max-w-[280px] mx-auto">
                Link your Alpaca paper trading account to deploy strategies with zero risk.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-4 text-green-400">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 size={48} className="mb-2" />
                  </motion.div>
                  <p className="font-medium text-white">Connected ✅</p>
                </div>
              ) : (
                <button 
                  onClick={handleConnectBroker}
                  disabled={loading}
                  className="w-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-medium rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-yellow-500/20 transition-all disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Authorize Alpaca'}
                </button>
              )}
            </div>
          )}

          {/* Watch Demo Modal */}
          {activeModal === 'demo' && (
            <div className="relative aspect-video bg-black/60 rounded-xl overflow-hidden flex items-center justify-center border border-white/10 group cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                 <Play className="text-white ml-1" fill="currentColor" size={24} />
               </div>
               <p className="absolute bottom-4 left-4 text-xs font-mono text-white/50 uppercase">Simulated Demo Video</p>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
