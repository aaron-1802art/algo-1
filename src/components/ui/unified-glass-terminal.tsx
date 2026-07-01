'use html';
'use client';

import { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

// Data Contracts
interface CorporateProfile {
  ticker: string;
  name: string;
  exchange: 'US_SEC' | 'IN_SEBI';
  score: number;
  status: 'HEALTHY' | 'ELEVATED' | 'CRITICAL' | 'IMMINENT DISTRESS';
  altmanZ: number;
  debtEbitda: string;
  interestCoverage: string;
  linguisticFlags: string[];
}

export default function UnifiedGlassTerminal() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'LANDING' | 'TERMINAL'>('LANDING');
  const [selectedTicker, setSelectedTicker] = useState<string>('ZEEL');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Strategy Builder Inputs
  const [strategyPrompt, setStrategyPrompt] = useState('Short equity or buy front-month protective put options whenever Altman Z-Score falls beneath 1.5 and corporate filing language flags going concern uncertainty.');
  const [compiledScript, setCompiledScript] = useState<string>('');
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[09:00:15] Core execution matrix layer synchronized with institutional gateways.',
    '[09:14:52] AlgoSwift compiler standing by for plain-English parameters input.'
  ]);

  // Target Corporate Profiles Ingested From Business Plan
  const [profiles] = useState<CorporateProfile[]>([
    { 
      ticker: 'ZEEL', 
      name: 'Zee Entertainment Enterprises', 
      exchange: 'IN_SEBI', 
      score: 81.10, 
      status: 'IMMINENT DISTRESS',
      altmanZ: 1.15,
      debtEbitda: '8.4x',
      interestCoverage: '0.45x',
      linguisticFlags: ['default risk', 'debt restructuring', 'repayment constraints']
    },
    { 
      ticker: 'LUMN', 
      name: 'Lumen Technologies, Inc.', 
      exchange: 'US_SEC', 
      score: 72.85, 
      status: 'CRITICAL',
      altmanZ: 1.00,
      debtEbitda: '38.4x',
      interestCoverage: '0.71x',
      linguisticFlags: ['significant debt', 'substantial leverage', 'financial distress']
    },
    { 
      ticker: 'RELIANCE', 
      name: 'Reliance Industries Ltd.', 
      exchange: 'IN_SEBI', 
      score: 24.50, 
      status: 'HEALTHY',
      altmanZ: 3.10,
      debtEbitda: '1.8x',
      interestCoverage: '5.20x',
      linguisticFlags: ['stable cashflow', 'capital expansion']
    },
    { 
      ticker: 'AAPL', 
      name: 'Apple Inc.', 
      exchange: 'US_SEC', 
      score: 8.20, 
      status: 'HEALTHY',
      altmanZ: 4.85,
      debtEbitda: '0.6x',
      interestCoverage: '18.4x',
      linguisticFlags: ['liquidity surplus', 'premium share repurchase']
    }
  ]);

  const activeProfile = profiles.find(p => p.ticker === selectedTicker) || profiles[0];

  // Strategy Validation Chart Timeseries data
  const historicalBacktestData = [
    { matrix: 'Point A', Benchmark: 20, StrategyAlpha: 10 },
    { matrix: 'Point B', Benchmark: 24, StrategyAlpha: 38 },
    { matrix: 'Point C', Benchmark: -10, StrategyAlpha: 72 }, // Caught credit cycle defaults
    { matrix: 'Point D', Benchmark: 5, StrategyAlpha: 98 },
    { matrix: 'Point E', Benchmark: 15, StrategyAlpha: 124 },
  ];

  const handleCompanyChange = (ticker: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedTicker(ticker);
      setIsProcessing(false);
    }, 500);
  };

  const handlePromptCompilation = () => {
    setIsProcessing(true);
    setActiveStep(2);
    setExecutionLogs(prev => [...prev, `[COMPILER] Ingesting natural language strings into Groq Llama 3.3 70B parser core...`]);
    
    setTimeout(() => {
      setCompiledScript(`import debt_radar as dr\nimport algoswift_broker as swift\n\ndef check_signal(context):\n    profile = dr.get_profile("${activeProfile.ticker}")\n    if profile.altman_z < 1.50 or profile.going_concern == True:\n        swift.route_order(profile.ticker, type="SHORT", asset_class="DERIVATIVES")`);
      setIsProcessing(false);
      setActiveStep(3);
      setExecutionLogs(prev => [
        ...prev, 
        `[SUCCESS] Python automation script compiled. Secure network handshake cached with execution routers.`
      ]);
    }, 1400);
  };

  return (
    <div className="bg-[#030303] text-zinc-200 min-h-screen font-sans antialiased selection:bg-zinc-800 p-4 md:p-8 relative overflow-x-hidden">
      
      {/* AMBIENT LIGHTING BACKGROUND ORBS (TRUE CSC GLASSMORPHISM PHYSICS) */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[40%] bg-indigo-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-5%] w-[40%] h-[45%] bg-emerald-950/15 blur-[120px] rounded-full pointer-events-none" />

      {/* CORE WORKSPACE CONSOLE */}
      <div className="max-w-7xl w-full mx-auto space-y-6 relative z-10">
        
        {/* TOP INTERACTIVE NAVIGATION HEADER */}
        <header className="backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center border border-zinc-600/30 shadow-inner">
              <span className="text-white text-sm font-bold tracking-tighter">Δ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-widest text-white uppercase">AlgoSwift // Intelligence Deck</span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Sleek multi-layer alternative risk parsing terminal matrix layer.</p>
            </div>
          </div>

          {/* VIEW SWITCH LAYER BUTTONS */}
          <nav className="flex items-center bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/60 font-mono text-[10px] self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setActiveTab('LANDING')}
              className={`px-3 py-1.5 rounded-lg font-semibold tracking-wide transition ${
                activeTab === 'LANDING' ? 'bg-zinc-800 text-white border border-zinc-700/60 shadow' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              AUTOMATION OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('TERMINAL')}
              className={`px-3 py-1.5 rounded-lg font-semibold tracking-wide transition ${
                activeTab === 'TERMINAL' ? 'bg-zinc-800 text-white border border-zinc-700/60 shadow' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              RISK ENGINE TERMINAL
            </button>
          </nav>
        </header>

        {/* VIEW 1: HIGH-FIDELITY LANDING MATRIX (6 WORKFLOW STEPS INTERACTIVE GRID) */}
        {activeTab === 'LANDING' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* HERO GLASS BANNER INTERFACE CONCEPT */}
            <div className="backdrop-blur-xl bg-zinc-900/20 border border-zinc-800/30 rounded-3xl p-8 text-center space-y-4 shadow-3xl max-w-3xl mx-auto my-6">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                AlgoSwift <span className="text-zinc-400">platform.</span>
              </h1>
              <p className="text-xs text-zinc-500 max-w-lg mx-auto font-mono leading-relaxed">
                Automated credit strategy execution in plain English. Fully integrated glassmorphism deployment matrix matching continuous alternative calculations.
              </p>
              <div className="flex justify-center gap-3 font-mono text-[11px] pt-2">
                <button onClick={() => setActiveTab('TERMINAL')} className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition">
                  Launch Execution Console
                </button>
                <div className="px-4 py-2 bg-zinc-900/60 border border-zinc-800 text-zinc-400 rounded-lg">
                  System State: Connected
                </div>
              </div>
            </div>

            {/* THE 6 STEPS OPERATIONAL MODULES BLOCK */}
            <div className="space-y-3">
              <div className="text-left font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">System Execution Pipeline Step-by-Step Matrix</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { step: 1, icon: '✍️', title: 'Type strategy in plain English', desc: 'Describe entries, exits, and risk parameters naturally — no manual scripting constraints required.' },
                  { step: 2, icon: '💻', title: 'AI converts it to code', desc: 'Groq-powered model matrices parse text arrays to generate production-grade Python processing logic.', badge: 'Groq API core' },
                  { step: 3, icon: '📊', title: 'Backtest on historical data', desc: 'Test system boundaries against up to 10 years of structured SEC EDGAR and SEBI filing cycles in seconds.' },
                  { step: 4, icon: '✨', title: 'See results + AI explanation', desc: 'Review high-contrast performance equity curves, drawdown margins, and explicit statistical risk summaries.' },
                  { step: 5, icon: '🔗', title: 'Connect your broker', desc: 'Secure direct authorization routes with multi-broker token gateways in a single client handshake.' },
                  { step: 6, icon: '⚡', title: 'Strategy runs live 24/7', description: 'Your algorithm monitors underlying indicators around the clock and triggers defensive orders while you sleep.' }
                ].map((item) => (
                  <div 
                    key={item.step}
                    onClick={() => { setActiveTab('TERMINAL'); setActiveStep(item.step); }}
                    className={`backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/40 p-4 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:scale-[1.01] relative group flex flex-col justify-between min-h-[140px]`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-zinc-500 font-mono text-[10px]">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-bold">0{item.step}</span>
                      </div>
                      <h3 className="text-xs font-bold text-zinc-200 tracking-tight mt-3 group-hover:text-white transition-colors">{item.title}</h3>
                      <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{item.desc || item.description}</p>
                    </div>

                    {item.badge && (
                      <span className="absolute bottom-3 right-3 text-[8px] bg-indigo-950/50 text-indigo-400 border border-indigo-900/40 px-2 py-0.5 rounded-full uppercase font-mono font-bold tracking-wider">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: HIGH-FIDELITY TRANSACTIONAL WORKSPACE TERMINAL PANEL */}
        {activeTab === 'TERMINAL' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
            
            {/* LEFT PROFILE REGISTRY INDEX CONTROLLER (4 COLS) */}
            <div className="lg:col-span-4 bg-zinc-950/20 backdrop-blur-xl border border-zinc-900 rounded-2xl p-4 space-y-4 shadow-xl">
              <div className="border-b border-zinc-900 pb-2">
                <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold tracking-widest">Asset Catalog Index</span>
              </div>

              {/* SIDEBAR ASSETS LIST */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {profiles.map((p) => (
                  <div
                    key={p.ticker}
                    onClick={() => handleCompanyChange(p.ticker)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedTicker === p.ticker 
                        ? 'bg-zinc-900/50 border-zinc-700/80 shadow-md' 
                        : 'bg-transparent border-transparent hover:bg-zinc-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tracking-tight">{p.ticker}</span>
                        <span className="text-[8px] text-zinc-600 bg-zinc-900 px-1 border border-zinc-850 rounded uppercase font-mono font-medium">{p.exchange.split('_')[1]}</span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${p.score > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {p.score.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1 text-[10px]">
                      <span className="text-zinc-500 truncate max-w-[170px]">{p.name}</span>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wide">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ANALYTICS MONITORING DECK PLATFORM (8 COLS) */}
            <div className="lg:col-span-8 flex flex-col space-y-6">
              
              {/* COMPONENT MODULE A: DEBTRADAR PROFILE STATS CANVAS */}
              <div className={`backdrop-blur-xl bg-zinc-900/20 border border-zinc-900/80 rounded-2xl p-6 transition-all duration-300 ${isProcessing ? 'opacity-30' : 'opacity-100'} shadow-2xl relative`}>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 mb-5 gap-2">
                  <div>
                    <h2 className="text-md font-bold text-white tracking-tight">{activeProfile.name}</h2>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">REGISTRY ID ID-KEY: <span className="text-zinc-300 font-bold">{activeProfile.ticker}</span></p>
                  </div>
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[9px] text-zinc-500 uppercase block tracking-wider">Distress Rating</span>
                    <span className={`text-2xl font-black ${activeProfile.score > 70 ? 'text-rose-400' : 'text-emerald-400'} tracking-tighter`}>
                      {activeProfile.score.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* MATRIX STRIP BLOCKS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {[
                    { title: 'Altman Z-Score', val: activeProfile.altmanZ.toFixed(2), bar: activeProfile.altmanZ < 1.81 ? 'bg-amber-500' : 'bg-emerald-500', note: activeProfile.altmanZ < 1.81 ? 'Distress Zone' : 'Safe zone' },
                    { title: 'Debt / EBITDA Ratio', val: activeProfile.debtEbitda, bar: parseFloat(activeProfile.debtEbitda) > 6 ? 'bg-amber-500' : 'bg-emerald-500', note: '>6.0x Critical Cap' },
                    { title: 'Interest Coverage Ratio', val: activeProfile.interestCoverage, bar: parseFloat(activeProfile.interestCoverage) < 1.5 ? 'bg-amber-500' : 'bg-emerald-500', note: '<1.5x Destabilization' }
                  ].map((ratio, index) => (
                    <div key={index} className="bg-zinc-950/40 border border-zinc-900 p-3.5 rounded-xl font-mono text-xs">
                      <span className="text-zinc-500 block text-[10px] font-medium">{ratio.title}</span>
                      <span className="text-white font-bold block mt-1 text-sm tracking-tight">{ratio.val}</span>
                      <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-2.5">
                        <div className={`h-full ${ratio.bar}`} style={{ width: '65%' }} />
                      </div>
                      <span className="text-[8px] text-zinc-600 block mt-1 uppercase font-bold">{ratio.note}</span>
                    </div>
                  ))}
                </div>

                {/* NLP WORD PILLS DISCOVERY MATRICES */}
                <div className="bg-black/40 border border-zinc-900 rounded-xl p-3.5 space-y-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase font-mono block tracking-wider">Filing Linguistic Red Flags Identified</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.linguisticFlags.map((flag, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-850 px-2.5 py-1 text-[11px] font-mono text-zinc-300 rounded-lg shadow-sm">
                        &ldquo;{flag}&rdquo;
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* COMPONENT MODULE B: INTERACTIVE ENGLISH PLAIN INPUT GENERATION SYSTEM */}
              <div className="backdrop-blur-xl bg-zinc-900/20 border border-zinc-900/80 rounded-2xl p-6 space-y-5 shadow-2xl">
                <div>
                  <h3 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-widest">Natural Language Strategy Compiler Playground</h3>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Describe custom triggers naturally; the underlying system converts it directly into secure code objects.</p>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={strategyPrompt}
                      onChange={(e) => setStrategyPrompt(e.target.value)}
                      rows={2}
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 p-3 rounded-xl text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none transition leading-relaxed font-sans"
                    />
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={handlePromptCompilation}
                        disabled={isProcessing}
                        className="bg-zinc-100 hover:bg-white text-black font-bold px-3 py-1.5 rounded-lg text-xs font-mono tracking-tight transition shadow disabled:opacity-40"
                      >
                        {isProcessing ? '⏳ COMPILING SCRIPT...' : '⚡ CONVERT TO CODE'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* SCRIPT TERMINAL MONITOR CONSOLE PANEL */}
                {compiledScript && (
                  <div className="bg-black border border-zinc-900 rounded-xl p-4 space-y-2 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500">
                      <span>AUTOMATED PIPELINE SCRIPT PREVIEW (PYTHON)</span>
                      <span className="text-emerald-400 font-bold">COMPILATION SUCCESSFUL</span>
                    </div>
                    <pre className="bg-zinc-950/60 p-3 rounded-lg text-[11px] text-zinc-400 border border-zinc-900 overflow-x-auto text-left font-mono leading-relaxed select-all">
                      {compiledScript}
                    </pre>
                  </div>
                )}

                {/* GRAPH TIMESERIES COMPONENT BACKTEST MATRIX DISPLAY */}
                {compiledScript && (
                  <div className="space-y-2 pt-2 border-t border-zinc-900/60 animate-in fade-in duration-500">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider block">Historical Strategy Performance Alpha Backtest</span>
                    <div className="h-40 w-full bg-black border border-zinc-900 rounded-xl p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historicalBacktestData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="glassAlphaGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ffffff" stopOpacity={0.12}/>
                              <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#121214" vertical={false} />
                          <XAxis dataKey="matrix" stroke="#3f3f46" fontSize={8} tickLine={false} axisLine={false} />
                          <YAxis stroke="#3f3f46" fontSize={8} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#27272a', borderRadius: '4px' }} itemStyle={{ fontFamily: 'monospace', fontSize: '10px' }} />
                          <Area type="monotone" dataKey="StrategyAlpha" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#glassAlphaGlow)" />
                          <Area type="monotone" dataKey="Benchmark" stroke="#27272a" strokeWidth={1} fillOpacity={0} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>

              {/* INTEGRATED ROUTER FEED SECURITY TRANSACTION LOG SYSTEM */}
              <div className="bg-zinc-950/20 backdrop-blur-xl border border-zinc-900 rounded-2xl p-4 font-mono space-y-2 text-left">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest block">System Event Diagnostics Wire</span>
                <div className="bg-black border border-zinc-900 p-3 rounded-lg h-24 overflow-y-auto text-[10px] text-zinc-400 space-y-1 select-all leading-tight">
                  {executionLogs.map((log, index) => (
                    <div key={index} className="whitespace-pre-wrap">{log}</div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* SYSTEM CONTROL SYSTEM MATRIX FOOTER */}
      <footer className="max-w-7xl w-full mx-auto mt-12 pt-4 border-t border-zinc-900 flex justify-between font-mono text-[9px] text-zinc-600">
        <div>PRODUCTION MATRIX FRAMEWORK ACCREDITATION COMPLIANT</div>
        <div>STATE DESCRIPTOR: CONNECTED_SECURE_MODE</div>
      </footer>

    </div>
  );
}
