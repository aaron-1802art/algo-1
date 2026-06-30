'use client';

import { useState, useEffect } from 'react';

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
    setTerminalLogs(prev => [...prev, `[LOG] Dispatching encrypted handshakes to ${id.toUpperCase()} server matrices...`]);

    setTimeout(() => {
      setBrokers(prev => prev.map(b => b.id === id ? { ...b, status: 'AUTHENTICATED', tokenGeneratedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : b));
      setIsAuthorizing(false);
      setTerminalLogs(prev => [...prev, `[SUCCESS] Secure API bridge binding complete for ${id.toUpperCase()}. Daily token verified.`]);
      setInputClientId('');
      setInputApiKey('');
    }, 1500);
  };

  const toggleStrategyDeployment = (id: string) => {
    setStrategies(prev => prev.map(s => {
      if (s.id === id) {
        const nextState = !s.deployed;
        setTerminalLogs(logPrev => [
          ...logPrev, 
          nextState 
            ? `[DEPLOYED] Activated execution loops for strategy: ${s.title}`
            : `[PAUSED] Halted execution loops for strategy: ${s.title}. All open positions squared off.`
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
    <div className="bg-[#0b0c10] text-zinc-100 p-6 font-mono min-h-[750px] border border-zinc-800 rounded-xl max-w-6xl mx-auto shadow-2xl flex flex-col justify-between">
      
      {/* APP HEADER */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-4 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h1 className="text-lg font-black tracking-wider text-white uppercase">ATS ALGO INTEGRATED TERMINAL</h1>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Multi-Broker Automated Strategy Deployment Engine & Compliance Router</p>
          </div>

          {/* REALTIME PLATFORM OVERVIEW SUMMARY STRIP */}
          <div className="flex gap-4 bg-[#12141c] border border-zinc-850 p-3 rounded-lg w-full md:w-auto justify-between md:justify-end">
            <div className="px-2">
              <span className="text-[9px] text-zinc-500 block uppercase">Total Running Margin</span>
              <span className="text-xs font-bold text-white">₹{totalActiveCapital.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-l border-zinc-800 px-4">
              <span className="text-[9px] text-zinc-500 block uppercase">Daily Unrealized P&L</span>
              <span className={`text-xs font-bold ${aggregatePnl >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                {aggregatePnl >= 0 ? '▲ +' : '▼ '}₹{aggregatePnl.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="border-l border-zinc-800 px-2">
              <span className="text-[9px] text-zinc-500 block uppercase">Active Bridges</span>
              <span className="text-xs font-bold text-indigo-400">{brokers.filter(b => b.status === 'AUTHENTICATED').length} Connected</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 4 COLS: MULTI-BROKER ROUTING & DAILY VALIDATION TOKENS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#12141c] border border-zinc-850 rounded-lg p-4">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-3">
                1. Broker Auth Gateways
              </h2>
              
              {/* BROKER SELECTION ROW */}
              <div className="space-y-2">
                {brokers.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => { if (!isAuthorizing) setActiveBrokerId(b.id); }}
                    className={`p-3 rounded-md border text-left cursor-pointer transition flex items-center justify-between ${
                      activeBrokerId === b.id 
                        ? 'bg-zinc-900/80 border-zinc-600 text-white' 
                        : 'bg-black/40 border-zinc-900 text-zinc-400 hover:border-zinc-850'
                    }`}
                  >
                    <div>
                      <span className="text-xs block font-bold">{b.name}</span>
                      {b.tokenGeneratedAt && (
                        <span className="text-[9px] text-zinc-500 block mt-0.5">Token Generated: {b.tokenGeneratedAt}</span>
                      )}
                    </div>
                    <div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                        b.status === 'AUTHENTICATED' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900' :
                        b.status === 'TOKEN_EXPIRED' ? 'bg-amber-950/50 text-amber-400 border-amber-900' :
                        'bg-zinc-900 text-zinc-500 border-zinc-800'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ACTIVE SELECTION LOGIN PANEL REPLICA */}
              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">
                  Generate Session Token: {brokers.find(b => b.id === activeBrokerId)?.name}
                </span>
                
                {brokers.find(b => b.id === activeBrokerId)?.status === 'AUTHENTICATED' ? (
                  <div className="bg-emerald-950/20 border border-emerald-900/60 p-3 rounded text-center text-xs text-emerald-400">
                    ✓ Handshake Active. Data stream piped into local execution engine.
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <input 
                      type="text" 
                      placeholder={`Enter Client ID (${brokers.find(b => b.id === activeBrokerId)?.clientIdPlaceholder})`}
                      value={inputClientId}
                      onChange={(e) => setInputClientId(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded p-2 focus:outline-none focus:border-zinc-700 text-white placeholder-zinc-700"
                    />
                    <input 
                      type="password" 
                      placeholder="Enter API Secret Key / Token"
                      value={inputApiKey}
                      onChange={(e) => setInputApiKey(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded p-2 focus:outline-none focus:border-zinc-700 text-white placeholder-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleBrokerConnect(activeBrokerId)}
                      disabled={isAuthorizing}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded text-xs tracking-wider transition"
                    >
                      {isAuthorizing ? 'VALIDATING CREDS...' : '🔑 AUTHORIZE LIVE ROUTING'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT 8 COLS: STRATEGY MANAGEMENT & ACTIVE ALGO DEPLOYMENT ENGINE */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#12141c] border border-zinc-850 rounded-lg p-4">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4">
                2. Algorithmic Control Deck
              </h2>

              {/* STRATEGY WORKSPACE GRID REPLICA */}
              <div className="space-y-3">
                {strategies.map((strat) => (
                  <div 
                    key={strat.id} 
                    className={`p-4 rounded-lg border transition ${
                      strat.deployed 
                        ? 'bg-zinc-900/40 border-indigo-900/80 shadow-[inset_0_0_12px_rgba(79,70,229,0.05)]' 
                        : 'bg-black/30 border-zinc-900'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-black text-white">{strat.title}</h3>
                          <span className="text-[9px] bg-zinc-900 text-zinc-400 px-1 rounded border border-zinc-800 uppercase font-mono">
                            {strat.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Asset Focus: <span className="text-zinc-400 font-bold">{strat.instrument}</span></p>
                      </div>

                      {/* DEPLOY BUTTON TOGGLE */}
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleStrategyDeployment(strat.id)}
                          className={`w-full sm:w-28 py-1.5 px-3 rounded text-[10px] font-black tracking-widest text-center transition border ${
                            strat.deployed 
                              ? 'bg-rose-950 text-rose-400 border-rose-800 hover:bg-rose-900' 
                              : 'bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900'
                          }`}
                        >
                          {strat.deployed ? '🔴 HALT ALGO' : '⚡ DEPLOY LIVE'}
                        </button>
                      </div>
                    </div>

                    {/* METRIC FOOTER STRIP INSIDE THE DEPLOYMENT CARDS */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-zinc-900/60 text-[11px]">
                      <div>
                        <span className="text-[9px] text-zinc-500 block uppercase">Min Investment</span>
                        <span className="text-white font-bold">{strat.minCapital}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block uppercase">Historical Backtest ROI</span>
                        <span className="text-indigo-400 font-bold">{strat.historicalRoi}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block uppercase">Risk Engine Weight</span>
                        <span className={`font-bold ${
                          strat.riskProfile === 'High' ? 'text-rose-400' :
                          strat.riskProfile === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                        }`}>{strat.riskProfile}</span>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-[9px] text-zinc-500 block uppercase">Live Run P&L</span>
                        <span className={`font-bold font-mono ${
                          !strat.deployed ? 'text-zinc-600' :
                          strat.livePnl >= 0 ? 'text-emerald-400' : 'text-rose-500'
                        }`}>
                          {!strat.deployed ? 'Inactive' : `${strat.livePnl >= 0 ? '+' : ''}₹${strat.livePnl}`}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER EVENT STREAM - HIGHLY CHARACTERISTIC OF REAL TERMINALS */}
      <div className="mt-6 pt-4 border-t border-zinc-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-zinc-400 block uppercase tracking-widest">
            System Event Diagnostics Feed
          </span>
          <span className="text-[9px] text-zinc-600 uppercase">Status: Kernel Secure</span>
        </div>
        <div className="bg-black border border-zinc-900 rounded p-3 h-24 overflow-y-auto text-left space-y-1 select-all">
          {terminalLogs.map((log, index) => (
            <div key={index} className="text-[10px] text-zinc-400 font-mono leading-tight whitespace-pre-wrap">
              {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
