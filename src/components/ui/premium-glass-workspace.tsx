'use html';
'use client';

import { useState, useEffect } from 'react';

// Data interfaces derived directly from provided business plan & layout components
interface CorporateDistressProfile {
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

interface AlgoSwiftStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export default function PremiumGlassWorkspace() {
  // 1. DebtRadar Core System States
  const [profiles, setProfiles] = useState<CorporateDistressProfile[]>([
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
      linguisticFlags: ['liquidity surplus', 'premium premium share repurchase']
    }
  ]);

  const [selectedTicker, setSelectedTicker] = useState<string>('ZEEL');
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<'GLOBAL' | 'US_SEC' | 'IN_SEBI'>('GLOBAL');
  
  // 2. AlgoSwift Automation Sandbox States
  const [naturalStrategyInput, setNaturalStrategyInput] = useState('Short the nearest OTM weekly option when Altman Z-Score falls beneath 1.5 and linguistic red flags cross structural containment thresholds.');
  const [currentExecutionStep, setCurrentExecutionStep] = useState<number>(1);
  const [isCompilingAlgo, setIsCompilingAlgo] = useState<boolean>(false);
  const [compiledPythonPreview, setCompiledPythonPreview] = useState<string>('');

  const activeProfile = profiles.find(p => p.ticker === selectedTicker) || profiles[0];

  const algoSwiftWorkflow: AlgoSwiftStep[] = [
    { step: 1, title: 'Type strategy in plain English', description: 'Describe entries, exits, and indicators naturally — no coding required.', icon: '✍️' },
    { step: 2, title: 'AI converts it to code', description: 'Groq-powered AI generates production-ready Python backtest logic.', icon: '💻', badge: 'Groq Llama 3.3 70B' },
    { step: 3, title: 'Backtest on historical data', description: 'Run against up to 10 years of historical corporate filing cycles and market data in seconds.', icon: '📊' },
    { step: 4, title: 'See results + AI explanation', description: 'Review equity curves, stats, and a coach-style breakdown of what worked.', icon: '✨' },
    { step: 5, title: 'Connect your broker', description: 'Link production or sandbox routing options with one-click — real markets, zero friction.', icon: '🔗' },
    { step: 6, title: 'Strategy runs live 24/7', description: 'Your algorithm monitors markets continuously and executes while you sleep.', icon: '⚡' }
  ];

  // Dynamic simulation of AI compiling your English input into live algorithmic frameworks
  const triggerAICompilation = () => {
    setIsCompilingAlgo(true);
    setCurrentExecutionStep(2);
    setTimeout(() => {
      setCompiledPythonPreview(`import debt_radar_ai as dr\nimport algoswift_execution as swift\n\ndef initialize(context):\n    context.asset = "${activeProfile.ticker}"\n    context.ratio_floor = 1.5\n\ndef handle_data(context, data):\n    score_profile = dr.get_distress_profile(context.asset)\n    if score_profile.altman_z < context.ratio_floor:\n        swift.execute_order(context.asset, style="SHORT", parameters="OTM_WEEKLY")`);
      setIsCompilingAlgo(false);
      setCurrentExecutionStep(3);
    }, 1800);
  };

  // Filter tickers catalog based on active button matrix selection
  const filteredCatalogProfiles = profiles.filter(p => {
    if (activeCatalogFilter === 'GLOBAL') return true;
    return p.exchange === activeCatalogFilter;
  });

  return (
    <div className="bg-[#030303] text-zinc-100 min-h-screen p-6 font-sans relative antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-zinc-200">
      
      {/* BACKGROUND GRAPHIC RADIAL GLOWS (APPLE-STYLE AMBIENT SPACE DEPTH) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-950/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[50%] bg-emerald-950/15 blur-[140px] rounded-full pointer-events-none" />

      {/* CORE FRAMECONTAINER METRICS APP */}
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* TOP INTEGRATED CONTROL HEADER BAR */}
        <header className="backdrop-blur-xl bg-zinc-900/30 border border-zinc-800/40 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-900 flex items-center justify-center border border-zinc-600/30 shadow-inner">
              <span className="text-white text-sm font-bold">Δ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold tracking-tight text-white">DEBTRADAR // INTEGRATED EXECUTION DECK</h1>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-900/50 rounded-full font-mono font-medium">
                  Active Workspace V1.0 [cite: 7]
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">Continuous corporate file analysis matrix combined with AlgoSwift deployment engines[cite: 57].</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <span className="text-[11px] text-zinc-500 font-mono">System State:</span>
            <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-mono text-zinc-300 font-medium tracking-tight">AWAITING_ROUTING_HOOKS</span>
            </div>
          </div>
        </header>

        {/* CRITICAL ALARM STRIP BANNER IF SELECTED ASSET EXCEEDS BREACH LEVEL */}
        {activeProfile.score > 70 && (
          <div className="bg-rose-950/20 border border-rose-900/40 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-rose-300/90 shadow-[0_4px_20px_rgba(244,63,94,0.05)] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="font-mono font-bold uppercase tracking-wider">CRITICAL TRIGGER:</span>
            <span>{activeProfile.ticker} scored {activeProfile.score.toFixed(2)} (Breached Risk Distress Threshold &gt; 70.00)[cite: 58, 105]. Immediate analyst verification authorized.</span>
          </div>
        )}

