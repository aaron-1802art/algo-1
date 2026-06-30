'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces mirroring the actual ATS Algo Platform data structures
export interface AlgoStrategy {
  id: string;
  title: string;
  instrument: string;
  type: 'MIS' | 'NRML';
  minCapital: string;
  historicalRoi: string;
  riskProfile: 'Low' | 'Moderate' | 'High';
  deployed: boolean;
  livePnl: number;
}

export interface BrokerBridge {
  id: string;
  name: string;
  clientIdPlaceholder: string;
  status: 'DISCONNECTED' | 'AUTHENTICATED' | 'TOKEN_EXPIRED';
  tokenGeneratedAt?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function AtsAlgoTerminal() {
  // 1. Core ATS Strategy Marketplace/Catalog State
  const [strategies, setStrategies] = useState<AlgoStrategy[]>([
    { id: 'str_1', title: 'Nifty Intraday Momentum Scalper', instrument: 'NIFTY FUT / OPTIONS', type: 'MIS', minCapital: '₹50,000', historicalRoi: '+42.3%', riskProfile: 'Moderate', deployed: true, livePnl: 1420 },
    { id: 'str_2', title: 'BankNifty Weekly Short Straddle Engine', instrument: 'BANKNIFTY OPTIONS', type: 'NRML', minCapital: '₹2,000,000', historicalRoi: '+28.7%', riskProfile: 'Low', deployed: false, livePnl: 0 },
    { id: 'str_3', title: 'Supertrend Equity Breakout Bot', instrument: 'NSE TOP 100 LIQUID', type: 'MIS', minCapital: '₹25,000', historicalRoi: '+56.1%', riskProfile: 'High', deployed: true, livePnl: -680 },
  ]);

  // 2. Multi-Broker Login Framework matching Indian API protocols
  const [brokers, setBrokers] = useState<BrokerBridge[]>([
    { id: 'zerodha', name: 'Zerodha (Kite Connect)', clientIdPlaceholder: 'ZRXXXX', status: 'AUTHENTICATED', tokenGeneratedAt: '09:08 AM' },
    { id: 'angelone', name: 'Angel One (SmartAPI)', clientIdPlaceholder: 'ANXXXX', status: 'DISCONNECTED' },
    { id: 'fyers', name: 'Fyers API Bridge', clientIdPlaceholder: 'FYXXXX', status: 'TOKEN_EXPIRED' },
  ]);

  const [activeBrokerId, setActiveBrokerId] = useState<string>('zerodha');
  const [inputClientId, setInputClientId] = useState('');
  const [inputApiKey, setInputApiKey] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // 3. System Stream Event Log
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[09:00:01] ATS Engine Initialized. Checking broker session validity...',
    '[09:08:12] [SUCCESS] Zerodha Kite session authenticated. Daily Master Token generated successfully.',
    '[09:15:00] [STRATEGY] Nifty Intraday Momentum Scalper injected into memory core. Awaiting entry triggers.'
  ]);

  // Real-time P&L fluctuation ticker to match a live market feed
  useEffect(() => {
    const interval = setInterval(() => {
      setStrategies(prev => 
        prev.map(strat => {
          if (!strat.deployed) return strat;
          const variance = Math.floor(Math.random() * 160) - 75; // Random price movement
          return { ...strat, livePnl: strat.livePnl + variance };
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Broker Token Authentication Loop
  const handleBrokerConnect = (id: string) => {
    if (!inputClientId) {
      alert('Please enter your Broker Client ID.');
      return;
    }
    setIsAuthorizing(true);
    setTerminalLogs(prev => [`[LOG] Dispatching encrypted handshakes to ${id.toUpperCase()} server matrices...`, ...prev]);

    setTimeout(() => {
      setBrokers(prev => prev.map(b => b.id === id ? { ...b, status: 'AUTHENTICATED', tokenGeneratedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : b));
      setIsAuthorizing(false);
      setTerminalLogs(prev => [`[SUCCESS] Secure API bridge binding complete for ${id.toUpperCase()}. Daily token verified.`, ...prev]);
      setInputClientId('');
      setInputApiKey('');
    }, 1500);
  };

  const toggleStrategyDeployment = (id: string) => {
    setStrategies(prev => prev.map(s => {
      if (s.id === id) {
        const nextState = !s.deployed;
        setTerminalLogs(logPrev => [
          nextState 
            ? `[DEPLOYED] Activated execution loops for strategy: ${s.title}`
            : `[PAUSED] Halted execution loops for strategy: ${s.title}. All open positions squared off.`,
          ...logPrev
        ]);
        return { ...s, deployed: nextState, livePnl: 0 };
      }
      return s;
    }));
  };

  // Calculate Aggregated Metrics
  const totalActiveCapital = strategies.filter(s => s.deployed).length * 37500; 
  const aggregatePnl = strategies.reduce((acc, curr) => acc + curr.livePnl, 0);

  return (
    <div className="bg-mesh-gradient text-zinc-100 min-h-screen p-4 md:p-8 font-mono selection:bg-indigo-500/30 overflow-hidden relative pb-32">
      
      {/* FLOATING PARTICLES OR LIGHTING LAYER (pure CSS glassmorphism base) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black/80 to-black/90 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6 h-full">
        
        {/* HEADER BENTO TILE */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-white/10 shadow-2xl"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 uppercase">
                ATS ALGO TERMINAL
              </h1>
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-sans tracking-wide">Multi-Broker Automated Strategy Deployment Engine & Compliance Router</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="px-3 py-1">
              <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Total Running Margin</span>
              <span className="text-sm font-bold text-white tabular-nums">₹{totalActiveCapital.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="px-3 py-1">
              <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Active Bridges</span>
              <span className="text-sm font-bold text-indigo-400">{brokers.filter(b => b.status === 'AUTHENTICATED').length} Connected</span>
            </div>
          </div>
        </motion.div>

        {/* WORKSPACE CONTENT BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: BROKER GATEWAYS (4 COLS) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-1 h-1 bg-indigo-500 rounded-full" /> 1. Broker Gateways
              </h2>
              
              <div className="space-y-3 relative z-10">
                {brokers.map((b) => (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={b.id}
                    onClick={() => { if (!isAuthorizing) setActiveBrokerId(b.id); }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      activeBrokerId === b.id 
                        ? 'bg-white/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                        : 'bg-black/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs block font-bold">{b.name}</span>
                      {b.tokenGeneratedAt && (
                        <span className="text-[9px] text-zinc-500 block mt-0.5">Token Generated: {b.tokenGeneratedAt}</span>
                      )}
                    </div>
                    <div>
                      <span className={`text-[9px] px-2 py-1 rounded-md font-bold border transition-colors ${
                        b.status === 'AUTHENTICATED' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50' :
                        b.status === 'TOKEN_EXPIRED' ? 'bg-amber-950/30 text-amber-400 border-amber-900/50' :
                        'bg-white/5 text-zinc-400 border-white/10'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AUTH PANEL */}
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={activeBrokerId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 pt-5 border-t border-white/10 overflow-hidden"
                >
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider mb-3">
                    Generate Session Token: {brokers.find(b => b.id === activeBrokerId)?.name}
                  </span>
                  
                  {brokers.find(b => b.id === activeBrokerId)?.status === 'AUTHENTICATED' ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-center text-xs text-emerald-400">
                      ✓ Handshake Active. Data stream piped into local execution engine.
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <input 
                        type="text" 
                        placeholder={`Enter Client ID (${brokers.find(b => b.id === activeBrokerId)?.clientIdPlaceholder})`}
                        value={inputClientId}
                        onChange={(e) => setInputClientId(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-zinc-600 transition-all"
                      />
                      <input 
                        type="password" 
                        placeholder="Enter API Secret Key / Token"
                        value={inputApiKey}
                        onChange={(e) => setInputApiKey(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-zinc-600 transition-all"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleBrokerConnect(activeBrokerId)}
                        disabled={isAuthorizing}
                        className="w-full relative overflow-hidden bg-white hover:bg-zinc-200 text-black font-bold py-2.5 rounded-lg text-xs tracking-wider transition-colors disabled:opacity-50"
                      >
                        {isAuthorizing ? 'VALIDATING CREDS...' : '🔑 AUTHORIZE LIVE ROUTING'}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: ALGO CONTROL DECK (8 COLS) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-6 border border-white/10">
              <h2 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-1 h-1 bg-white rounded-full" /> 2. Algorithmic Control Deck
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {strategies.map((strat) => {
                  // Determine wrapper class dynamically based on active status
                  const isLive = strat.deployed;
                  return (
                    <motion.div 
                      key={strat.id} 
                      layout
                      className={`relative p-5 rounded-xl border transition-all duration-500 ${
                        isLive 
                          ? 'bg-gradient-to-br from-indigo-900/30 to-black/50 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.1)]' 
                          : 'bg-black/30 border-white/5'
                      }`}
                    >
                      {/* Optional Animated Border Box for active ones */}
                      {isLive && (
                         <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[spin-slow_4s_linear_infinite] bg-[conic-gradient(transparent,transparent,transparent,#6366f1)] opacity-20" />
                         </div>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-black text-white">{strat.title}</h3>
                              <span className="text-[9px] bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded uppercase font-mono tracking-wider">
                                {strat.type}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400 mt-1 font-sans">Asset Focus: <span className="text-zinc-200 font-bold">{strat.instrument}</span></p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => toggleStrategyDeployment(strat.id)}
                            className={`w-full sm:w-32 py-2 px-3 rounded-lg text-[10px] font-black tracking-widest text-center transition-all ${
                              isLive 
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            }`}
                          >
                            {isLive ? '🔴 HALT ALGO' : '⚡ DEPLOY LIVE'}
                          </motion.button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-white/5 text-[11px]">
                          <div>
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Min Investment</span>
                            <span className="text-white font-bold">{strat.minCapital}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Historical ROI</span>
                            <span className="text-indigo-400 font-bold">{strat.historicalRoi}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Risk Weight</span>
                            <span className={`font-bold ${
                              strat.riskProfile === 'High' ? 'text-rose-400' :
                              strat.riskProfile === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                            }`}>{strat.riskProfile}</span>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="text-[9px] text-zinc-500 block uppercase tracking-wider">Live P&L</span>
                            <motion.span 
                              key={strat.livePnl}
                              initial={{ opacity: 0.5, y: -2 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`font-bold tabular-nums text-sm block mt-0.5 ${
                                !isLive ? 'text-zinc-600' :
                                strat.livePnl >= 0 ? 'text-emerald-400' : 'text-rose-500'
                              }`}
                            >
                              {!isLive ? 'Inactive' : `${strat.livePnl >= 0 ? '+' : ''}₹${strat.livePnl}`}
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FLOATING BOTTOM DOCK: DIAGNOSTICS & AGGREGATE P&L */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 pointer-events-auto">
          {/* EVENT FEED (Flex grows to take available space) */}
          <div className="glass-panel flex-1 rounded-xl p-3 border border-white/10 shadow-2xl overflow-hidden flex flex-col h-24">
            <div className="flex justify-between items-center mb-1 pb-1 border-b border-white/5">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Diagnostics Feed
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Kernel Secure</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-1 scrollbar-hide">
              <AnimatePresence>
                {terminalLogs.map((log, index) => (
                  <motion.div 
                    key={log + index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] text-zinc-400 font-mono leading-tight whitespace-pre-wrap break-words"
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* AGGREGATE P&L HIGHLIGHT */}
          <div className="glass-panel w-full md:w-64 rounded-xl p-4 border border-white/10 shadow-2xl flex flex-col justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent pointer-events-none" />
             <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold relative z-10">
               Unrealized Net P&L
             </span>
             <motion.div 
               key={aggregatePnl}
               initial={{ scale: 0.95 }}
               animate={{ scale: 1 }}
               className={`text-2xl font-black tabular-nums tracking-tighter relative z-10 mt-1 ${aggregatePnl >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]'}`}
             >
               {aggregatePnl >= 0 ? '▲ +' : '▼ '}₹{aggregatePnl.toLocaleString('en-IN')}
             </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Utility to hide scrollbar on feed */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