        {/* DOUBLE COLUMN SPLIT GRAPHIC COMPONENT: LEFT WATCHLIST CATALOG / RIGHT MONITORING STATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT TELEMETRY SELECTION PANEL (4 COLS) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="backdrop-blur-xl bg-zinc-950/30 border border-zinc-900/80 rounded-2xl p-4 shadow-xl flex flex-col h-full justify-between">
              <div>
                {/* CATALOG REGISTRY TABS */}
                <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 mb-4">
                  <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">Corporate Index Registry</span>
                  <div className="flex bg-zinc-900/60 p-0.5 rounded-lg border border-zinc-850">
                    {(['GLOBAL', 'US_SEC', 'IN_SEBI'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveCatalogFilter(tab)}
                        className={`text-[9px] px-2 py-1 rounded-md font-medium tracking-tight transition ${
                          activeCatalogFilter === tab 
                            ? 'bg-zinc-800 text-white shadow-sm font-semibold' 
                            : 'text-zinc-500 hover:text-zinc-400'
                        }`}
                      >
                        {tab === 'GLOBAL' ? 'GLOBAL' : tab.split('_')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SEARCH INPUT FIELD */}
                <div className="mb-3">
                  <input 
                    type="text"
                    placeholder="Filter registry indexes..."
                    className="w-full bg-zinc-900/40 border border-zinc-900 focus:border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                  />
                </div>

                {/* TICKERS INDEX VERTICAL STREAM */}
                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {filteredCatalogProfiles.map((p) => (
                    <div
                      key={p.ticker}
                      onClick={() => setSelectedTicker(p.ticker)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                        selectedTicker === p.ticker 
                          ? 'bg-zinc-900/50 border-zinc-700/80 shadow-[inset_0_1px_12px_rgba(255,255,255,0.03)]' 
                          : 'bg-transparent border-transparent hover:bg-zinc-900/20 hover:border-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white tracking-tight">{p.ticker}</span>
                          <span className="text-[8px] text-zinc-600 border border-zinc-850 px-1 rounded font-mono">
                            {p.exchange.split('_')[1]}
                          </span>
                        </div>
                        <span className={`text-xs font-mono font-bold ${
                          p.score > 70 ? 'text-rose-400' : p.score > 40 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {p.score.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-zinc-500 truncate max-w-[160px]">{p.name}</span>
                        <span className="text-[8px] uppercase tracking-wider text-zinc-600 font-medium">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER METRICS INFO */}
              <div className="pt-4 border-t border-zinc-900/60 text-[10px] text-zinc-600">
                Data sources: SEC EDGAR / SEBI structured APIs[cite: 65, 151]. Updated continuously.
              </div>
            </div>
          </div>

          {/* RIGHT DETAILED MONITORING PLATFORM CONSOLE (8 COLS) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* COMPONENT LAYER A: GLASS COMPANY DISTRESS MONITOR (DEBTRADAR PROFILE) */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-zinc-900/40 via-zinc-950/20 to-zinc-950/50 border border-zinc-800/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/80 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-white">{activeProfile.name}</h2>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mt-0.5">
                    Registry Identification Identifier Key: {activeProfile.ticker}
                  </span>
                </div>
                
                <div className="text-right self-stretch sm:self-auto flex sm:flex-col justify-between items-center sm:items-end bg-zinc-900/30 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-zinc-850 sm:border-none">
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-zinc-500 block">Computed Distress Rating</span>
                  <span className={`text-3xl font-black font-mono tracking-tighter ${
                    activeProfile.score > 70 ? 'text-rose-400' : activeProfile.score > 40 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {activeProfile.score.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* THREE CORE MATHEMATICAL COMPONENT RATIO BLOCKS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { title: 'Altman Z-Score', val: activeProfile.altmanZ.toFixed(2), threshold: '< 1.81 Distress', state: activeProfile.altmanZ < 1.81 ? 'FAIL' : 'PASS' },
                  { title: 'Debt / EBITDA Ratio', val: activeProfile.debtEbitda, threshold: '> 6.0x Critical', state: parseFloat(activeProfile.debtEbitda) > 6 ? 'FAIL' : 'PASS' },
                  { title: 'Interest Coverage Ratio', val: activeProfile.interestCoverage, threshold: '< 1.5x Warning', state: parseFloat(activeProfile.interestCoverage) < 1.5 ? 'FAIL' : 'PASS' },
                ].map((r, i) => (
                  <div key={i} className="bg-zinc-900/30 border border-zinc-850/60 rounded-xl p-3 shadow-inner relative group">
                    <span className="text-[10px] font-medium text-zinc-500 block">{r.title}</span>
                    <span className="text-base font-bold text-zinc-200 block mt-1 font-mono tracking-tight">{r.val}</span>
                    <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                      <span className="text-zinc-600">{r.threshold}</span>
                      <span className={`font-bold ${r.state === 'FAIL' ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {r.state}
                      </span>
                    </div>
                    
                    {/* Visual Loading/Progress Strip Mock matching Screenshot 1 */}
                    <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden mt-2">
                      <div 
                        className={`h-full transition-all duration-500 ${r.state === 'FAIL' ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                        style={{ width: r.state === 'FAIL' ? '75%' : '25%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* LINGUISTIC ANALYSIS WORD CLOUDS */}
              <div className="bg-[#0b0c0f]/60 border border-zinc-900 rounded-xl p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                  Filing Linguistic Red Flags (Groq NLP Processing Layer) [cite: 57, 94]
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProfile.linguisticFlags.map((flag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-mono bg-zinc-900/80 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-lg shadow-sm"
                    >
                      &ldquo;{flag}&rdquo;
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* COMPONENT LAYER B: ALGOSWIFT AUTOMATION INTERACTIVE SANDBOX (6 STEPS INTERFACE) */}
            <div className="backdrop-blur-xl bg-gradient-to-tr from-zinc-950/80 via-zinc-900/30 to-zinc-950/70 border border-zinc-800/40 rounded-2xl p-6 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    AlgoSwift Automation Engine Sandbox
                  </h3>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Module Framework Ref: Node-04</span>
              </div>

              {/* CONVERT NATURAL LANGUAGE FIELD */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-400 block">
                  Step 1 & 2: Prompt to Quantitative Execution Code
                </label>
                <div className="relative">
                  <textarea
                    value={naturalStrategyInput}
                    onChange={(e) => setNaturalStrategyInput(e.target.value)}
                    placeholder="Describe entries, exits, and indicators naturally..."
                    rows={2}
                    className="w-full bg-zinc-900/30 border border-zinc-850 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none font-sans leading-relaxed"
                  />
                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={triggerAICompilation}
                      disabled={isCompilingAlgo}
                      className="bg-zinc-100 hover:bg-white text-black font-semibold px-3 py-1.5 rounded-lg text-xs tracking-tight transition flex items-center gap-1.5 shadow-md disabled:opacity-40"
                    >
                      {isCompilingAlgo ? (
                        <>
                          <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Compiling Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Convert to Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* LIVE COMPILED PYTHON VISUALIZER GRID AREA */}
              {compiledPythonPreview && (
                <div className="bg-[#070709] border border-zinc-900 rounded-xl p-4 space-y-2 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>GENERATED PRODUCTION SCRIPT (PYTHON)</span>
                    <span className="text-emerald-400 font-bold">✓ Compilation Successful</span>
                  </div>
                  <pre className="text-[11px] text-zinc-400 font-mono leading-relaxed overflow-x-auto p-2 bg-black/40 border border-zinc-950 rounded-lg">
                    {compiledPythonPreview}
                  </pre>
                </div>
              )}

              {/* SIX STEPS DISPLAY REPLICATED FROM SCREENSHOT 2 */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                  System Pipeline Synchronization Guide
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {algoSwiftWorkflow.map((flow) => (
                    <div 
                      key={flow.step}
                      onClick={() => setCurrentExecutionStep(flow.step)}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        currentExecutionStep === flow.step
                          ? 'bg-zinc-900/40 border-zinc-700 shadow-xl'
                          : 'bg-zinc-950/40 border-zinc-900/60 hover:border-zinc-850'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-lg">{flow.icon}</span>
                        <span className="text-[9px] text-zinc-600 font-mono font-bold">0{flow.step}</span>
                      </div>
                      
                      <h4 className="text-xs font-semibold text-zinc-200 mt-2 tracking-tight group-hover:text-white transition-colors">
                        {flow.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                        {flow.description}
                      </p>

                      {flow.badge && (
                        <span className="absolute bottom-2 right-2 text-[8px] bg-indigo-950/60 text-indigo-400 border border-indigo-900/60 px-1.5 py-0.5 rounded uppercase font-mono">
                          {flow.badge}
                        </span>
                      )}

                      {/* Apple-style thin edge glow accent */}
                      <div className={`absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent transition-transform duration-500 ${
                        currentExecutionStep === flow.step ? 'translate-y-0' : 'translate-y-[2px] group-hover:translate-y-0'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FIXED PLATFORM UTILITY COMPLIANCE FOOTER */}
      <footer className="mt-12 max-w-7xl mx-auto border-t border-zinc-900/80 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-600 gap-2">
        <div className="flex items-center gap-2 font-sans">
          <span>Aditya Tiwari Creative Suite Terminal</span> [cite: 161]
          <span>•</span>
          <span className="text-zinc-500">Glassmorphosis Linear Engine Matrix</span>
        </div>
        <div className="text-right font-mono text-[10px]">
          Execution Token Block // ACCREDITATION VERIFIED 2026
        </div>
      </footer>

    </div>
  );
}
